# HANDOFF — pick this up in Claude Code

Full state of the Grandeza growth push as of July 18, 2026. Read this + `CLAUDE.md` first.

## Status at a glance

| Item | State |
|---|---|
| Domain standardized to grandeza.io | ✅ done (email `Kai@grandeza.io` in SEO schema) |
| Scan address = **grandeza.io/scan** | ✅ decided + in all CTAs & Service schema |
| Scan Worker mapped to grandeza.io/scan | ⬜ **pending** — Cloudflare step, see `scan/README.md` (Option A) |
| 30-day content bank (LI/FB) | ✅ built (`data/content-bank.js`) |
| SEO package + ads/commercials | ✅ built (`src/build-seo-ads.js`) |
| Content calendar (xlsx) | ✅ built + pushed to Notion HQ |
| Instagram captions (30) | ✅ built + audited (`data/instagram-captions.js`) |
| Instagram publishing wired (Zapier) | ✅ enabled + account authed; **needs per-day visuals** |
| Daily 5 AM posting automation | ⬜ pending — build a scheduled Zap or drive via Claude Code |
| Per-day IG visuals (30) | ⬜ pending — 1 template designed; batch the rest |

## Key IDs / links (for connectors)

- Notion HQ page: `38bc0e942cc181368673fad3644f820c`
- Notion "30-Day Content Calendar" DB: `746b9fac1b854c419006669653fa8320`
  · data source `fc6091b5-253f-4605-a9b8-edc05798f39c` (30 rows, July 20–Aug 18, 5 AM)
- Canva smoke-detector graphic: edit `https://www.canva.com/d/h6zMTJyl8jHMh8r`
- Zapier MCP server: `e0c89434-b9d3-48aa-acb8-0c03115d2227`
- Scan tool (old, to redirect): `https://grandeza-scan.rainmakker247.workers.dev/`

## Instagram posting via Zapier (how it works)

App enabled on the Zapier MCP: **Instagram for Business** (`InstagramBusinessCLIAPI`),
account authenticated. Actions:
- `publish_media_v2` — photo / 1–10 carousel. Params: `media` (public https image URL(s),
  jpg/png/gif), `caption` (≤2,200 chars), optional `tagged_users`, `location`.
- `publish_video` — Reel. Params: `video` (public https URL), `caption`, etc.

To post from Claude Code (with the Zapier connector attached): call
`list_enabled_zapier_actions` → `execute_zapier_write_action` with
`selected_api: InstagramBusinessCLIAPI`, `action: publish_media_v2`, and
`params: { media: [<image url>], caption: <from instagram-captions.js> }`.
**Instagram requires an image/video** — text-only won't post. `media` must be a public URL
(Zapier can't read local files), so host the generated card first (Canva export, Higgsfield
result URL, or your own CDN).

For hands-off daily posting, the cleaner path is a **scheduled Zap** in Zapier's editor:
Schedule trigger (daily 5 AM) → Instagram publish, one Zap per day or a lookup table.

## Per-day visual template (Day 1 prompt, reuse for all 30)

Portrait 4:5, deep navy `#1F2A44`. Top-left "GRANDEZA" wordmark w/ gold underline.
Big white headline + the day's number in gold. Sub-line = the hook. Gold pill tag
"CONTROL NN · <name>". Footer: `grandeza.io/scan · Free Scan`. Swap headline/hook/control
per day from `data/content-bank.js`. Keep text crisp and exactly spelled.

## Guardrails already enforced (keep enforcing)

- No phantom law (SB 149 / Oct 1 deadline) — see `data/legal-spine.json`.
- Only verified legal figures.
- **Never name a live prospect publicly** (removed "Bumble Breeze" from Day 18 IG caption).
- Day-5 IG caption's unverified "10-day clock" was replaced; hold new legal specifics to the
  spine's standard.

## Suggested first prompts in Claude Code

1. "Read CLAUDE.md, TASKS.md, and HANDOFF.md. Summarize what's done and what's left."
2. "Do TASKS #1: give me the exact Cloudflare steps to map the Worker to grandeza.io/scan."
3. "Batch-generate the 30 IG visuals from the Day-1 template + content-bank.js."
4. "Set up the daily 5 AM Instagram Zap and dry-run Day 1."
