#!/usr/bin/env python3
"""
Stamp /assets/* references with a content hash so long caching is safe.

public/_headers caches /assets/* for a year with `immutable`, which tells the
browser never to revalidate. The filenames are stable — site.css, consent.js —
so editing one of those files ships a change that returning visitors will not
receive until the cache expires. That is how a consent fix can be "deployed"
and still not be running in anyone's browser.

This rewrites every reference to carry ?v=<sha256[:8]> of the file's contents.
Change the file, the hash changes, the URL changes, the browser fetches it.
Nothing changes for the file on disk, so `immutable` stays correct and fast.

    python3 scripts/stamp-assets.py            # stamp
    python3 scripts/stamp-assets.py --check    # verify, exit 1 if stale (CI)

Stdlib only. Idempotent.
"""

import hashlib
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
CHECK = "--check" in sys.argv


def main():
    hashes = {
        f"/assets/{p.name}": hashlib.sha256(p.read_bytes()).hexdigest()[:8]
        for p in sorted((PUBLIC / "assets").glob("*.*"))
        if p.is_file()
    }
    if not hashes:
        print("No assets found.")
        return 0

    pattern = re.compile(
        r'((?:href|src)=")(/assets/[A-Za-z0-9._-]+)(\?v=[a-f0-9]+)?(")'
    )

    stale, updated = [], []
    for page in sorted(PUBLIC.rglob("*.html")):
        src = page.read_text(encoding="utf-8")

        def repl(m):
            lead, path, _old, tail = m.groups()
            h = hashes.get(path)
            return f"{lead}{path}{tail}" if h is None else f"{lead}{path}?v={h}{tail}"

        out = pattern.sub(repl, src)
        if out != src:
            rel = page.relative_to(PUBLIC)
            if CHECK:
                stale.append(rel)
            else:
                page.write_text(out, encoding="utf-8")
                updated.append(rel)

    if CHECK:
        if stale:
            print("Asset version stamps are stale. Run: python3 scripts/stamp-assets.py")
            for s in stale:
                print(f"::error file=public/{s}::stale ?v= stamp — returning visitors would keep the old asset")
            return 1
        print(f"OK — all /assets/* references carry a current hash ({len(hashes)} assets)")
        return 0

    for path, h in hashes.items():
        print(f"  {path:24} ?v={h}")
    print()
    print(f"Updated {len(updated)} page(s)." if updated else "Already current — nothing to do.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
