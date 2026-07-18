# Grandeza Growth Engine

The content + scan engine behind grandeza.io. Regenerates the 30-day content bank,
SEO package, ad/commercial scripts, and content calendar from structured source data —
so everything stays consistent and versionable instead of living in one-off docs.

## Quickstart

```bash
npm install
node src/build-scripts.js        # 30-day script bank (.docx)
node src/build-seo-ads.js        # SEO package + ads/commercials (.docx)
python3 src/build-calendar.py    # content calendar (.xlsx)
```

Read **CLAUDE.md** first — it carries the brand voice, the verified legal spine, the
16-control scan spec, and the non-negotiable guardrails (esp. the phantom-law warning).

## Structure

```
CLAUDE.md                 # context primer — read before generating anything
TASKS.md                  # what to build next in Claude Code
data/
  controls.json           # the 16-control scan (weights, bands, auto-fails)
  legal-spine.json        # verified laws + phantom-law guardrail
  content-bank.js         # 30 days: hooks, scripts, overlays, LI/FB captions
  instagram-captions.js   # Instagram-adapted captions
  *Instagram*.md          # Instagram strategy + 30-day guide
src/
  build-scripts.js        # → script bank docx
  build-seo-ads.js        # → SEO + ads docx
  build-calendar.py       # → calendar xlsx
scan/                     # scan tool re-host notes (Cloudflare Worker → grandeza.io)
assets/storyboards/       # commercial storyboard frames
reference-outputs/        # last-good build of every deliverable
outputs/                  # your fresh builds land here
```

## Where the deliverables live

The **Notion HQ** "📅 30-Day Content Calendar" database is already populated
(July 20 – Aug 18, 5 AM daily). The Canva smoke-detector graphic, the live-scan
mockup, and the 30-sec commercial b-roll were generated separately and can be
regenerated/iterated from the prompts captured in TASKS.md.
