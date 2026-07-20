# Grandeza — Mobile-First Experience

Reference build: [`/mobile.html`](../mobile.html) — a real, interactive phone build (framed on
desktop, full-bleed `100dvh` on actual phones). This is not the desktop site squeezed narrow;
it's a rethink for a one-thumb, in-the-field HVAC/plumbing operator.

## Who and where
The buyer checks this on a phone between jobs — outdoors, one hand, spotty LTE, sun on the
screen. That context drives every call below.

---

## 1. Navigation — moved to the thumb
- **Removed the desktop top nav bar** (horizontal link row is unreachable one-handed on a tall
  phone). Replaced with:
  - **App bar** (56px): logo, a live **score chip**, theme, and a **hamburger** — all in the
    top zone where only glanceable/occasional controls live.
  - **Full-screen menu sheet** on tap: 56px rows, big icons, one primary action pinned at the
    bottom (Call). Slides up with `--ease-emphasized`, dismiss via scrim/close/Esc.
  - **Persistent bottom dock** (the real navigation): the primary conversion action
    (*Get my free score*) plus a one-tap **Call** button, docked in the bottom third —
    the natural thumb arc (Fitts's law: closest = fastest, and the CTA is never scrolled away).
- **In-page anchors** for menu links smooth-scroll and auto-close the sheet.

## 2. Touch targets & ergonomics
- **48px comfortable minimum** on every interactive element (`--tap`), 52px on primary
  buttons — above the 44px floor, sized for gloves/cold hands.
- **16px input font-size** so iOS Safari never auto-zooms on focus.
- **`inputmode`/`autocomplete`** on the scan fields (`tel`, `email`) → the right keyboard,
  autofill, fewer keystrokes.
- **Ripple + `:active` scale** give tactile confirmation without hover (touch has no hover).
- **`-webkit-tap-highlight-color:transparent`** kills the default grey flash; we supply our own.
- **`env(safe-area-inset-bottom)`** padding so the dock/sheet clear the home indicator.

## 3. Mobile-native interactions (replacing desktop patterns)
| Desktop pattern | Mobile replacement | Why |
|---|---|---|
| Multi-column pricing cards side by side | **Segmented control** (Hardening / Protected Intake) swapping one card | One decision on screen at a time; a native iOS/Android idiom |
| 4-up stat grid | **Horizontal scroll-snap** strip | Thumb-flick, no cramped 4-across text |
| 3-up testimonial grid | **Swipeable carousel** + progress dots | Native gesture; dots update on scroll |
| Hover-reveal cards | **Tap targets + `:active`** | Touch has no hover state to rely on |
| Modal dialog | **Bottom sheet** with grab handle + **swipe-down to dismiss** | Reachable, familiar, gesture-cancellable |
| Sitemap footer (5 columns) | **Collapsed footer** + menu sheet carries the links | Columns are noise on a 390px screen |
| Announcement marquee | Folded into the score chip / hero | Saves vertical space, no motion tax |

## 4. Performance & fast loading
Mobile budget: **usable on mid-tier Android over 3G**.
- **System font stack** — zero webfont bytes, zero FOUT, instant text.
- **No frameworks, no libraries** — the whole page is one HTML file, inline SVG icons
  (no icon font, no image requests), ~1.5kb of vanilla JS.
- **`content-visibility:auto`** on below-the-fold sections — the browser skips rendering work
  for off-screen content, cutting time-to-interactive.
- **Skeleton + async resolve** on the score chip demonstrates perceived-performance handling
  (layout reserved → no CLS).
- **Scroll-snap is CSS-native** (no JS scroll libraries), `IntersectionObserver`/`rAF` only —
  no scroll-event thrash, 60fps.
- **Production image guidance:** any photography loads as `loading="lazy"` `.webp` with
  explicit `width`/`height` (reserve space, no CLS), `srcset` capped at device width; the hero
  here uses a CSS gradient so first paint needs **no image at all**.
- **CSS containment + transform/opacity-only animation** keep the compositor busy, not the
  main thread.

## 5. What was removed (and why it's not missed)
- Desktop top-nav link row, mega-hover states, the wide multi-column grids, the sitemap
  footer, oversized hero typography, and any decorative motion that costs battery. Every
  removal either moved to a better mobile home (menu/dock) or was noise on a small screen.

## 6. Accessibility on touch
- `role="dialog"`/`aria-modal` on menu + sheet, `aria-selected` tabs on the segmented control,
  `aria-live` on the score chip, Esc-to-close, visible focus rings, and text/colour never
  motion-only. Full `prefers-reduced-motion` path (no sweeps, no ripple, no smooth-scroll).

## 7. Developer notes
- Single file, drop-in. The phone frame is presentation only — at `≤520px` it becomes
  full-bleed `100dvh`, so on a real device you ship just the inner `.screen` + `.dock`.
- Reuses the Grandeza tokens (teal-charcoal + brass, serif/mono) and pairs with
  `assets/motion.css`/`motion.js` from the motion system.
- The scan lives at the production page **`grandeza.io/scan`** (owned/built separately). The
  mobile dock's "Get my free score" is a direct link to `/scan` — the site itself no longer
  hosts a scan form.
