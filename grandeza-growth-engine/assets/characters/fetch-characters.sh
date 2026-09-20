#!/usr/bin/env bash
# Download the Higgsfield-generated character art into this folder.
#
# Why this script exists: the art was generated with Higgsfield (nano-banana
# images + Seedance 2.0 video) inside a Claude Code web session whose egress
# policy blocks the Higgsfield CDN, so the binaries could not be committed from
# there. Run this on your own machine / Cursor (no such block) to pull them in.
#
# Usage:  bash fetch-characters.sh
#
# Note: these are time-limited CDN URLs from the generation runs on 2026-07-19.
# If any 403/expire, re-open the generation in Higgsfield and copy fresh URLs,
# or regenerate from the prompts in ../../game/CHARACTERS.md.

set -euo pipefail
cd "$(dirname "$0")"

base="https://d8j0ntlcm91z4.cloudfront.net/user_3F5ssCqR5J7p1iLhp9GPzJjUxk5"

dl () { echo "→ $2"; curl -fSL "$1" -o "$2"; }

# --- stills: TRANSPARENT cutouts (remove_background) ---
# The game references these filenames; the cutouts drop onto the UI with no
# navy block. Navy-background originals are listed below if you ever want them.
dl "$base/hf_20260719_035628_c97a8f61-fdf0-4f52-b912-71214dbe5676.png" "guardo.png"
dl "$base/hf_20260719_035632_247f5ac5-3940-41f1-95ff-8d89905c260f.png" "robotexter.png"
dl "$base/hf_20260719_035634_1d6c1e2b-f2a8-4d4f-af59-def9621a99f2.png" "phantom-bot.png"
dl "$base/hf_20260719_035637_d26fdf64-1846-4439-8bd6-b3b47350fe24.png" "sneaky-pete.png"
dl "$base/hf_20260719_035640_3116aa99-a434-48ce-a51a-34b25a5bfb33.png" "the-shredder.png"
dl "$base/hf_20260719_035643_6e92623c-4cbb-4d8c-a06a-c7dfe12728b2.png" "guardo-worried.png"

# --- navy-background originals (optional; not used by the game) ---
# dl "$base/hf_20260719_031629_c4a9c21c-1f45-479e-8a4b-fcbbf546d611.png" "guardo-navy.png"
# dl "$base/hf_20260719_031632_667a87d8-0cbb-436b-95f5-d4b9d43042a7.png" "robotexter-navy.png"
# dl "$base/hf_20260719_031635_9e172803-da4a-4832-9a8b-22b13149847e.png" "phantom-bot-navy.png"
# dl "$base/hf_20260719_031639_78f80aff-21de-47c5-959e-09ca0d8baeeb.png" "sneaky-pete-navy.png"
# dl "$base/hf_20260719_031642_def163d9-c5bc-4b76-9163-31ba5340c1d0.png" "the-shredder-navy.png"
# dl "$base/hf_20260719_035111_c663336e-2d2e-4ed1-a8af-1c4b6aac6345.png" "guardo-worried-navy.png"

# --- animations (Seedance 2.0, 5s / 720p / silent) ---
dl "$base/hf_20260719_032741_1bd0f6a1-1195-456e-9d9c-6eaac8b36b40.mp4" "guardo-intro.mp4"
dl "$base/hf_20260719_035039_af6ecdae-ae90-481f-ae06-cfd353ec8bb4.mp4" "robotexter-attack.mp4"
dl "$base/hf_20260719_035042_8e421c0e-31f2-42fa-a9e5-f1b2e7e3d2db.mp4" "phantom-bot-attack.mp4"
dl "$base/hf_20260719_035049_25b899fa-cb3b-43ef-b56d-6c5672ceb0ca.mp4" "sneaky-pete-attack.mp4"
dl "$base/hf_20260719_035053_e45466b3-0749-4cf1-ba88-6be19527ec5f.mp4" "the-shredder-attack.mp4"
dl "$base/hf_20260719_035108_933f6820-db7d-4895-b49b-fc74decc158b.mp4" "guardo-cheer.mp4"
dl "$base/hf_20260719_035152_8593af86-3bde-47f0-8917-ea1af9b0e9eb.mp4" "guardo-worried.mp4"

echo
echo "Done. The game (game/index.html) auto-detects these files and shows the"
echo "cast; without them it falls back to the text UI. Commit them once fetched."
