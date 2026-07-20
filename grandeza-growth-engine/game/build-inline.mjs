#!/usr/bin/env node
// Build a fully self-contained copy of the game with the character art baked in
// as data: URIs — so a single HTML file (or a published Artifact) shows the
// whole cast with no external requests.
//
// Why a build step: the shareable Artifact can't fetch external files, and this
// session's egress blocks the Higgsfield CDN, so the art can't be embedded from
// the cloud. Run this on your machine AFTER fetching the art:
//
//   bash ../assets/characters/fetch-characters.sh
//   node build-inline.mjs            # stills only  -> index.inlined.html
//   node build-inline.mjs --videos   # also embed the Seedance clips (big file)
//
// Then open game/index.inlined.html, or publish it as an Artifact / host it.
//
// By default only the transparent stills are inlined (small; the cast shows on
// every screen). The Seedance .mp4 clips are large, so they're embedded only
// with --videos; without it the inlined file falls back to the stills for the
// animated moments.

import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, extname } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const argv = process.argv.slice(2);
const withVideos = argv.includes("--videos");
// --assets <dir> points at an alternate (e.g. compressed) asset folder; the
// filenames inside must match what the game requests (guardo.png, etc.).
const ai = argv.indexOf("--assets");
const assetsDir = ai !== -1 && argv[ai + 1]
  ? argv[ai + 1]
  : join(here, "..", "assets", "characters");
const srcHtml = join(here, "index.html");
const outHtml = join(here, "index.inlined.html");

const MIME = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
               ".webp": "image/webp", ".gif": "image/gif", ".mp4": "video/mp4",
               ".webm": "video/webm" };

if (!existsSync(assetsDir)) {
  console.error(`No assets dir at ${assetsDir}. Run fetch-characters.sh first.`);
  process.exit(1);
}

const manifest = {};
let total = 0;
for (const name of readdirSync(assetsDir)) {
  const ext = extname(name).toLowerCase();
  const mime = MIME[ext];
  if (!mime) continue;                                   // skip .sh, .md, etc.
  const isVideo = mime.startsWith("video/");
  if (isVideo && !withVideos) continue;                  // stills-only by default
  const bytes = readFileSync(join(assetsDir, name));
  manifest[name] = `data:${mime};base64,${bytes.toString("base64")}`;
  total += bytes.length;
  console.log(`  + ${name} (${(bytes.length / 1024).toFixed(0)} KB)`);
}

const count = Object.keys(manifest).length;
if (!count) {
  console.error("No embeddable art found. Did fetch-characters.sh run?");
  process.exit(1);
}

let html = readFileSync(srcHtml, "utf8");
const marker = "<!-- INLINE-MANIFEST -->";
if (!html.includes(marker)) {
  console.error(`Marker ${marker} not found in index.html — cannot inject.`);
  process.exit(1);
}
const inject = `${marker}\n<script>window.GRANDEZA_INLINE = ${JSON.stringify(manifest)};</script>`;
html = html.replace(marker, inject);
writeFileSync(outHtml, html);

const outKB = Buffer.byteLength(html) / 1024;
console.log(`\nWrote ${outHtml}`);
console.log(`Embedded ${count} asset(s), ${(total / 1024 / 1024).toFixed(1)} MB raw` +
            ` -> ${(outKB / 1024).toFixed(1)} MB HTML (base64 adds ~33%).`);
if (!withVideos) console.log("Stills only. Re-run with --videos to embed the Seedance clips too.");
