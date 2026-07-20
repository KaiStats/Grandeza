# /img — self-hosted images

Drop the optimized site images here. The HTML references these exact paths:

| File | Source (Higgsfield Nano Banana 2) job | Used by |
|---|---|---|
| `hero-hvac.webp` | `22a16854…` (HVAC tech w/ phone, 16:9) | `landing.html` hero |
| `plumber.webp` | `468934e6…` (plumber w/ tablet, 4:5) | `landing.html` split |
| `dispatcher.webp` | `7b6c3688…` (dispatcher + dashboard, 16:9) | `landing.html` proof band |
| `homeowner.webp` | `83e897cd…` (homeowner greeting, 4:5) | `landing.html` social proof |
| `portrait.webp` | `71bdfc3d…` (owner portrait, 16:9) | `index.html` editorial band |
| `binder.webp` | `d64b858d…` (compliance binder, 3:2) | `index.html` binder feature |
| `seal-macro.webp` | `f23932d3…` (brass seal macro, 16:9) | `index.html` hero texture |
| `og-default.jpg` | `faa99bc3…` (abstract brand, → crop 1200×630) | `og:image` all pages, og-card |

**Download URLs** (each = `https://d8j0ntlcm91z4.cloudfront.net/user_3F5ssCqR5J7p1iLhp9GPzJjUxk5/` + the
`hf_…png` filename) are listed in full in `docs/social-assets.md` and `docs/golive-runbook.md`.

**Optimize:** [squoosh.app](https://squoosh.app) → resize longest edge ~1600px → **WebP q80**.
For `og-default.jpg`, export **JPG** cropped to **1200×630**.

Until these files exist, every page falls back to a clean brand gradient (no broken images).
