# Grandeza.io — Go-Live Runbook (Cloudflare Pages)

A step-by-step checklist to take the site from branch → live. Do the phases in order.
Companion: `docs/deploy-cloudflare.md`.

---

## Phase 1 — Get the code onto your production branch
- [ ] On GitHub, open a Pull Request from `claude/grandeza-website-design-2uuzfi` → `main`.
- [ ] Review and **Merge**. (Or, if you'd rather not merge yet, you can point Cloudflare Pages
      at the feature branch in Phase 4 instead.)

> **Status:** the code side is done — the multi-page site is built (`about`, `pricing`,
> `product/*`, the TCPA pillar, `privacy`, `terms`), images are already repointed to `/img/`,
> internal demos are moved to `/design/`, and nav/footers are wired. What's left for you:
> **drop the optimized image files into `/img/` (Phase 2a–2b), then deploy (Phase 4–6).**

## Phase 2 — Self-host the images  ⚠️ do this before deploy
The photos are hot-linked to the Higgsfield generation CDN, which you don't control.
**2c is already done** (the HTML now points at `/img/…`); you just need to add the files.

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

**2c. Repoint the code — ✅ DONE.** `index.html`, `landing.html` and `design/og-card.html`
already reference `/img/…` (og:image/twitter:image use the absolute `https://grandeza.io/img/og-default.jpg`).
Nothing to do here unless you rename a file.

**2d.** After go-live, uncomment the stricter `Content-Security-Policy` in `_headers`.

## Phase 3 — Keep internal pages private — ✅ DONE
`brand`, `motion`, `seo`, `copy`, `og-card` and `mobile` were moved to `/design/`, and
`robots.txt` now has `Disallow: /design/`. Public routes: `index` (`/`), `landing`, `about`,
`pricing`, `product/*`, `tcpa-compliance-hvac-plumbing`, `privacy`, `terms`.

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

## Phase 7 — Round out the site
Already built: ✅ `/about`, `/pricing`, `/product/{hardening,protected-intake,guardian}`,
✅ the `/tcpa-compliance-hvac-plumbing` pillar (with Article/FAQ/Breadcrumb JSON-LD),
✅ `/privacy` + `/terms` (template — see below), ✅ shared `assets/site.css` + `site.js`,
✅ nav/footer wired across the site.

Still to do (not blocking a first deploy):
- [ ] Build the SEO **cluster** pages (`/tcpa-penalties`, `/tcpa-sms-consent`,
      `/a2p-10dlc-registration`, `/dnc-compliance-contractors`,
      `/appointment-reminder-compliance`) and `/solutions/{hvac,plumbing}` from
      `docs/seo-strategy.md`; reuse `assets/site.css` + the `.prose` layout and embed the
      JSON-LD from `assets/schema/`.
- [ ] **Have counsel complete `/privacy` and `/terms`** — they're structured templates with
      `noindex` set; the disclaimers and data sections need real legal review.
- [ ] Self-host production fonts (`@font-face` woff2) per `docs/design-system.md` §4.
- [ ] Add analytics + a cookie-consent banner (referenced in the privacy policy).
- [ ] Swap illustrative testimonials for genuine, client-approved ones before adding any
      Review/AggregateRating schema.
```
