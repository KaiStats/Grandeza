# HANDOFF.md — session state

> **Reconstructed draft**, re-authored from the maintainer's description in
> chat (the original was lost along with the rest of `data/`). The IDs below
> were supplied directly by the maintainer as plain text, not recovered from
> a file — verify them against the live Notion/Zapier accounts before
> relying on them for anything automated.

## Where things stand

- Instagram is wired via **Zapier** — auth and templated visuals are still
  pending (see open tasks below).
- The **Notion HQ** "📅 30-Day Content Calendar" database is populated
  (July 20 – Aug 18, one post per day at 5 AM).
- The Canva smoke-detector graphic, the live-scan mockup, and the 30-sec
  commercial b-roll were generated separately outside this repo and can be
  regenerated/iterated from the prompts in `TASKS.md`.

## Connector IDs

| What | ID |
|---|---|
| Notion HQ ("📅 30-Day Content Calendar") | `38bc0e942cc181368673fad3644f820c` |
| Calendar data source | `fc6091b5-253f-4605-a9b8-edc05798f39c` |
| Zapier server | `e0c89434-b9d3-48aa-acb8-0c03115d2227` |
| Instagram publish action | `publish_media_v2` |

## Day-1 visual template

The Day-1 Instagram visual is the reference template for all 30: a single
bold hook line over the Grandeza navy/gold cover treatment (see
`assets/seo-6.jpg` and `assets/storyboards/` for the visual language), with
the control name and weight as a small caption line, and `grandeza.io/scan`
as the closing call-to-action. Batch the remaining 29 by swapping the hook
and control line per `data/content-bank.js`.

## Open tasks

See `TASKS.md` — in short: map the Worker to `grandeza.io/scan`, batch the
30 IG visuals off the Day-1 template, set the 5 AM Zap, finish the caption
audit.
