# Deploy the scan game to grandeza.io/scan

Serves the "Survive the Audit" game (see `../game/`) at **https://grandeza.io/scan**
as a Cloudflare **static-assets Worker** — no server code, just the one
self-contained page in `public/index.html`.

`public/index.html` is the animated, fully-inlined build (~4 MB: characters +
Seedance clips embedded, no external requests). Regenerate it with `bash build.sh`.

## Prerequisites (one-time)

- The **grandeza.io** zone is active in this Cloudflare account (domain's
  nameservers point at Cloudflare). The domain is registered at Porkbun; the
  zone must be added in Cloudflare for a Worker route to attach.
- Wrangler installed: `npm i -g wrangler` (or `npx wrangler …`).
- You're logged in: `wrangler login` (or set a `CLOUDFLARE_API_TOKEN` with
  Workers + the grandeza.io zone edit permissions).

## Deploy

```bash
cd scan
wrangler deploy
```

That uploads `public/` and attaches the routes in `wrangler.jsonc`
(`grandeza.io/scan` and `grandeza.io/scan/*`). Visit https://grandeza.io/scan.

### ⚠️ Heads-up on the worker name

`wrangler.jsonc` uses `name: "grandeza-scan"` — the **same name** as the existing
worker noted in `../HANDOFF.md`
(`grandeza-scan.rainmakker247.workers.dev`, the "old scan tool"). Deploying will
**overwrite** that worker. If you want to keep the old one, change `name` (e.g.
`grandeza-scan-game`) before deploying. If the old tool was meant to be replaced,
this is exactly right.

## Test locally first

```bash
cd scan
wrangler dev        # serves at http://localhost:8787 — open /scan
```

## Follow-up decision (not blocking)

The game's results screen has a **"Get the real scan →"** button that currently
links to `https://grandeza.io/scan`. Once the game *is* that URL, that link is
self-referential. Point it at wherever the real assessment / booking lives
(e.g. a Calendly, `mailto:Kai@grandeza.io`, or the paid-scan backend) by editing
the CTA `href` in `../game/index.html` and rebuilding (`bash build.sh`).

## What I could not do from here

Going live needs **your** Cloudflare auth and the grandeza.io zone — neither is
available in the build sandbox, so the actual `wrangler deploy` and route
attachment are yours to run. Everything else (the page, the worker config, the
build) is done.
