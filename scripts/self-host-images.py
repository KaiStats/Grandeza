#!/usr/bin/env python3
"""
Self-host the Higgsfield/CloudFront images and kill the CLS.

Grandeza's hero art, section backgrounds and social-card images are all
served from d8j0ntlcm91z4.cloudfront.net, a host we do not control. If
those URLs rotate or expire, every image and every social preview breaks
at once. This script pulls them local and repoints everything.

It also fixes Cumulative Layout Shift: it reads each image's real pixel
dimensions and writes width/height onto every <img>, so the browser can
reserve the space before the bytes arrive.

Run from the repo root:

    python3 scripts/self-host-images.py            # do it
    python3 scripts/self-host-images.py --dry-run  # just show the plan

Safe to re-run. Already-downloaded files are skipped, and URLs that have
already been repointed are left alone. Standard library only.
"""

import hashlib
import os
import re
import struct
import sys
import urllib.request
from pathlib import Path

CDN = "d8j0ntlcm91z4.cloudfront.net"
ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
IMGDIR = PUBLIC / "img"
SITE = "https://grandeza.io"
DRY = "--dry-run" in sys.argv

# Readable filenames for the images we can identify by where they're used.
# Anything not listed falls back to a short hash of its URL.
NAMES = {
    # landing.html
    "hf_20260719_154736": "hero-hvac",
    "hf_20260719_154737": "plumber",
    "hf_20260719_155705": "dispatcher",
    "hf_20260719_155707": "homeowner",
    # shared social card (7 pages)
    "hf_20260719_155710": "og-default",
    # index.html
    "hf_20260719_160436": "portrait",
    "hf_20260719_160439": "binder",
    "hf_20260719_160441": "seal-macro",
    # scan landing page
    "hf_20260727_175200": "scan-01",
    "hf_20260727_194114": "scan-02",
    "hf_20260727_201729": "scan-03",
    "hf_20260727_201731": "scan-04",
    "hf_20260727_201733": "scan-05",
    "hf_20260727_202526": "scan-06",
    "hf_20260727_202527": "scan-07",
    "hf_20260727_202528": "scan-08",
    "hf_20260727_202530": "scan-09",
    "hf_20260727_202532": "scan-10",
    "hf_20260727_202536": "og-scan",
}


def dimensions(path):
    """Return (width, height) for PNG / JPEG / WebP. Stdlib only."""
    with open(path, "rb") as fh:
        head = fh.read(32)

        if head[:8] == b"\x89PNG\r\n\x1a\n":
            return struct.unpack(">II", head[16:24])

        if head[:4] == b"RIFF" and head[8:12] == b"WEBP":
            fh.seek(0)
            data = fh.read()
            if data[12:16] == b"VP8X":
                w = int.from_bytes(data[24:27], "little") + 1
                h = int.from_bytes(data[27:30], "little") + 1
                return w, h
            if data[12:16] == b"VP8 ":
                i = data.index(b"\x9d\x01\x2a") + 3
                w = int.from_bytes(data[i:i + 2], "little") & 0x3FFF
                h = int.from_bytes(data[i + 2:i + 4], "little") & 0x3FFF
                return w, h
            if data[12:16] == b"VP8L":
                b = data[21:25]
                n = int.from_bytes(b, "little")
                return (n & 0x3FFF) + 1, ((n >> 14) & 0x3FFF) + 1

        if head[:2] == b"\xff\xd8":  # JPEG
            fh.seek(2)
            while True:
                marker = fh.read(2)
                if len(marker) < 2 or marker[0] != 0xFF:
                    break
                size = struct.unpack(">H", fh.read(2))[0]
                # SOF0-SOF15, excluding DHT/JPG/DAC
                if 0xC0 <= marker[1] <= 0xCF and marker[1] not in (0xC4, 0xC8, 0xCC):
                    fh.read(1)
                    h, w = struct.unpack(">HH", fh.read(4))
                    return w, h
                fh.seek(size - 2, 1)
    return None, None


def main():
    html_files = [p for p in PUBLIC.rglob("*.html") if "design" not in p.parts]

    urls = set()
    for p in html_files:
        urls.update(re.findall(rf"https://{re.escape(CDN)}[^\"')\s]+", p.read_text(encoding="utf-8")))

    if not urls:
        print("No CloudFront URLs left — already self-hosted. Nothing to do.")
        return

    print(f"Found {len(urls)} unique image(s) on {CDN}\n")
    IMGDIR.mkdir(parents=True, exist_ok=True)

    mapping = {}   # cdn url -> (local filename, width, height)
    for url in sorted(urls):
        stem = url.rsplit("/", 1)[-1]
        ext = os.path.splitext(stem)[1] or ".png"
        key = next((v for k, v in NAMES.items() if k in stem), None)
        # Fall back to a STABLE digest of the URL. Python's built-in hash()
        # is salted per process, so using it here would rename every file
        # on a re-run and orphan the ones already downloaded.
        digest = hashlib.sha1(url.encode()).hexdigest()[:8]
        name = (key or f"img-{digest}") + ext
        dest = IMGDIR / name

        if dest.exists():
            print(f"  have    {name}")
        elif DRY:
            print(f"  would download  {name}   <- {url[:60]}...")
            mapping[url] = (name, None, None)
            continue
        else:
            print(f"  downloading {name} ...", end=" ", flush=True)
            try:
                req = urllib.request.Request(url, headers={"User-Agent": "grandeza-selfhost/1.0"})
                with urllib.request.urlopen(req, timeout=60) as r:
                    dest.write_bytes(r.read())
                print(f"{dest.stat().st_size:,} bytes")
            except Exception as exc:
                print(f"FAILED ({exc}) — leaving this URL as-is")
                continue

        w, h = dimensions(dest)
        mapping[url] = (name, w, h)
        if w:
            print(f"          {w} x {h}")

    if DRY:
        print("\nDry run — no files written.")
        return

    print("\nRewriting references...")
    for p in html_files:
        src = p.read_text(encoding="utf-8")
        out = src
        for url, (name, w, h) in mapping.items():
            # og:image / twitter:image need an absolute URL
            out = out.replace(f'content="{url}"', f'content="{SITE}/img/{name}"')
            # CSS url() and <img src> can be root-relative
            out = out.replace(url, f"/img/{name}")

        # Give every <img> explicit dimensions so the browser reserves space
        def add_dims(m):
            tag = m.group(0)
            if "width=" in tag:
                return tag
            src_m = re.search(r'src="/img/([^"]+)"', tag)
            if not src_m:
                return tag
            for name, w, h in mapping.values():
                if name == src_m.group(1) and w:
                    return tag[:-1].rstrip() + f' width="{w}" height="{h}">'
            return tag

        out = re.sub(r"<img[^>]*>", add_dims, out)

        if out != src:
            p.write_text(out, encoding="utf-8")
            print(f"  updated {p.relative_to(PUBLIC)}")

    left = sum(len(re.findall(CDN, p.read_text(encoding='utf-8'))) for p in html_files)
    print(f"\nDone. Remaining {CDN} references: {left}")
    print("Next:  git add -A && git commit -m 'perf: self-host images' && git push")


if __name__ == "__main__":
    main()
