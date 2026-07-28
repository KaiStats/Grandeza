#!/usr/bin/env bash
# Render the deck to a print-ready 16:9 PDF (13.333in × 7.5in, PPT-native).
# Requires the Chromium that ships with Playwright in this environment.
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CHROME="${CHROME:-/opt/pw-browsers/chromium-1194/chrome-linux/chrome}"
OUT="${1:-$DIR/Grandeza-Newo-Partnership-Proposal.pdf}"

"$CHROME" \
  --headless=new --disable-gpu --no-sandbox --hide-scrollbars \
  --font-render-hinting=none \
  --virtual-time-budget=20000 \
  --no-pdf-header-footer \
  --print-to-pdf="$OUT" \
  "file://$DIR/index.html"

echo "wrote $OUT"
