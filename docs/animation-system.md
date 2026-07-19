# Grandeza — Motion System (v1.0)

**Creative direction + developer-ready animation spec.**

Live, interactive showcase: [`/motion.html`](../motion.html) · Drop-in modules:
[`assets/motion.css`](../assets/motion.css) + [`assets/motion.js`](../assets/motion.js).

> **The idea in one line:** Grandeza's product turns *invisible risk* into a *certified,
> provable record*. The motion system does the same — every animation either **reveals**
> something hidden, **certifies** an outcome, or **measures** a value. Nothing is decoration.

---

## 1. Principles

1. **Reveal, don't decorate.** Every motion must answer at least one of: *What changed? Where
   should I look? Is it working?* If it answers none, it's cut.
2. **One hero beat per view.** Exactly one orchestrated moment (the score-gauge sweep) is
   allowed a full cinematic second. Everything around it stays quiet, so the beat lands.
3. **Weighted, not floaty.** A single "settle" easing (`--ease-standard`) gives motion
   consistent physical mass — the feel of a well-made instrument, which reads as *trust*
   (the emotion this brand sells).
4. **Respect the user.** `prefers-reduced-motion` is a *designed* path, not a kill-switch.
   All motion is compositor-only (`transform`/`opacity`) and never blocks input.

---

## 2. Tokens

### Duration — each tier maps to a job, not a vibe
| Token | Value | Job |
|---|---|---|
| `--gz-dur-instant` | 80ms | Tap / press feedback (must feel immediate) |
| `--gz-dur-fast` | 160ms | Hover, toggles, small state changes |
| `--gz-dur-base` | 260ms | Default transitions (color, border, position) |
| `--gz-dur-slow` | 440ms | Entrances, card reveals, drawers |
| `--gz-dur-cine` | 1100ms | The one orchestrated beat (gauge sweep) |

### Easing — named by intent
| Token | Curve | Feel / use |
|---|---|---|
| `--gz-ease-standard` | `cubic-bezier(.22,.61,.36,1)` | Settle — fast in, gentle stop. The default. |
| `--gz-ease-emphasized` | `cubic-bezier(.16,1,.3,1)` | Dramatic reveal with a long tail (entrances). |
| `--gz-ease-inout` | `cubic-bezier(.65,0,.35,1)` | Symmetric — loops, shimmer, transitions. |
| `--gz-ease-exit` | `cubic-bezier(.4,0,1,1)` | Leaving — accelerate away (exits, dismissals). |

### Distance
`--gz-rise: 22px` (reveal travel) · `--gz-lift-sm/md/lg: -2/-4/-6px` (hover) ·
`--gz-stagger: 70ms` (delay between siblings).

**Why a fixed scale:** a small, named vocabulary keeps 100 hand-tuned durations from drifting
into inconsistency. Consistency is itself a UX signal — it makes the product feel *engineered*.

---

## 3. The catalog (every effect → its UX job)

### 3.1 Loading states — *buy perceived speed, prevent layout shift*
| Effect | What it does | UX job |
|---|---|---|
| **Certify loader** | SVG seal path draws, check stamps, wordmark fades; auto-exits ≤1.2s | Turns unavoidable first paint into brand; capped so it never *adds* delay |
| **Skeleton screens** | Shimmer placeholders in the exact final layout | Zero CLS; the eye stays put and the wait feels shorter (occupied-time effect) |
| **Inline spinner** | Button label swaps to a spinner on submit | Confirms the tap registered <80ms; prevents anxious double-clicks |
| **Count-up as data-load** | Numbers tween from 0 to value | Reads as "computing your result," not a static print |

### 3.2 Scroll effects — *compose the page around the reader*
| Effect | What it does | UX job |
|---|---|---|
| **Reveal + stagger** | Rise+fade on enter, 70ms stagger per group | Sets reading order; chunks a group into a followable sequence |
| **Sticky header condense** | Header shrinks + gains a hairline past 8px | Keeps the primary CTA reachable while reclaiming height; signals depth |
| **Count-up on view** | Key figures animate when scrolled into frame | Draws the eye to anchor numbers, aiding recall (e.g. the $50k anchor) |
| **Signature trigger** | Gauge sweep fires once, on view | Guarantees the hero beat is *seen*, not scrolled past |
| **Parallax (optional)** | Faint background texture drifts on scroll | Depth cue only; ≤ a few px, transform-only, off under reduced motion |

*Implementation:* all scroll work is `IntersectionObserver` + `requestAnimationFrame` —
never per-scroll-event layout reads. Reveals `unobserve` after firing (one-and-done).

