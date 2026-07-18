# TASKS.md — what to build next

> **Reconstructed draft**, re-authored from the maintainer's description
> (the original was lost along with the rest of `data/`). Treat as a new
> file — confirm scope/status against the real project before acting on it.

## Open tasks

1. **Map the Worker to grandeza.io/scan**
   Point the Cloudflare Worker (see `scan/`) at the production
   `grandeza.io/scan` route so the scan tool is live on the canonical
   domain instead of its dev/preview URL.

2. **Batch the 30 Instagram visuals**
   Generate one templated visual per content-bank day (30 total), following
   the Day-1 visual template, so the month can be scheduled in one batch
   instead of day-by-day.

3. **Set the 5 AM Zap**
   Configure the Zapier automation to publish each day's Instagram post at
   5 AM on schedule, pulling caption + visual from the Notion "📅 30-Day
   Content Calendar" database.

4. **Finish the caption audit**
   Pass every LinkedIn/Facebook/Instagram caption in `data/content-bank.js`
   and `data/instagram-captions.js` back through the phantom-law and
   verified-figures guardrails in `CLAUDE.md` before the batch goes live.

## Not started

- Nevada attorney review of the legal spine before scaling the paid binder
  product (see legal framing note in `src/build-scripts.js`).
