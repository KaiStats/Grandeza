# Grandeza.io — Go-Live Runbook (Cloudflare Pages)

A step-by-step checklist to take the site from branch → live. Do the phases in order.
Companion: `docs/deploy-cloudflare.md`.

---

## Phase 1 — Get the code onto your production branch
- [ ] On GitHub, open a Pull Request from `claude/grandeza-website-design-2uuzfi` → `main`.
- [ ] Review and **Merge**. (Or, if you'd rather not merge yet, you can point Cloudflare Pages
      at the feature branch in Phase 4 instead.)

## Phase 2 — Self-host the images  ⚠️ do this before deploy
The photos are currently hot-linked to the Higgsfield generation CDN, which you don't control.
Move all 8 into `/img/` and repoint.

**2a. Download** — each URL is `https://d8j0ntlcm91z4.cloudfront.net/user_3F5ssCqR5J7p1iLhp9GPzJjUxk5/` + the filename below.

| # | Download filename | Save as | Used by |
|---|---|---|---|
| 1 | `hf_20260719_154736_22a16854-9d83-4216-826b-3fe610a46a47.png` | `img/hero-hvac.webp` | landing `--img-hero` |
| 2 | `hf_20260719_154737_468934e6-06de-490f-ba99-0738a3554f6a.png` | `img/plumber.webp` | landing `--img-plumber` |
| 3 | `hf_20260719_155705_7b6c3688-524e-4e8c-ab92-24c2bb6da4d3.png` | `img/dispatcher.webp` | landing `--img-dispatch` |
| 4 | `hf_20260719_155707_83e897cd-2825-4e4a-9c4e-de918eb3bf5a.png` | `img/homeowner.webp` | landing `--img-homeowner` |
| 5 | `hf_20260719_155710_faa99bc3-8d80-4625-84a4-26af15c9a3b1.png` | `img/og-default.jpg` | og:image (index+landing), og-card |
| 6 | `hf_20260719_160436_71bdfc3d-b2d2-4665-bda2-02e7c670d075.png` | `img/portrait.webp` | index `--img-portrait` |
| 7 | `hf_20260719_160439_d64b858d-9669-4d2e-be0d-811f9f14dc3b.png` | `img/binder.webp` | index `--img-binder` |
| 8 | `hf_20260719_160441_f23932d3-bfa8-49f4-9d18-048efaf86d2a.png` | `img/seal-macro.webp` | index `--img-seal` |

**2b. Optimize** — at [squoosh.app](https://squoosh.app) (no install): drag each in, resize
longest edge to ~1600px, export **WebP quality ~80**. For #5, export **JPG**, ideally cropped to
**1200×630** (social share ratio). Put all files in a new `/img/` folder at the repo root.

**2c. Repoint the code** — in `index.html`, `landing.html`, `og-card.html`, replace each full
`https://…cloudfront.net/…/hf_….png` URL with its new path:
- CSS background vars (#1–4, 6, 7, 8) → root-relative, e.g. `--img-hero:url("/img/hero-hvac.webp")`.
- **`og:image` and `twitter:image` (#5) must be ABSOLUTE** (social crawlers require it):
  `https://grandeza.io/img/og-default.jpg`.
- `og-card.html` `--img-og` (#5) → `/img/og-default.jpg` (root-relative is fine here).

**2d.** After go-live, uncomment the stricter `Content-Security-Policy` in `_headers`.

## Phase 3 — Keep internal deliverable pages private
`brand.html`, `motion.html`, `seo.html`, `copy.html`, `og-card.html` are internal — don't ship
them as public routes.
- [ ] Create a `design/` folder and move those 5 files into it, **and**
- [ ] Add `Disallow: /design/` under `User-agent: *` in `robots.txt`.
(Public pages that stay at root: `index.html`, `landing.html`, `mobile.html`.)

## Phase 4 — Deploy on Cloudflare Pages
- [ ] Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
- [ ] Select `KaiStats/grandeza`, production branch `main` (or the feature branch).
- [ ] Build settings: **Framework preset: None** · **Build command: (blank)** · **Output directory: `/`**.
- [ ] **Save and Deploy.** You'll get a `*.pages.dev` preview URL — open it and click through.

*(CLI alternative: `npx wrangler pages deploy . --project-name grandeza`.)*

## Phase 5 — Custom domain + canonical host
- [ ] Pages project → **Custom domains → Set up** → add `grandeza.io` and `www.grandeza.io`
      (Cloudflare auto-issues SSL + forces HTTPS).
- [ ] Canonicalize to the apex (matches the `canonical`/`og:url` already set):
      dashboard → **Rules → Redirect Rules** → if hostname = `www.grandeza.io`,
      redirect to `https://grandeza.io/${http.request.uri.path}` (301).

## Phase 6 — Verify
- [ ] `grandeza.io` loads; theme toggle works; every "Get my free score" goes to `grandeza.io/scan`.
- [ ] All images load (they're from `/img/`, not cloudfront).
- [ ] DevTools → Application → **Speculative loads**: `/scan` shows as prefetched.
      (If not: make sure `/scan` doesn't send `Cache-Control: no-store`.)
- [ ] Paste the site into [opengraph.xyz](https://www.opengraph.xyz) — the share card shows.
- [ ] Run **Lighthouse** (mobile): aim LCP < 2.5s, INP < 200ms, CLS < 0.1.
- [ ] Google Search Console → add property → submit `https://grandeza.io/sitemap.xml`.

## Phase 7 — Round out the site (after it's live)
Not blocking, but needed for a "complete" site (copy is written in `docs/website-copy.md`):
- [ ] Build `/about`, `/pricing`, `/product/{hardening,protected-intake,guardian}` as real pages.
- [ ] Build the SEO pillar/cluster pages from `docs/seo-strategy.md`; embed the JSON-LD from
      `assets/schema/`.
- [ ] Self-host production fonts (`@font-face` woff2) per `docs/design-system.md` §4.
- [ ] Add analytics + a cookie-consent banner.
- [ ] Replace placeholder legal links with real `/privacy` and `/terms`.
- [ ] Swap illustrative testimonials for genuine, client-approved ones before adding any
      Review/AggregateRating schema.
```
