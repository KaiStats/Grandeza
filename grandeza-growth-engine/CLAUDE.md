# CLAUDE.md — context primer for grandeza-growth-engine

> **Reconstructed draft.** The original `CLAUDE.md` shipped in a zip whose git
> history was truncated and could not be recovered. This version was
> re-authored from the maintainer's plain-language description of what it
> covered — treat it as a new file, not a restored one, and correct anything
> that drifts from the real source of truth.

## What Grandeza is

Grandeza is the **evidence layer for AI intake** — a compliance scan and
content engine for businesses running AI voice/chat agents on customer-facing
calls and forms. Canonical domain: **grandeza.io**. The free scan tool lives
at **grandeza.io/scan** and grades a business against the 16-control spec in
`data/controls.json`.

## Voice

- Short. Dollar-and-consequence-first — lead with the cost of getting it
  wrong (fines, felony exposure, lost deals), not with the feature.
- No hype, no jargon. Write like you're explaining exposure to a founder who
  has five minutes.
- Every piece of content should be able to end at `grandeza.io/scan`.

## Guardrails (non-negotiable)

- **No phantom law.** Never invent or repeat an unverified statute, deadline,
  or bill number. If a claim can't be traced to `data/legal-spine.json`,
  cut it.
- **Verified figures only.** Dollar amounts, penalty ranges, and citations
  must trace back to the legal spine. Do not round up for drama.
- **Never name a live prospect.** Case studies and examples are always
  anonymized or composite — no real client names, logos, or identifying
  detail without explicit written sign-off.

## Build commands

```bash
node src/build-scripts.js        # 30-day content bank → .docx
node src/build-seo-ads.js        # SEO package + ad/commercial scripts → .docx
python3 src/build-calendar.py    # content calendar → .xlsx
```

All three read from `data/` as the single source of truth — edit the JSON/JS
there, not the generated `.docx`/`.xlsx` output.

## Source of truth

- `data/controls.json` — the 16-control scan spec (weights, score bands,
  auto-fail controls).
- `data/legal-spine.json` — verified law backing every claim in the content
  bank; also the phantom-law guardrail list.
- `data/content-bank.js` — the 30-day script/caption bank driving
  `build-scripts.js` and `build-calendar.py`.

Read this file before generating or editing any content in this repo.
