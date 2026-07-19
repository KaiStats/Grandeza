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
- `GUARDO` / `CAST` — filename + display name per character. `CAST` is keyed by
  **all 16** control codes: the four auto-fail codes (`"01","03","09","14"`) map
  to their rogue; the other twelve are `null` "minion" slots that fall back to
  Guardo until you add art (see upgrade 6). (`VILLAINS` remains as a back-compat
  alias for `CAST`.)
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
5. ~~Sound (optional).~~ **DONE.** A Web-Audio SFX layer plays short tones on
   choose (pass/partial/fail), red-flag, and the victory/worried result. It is
   synthesized inline (no audio files — stays self-contained / Artifact-safe),
   **muted by default** behind a `Sound` toggle in the brand bar, and forced
   off (button disabled) when `prefers-reduced-motion` is set.
6. **Non-auto-fail flavor (scaffolded).** `VILLAINS` was renamed to `CAST` and
   now lists **all 16** control codes; the four rogues are wired, the other
   twelve are `null` minion slots that fall back to Guardo. To give a control
   its own lighter minion: generate the art (recipe + suggested filenames in
   `CHARACTERS.md`), drop the files into `../assets/characters/`, and fill in
   that code's entry in `CAST`. (Generating the 12 minion assets needs
   Higgsfield access.)

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
