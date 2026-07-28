# Newo compliance readout — what it is and how to use it

**Artifact:** [`public/readout/newo.html`](../public/readout/newo.html) → ships at `grandeza.io/readout/newo`
**Reference:** `GZ-RO-2026-0728-NEWO` · rev 1 · sample
**Audience:** Newo.ai, partnership conversation. Shareable in a channel before the call.

A working, co-branded compliance readout for a real HVAC use case: an AI receptionist that
answers, books and follows up, scored against Grandeza's 16-control framework plus a
four-control voice-AI overlay. The point of the artifact is that it already exists — the call
is about whether Newo wants it in the channel, not whether we can produce one.

---

## 1. What's in it

| Section | What it does |
|---|---|
| Masthead + doc meta | Cover plate (guilloche security engraving) with reference number, scope, framework, basis, classification |
| The calling card | The Scan reads **any** chatbot, voice agent, chat widget, dialer or in-house LLM intake — this run just happens to be a voice agent. CTA to `/scan` |
| Score band | Two 270° gauges — **41 High Risk → 88 Protected** — computed live from the control data |
| **Point-loss waterfall** | Every control's weight × shortfall, sorted. The standout chart: four controls are 48% of the 59-point gap |
| Executive readout | Five findings, ordered by how fast each becomes a demand letter |
| **Incident timeline** | Six events over 22 days, one customer — each marker a control decision made unasked |
| **Control grid** | All 20 scored in one glance, status printed in every cell |
| **Exposure chart** | Statutory ceilings vs. the realistic settlement band, on one shared dollar axis |
| **Remediation slope** | 41 → 88 by week over the Grandeza risk bands |
| The call | Annotated transcript: a 9:48pm no-heat call, the follow-up, and the reactivation dial 19 days later. Each annotation points at a control |
| Controls | All 20 scored, filterable (All / Fail / Partial / Pass / overlay), with finding + fix per row |
| Exposure | Four models with every input visible, plus a realistic settlement band next to the statutory ceiling |
| Fix | Before/after flow code, the greeting change, the revocation-capture block, 4-week plan |
| Platform argument | Why this is Newo's problem to solve once rather than each tenant's to solve badly |
| Regulatory basis | Eight citations with dates and plain-language meaning |
| The ask | Three options — sales asset, integration, certified tenants — smallest first |

## 2. The scoring model is real, not decorative

Everything numeric on the page derives from the `CONTROLS` array in the page's own script.
Each control carries a weight (summing to 100), a current score and a target score. The
headline gauges, the PASS/PARTIAL/FAIL tallies, the per-row bars and the footer totals are all
computed from that array at load.

```
score = Σ(control score × weight) ÷ 100
bands: 0–44 High Risk · 45–69 At Risk · 70–84 Hardened · 85–100 Protected
status: ≥80 PASS · 40–79 PARTIAL · <40 FAIL
```

Weights reflect statutory exposure rather than remediation effort — Consent, DNC and the four
overlay controls carry 55 of 100. **Editing one score in the array re-scores the whole
document.** That's the intended way to retarget this readout at a named tenant: replace the
findings and scores, and the gauges follow.

Current model: **41 → 88**, 8 FAIL / 9 PARTIAL / 3 PASS across 20 controls.

## 3. The voice-AI overlay (VA-01 … VA-04)

The 16 controls are the standing framework. The four `VA-` controls are new here, and they're
the commercial argument — they only exist because the receptionist is a model:

| ID | Control | Why it's not in any CRM checklist |
|---|---|---|
| **VA-01** | AI Identity Disclosure | An artificial voice must be disclosed at the start of the call in CA (AB 2905), with more states following |
| **VA-02** | Recording & Monitoring Consent | The agent records by design; all-party-consent states make that actionable without notice |
| **VA-03** | In-Conversation Revocation | A spoken "stop calling me" is a valid revocation. Agents acknowledge it and write nothing |
| **VA-04** | Calling Window & Time-Zone Guard | Outbound schedulers dial in shop-local time, not recipient-local time |

VA-03 is the finding to lead with on the call. It is cheap to fix, impossible to argue with,
and the transcript that proves the shop heard the revocation is produced by the platform itself.

## 3b. Charts and imagery

**All five charts are inline SVG rendered from `CONTROLS`** — no chart library, nothing hardcoded.
Change a control score and the waterfall re-sorts, the grid re-colors and the note recomputes its
"top four = N%" claim. The charts follow the house data-viz rules: hairline solid gridlines, ≤24px
marks with 4px rounded data-ends, ≥8px markers with a 2px surface ring, selective direct labels
(top five on the waterfall, endpoints only on the slope), one axis, never two.

