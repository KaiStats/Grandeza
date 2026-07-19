# Grandeza — Brand Identity System

**Audience:** HVAC & plumbing contractors and service-business owners/operators.
Visual brand book: [`/brand.html`](../brand.html). This doc is the written source of truth for
marketers, writers and developers. It aligns with the tokens already live across
`index.html`, `landing.html`, `scan.html`, `mobile.html` and the motion system.

---

## 1. Foundation
- **Essence:** *Certified protection.* Every expression should feel like being handed a
  signed, sealed document that says *you did this right.*
- **Positioning:** For HVAC & plumbing shops that automated their intake, Grandeza is the
  compliance partner that makes your existing SMS, calls and AI **provably legal** — because
  we're compliance-first, not another tech tool.
- **Promise:** *We turn invisible risk into a seal you can hand your insurer.*
- **Personality (4 traits):** Authoritative *(not stuffy)* · Calm *(not alarmist)* · Precise
  *(not vague)* · On your side *(not a vendor)*.
- **The name:** *Grandeza* = grandeur / nobility. We lean into heraldry and certification —
  seals, standing, proof — which maps to what the product literally produces.

---

## 2. Logo & mark
- **The mark:** a **16-point heraldic seal** holding a checkmark. Sixteen points is meaningful
  — it stands for the 16-control framework. It's a certificate stamp for the digital age.
- **Wordmark:** "Grandeza" in the display serif, weight 600, tight tracking.
- **Lockups:** horizontal (primary), stacked (tight spaces), mark-only (avatars/favicons),
  wordmark-only (rare).
- **Color treatments:** brass-on-light (primary), reversed brass-on-ink, mono ink, mono
  seal-on-brass. The checkmark stroke matches the ground it sits on.
- **Clearspace:** ≥ the height of the seal's checkmark on all sides.
- **Minimum size:** mark 24px / 0.25in; full lockup 120px / 1in wide.
- **Don'ts:** don't recolor the seal, stretch/skew it, add effects, rotate it, place it on
  low-contrast or busy backgrounds, or box it unnecessarily.
- **Files:** SVG for digital (vector mark), PNG @1×/2×/3× for raster avatars, one-color
  version for embossing/fax/single-color print.

---

## 3. Color palette
Deep institutional ground + one heraldic brass accent + a strictly separate semantic scale.
Neutrals are hue-biased toward the accent (chosen, not default grey).

| Name | Hex | Role |
|---|---|---|
| **Ink · Deep Slate Teal** | `#0C1618` | Primary dark — text, ink bands |
| **Brass · Certified Gold** | `#C6A15B` (grad `#E0C079→#B78F3F`) | The seal · accent of proof |
| **Brass Deep** | `#8A6A2E` | Brass as text on light (clears WCAG AA) |
| **Verdigris · Patina** | `#2E6E6A` | Secondary — links, depth |
| **Paper · Dossier** | `#E9EDEC` | Light ground (cool, deliberately not cream) |
| **Pass** | `#2F8F5B` | Semantic — PASS / Protected |
| **Warn** | `#D68A2E` | Semantic — PARTIAL / At Risk |
| **Fail** | `#C4463A` | Semantic — FAIL / High Risk |

**Rules:** ~**60% neutral / 26% ink / 10% brass / 4% semantic**. Brass is an *accent of proof*,
never a background. Semantic colors signal status only — never decorative — and **brass is
never used to signal status** (keeps the score legible pre-attentively). Full dark-theme token
set ships in every page's `:root`.

---

## 4. Typography
A three-voice system:
| Role | Reference stack (ships) | Production face | Use |
|---|---|---|---|
| **Display · Serif** | Iowan/Palatino class | Newsreader / Freight Text / Signifier | Headlines, wordmark, pull-quotes. Weight 600, tight tracking. Never body. |
| **Body · Sans** | system UI sans | Söhne / Inter / Public Sans | Operator-legible body, ~60–65 chars/line |
| **Data · Mono** | SF Mono / JetBrains Mono | JetBrains Mono | Scores, control codes, timestamps, labels. Tabular numerals; uppercase labels .12–.18em tracking |

