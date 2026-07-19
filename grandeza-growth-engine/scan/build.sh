#!/usr/bin/env bash
# Regenerate scan/public/index.html — the self-contained animated game that
# gets served at grandeza.io/scan. Compresses the character art (480p video,
# 640px stills) and inlines everything into one file via game/build-inline.mjs.
#
# Needs: node, ffmpeg, and python3 + Pillow. The character art must already be
# in ../assets/characters/ (run ../assets/characters/fetch-characters.sh first).
#
# Usage:  bash build.sh            # rebuilds public/index.html (~4 MB)

set -euo pipefail
cd "$(dirname "$0")"

SRC="../assets/characters"
OUT="$(mktemp -d)"
trap 'rm -rf "$OUT"' EXIT

command -v ffmpeg >/dev/null || { echo "ffmpeg not found (brew install ffmpeg / apt install ffmpeg)"; exit 1; }

echo "→ compressing stills to 640px…"
python3 - "$SRC" "$OUT" <<'PY'
import sys, glob, os
from PIL import Image
src, out = sys.argv[1], sys.argv[2]
for p in glob.glob(os.path.join(src, "*.png")):
    im = Image.open(p).convert("RGBA"); im.thumbnail((640, 640), Image.LANCZOS)
    im.save(os.path.join(out, os.path.basename(p)), optimize=True)
PY

echo "→ compressing clips to 480p…"
for f in "$SRC"/*.mp4; do
  ffmpeg -y -loglevel error -i "$f" -vf "scale=-2:480" -c:v libx264 -crf 26 \
    -preset veryfast -an -movflags +faststart "$OUT/$(basename "$f")"
done

echo "→ inlining…"
node ../game/build-inline.mjs --videos --assets "$OUT"
mkdir -p public
mv ../game/index.inlined.html public/index.html
echo "Wrote scan/public/index.html ($(du -h public/index.html | cut -f1))"