**The status palette was validated, not eyeballed**, and it came back with two warnings that shaped
the design:

- amber↔green sit at ΔE 7.5 under protanopia — inside the 6–8 floor band, legal *only* with
  secondary encoding;
- amber is 2.72:1 against the light surface — below 3:1, so visible labels are required.

So **no mark anywhere encodes status by color alone.** Every waterfall bar, grid cell and timeline
marker carries its status in text. (The grid originally printed `status.charAt(0)`, which rendered
both PARTIAL and PASS as "P" — that collapsed the label channel and is fixed to FAIL/PART/PASS.)

**Imagery** is wired through seven CSS custom properties in `:root` — `--img-cover`, `--img-strata`,
`--img-seal`, `--img-tech`, `--img-dispatch`, `--img-homeowner`, `--img-plumber`. Three are the
Higgsfield brand plates generated for this document (guilloche security engraving, archival paper
strata, blank 16-point seal medallion, all prompted in the exact Grandeza palette); four are the
existing `/scan` character library documented in `social-assets.md`. Every one is a
`background-image` layered over a brand gradient, so a blocked or expired URL degrades silently to
the gradient rather than showing a broken-image icon. To self-host later, repoint those seven
properties and change nothing else.

> **Note:** the sandbox this was built in blocks the Higgsfield CDN, so the images could not be
> visually confirmed here — only that they degrade cleanly. Check them once on a deployed host.
> If any plate is the wrong crop, swap the URL in the matching custom property.

## 4. Honesty constraints (do not remove)

The banner, the composite label and the footer disclaimer are load-bearing. They state that:

- **Cardinal Heating & Air is a composite operator.** No real customer's data is in here.
- Scores are **modeled**, not measured — derived from Newo's public product documentation and
  Grandeza's HVAC engagement patterns.
- The document was **not authored, reviewed or endorsed by Newo.ai**.
- Compliance engineering, not legal advice.

This is what keeps the artifact a sales exhibit rather than a fabricated audit, and it's also
the setup for the close: *give us one live deployment and 500 transcripts, and every number on
this page becomes measured.* Don't strip the disclaimers to make it look more real — the offer
to make it real is the CTA.

## 5. Before sending it to Newo

- [ ] **Swap the co-brand accent.** `--partner: #5a4ff3` in the page's `:root` is a placeholder.
      Replace with Newo's official brand hex (light + dark variants) once confirmed.
- [ ] **Confirm the wordmark treatment.** The lockup renders "newo" as styled text, not their
      logo asset. If we want their mark, ask for it — don't recreate it.
- [ ] **Re-check the regulatory notes.** Citations are current as of 2026-07-28. The FCC
      revocation rule's cross-business-unit element has been under repeated limited waivers —
      verify status before the call.
- [ ] **Decide on the tenant.** Option A on the page (co-branded readouts for named prospects)
      is the smallest ask and the fastest yes.

## 6. Technical notes

- **Self-contained.** One file, no external CSS or JS. Only remote reference is the OG image.
  Survives being saved, emailed as an attachment, or opened offline.
- **Not indexed.** `<meta name="robots" content="noindex,nofollow">`, `Disallow: /readout/`
  in `robots.txt`, and deliberately absent from `sitemap.xml`. It's a partner artifact, not a
  page we want ranking.
- **Print = binder page.** The print stylesheet drops the chrome, forces the annotations
  visible regardless of the toggle, unclips the control table and avoids breaking rows across
  pages. Renders to 12 A4 pages via the Print / PDF button.
- **Verified in-browser** at 1440 / 1280 / 1024 / 390 px, light and dark: score computes to
  41 → 88, no console errors, no horizontal page overflow, control table fits without clipping
  at desktop and scrolls inside its own box on mobile.
- **Accessibility.** Gauges carry `<title>` elements with the score and band; the filter
  buttons use `aria-pressed`; annotations are real text, not images; motion respects
  `prefers-reduced-motion`.

## 7. Reusing this for another partner or tenant

The page is a template. To retarget it:

1. Copy to `public/readout/<partner>.html`.
2. Update the `CONTROLS` array — findings, `where`, `now`/`tgt` scores. The gauges re-derive.
3. Rewrite the transcript against that deployment's real call flow (this is the part that
   sells; keep it specific).
4. Recompute the exposure cards from that shop's actual volumes and leave the arithmetic visible.
5. Update the masthead reference number, the banner and the footer disclaimer to match what is
   modeled versus measured.
