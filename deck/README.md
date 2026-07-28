# Grandeza × Newo.ai — partnership proposal deck

Source for `Grandeza-Newo-Partnership-Proposal.pdf`. The deck is authored as HTML/CSS/SVG and
printed to PDF by headless Chromium, so every headline, chart and rule stays live vector text —
selectable, searchable and sharp at any zoom.

```bash
./build.sh                      # → Grandeza-Newo-Partnership-Proposal.pdf
./build.sh /tmp/somewhere.pdf   # → custom output path
```

Open `index.html` in a browser to edit; the on-screen view is the same 16:9 canvas as the print.

## Copy is frozen

Every word is carried over from the previous revision of the deck; the rebuild changed
presentation only. This is enforced by a check that pulls all 173 text fragments out of the old
PDF and asserts each one still appears in the new one — run it before shipping any edit that
touches prose.

Two things the check deliberately tolerates, both worth knowing before you trust it:

- **It is case-insensitive.** Ten labels render in a different case than the source because the
  CSS sets `text-transform: uppercase` on eyebrows, kickers and chart furniture — the words are
  identical, the styling is not. A case-sensitive run flags those ten as false positives.
- **One intentional word-level change:** the founder's address is `Kai@grandeza.io`, capitalised,
  where the previous revision wrote it lowercase. This is the only place the rebuilt deck's text
  differs from the original by anything other than case-from-styling.

The only text this deck adds is chart furniture: axis ticks, legends, series labels and stage
markers. Every number in that furniture is one already stated in the body copy or in the deck's
own source list — no figure is introduced, interpolated or estimated.

## Canvas and grid

- **1280 × 720 px = 13.333in × 7.5in @96dpi** — PowerPoint-native 16:9, matching the deck it replaces.
- Margins `46px / 64px / 40px`; a `.fill` content block absorbs vertical slack so every slide's
  source rule and page number land on the same baseline.
- A brass ticker across the top of each slide shows position in the deck.

## Design tokens

Follows [`docs/brand-system.md`](../docs/brand-system.md) — ink `#0C1618`, brass `#C6A15B`,
verdigris `#2E6E6A`, dossier paper `#E9EDEC`, with the serif × mono pairing (Newsreader ·
Public Sans · JetBrains Mono) that the brand book specifies. Fonts are self-hosted in
`assets/fonts/` as woff2; there is no font-CDN call, so the deck builds and renders offline.

## Chart palette

Data colours are **not** the brand accents — brand brass and verdigris are too low-chroma to
carry categorical meaning. They are the nearest steps that pass all six checks in the `dataviz`
validator, on both the light and the ink surface:

```
node scripts/validate_palette.js "#008A7E,#B5852A" --mode light --surface "#F4F7F6"
node scripts/validate_palette.js "#008A7E,#B5852A" --mode dark  --surface "#0C1618"
```

Both PASS lightness band, chroma floor, CVD separation (ΔE 11.5 protan / 21.0 tritan),
normal-vision floor (19.2) and contrast. Status colours (pass/warn/fail) are reserved for state
and always ship with an icon and a text label, never colour alone.

Charts follow one scale per plot — there is no dual axis anywhere. Where slide 9 shows two
different bases (partner share of Newo revenue vs. Grandeza's share of its own attach), the
second is drawn as a ring rather than a bar so the form itself signals the different measure.

## Imagery

`assets/img/hero.webp` is generated with Higgsfield / Nano Banana 2 (`nano_banana_pro`, 4K,
16:9) — a macro of an intaglio security-engraving plate in the brand's slate-teal and brass.
It carries the cover and, at a deeper crop, the closing slide. Everything else on the page is
vector: the 16-point heraldic seal, the charts, the diagrams and the icons are hand-authored SVG,
so they print at full device resolution.
