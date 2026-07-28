# Grandeza — CRO Landing Page (HVAC & Plumbing)

Reference file: [`/landing.html`](../landing.html) · Self-contained, theme-aware, responsive, accessible.
A focused, single-goal conversion page — distinct from the brand homepage (`index.html`).

## Conversion goal
**One macro-conversion: claim the free Grandeza Risk Scan.** Every CTA on the page points to
the same `#scan` action. Nothing competes with it.

## Page structure & the CRO principle behind each block

| # | Section | CRO / persuasion principle |
|---|---|---|
| 0 | **Announcement bar** — "8 slots this cohort · Free scan" | *Scarcity* + free-value framing, above everything |
| 1 | **Hero** (photo + headline + dual CTA + rating) | *Clarity in 5s* (who/what/why/CTA); directional cue (technician faces copy); *loss aversion* in the headline |
| 1a | **Hero micro-copy** — "No code access · 3 min · No card" | *Friction reduction* — kills the three biggest objections at the point of action |
| 2 | **Trust bar** (TCPA/GDPR, 16-control, binder, timeline) | *Authority / credibility* signals immediately after the hook |
| 3 | **Stat row** ($1,500/text, 3 min, 16× ROI, 0 code) | *Anchoring* (the big damage number) + *specificity = trust* |
| 4 | **Problem/Agitate** (dark band, 3 pains) | *Problem-agitate-solve* — name the buyer's exact situation before selling |
| 5 | **Solution/How** (plumber photo + 4 steps + "88 Protected" badge) | *Effort transparency* (finite, knowable) + *visual proof* of outcome |
| 6 | **Benefits** (6 outcome-first cards) | *Outcome framing* — "peace of mind you hand your insurer," not features |
| 7 | **Social proof** (3 testimonials, score deltas) | *Social proof* + *concreteness* ("38 → 91"); placed right before the offer |
| 8 | **Offer** (free scan, $500 struck to FREE, what's included) | *Price anchoring* + *value stacking* + *risk reversal* |
| 8a | **Clean-Score Guarantee** | *Risk reversal* — removes the "what if it doesn't work" objection |
| 9 | **FAQ** (6 real objections, `<details>`) | *Objection handling* at the moment of highest hesitation |
| 10 | **Final CTA** (dark, repeated offer + scarcity) | *Mere-exposure* + closes on the same single action |
| 11 | **Footer + disclaimer** | Trust housekeeping + honest-signaling (see below) |

## Why these specific choices
- **Full-bleed photographic hero, not an illustration.** In the trades, *real people build
  trust*. The technician reading a text ties the imagery directly to the product's subject
  (SMS/intake). A left-to-right dark gradient keeps the headline legible and doubles as a
  graceful fallback if the photo is blocked.
- **Repeated single CTA.** Four identical "free scan" CTAs down the page (*Hick's Law* — one
  choice), each paired with friction-removing micro-copy.
- **The free scan is the offer, not the sale.** Reciprocity: the buyer gets a real number
  (and their top-3 exposures) before any spend, which also qualifies the lead and creates a
  personalized reason to talk.
- **Honest scarcity.** "8 slots per cohort" is a real capacity constraint for an engagement
  business — credible, not a fake countdown timer.
- **Testimonials use monogram avatars, not AI faces.** We deliberately did **not** generate
  photoreal "customer" headshots — attributing invented quotes to fabricated faces reads as
  deceptive. The quotes are labeled illustrative in the disclaimer and are placeholders for
  the client's real, approved testimonials.
- **"Not a law firm" disclaimer.** Honest-signaling: stating the limit of the service
  paradoxically raises trust with a compliance-savvy buyer, and it's legally necessary.

## Imagery — Higgsfield · Nano Banana 2 (Google)
Two photographs were generated with the **`nano_banana_2`** model (2K), color-graded to the
Grandeza palette (muted teal-charcoal + warm brass):

| Asset | Use | Job ID | Source URL |
|---|---|---|---|
| Hero — HVAC technician w/ phone | Hero background (16:9) | `22a16854-9d83-4216-826b-3fe610a46a47` | `https://d8j0ntlcm91z4.cloudfront.net/user_3F5ssCqR5J7p1iLhp9GPzJjUxk5/hf_20260719_154736_22a16854-9d83-4216-826b-3fe610a46a47.png` |
| Plumber w/ tablet | Solution split section (4:5) | `468934e6-06de-490f-ba99-0738a3554f6a` | `https://d8j0ntlcm91z4.cloudfront.net/user_3F5ssCqR5J7p1iLhp9GPzJjUxk5/hf_20260719_154737_468934e6-06de-490f-ba99-0738a3554f6a.png` |

**Delivery note.** The two URLs above are referenced directly in `landing.html` via CSS
`background-image` (custom properties `--img-hero` / `--img-plumber`). Because they're
`background-image` (not `<img>`), a blocked/expired URL degrades **silently** to the brand
gradient underneath — no broken-image icon. This session's egress policy blocks the
Higgsfield CDN, so the images do **not** render inside the sandboxed artifact preview, but
they **will** load when the page is served from a normal host.

**For production:** download both PNGs, run them through an image pipeline (resize to the
displayed size, export `.webp` + `.jpg` fallback, add `loading="lazy"`), self-host under
`/assets/`, and repoint `--img-hero` / `--img-plumber`. Do not hot-link the CloudFront URLs
long-term — they're generation-output URLs, not a CDN you control.

## Measurement plan (recommended)
- **Primary metric:** free-scan starts / unique visitors.
- **A/B test order (highest leverage first):** (1) hero headline, (2) hero CTA label,
  (3) offer framing ($500→FREE vs "Free · $500 value"), (4) testimonial score deltas.
- **Instrument:** scroll-depth + CTA-click events per section to find the drop-off, plus
  a consent-compliant analytics setup (the site must practice what it preaches).
