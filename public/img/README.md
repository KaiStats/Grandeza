# /public/img — site images

**Current state:** the live site loads its photos directly from the Higgsfield CDN
(the `cloudfront.net` URLs in the page CSS + `og:image`). The site is **image-complete with no
upload needed** — and if a CDN URL ever expires, the affected section falls back to a clean
brand gradient (never a broken image).

**Durable follow-up (recommended, not urgent):** self-host the 8 images here so you don't
depend on an external CDN.

1. Download the 8 originals (base `https://d8j0ntlcm91z4.cloudfront.net/user_3F5ssCqR5J7p1iLhp9GPzJjUxk5/` + filename):

| Source `hf_…png` | Save as | Used by |
|---|---|---|
| `…154736_22a16854-….png` | `hero-hvac.webp` | landing hero |
| `…154737_468934e6-….png` | `plumber.webp` | landing split |
| `…155705_7b6c3688-….png` | `dispatcher.webp` | landing proof band |
| `…155707_83e897cd-….png` | `homeowner.webp` | landing social proof |
| `…160436_71bdfc3d-….png` | `portrait.webp` | index editorial band |
| `…160439_d64b858d-….png` | `binder.webp` | index binder feature |
| `…160441_f23932d3-….png` | `seal-macro.webp` | index hero texture + schema logo |
| `…155710_faa99bc3-….png` | `og-default.jpg` (1200×630) | og:image (all pages) |

2. Optimize at [squoosh.app](https://squoosh.app) → WebP q80 (JPEG for the OG one); drop them here.
3. Swap the `cloudfront.net/...png` URLs in `public/index.html`, `public/landing.html`, and the
   `og:image` meta across pages back to local paths (e.g. `/img/hero-hvac.webp`,
   `https://grandeza.io/img/og-default.jpg`). Commit.
