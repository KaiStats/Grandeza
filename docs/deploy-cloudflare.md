# Deploying Grandeza.io on Cloudflare Pages

The marketing site is static HTML/CSS/JS — a clean fit for **Cloudflare Pages**. This is the
path from "files on a branch" to "live at grandeza.io," plus the gaps to close first.

## TL;DR status
The pages are build-complete but **not yet a deployable, coherent site**. Two blockers must be
fixed before go-live (see §3). Once fixed, Pages deploy is ~10 minutes.

---

## 1. Connect the repo (recommended: Git integration)
1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
2. Pick `KaiStats/grandeza`, production branch `main` (merge the feature branch first) or point
   Pages at `claude/grandeza-website-design-2uuzfi` for a preview.
3. Build settings: **Framework preset = None**, **Build command = (none)**, **Output directory = `/`**
   (static files live at repo root). Every push auto-deploys; PRs get preview URLs.

Alternative (no Git): `npx wrangler pages deploy . --project-name grandeza`.

## 2. Custom domain + canonical host
1. Pages project → **Custom domains → Set up** `grandeza.io` (and `www.grandeza.io`).
2. Cloudflare auto-provisions SSL and forces HTTPS — no config needed.
3. **Canonicalize to the apex** (matches the `og:url`/`<link rel=canonical>` already set to
   `https://grandeza.io/`): dashboard → **Rules → Redirect Rules** →
   `www.grandeza.io/*` → `https://grandeza.io/$1` (301). (A Redirect Rule is more reliable on
   Cloudflare than a cross-host `_redirects` line.)

## 3. Must-fix before go-live
1. **Self-host the images.** The hero/section photos are currently hot-linked to the Higgsfield
   generation CDN (`d8j0ntlcm91z4.cloudfront.net`) — **not a CDN you control; those URLs can
   expire.** Download all 8 (URLs + job IDs in `docs/social-assets.md`), export to `.webp`
   (+ a `.jpg` fallback), drop them in `/img/`, and repoint the CSS custom properties
   (`--img-hero`, `--img-plumber`, `--img-dispatch`, `--img-homeowner`, `--img-seal`,
   `--img-binder`, `--img-portrait`, `--img-og`) and the `og:image`/`twitter:image` meta URLs.
   Then tighten the CSP in `_headers`.
2. **Decide what's public.** These are public pages: `index.html` (`/`), `landing.html`,
   `mobile.html`. These are **internal deliverables** and probably shouldn't be indexed:
   `brand.html`, `motion.html`, `seo.html`, `copy.html`, `og-card.html`. Move them under a
   non-linked path (e.g. `/design/`) and add `Disallow: /design/` to `robots.txt`, or keep them
   out of the Pages output entirely.

## 4. Routing notes
- **`/scan`** is your separately-built page. If it's a **separate Pages project / Worker** on the
  same zone, add it as a route so `grandeza.io/scan` resolves; the site links to it root-relative
  and the Speculation-Rules `prefetch` will warm it. If `/scan` sends `Cache-Control: no-store`,
  the prefetch won't be reused — allow a short cache or `no-cache` instead.
- Clean URLs: Pages serves `landing.html` at `/landing` automatically. To make `/` the home,
  `index.html` at root already handles it.
- `_headers` (this repo) is read natively by Pages for security + caching.

## 5. Still needed for "fully operational"
Deployment ≠ a finished site. Also outstanding:
- A **unified shell** (shared header/footer + nav) and the real routes the copy/SEO plan calls
  for — `/about`, `/pricing`, `/product/*`, the SEO pillar/cluster pages. Today these are copy in
  `docs/website-copy.md`, not built pages.
- **Production fonts** self-hosted as `@font-face woff2` (currently system-stack fallbacks).
- **Analytics + cookie-consent** (the brand promises we practice what we preach).
- **Legal pages** (`/privacy`, `/terms`) — currently placeholder links.
- Replace **illustrative testimonials** with genuine, client-approved ones before adding any
  Review/AggregateRating schema.

## 6. Post-deploy checks
- DevTools → Application → **Speculative loads**: confirm `/scan` prefetches.
- **Lighthouse / CrUX**: verify LCP < 2.5s, INP < 200ms, CLS < 0.1 (add `width`/`height` to any
  `<img>` you introduce).
- **Rich Results Test** on pages once JSON-LD is embedded.
- Submit `sitemap.xml` in Google Search Console.
