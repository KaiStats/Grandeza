# Legal corrections — 2026-07-18

Three inaccurate legal claims were found in the original content and corrected across the
live files (`data/content-bank.js`, `data/instagram-captions.js`, `data/legal-spine.json`,
`src/build-scripts.js`, `src/build-seo-ads.js`). Verified against current sources.

## 1. TCPA "one-to-one consent rule" — VACATED, not live
The FCC's one-to-one consent rule was struck down by the 11th Circuit in
**Insurance Marketing Coalition v. FCC (Jan 24, 2025)**, three days before it would have
taken effect. It is NOT in force. The pre-2023 **prior express written consent (PEWC)**
standard governs. Removed every "took effect January 2026 / killed shared-lead texting"
claim. Accurate hook: resold/purchased-lead consent is what plaintiffs attack, and 10DLC
carrier registration is still required — but the one-to-one rule itself is dead.

## 2. Nevada breach notice — no 72-hour clock
**NRS 603A.220** requires notice "in the most expedient time possible and without
unreasonable delay" — **no fixed day count**. The "72 hours" figure is GDPR, not Nevada.
Corrected Day 7 content and captions.

## 3. Sharpe v. State — mischaracterized
**Sharpe v. State, 350 P.3d 388 (Nev. 2015)** extended all-party recording consent to
**cell calls and text messages** — it is not a "physical-location test." The all-party rule
for phone calls comes from **Lane v. Allstate, 969 P.2d 938 (Nev. 1998)**. Corrected.

## Verified citation set (see data/legal-spine.json)
- TCPA: 47 U.S.C. § 227; damages §§ 227(b)(3) & 227(c)(5); regs 47 C.F.R. § 64.1200; SOL 28 U.S.C. § 1658
- Recording: NRS 200.620 (all-party wire); penalty NRS 193.130 (Cat. D felony, 1–4 yrs + $5k); NRS 200.650 (in-person, one-party)
- Data: NRS 603A.210 (security), .215 (PCI DSS + encryption), .220 (breach notice), .290 (AG enforcement)
- FTC: 15 U.S.C. § 45

Not legal advice. Nevada attorney review required before scaling the paid product.

## Addendum — 2026-07-18 (this import)

All four citations above (IMC v. FCC, Lane v. Allstate, Sharpe v. State, NRS 603A.220's
"unreasonable delay" standard, NRS 603A.215's PCI DSS requirement, NRS 193.130's Category D
felony range) were independently re-verified via web search against primary/secondary legal
sources before this content was imported — not taken on faith from a prior draft.

Two gaps found in the delivered files and fixed here:
- `data/legal-spine.json` was an **empty file** in the delivered package despite being cited
  as the source of truth. Rewrote it from scratch with the verified citation set above.
- `data/content-bank.js` Day 27's `facebook` field still asserted the vacated one-to-one
  consent rule as live law ("since January 2026, you can't text a lead who agreed to be
  contacted by 'up to 5 companies'... basically illegal now"), contradicting the corrected
  `hook`/`script`/`linkedin` fields on the same day. Corrected to match.
- `data/instagram-captions.js` (added in a prior turn, before these corrections existed)
  still had the old "72 hours to prove you told them" (Day 7) and "One-to-One Consent...
  Jan 2026" (Day 27) claims in its hooks/hashtags/captions. Corrected to match the spine.