The **serif × mono pairing is the personality**: legal document meets audit terminal. License
+ self-host production faces as `@font-face woff2` (no font-CDN — CSP + FOUT risk).

---

## 5. Voice & tone
We sound like a sharp operator who knows compliance cold, talking to another operator across a
truck hood. **Plain, specific, calm, on their side.** Never a law firm; never fear-mongering.

**Say / Don't say**
| Say | Not |
|---|---|
| "Prove it. Here's the signed record." | "Trust us, you're covered." |
| "A 12-minute scan of your shop." | "Comprehensive compliance assessment solution." |
| "Your crew, your shop, your call." | "SMBs / users / stakeholders." |
| "One text can cost you five figures." | "Are you TERRIFIED of lawsuits?!" |
| "We harden what you already run." | "Rip out your stack and start over." |
| "Not legal advice — compliance engineering." | "Guaranteed legal protection." |

**Tone by context:** Educating → *patient teacher* · Selling → *quiet confidence* (let anchors
and specifics persuade) · Support → *steady hand* · Legal/disclaimer → *plain & honest*.

**Style rules:** active voice; specific numbers over adjectives; short sentences under
pressure; contractions ok; no exclamation-mark hype; the word "shop/operator/crew," not
"business/user"; always keep the "not legal advice" disclaimer (it's true and it builds trust).

---

## 6. Messaging framework
- **Tagline:** **Prove your intake is compliant.**
  Alternates: "Compliance you can hand your insurer." · "From High Risk to Protected."
- **One-liner:** Grandeza hardens the AI, SMS and voice intake HVAC & plumbing shops already
  run — turning invisible TCPA risk into a scored, provable compliance record.
- **Boilerplate:** Grandeza is a compliance-first company that hardens customer intake for HVAC
  & plumbing contractors. Its 16-control framework scores a shop's TCPA exposure, remediates
  the gaps in the tools they already use, and delivers an insurance-ready compliance binder.
  Grandeza is compliance engineering, not legal advice.
- **Value pillars:** **Provable** (signed audit trail + binder) · **Practical** (harden the
  existing stack, 4 weeks) · **Protective** (insurance-ready, lowers E&O) · **Measurable** (one
  0–100 Grandeza Score).
- **By persona:**
  - *Owner* → "Protect the business you built. One number, one document you can hand anyone."
  - *Ops Manager* → "Turnkey, no downtime, one searchable log."
  - *Cost-focused* → "One complaint ≈ $50k. Grandeza ≈ $3.3k/yr. A 16× hedge."
- **Proof points:** 16-control framework · signed consent + immutable audit trail · DNC
  screening · insurance-ready binder · free 12-minute scan · works on your existing Twilio/CRM.

---

## 7. Visual language
- **Seal motif:** the brass seal is our proof-stamp — used sparingly as punctuation, a
  certification moment, never wallpaper. Embossed seal macro = signature texture.
- **Iconography:** line icons, 1.7px stroke, rounded joins, minimal — shield, check, gauge,
  document, lock (the vocabulary of protection + proof).
- **The Grandeza Score gauge:** a 270° gauge is a brand asset — mono numerals, semantic band
  color, one cinematic sweep. It *is* the product, visualized.
- **Photography:** cinematic, low-key, teal-charcoal + brass grade; real tradespeople with
  dignity, never cheesy stock. (See the Nano Banana 2 library in `docs/social-assets.md`.)
- **Patterns/texture:** faint blueprint/audit grid + embossed seal, always low-contrast behind
  content.
- **Layout:** generous whitespace = confidence; control-code eyebrows (`CTRL-01`); dossier-like
  sectioning; data presented as evidence.

---

## 8. Applications
Business card (ink ground, brass seal), social avatars (circle/square, brass or reversed),
"Grandeza Certified · 88 · Protected" score **badge** (ties brand to product — a shareable
trust asset for customers' own sites), email signature, letterhead corner seal, the compliance
binder cover. The badge is a growth lever: certified shops display it, which markets Grandeza.

---

## 9. Governance
- One token system across product + marketing (defined in each page's `:root`).
- The mark, palette and type here are canonical — changes go through brand review.
- Always ship the disclaimer; never emit fabricated review/rating markup (SEO integrity, and
  brand honesty).
