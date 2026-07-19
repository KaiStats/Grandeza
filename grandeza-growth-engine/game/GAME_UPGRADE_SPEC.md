# Build spec — taking "Survive the Audit" further in Cursor / Claude Code

This is the handoff for expanding the character mini-game. The playable base is
`game/index.html` (self-contained; no build step). Characters are wired in as
**progressive enhancement** — the game reads art from `../assets/characters/`
and, if it's absent, falls back cleanly to the text UI.

## Step 0 — pull the art down

The art was generated in a session whose egress blocked the Higgsfield CDN, so
the binaries aren't in the repo yet. On your machine:

```bash
bash assets/characters/fetch-characters.sh   # guardo + 4 rogues + guardo-intro.mp4
git add assets/characters/*.png assets/characters/*.mp4
```

Open `game/index.html` in a browser — Guardo now animates on the intro, the
rogues appear on their scenarios, and a villain "gets you" on each red flag.

## How the wiring works (so you can extend it)

In the `<script>` of `game/index.html`:

- `ASSET_BASE` — path prefix to the art (`../assets/characters/`). Change this
  if you host the game at a different route (e.g. `grandeza.io/scan/game`).
- `GUARDO` / `VILLAINS` — filename + display name per character. `VILLAINS` is
  keyed by control code (`"01","03","09","14"`).
- `mountImg(id, file, alt)` — injects an `<img>` **only after it loads**; on
  error it stays empty. This is why a missing asset never shows a broken image.
- `mountHero(id)` — tries `guardo-intro.mp4`, falls back to `guardo.png`.

Enhancement points already in place: `#heroChar` (intro), `#scAvatar` (per
scenario), `#flashChar` (red-flag villain), `#resultChar` (Guardo reaction).

## Recommended upgrades (in priority order)

1. ~~Background-cutout the stills~~ **DONE.** All six stills are transparent
   PNGs (Higgsfield `remove_background`); `fetch-characters.sh` pulls the
   cutouts into the canonical filenames. The navy-background originals are
   commented out in that script if you ever want them.
2. ~~One Seedance "attack" loop per rogue~~ **DONE.** Each rogue has a
   `*-attack.mp4`; the red-flag screen plays it via `mountVideo` (still
   fallback).
3. ~~Guardo reaction variants~~ **DONE.** `guardo-cheer.mp4` /
   `guardo-worried.mp4` play on the results screen by `flagged`.
4. **Videos are still navy-background.** The stills are cut out but the Seedance
   clips have navy baked in. To make a clip transparent you'd matte it per-frame
   (Higgsfield `remove_background` with `media_type:"video"`), then use a
   `.webm`/alpha-capable format. Optional polish once the look is locked.
5. **Sound (optional).** Short SFX on choose/red-flag/victory. Gate behind a
   mute toggle and honor `prefers-reduced-motion`; keep it off by default.
6. **Non-auto-fail flavor.** Optionally give the 12 non-auto-fail controls
   lighter "minion" characters instead of reusing Guardo. Extend the `VILLAINS`
   map (rename it `CAST`) with all 16 codes.

## Guardrails (unchanged — keep enforcing)

- The scan spine in the game (`BANDS`, weights, auto-fails) mirrors
  `data/controls.json`. If that JSON changes, update the game data to match.
- Only the **verified** statutory figures appear (TCPA $500–$1,500/text; NRS
  200.620 / 193.130; NRS 603A; FTC §5 — see `data/legal-spine.json` +
  `CORRECTIONS.md`). The running exposure total is labeled in-game as an
  illustrative dramatization, not a quote. No phantom law.
- Characters are comedic, never menacing; the fear comes from the real
  consequences, not the art.

## Deploy

Self-contained HTML + a sibling `assets/characters/` folder. Drop both on the
Cloudflare Worker behind `grandeza.io/scan` (or `/scan/game`). If you inline the
art as data-URIs later, the game becomes a single portable file again (good for
the shareable Artifact, which can't load external files).
