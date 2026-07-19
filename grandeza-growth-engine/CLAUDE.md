# CLAUDE.md — Grandeza Growth Engine

This repo is the content + scan engine for **Grandeza**, an AI-governance/compliance
product for service businesses (HVAC/plumbing beachhead, Las Vegas → FL/TX).
Read this file fully before generating or editing anything.

---

## What Grandeza is

An **evidence layer** for AI intake: consent docs, audit trails, a compliance
binder, and a scored 16-control assessment (**the Grandeza Scan**, 0–100).

Funnel: free **TCPA Risk Checker** → free **Grandeza Scan** → paid tiers
($197 Operator Pack → $2k + $349/mo Protected Intake → Guardian).

- Canonical domain: **grandeza.io** (Porkbun registrar, Cloudflare Worker hosting).
  Do NOT use `getgrandeza.com` — abandoned.
- Contact: `Kai@grandeza.io`
- Founder/operator: Kai (handle: Rainmakker247), solo. 15+ yrs safety/compliance/GRC,
  former Clark County investigator. All sales calls solo.

---

## ⚠️ Hard guardrails (do not violate)

1. **No phantom law.** Never reference "Nevada SB 149," an "October 1 deadline," or a
   "$5,000-per-interaction Nevada AI fine." They are fabricated (see
   `data/legal-spine.json`). Nevada's real AI bill died in committee. Multi-state
   AI disclosure is always framed as evergreen "get ahead of it," never a NV deadline.
2. **Only verified legal figures** (the ones in `data/legal-spine.json`). Ad platforms
   reject unverifiable legal claims; so do we.
3. **Not legal advice.** Every deliverable carries that framing. A one-time Nevada
   attorney review is required before scaling the paid binder past two paying clients.
4. **Child-safety / harm rules** still apply to any generated creative.

---

## The Scan (scoring spine) — `data/controls.json`

16 controls, weights sum to 100. Bands: 0–25 Critical · 26–50 Exposed ·
51–75 Developing · 76–90 Defensible · 91–100 Protected. Most shops score **31–58**
first audit. Four **auto-fail** controls (a FAIL on any flags red regardless of total):
**03 TCPA · 09 Recording consent · 01 AI disclosure · 14 Audit trail.**

---

## Voice (how Kai writes — match it)

Short, direct, dollar-and-consequence first. Confident, not hypey. Concrete scenario →
the number → the fix. No corporate throat-clearing, no "in today's fast-paced world,"
no emoji spam. One idea per line. He values strategic honesty over flattery.
Banned: fake urgency, invented stats, "revolutionary/game-changing," hedge-everything
disclaimers longer than the point.

---

## Content bank — `data/content-bank.js`

30 days. Days 1–16 walk all 16 controls heaviest-first (Day 1 = Control 03 TCPA).
Days 17–30 = composites, proofs, founder/brand angles. Each day has: `hook`, `script`
(30–45s VO), `onscreen` overlays, `linkedin`, `facebook`. Instagram captions live in
`data/instagram-captions.js` (+ the two Instagram guide markdown files in `data/`).

Formats: MATH (dollar stack) · AUDIT (live teardown) · EXPLAINER · SCORE (band reveal)
· STORY (founder/recon). The gas-leak story (Control 07) and the smoke-detector metaphor
(Control 14) are signature recurring assets.

---

## Build commands

```bash
npm install                       # docx deps (see package.json)
node src/build-scripts.js         # → Grandeza_30Day_Script_Bank.docx
node src/build-seo-ads.js         # → SEO_Growth_Package.docx + Ads_and_Commercials.docx
python3 src/build-calendar.py     # → 30Day_Content_Calendar.xlsx
```

Outputs land in `outputs/`. Reference copies of the last good build are in
`reference-outputs/`.

---

## Open decisions (see TASKS.md)

1. **Scan address.** RESOLVED — the scan lives at **`grandeza.io/scan`** (a route on the
   main domain, chosen for SEO: keeps the money-page authority on grandeza.io). The Worker
   still needs to be mapped to that route in Cloudflare (see `scan/README.md`, Option A).
   All "Free Scan" CTAs in the deliverables now point to `grandeza.io/scan`.
2. **Instagram posting.** Content is ready; no auto-posting connector is wired yet.
   Options: a Meta/Instagram Graph API integration, or a scheduler (Buffer/Later/Metricool).

## Legal accuracy (verified 2026-07-18 — see CORRECTIONS.md + data/legal-spine.json)
- TCPA one-to-one consent rule = **VACATED** (IMC v. FCC, 11th Cir., Jan 2025). Never say it "took effect." PEWC standard governs.
- Nevada breach notice = "without unreasonable delay," **no 72-hour rule** (72h is GDPR).
- Recording: NRS 200.620 all-party; Lane v. Allstate (1998, phone) + Sharpe v. State (2015, cell/text); Cat. D felony via NRS 193.130.
- Citations live in `data/legal-spine.json`. Anything not verifiable to that standard doesn't ship.
- New to this repo? Read `data/LEGAL_PRIMER.md` first — a plain-English walkthrough of the
  four underlying laws behind the 16 controls, and why the scan uses 16 controls instead of 4.
