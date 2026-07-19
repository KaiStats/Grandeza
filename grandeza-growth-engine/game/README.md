# Survive the Audit — the Grandeza Scan as a game

`index.html` turns the 16-control Grandeza Scan into a ~3-minute survival game
so people finish it instead of balking at a 16-question form.

## How it plays

- Sixteen "threats" walk in — one per control (`data/controls.json`), in the
  same heaviest-first order. Each is a scenario card with three honest choices:
  **Locked down** (pass, full weight), **Winging it** (partial, half weight),
  **Exposed** (fail, zero).
- Two live meters: a **Defensibility** score filling toward 100 and a running
  **liability exposure** counter that climbs when you're exposed.
- The four auto-fail controls (**01, 03, 09, 14**) throw a full-screen
  **RED FLAG** interstitial on a fail and flag the whole verdict red regardless
  of total score — matching `controls.json`'s `autoFailRule`.
- The verdict screen gives your band (Critical → Protected), a per-pillar
  breakdown, your "fix these first" list, and a CTA to `grandeza.io/scan`.

## Legal accuracy

Statutory figures shown are the verified ones only (TCPA $500–$1,500/text;
NRS 200.620 / 193.130 recording penalties; NRS 603A breach duties; FTC § 5) —
see `../data/legal-spine.json` and `../CORRECTIONS.md`. The running exposure
*total* is explicitly framed in-game as an illustrative dramatization, not a
quote. No phantom law.

## Build / host

Fully self-contained — no build step, no external requests (CSP-safe). Open
`index.html` directly, or drop it on the Cloudflare Worker behind
`grandeza.io/scan` (or a `/scan/game` route). The scan spine is mirrored inline
in the file; if `controls.json` changes, update the `BANDS`/`THREATS` data at
the top of the `<script>`.

## Scope note

This is the **fun front-door** version — a fixed, self-scored quiz. It is not
the real scoring engine; it doesn't persist results or capture leads. Wiring it
to the actual scan backend / a lead capture is a separate task.
