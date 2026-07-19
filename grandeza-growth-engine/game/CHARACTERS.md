# Cast bible — Guardo & the Rogues

The characters for **Survive the Audit** (`game/index.html`). Art direction:
**3D stylized Pixar-lite**, rounded friendly forms, big expressive eyes, soft
studio lighting with a warm gold rim, on a seamless deep-navy (`#1F2A44`)
background. Fun-loving and goofy — the *consequences* are dire, the characters
are not scary.

Generated with **Higgsfield**: stills via `nano_banana_pro` (2 credits each),
animation via **Seedance 2.0** (`seedance_2_0`, image→video, ~17.5 credits for
5s/720p). Files live in `../assets/characters/`; run
`../assets/characters/fetch-characters.sh` to pull them locally (see the note
there about the egress block).

## The hero

**Guardo** — a friendly polished-gold shield mascot, the player's guide. Big
kind eyes, warm confident smile, stubby thumbs-up arms, a glowing chest emblem.
Appears on the intro, on every non-auto-fail scenario, and on the results
screen (approving when you're Defensible+, concerned when you're red-flagged).
- Still: `guardo.png` · job `c4a9c21c-1f45-479e-8a4b-fcbbf546d611`
- Animation: `guardo-intro.mp4` (Seedance 2.0, bounce + thumbs-up loop) · job `1bd0f6a1-1195-456e-9d9c-6eaac8b36b40`

## The Rogues (one per auto-fail control)

Each auto-fail threat has a villain who "gets you" on the red-flag screen.

| Control | Villain | File | Job ID | What they are |
|---|---|---|---|---|
| **03** TCPA | **The Robotexter** | `robotexter.png` | `667a87d8-0cbb-436b-95f5-d4b9d43042a7` | Chunky retro robot with a smartphone belly spewing spam texts |
| **01** AI disclosure | **Phantom Bot** | `phantom-bot.png` | `9e172803-da4a-4832-9a8b-22b13149847e` | Ghost-bot in a cheap human mask + "DEFINITELY HUMAN" name tag |
| **09** Recording consent | **Sneaky Pete** | `sneaky-pete.png` | `78f80aff-21de-47c5-959e-09ca0d8baeeb` | Goofy trench-coat spy bristling with hidden mics, going "shhh" |
| **14** Audit trail | **The Shredder** | `the-shredder.png` | `def163d9-c5bc-4b76-9163-31ba5340c1d0` | Gleeful paper-shredder gremlin eating the evidence logs |

## Exact generation prompts

Shared style prefix (prepend to every character):

> 3D stylized Pixar-style character render, rounded friendly forms, big
> expressive eyes, smooth soft shading, cinematic soft studio lighting with warm
> gold rim light, seamless deep navy blue background color #1F2A44, centered
> full-body single character, clean.

- **Guardo** — "…playful premium mascot. CHARACTER: GUARDO, a heroic friendly golden shield mascot — a rounded polished gold shield body with a cute face, big kind eyes, a confident warm smile, small stubby arms giving an enthusiastic thumbs up, tiny legs, a subtle glowing emblem in the chest center. Noble but cuddly guardian, the player's ally."
- **The Robotexter** — "…playful comedic villain. CHARACTER: THE ROBOTEXTER, a goofy chunky retro robot overwhelmed by spam texting — boxy metal body with a giant glowing smartphone screen for a belly overflowing with chat bubbles, bent antenna, googly mismatched eyes, arms frantically typing on tiny phones, panicked grin, cartoon spam envelopes flying. Funny, not scary."
- **Phantom Bot** — "…playful comedic villain. CHARACTER: PHANTOM BOT, a sneaky little floating ghost-robot pretending to be human — translucent pale rounded bot wearing a cheap plastic human mask and a fake curly mustache, holding a name tag that reads 'DEFINITELY HUMAN', shifty mischievous eyes, sneaky grin, tiptoe float. Silly, harmless-looking."
- **Sneaky Pete** — "…playful comedic villain. CHARACTER: SNEAKY PETE, a cartoonish goofy spy who secretly records — oversized tan trench coat bristling with tiny hidden microphones and mini recorders, fedora tilted low, exaggerated tiptoe sneaking pose, finger to lips 'shhh', comically guilty wide eyes. Goofy cartoon spy, not menacing."
- **The Shredder** — "…playful comedic villain. CHARACTER: THE SHREDDER, a chaotic fun paper-shredder gremlin gleefully destroying documents — boxy office paper shredder with stubby legs and little arms, big toothy grinning mouth-slot chomping papers, googly eyes, tossing shredded-paper confetti, gleeful expression, paper evidence logs being devoured. Chaotic but funny."

## Seedance 2.0 animation recipe

Image→video: pass the still's **job ID** as `medias:[{role:"start_image", value:"<jobId>"}]`.
Params used for Guardo: `duration:5, resolution:"720p", mode:"fast",
generate_audio:false, aspect_ratio:"16:9"`. Keep the navy background still and
the motion subtle so it loops cleanly behind UI.

### Suggested next clips (not yet generated)
- **Villain "attack" loops** (one per rogue) for the red-flag screen — e.g. The
  Robotexter frantically machine-guns texts; The Shredder chomps a stack of
  logs and cackles. Same recipe, start_image = each villain's job ID.
- **Guardo "worried"** variant for red-flagged results, and **Guardo "cheer"**
  for Protected. Generate a still first (new pose), then animate.