### 3.3 Micro-interactions — *every control says what it does*
| Effect | What it does | UX job |
|---|---|---|
| **Button press/hover/focus** | Lift on hover, `scale(.98)` on press, arrow nudge, focus ring | Affordance + tactile confirmation; the arrow implies forward motion |
| **Float-label field** | Label rises into the border on focus/fill; live valid/invalid color + message | Keeps context visible; resolves errors *as typed*, not on submit |
| **Theme toggle** | Icon crossfade | Immediate, legible state change |
| **Certify stamp** | A seal/check stamps in with overshoot on completion | Closure + reward — the emotional payoff of "you're certified" |

### 3.4 Hover & pointer — *interactive things look interactive*
| Effect | Job | Notes |
|---|---|---|
| **Card lift + border→brass** | "This is a target" | The core surface affordance |
| **Pointer tilt (≤6°)** | Tactile, physical depth on feature cards | Desktop only; off on touch + reduced motion |
| **Underline grow-from-left** | Directional cue toward the click | Leading-edge origin points forward |
| **Contained image zoom (4%)** | Signals clickable media | Frame has `overflow:hidden`; no layout shift |

### 3.5 Page & route transitions — *continuity between views*
- **Cross-document (MPA):** native **View Transitions API** via `@view-transition { navigation: auto }`.
  Root fades/slides; the **brand seal** and **score card** carry a `view-transition-name`
  (`.gz-vt-seal`, `.gz-vt-score`) so they **morph** across routes instead of blinking.
  *UX job:* a persistent shared element says "same product, new view," cutting disorientation
  and perceived load. Progressive enhancement — unsupported browsers hard-cut, no breakage.
- **In-page multi-step (the scan):** directional slide (forward = content enters from the
  right, exits left). *UX job:* preserves spatial sense so progress feels linear, not jumpy.
- **Modals/drawers:** scale+fade from origin, exit on `--gz-ease-exit`.

### 3.6 The signature beat — the Grandeza Score sweep
`0 → 41 (High Risk, red)` → hold → `41 → 88 (Protected, green)`. The only place we spend a
full cinematic second. *UX job:* shows the product's before→after promise in one wordless
beat and makes the abstract "score" concrete in the first five seconds. Number counts up
(tabular mono), arc fills, band label + color cross at each threshold.

---

## 4. Accessibility — the reduced-motion path
Under `prefers-reduced-motion: reduce` (or the showcase's manual toggle,
`:root[data-gz-motion="off"]`): **travel, loops, parallax and the cinematic beat are removed,
but meaning is preserved** — elements still appear (instant opacity), states still confirm,
the gauge jumps straight to its final value, skeletons hold layout without shimmer.

Non-negotiables regardless of motion preference:
- Meaning is **never motion-only** — always backed by color, a text label, and/or an icon.
- Every interactive element has a visible `:focus-visible` ring.
- No animation traps focus or blocks input; durations are capped.

---

## 5. Performance budget
- **Compositor-only:** animate `transform` and `opacity` exclusively. Never animate
  `width/height/top/left/box-shadow`-driven layout (shadow is transitioned but small).
- **`will-change`** applied only during a reveal, then released (set back to `auto`).
- **JS tweens** use a single `requestAnimationFrame` loop with an easing function; no
  timers-per-frame, no layout thrash.
- **Observers over listeners:** `IntersectionObserver` for reveals/counters/triggers; the one
  scroll listener (header) is `rAF`-throttled and `{passive:true}`.
- Target **60fps**; the gauge and count-ups are the only sustained animations and both run on
  a single value update per frame.

---

## 6. Developer integration
```html
<link rel="stylesheet" href="/assets/motion.css">
<script src="/assets/motion.js" defer></script>
<script>addEventListener('DOMContentLoaded', () => GZMotion.init());</script>
```
- Add `class="gz-reveal"` (optionally inside a `.gz-stagger` parent) to entrance elements.
- Add `data-count="50000"` to any number for count-up-on-view.
- Add `data-gz-sticky` to the header, `data-gz-tilt` to feature cards.
- Build the gauge with `GZMotion.gauge({arc, number, band}).sweep(41, 88)`.
- For SPA route swaps, wrap the DOM update in `document.startViewTransition(cb)`; MPA sites
  get transitions from the `@view-transition` CSS automatically.

`GZMotion` surface: `init, revealOnScroll, countUp, gauge, stickyHeader, tilt,
certifyLoader, enableViewTransitions, tween, ease, reduced`.

## 7. Files
```
motion.html                 # interactive showcase / living documentation
assets/motion.css           # tokens + utility classes + keyframes (drop-in)
assets/motion.js            # IntersectionObserver reveals, tweens, gauge, loader (drop-in)
docs/animation-system.md    # this spec
```
