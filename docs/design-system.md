# Grandeza.io — Website Design System & Strategy

**Version 1.0 · Developer-ready specification**

This document is the source of truth for the Grandeza.io website: brand foundation,
sitemap, information architecture, visual system (color, type, spacing, motion),
component library, responsive rules, accessibility, conversion strategy, and the
UX-psychology rationale behind each decision. The reference implementation of the
homepage lives in [`/index.html`](../index.html) — a self-contained, theme-aware,
zero-dependency page you can lift into any framework.

---

## 1. Brand foundation

### 1.1 What Grandeza actually is
A **compliance-first hardening service** for the AI, SMS and voice intake that HVAC &
plumbing contractors already run. It does not replace their tech stack; it makes it
*provably legal* under the TCPA (and adjacent GDPR/CCPA obligations). Its three signature
artifacts are:

1. **The Grandeza Score** — a single 0–100 number with a risk band.
2. **The 16-Control Framework** — the diagnostic + remediation checklist.
3. **The Compliance Binder** — a signed, printable audit trail for insurers and lawyers.

### 1.2 Positioning
> *Grandeza turns invisible legal risk into a scored, provable record — before anyone asks for it.*

The name means **grandeur / nobility**. We lean into that literally: the brand system is
built around the metaphor of a **certificate of standing / notary seal** (authority, proof,
permanence) crossed with a **security control-panel** (live monitoring, PASS/FAIL, scores).
This is deliberately *not* the generic SaaS look, and it is defensible because it maps to
what the product literally produces: a seal of compliance.

### 1.3 Brand personality
| Trait | Expressed as |
|---|---|
| **Authoritative** | Serif display type, heraldic seal mark, deep institutional ground |
| **Precise / technical** | Monospace for scores, control codes (`CTRL-01`), audit lines |
| **Calm, not alarmist** | Risk is stated with numbers, not red-splash fear. One dark "stakes" band, then relief |
| **Provable** | Every claim ties to an artifact — a score, a binder, a log |

### 1.4 Voice & copy principles
- **Name the fear the buyer already has, in their words:** *"Your intake bot is talking to customers. Can you prove it's legal?"*
- **Specificity is trust:** "$500–$1,500 per message", "3-minute scan", "16 controls" — concrete beats adjectives.
- **Active, outcome-first CTAs:** "Get your free Grandeza Score", not "Learn more".
- **Never imply legal advice.** Grandeza is compliance *engineering*. This is a legal
  requirement and a positioning asset — see the disclaimer in §9.

---

## 2. Sitemap & information architecture

```
grandeza.io
│
├── / …………………………………… Home (conversion hub) ........................ [BUILT: index.html]
│     Hero (free-score CTA) → Stakes → How it works → Pricing/Doors
│     → 16 Controls → Guardian → Final CTA → Footer sitemap
│
├── /scan ……………………………… Free Grandeza Score  ★ primary conversion
│     Multi-step form (3-min self-assessment) → instant score → book review
│
├── /how-it-works ………………… The 4-stage engagement (Scan·Score·Harden·Prove)
│
├── /product
│     ├── /hardening ………………… Door 1 — harden existing intake ($1,500 + Guardian)
│     ├── /protected-intake ……… Door 2 — Maya turnkey agent ($2,000 + $349/mo)
│     └── /guardian …………………… Ongoing monitoring (from $149/mo)
│
├── /the-16-controls ……………… Framework overview → 16 control detail pages
│     └── /the-16-controls/{consent, audit-trail, rate-limiting, dnc, …}
│
├── /solutions
│     ├── /hvac ………………………… Vertical landing (HVAC dispatch)
│     ├── /plumbing …………………… Vertical landing (plumbing & drain)
│     └── /multi-location ………… Franchise / multi-branch
│
├── /pricing ……………………………… Side-by-side doors + ROI calculator
│
├── /resources
│     ├── /tcpa-101 ………………… Educational (top-of-funnel SEO)
│     ├── /sample-binder ………… Gated PDF (lead capture)
│     └── /blog …………………………… Compliance news + nurture content
│
├── /about ………………………………… Story, "compliance-first not tech-first"
├── /contact ……………………………… Book a scan / talk to Kai
└── /legal/{privacy, terms, disclaimer}
```

