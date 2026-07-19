# Grandeza — Image assets, /scan funnel & social share cards

Covers everything added in the funnel/social pass: the five Higgsfield images, the
`/scan` lead-capture page, and the Open Graph setup.

## 1. Generated imagery — Higgsfield · Nano Banana 2 (Google, 2K)
All five graded to the Grandeza palette (muted teal-charcoal + warm brass).

| Asset | Ratio | Used in | Job ID | Source URL |
|---|---|---|---|---|
| HVAC tech w/ phone | 16:9 | `landing.html` hero, `index.html` (ref) | `22a16854-…46a47` | `https://d8j0ntlcm91z4.cloudfront.net/user_3F5ssCqR5J7p1iLhp9GPzJjUxk5/hf_20260719_154736_22a16854-9d83-4216-826b-3fe610a46a47.png` |
| Plumber w/ tablet | 4:5 | `landing.html` solution split | `468934e6-…554f6a` | `https://d8j0ntlcm91z4.cloudfront.net/user_3F5ssCqR5J7p1iLhp9GPzJjUxk5/hf_20260719_154737_468934e6-06de-490f-ba99-0738a3554f6a.png` |
| Dispatcher + dashboard | 16:9 | `landing.html` proof band | `7b6c3688-…24d3` | `https://d8j0ntlcm91z4.cloudfront.net/user_3F5ssCqR5J7p1iLhp9GPzJjUxk5/hf_20260719_155705_7b6c3688-524e-4e8c-ab92-24c2bb6da4d3.png` |
| Homeowner greeting tech | 4:5 | `landing.html` social-proof portrait | `83e897cd-…8a5a` | `https://d8j0ntlcm91z4.cloudfront.net/user_3F5ssCqR5J7p1iLhp9GPzJjUxk5/hf_20260719_155707_83e897cd-2825-4e4a-9c4e-de918eb3bf5a.png` |
| Abstract brand / seal | 16:9 | OG image (all pages), `og-card.html` bg | `faa99bc3-…26a3b1` | `https://d8j0ntlcm91z4.cloudfront.net/user_3F5ssCqR5J7p1iLhp9GPzJjUxk5/hf_20260719_155710_faa99bc3-8d80-4625-84a4-26af15c9a3b1.png` |

**All photo references use CSS `background-image`** with a brand gradient underneath, so a
blocked/expired URL degrades silently to the gradient (no broken-image icon). This session's
egress policy blocks the Higgsfield CDN, so images don't render in the sandboxed artifact
preview — they load normally on a deployed host.

**Production:** download all five, resize to displayed dimensions, export `.webp` (+ `.jpg`
fallback), self-host under `/assets/`, and repoint the CSS custom properties
(`--img-hero`, `--img-plumber`, `--img-dispatch`, `--img-homeowner`, `--img-og`) and the
`og:image` / `twitter:image` meta URLs. Don't hot-link the CloudFront generation URLs
long-term.

## 2. The scan — external, at `grandeza.io/scan`
The Grandeza Score scan is owned and built separately and lives at the production URL
**`grandeza.io/scan`**. The marketing site does **not** host a scan form or capture scan data.

- **CTAs across the site** (`index.html`, `landing.html`, `mobile.html`) link to `/scan`,
  making the free scan the single macro-conversion. Because the site deploys on the same
  domain, root-relative `/scan` resolves to `grandeza.io/scan`.
- The earlier bundled demo funnel (`scan.html`) was **removed** — the real page supersedes it.
- The `og:url` for the scan page (`grandeza.io/scan`) is already listed in `sitemap.xml`.

## 3. Open Graph / social share
- **Meta tags** added to `index.html`, `landing.html` (og:title/description/
  image + `twitter:card=summary_large_image`). Each page has page-specific title/description.
- **`og:image`** currently points to the abstract brand image (2752×1536, ratio 1.79 — valid
  for OG). For a text-on-card share image, use `og-card.html`:
- **`og-card.html`** is a pixel-locked **1200×630** render target: brand background +
  headline + seal + trust chips, crisp vector text. Render `#ogcard` to `og-default.jpg`
  with any HTML-to-image tool (Playwright `page.locator('#ogcard').screenshot()`,
  `html-to-image`, or Vercel OG / Satori), host it, and swap the `og:image` URLs to it.
  Per-page variants: duplicate the card, change the headline, export `og-{page}.jpg`.

## 4. Files
```
og-card.html           # 1200×630 social-card render target
docs/social-assets.md  # this file
landing.html           # proof band, homeowner portrait, OG meta, CTAs → /scan
index.html             # OG meta, CTAs → /scan
```
(The scan lives at grandeza.io/scan — not in this repo.)
