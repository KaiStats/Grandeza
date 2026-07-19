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
# Note: these are time-limited CDN URLs from the generation run on 2026-07-19.
# If any 403/expire, re-open the generation in Higgsfield and copy fresh URLs,
# or regenerate from the prompts in ../../game/CHARACTERS.md.

set -euo pipefail
cd "$(dirname "$0")"

base="https://d8j0ntlcm91z4.cloudfront.net/user_3F5ssCqR5J7p1iLhp9GPzJjUxk5"

dl () { echo "→ $2"; curl -fSL "$1" -o "$2"; }

dl "$base/hf_20260719_031629_c4a9c21c-1f45-479e-8a4b-fcbbf546d611.png" "guardo.png"
dl "$base/hf_20260719_031632_667a87d8-0cbb-436b-95f5-d4b9d43042a7.png" "robotexter.png"
dl "$base/hf_20260719_031635_9e172803-da4a-4832-9a8b-22b13149847e.png" "phantom-bot.png"
dl "$base/hf_20260719_031639_78f80aff-21de-47c5-959e-09ca0d8baeeb.png" "sneaky-pete.png"
dl "$base/hf_20260719_031642_def163d9-c5bc-4b76-9163-31ba5340c1d0.png" "the-shredder.png"
dl "$base/hf_20260719_032741_1bd0f6a1-1195-456e-9d9c-6eaac8b36b40.mp4" "guardo-intro.mp4"

echo
echo "Done. The game (game/index.html) auto-detects these files and shows the"
echo "cast; without them it falls back to the text UI. Commit them once fetched."