**IA rationale (UX psychology):**
- **One dominant path.** The entire site funnels to a single top-of-funnel action — the
  **free scan** — repeated at the hero, mid-page, and final CTA. Reducing the number of
  competing choices lowers decision friction (*Hick's Law*) and concentrates conversion.
- **The scan is a lead magnet, not a sale.** Offering a free diagnostic before asking for
  money exploits *reciprocity* and lowers commitment cost — the buyer gets a number they
  didn't have, and we get a qualified lead + a personalized reason to talk.
- **Two doors, not ten SKUs.** Collapsing the offer into *Hardening* vs *Protected Intake*
  prevents choice paralysis and frames a simple either/or the buyer can hold in their head.

---

## 3. Color system

Neutrals are **hue-biased toward the brass/teal accent**, never pure grey — the palette
reads *chosen*, not defaulted. We deliberately avoid the current AI-design clichés
(warm-cream + terracotta, purple→blue gradient, acid-green-on-black).

### 3.1 Tokens

| Token | Light ("dossier on the desk") | Dark ("control panel at night") | Role |
|---|---|---|---|
| `--bg` | `#e9edec` | `#0a1315` | Page ground (cool teal-grey / deep teal-charcoal) |
| `--bg-tint` | `#e0e6e4` | `#0d191b` | Hero wash, footer |
| `--surface` | `#f5f7f6` | `#10201f` | Cards |
| `--surface-2` | `#ffffff` | `#152826` | Raised / featured cards |
| `--ink` | `#0c1618` | `#e9efec` | Primary text |
| `--ink-soft` | `#42544f` | `#a7bcb6` | Body / secondary |
| `--ink-faint` | `#6b7d78` | `#7d938d` | Captions, meta |
| `--accent` | `#8a6a2e` | `#c9a45e` | **Brass** — interactive/text (darkened on light for contrast) |
| `--seal-1/2` | `#b78f3f` / `#e0c079` | `#c6a15b` / `#8a6a2e` | Seal & primary-button gradient |
| `--link` | `#2e6e6a` | `#5aa9a2` | **Verdigris** — links (supporting hue) |
| `--panel-dark` | `#0b1517` (fixed) | `#0b1517` (fixed) | Bands dark in *both* themes (stakes, final CTA, log) |
| `--fail` | `#c4463a` | Critical / High-Risk score, FAIL |
| `--warn` | `#d68a2e` | At-Risk / Moderate, PARTIAL |
| `--pass` | `#2f8f5b` | Protected, PASS |

**Rationale:**
- **Brass = the seal.** Gold-on-deep-ground is the visual language of notary seals,
  certificates and heraldry — it signals *authority and proof* (the emotional promise) and
  is unusual in SaaS, so it's memorable and ownable.
- **Semantic ≠ accent.** Because the product *is* a PASS/PARTIAL/FAIL scoring system, the
  red/amber/green semantic scale is kept strictly separate from the brass accent. Brass is
  never used to signal status; status colors are never used as decoration. This keeps the
  score legible at a glance (*pre-attentive processing* — color-coded state reads before
  text).
- **Restraint = credibility.** Boldness is spent in one place (the brass seal + the gauge).
  Everything else is quiet, which is what a compliance buyer trusts.

### 3.2 Theming mechanics
Palette is defined as custom properties on `:root`. Dark values are set under
`@media (prefers-color-scheme: dark)` (OS preference) **and** re-declared under
`:root[data-theme="dark"|"light"]` so the in-page toggle overrides the OS in both
directions. Components reference tokens only — never raw hex inside a media query. Contrast
was tuned per theme (e.g. brass darkens to `#8a6a2e` on light to clear WCAG AA on text).

---

## 4. Typography

Three roles, each with a job. The reference file uses robust **system-font stacks** (no
webfont-CDN dependency, which the artifact CSP blocks and which risks silent fallback).
For production, license the display + data faces below and inline them as `@font-face`
`woff2` (self-hosted, not CDN).

| Role | Reference stack (ships today) | Recommended production face | Why |
|---|---|---|---|
| **Display** | `"Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif` | **Newsreader**, **Freight Text**, or **Signifier** | Humanist serif = certificate gravitas, editorial authority |
| **Body** | `-apple-system, "Segoe UI", Roboto, …` | **Söhne**, **Inter**, or **Public Sans** | Neutral, highly legible operator text |
| **Data / utility** | `"SF Mono", "JetBrains Mono", ui-monospace, …` | **JetBrains Mono** or **Söhne Mono** | Monospace = audit log, control codes, tabular scores |

**Type rules:**
- **Fluid scale** via `clamp()`: `--step--1 … --step-hero`. Stay on the scale.
- Headings get `text-wrap: balance` and tight tracking (`-.01em`).
- Body target ~**60–65 characters** (`max-width` in `ch` on paragraphs).
- Uppercase mono labels get `letter-spacing: .12–.18em`.
- All aligned numbers use `font-variant-numeric: tabular-nums` (scores, prices, ledger).

**Rationale:** the serif/mono pairing is the whole personality — *legal document meets
audit terminal*. It's on-subject and distinct from the Inter/Space-Grotesk default. Mono on
the score and control codes makes data *feel* like evidence.

---

## 4a. Photography (Higgsfield · Nano Banana 2)
The homepage revision adds a restrained **editorial photography layer** — kept in the
darker, cinematic "dossier" register (low-key, brass rim-light, teal-charcoal grounds) so it
reads as institutional, not stock-photo warm. Three images, three jobs:

| Asset | Placement | UX rationale | Source URL |
|---|---|---|---|
| **Brass-seal macro** | Faint hero background texture (16% light / 28% dark, masked top-right) | *Ambient authority* — the certificate/seal motif made literal, without competing with the score gauge | `…hf_20260719_160441_f23932d3-…2a.png` |
| **Compliance-binder still-life** | "The proof isn't a promise. It's a binder." feature (image + benefits) | *Concreteness / endowment* — makes the abstract deliverable tangible right before Guardian | `…hf_20260719_160439_d64b858d-…3b.png` |
| **Owner portrait** (low-key) | Full-bleed editorial band with a pull-quote | *Identification / empathy* — a human beat that breaks the light-section run and voices the buyer's brief | `…hf_20260719_160436_71bdfc3d-…75.png` |

**Integration rules that preserve the brand:**
- All three use CSS `background-image` over a brand gradient/ground → a blocked or expired URL
  **degrades silently** (no broken-image icon). This session's egress policy blocks the
  Higgsfield CDN, so images won't render in the sandboxed artifact preview but load on deploy.
- Photography is *supporting*, never the hero — the animated Grandeza Score gauge remains the
  thesis. Images are placed to punctuate rhythm (one dark editorial band amid light sections)
  and to make two abstractions concrete (the seal, the binder).
- **Production:** self-host as `.webp` (+ `.jpg`), resize to displayed size, add
  `loading="lazy"` equivalents, and repoint `--img-seal` / `--img-binder` / `--img-portrait`.
  Full asset table (all generated images + job IDs) is in `docs/social-assets.md`.

## 5. Layout, spacing & grid
- **Container:** `--maxw: 1200px`, fluid side padding `clamp(1.1rem, 4vw, 2.5rem)`.
- **Section rhythm:** `padding-block: clamp(4rem, 9vw, 7.5rem)` — generous vertical
  breathing room signals confidence/premium.
- **Spacing via layout, not margins:** flex/grid + `gap` everywhere; no collapsing-margin
  guesswork.
- **Wide content** (controls grid, log) is capped and wraps; body never scrolls sideways
  (`overflow-x: hidden` on `body`).
- **Grids:** hero `1.05fr / .95fr`; steps 3-up → 1; doors 2-up → 1; controls 4→2→1;
  footer `1.6fr + 4×1fr` → 2-col. All collapse gracefully (see §7).

---

## 6. Component library
Implemented in `index.html`; reuse these primitives across all pages.

| Component | Notes |
|---|---|
| **Header** | Sticky, blur backdrop, condenses (adds hairline) after 8px scroll. Logo + seal, nav, theme toggle, persistent primary CTA. |
| **Seal mark** | 16-point SVG star + checkmark, brass gradient. The logo *is* the compliance seal. |
| **Buttons** | `.btn-primary` (brass gradient, lifts on hover), `.btn-ghost` (outline). Arrow glyph translates on hover (affordance). |
| **Score gauge card** | 270° SVG arc, mono center number, live risk band. The signature artifact — see §8. |
| **Ledger (stakes)** | Two-cell $50k-vs-$3,288 comparison with center "vs" medallion. |
| **Step cards** | Numbered `01–04` with real process order, control-code eyebrow, icon. |
| **Door / pricing cards** | Featured variant with "Start here" ribbon; benefit list with pass-check bullets. |
| **Control chip grid** | 16 chips, `CTRL-NN` + name + PASS square. Generated from a data array — single source of truth. |
| **Guardian log** | Fixed-dark monospace panel, staggered line reveal, ok/fail coloring. |
| **Final CTA** | Fixed-dark card with radial brass glow, dual CTA. |
| **Footer** | Full sitemap (5 columns) — doubles as IA map + SEO internal-linking. |

---

## 7. Responsive strategy
Mobile-first intent, fluid throughout (`clamp()` for type & spacing means few hard
breakpoints needed).

| Breakpoint | Behavior |
|---|---|
| `≤ 940px` | Hero stacks (copy over gauge) |
| `≤ 900px` | Controls grid → 2 col; footer → 2 col |
| `≤ 860px` | Header nav links hide (CTA + toggle persist) |
| `≤ 820px` | Steps & doors → single column |
| `≤ 720px` | Ledger stacks, "vs" medallion hidden |
| `≤ 480px` | Controls → 1 col |

Gauge SVG scales with `width: min(300px, 72vw)`. Touch targets ≥ 38px. No horizontal
scroll at any width.

**Rationale:** contractors and ops managers check phones in the field. The single-column
mobile flow preserves the exact persuasion order (hook → stakes → proof → offer) so the
argument survives the small screen.

---

## 8. Motion & the signature interaction

**Principle:** one orchestrated moment beats scattered effects, and every animation
respects `prefers-reduced-motion` (jumps to end-state, no motion).

### 8.1 The hero gauge — the thesis, animated
On scroll-into-view the Grandeza Score gauge sweeps **0 → 41 ("High Risk", red)**, pauses
to let the baseline land, then **41 → 88 ("Protected", green)**. In one 3-second beat the
visitor *sees the transformation the product sells*: from exposed to provably safe. The
number counts up (mono, tabular), the arc fills, the band label + color change at the
threshold. Reduced-motion users get the `88 / was 41` end-state immediately.

**Rationale:** this is *processing fluency* + *anchoring* in motion. Showing the fix as a
visible before/after is more persuasive than describing it, and it makes the abstract
"score" concrete in the first five seconds — the hero *is* a live demo.

### 8.2 Supporting motion (restrained)
- **Reveal-on-scroll**: content rises + fades via `IntersectionObserver` (staggered, once).
- **Header condense**: hairline appears on scroll — subtle depth cue.
- **Hover micro-interactions**: cards lift + border→brass; button arrows nudge. These are
  *affordances* (signal interactivity), not decoration.
- **Guardian log**: lines stagger in like a live feed — reinforces "always watching".
- **Live-scan pulse dot**: single pulsing dot; the only ambient loop, and it's semantic.

---

## 9. Conversion strategy & UX-psychology map
Every persuasion device on the page, and why it's there:

| Section | Device | Psychological principle |
|---|---|---|
| **Hero headline** | "Can you prove it's legal?" — a question the buyer can't confidently answer | **Loss aversion** + curiosity gap; opens an *open loop* the page then closes |
| **Hero gauge** | Live 41→88 transformation | **Processing fluency**, **anchoring**, demo-in-place |
| **Hero CTA** | "Free Grandeza Score" | **Reciprocity** (free value first), low commitment |
| **"No code access needed"** | Friction-remover under CTA | **Reduces perceived effort** (objection pre-empt) |
| **Trust strip** | "Signed audit trail · Insurance-ready binder" | **Authority / proof** signals above the fold |
| **Stakes band** | $50,000 anchor stated first | **Anchoring** — the big number reframes price |
| **Ledger $50k vs $3,288** | Side-by-side | **Framing / contrast** — the offer looks cheap by comparison |
| **4 steps** | Scan·Score·Harden·Prove | **Goal-gradient / effort transparency** — a knowable, finite process |
| **Two doors** | Featured "Start here" ribbon on Hardening | **Default bias / social proof** ("Most popular") guides the choice |
| **Price sub-lines** | "+ from $149/mo" shown small under one-time fee | **Price partitioning** softens the recurring cost |
| **16 controls, all PASS** | Full grid rendered green | **Completeness heuristic** — thoroughness reads as competence |
| **Guardian log** | Realistic ok/fail events | **Concreteness** — proof it does something ongoing |
| **Disclaimer** | "Not legal advice" | **Honest-signaling** paradoxically *builds* trust |
| **Final CTA** | Repeats the free scan, "No commitment" | **Mere-exposure** + removes last risk |

**Primary macro-conversion:** book/complete the free scan.
**Micro-conversions:** download sample binder, read TCPA-101, compare doors.
**Measurement (recommended):** funnel from hero-CTA click → scan start → scan complete →
review booked. A/B the hero headline and the gauge end-state number first (highest-leverage
elements).

---

## 10. Accessibility
- Semantic landmarks (`header/main/section/footer`), single `h1`, ordered headings.
- Visible `:focus-visible` ring (brass, 2.5px, offset) on every interactive element.
- Color is never the only signal — bands carry text labels; log lines carry ✓/! glyphs.
- Contrast tuned per theme to meet **WCAG AA** for text (brass darkened on light ground).
- `prefers-reduced-motion` fully honored (no gauge sweep, no reveals, no log stagger).
- SVG decorative marks are `aria-hidden`; the gauge has a `role="img"` + label.
- Keyboard-operable throughout; targets ≥ 38px.

---

## 11. Developer notes & build path
- **Ship today:** `index.html` is framework-free, dependency-free, single-file. Drop it on
  any host.
- **Componentize:** the natural component boundaries are the §6 table. In React/Vue/Svelte,
  lift the token block into a global stylesheet or CSS-in-JS theme; render the controls
  grid and Guardian log from data arrays (already structured that way in the script).
- **Fonts:** replace the system stacks with self-hosted `@font-face` (woff2) for the
  §4 production faces. Do **not** load from a font CDN (CSP + FOUT risk).
- **The scan (`/scan`):** build as a multi-step form posting to the existing agent
  backend (the `discovery-coach` / scoring service in `/sales`). The gauge component here
  is reusable to render the *real* result.
- **SEO:** each of the 16 controls and each vertical (`/hvac`, `/plumbing`) is its own
  indexable page; the footer sitemap seeds internal linking. Add `sitemap.xml`,
  JSON-LD `Organization` + `Service` schema, and OG/Twitter meta per page.
- **Analytics/consent:** the site itself must practice what it preaches — cookie-consent
  banner + documented retention. (On-brand proof point.)

---

## 12. Change log
- **1.0** — Initial system: brand foundation, sitemap, color/type/motion tokens, component
  library, conversion map, and reference homepage (`index.html`).
