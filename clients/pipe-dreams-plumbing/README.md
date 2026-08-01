# Pipe Dreams Plumbing Co. — website

A replacement marketing site for [pipedreamsplumbingco.com](https://www.pipedreamsplumbingco.com/),
a family-owned plumbing company in Summerlin, Las Vegas.

Next.js 16 · React 19 · Tailwind v4 · TypeScript.

---

## ⚠️ Read this before launching

**The live site could not be reached from the build environment** (the network
policy blocked the domain), so none of the existing copy, branding, or service
list could be read. Every business fact on this site was reconstructed from
public directory listings — Yelp, BBB, Yellow Pages, Nextdoor, ZoomInfo.

All of it lives in one file: **`lib/business.ts`**. Fields are tagged
`confident` or `verify`. Nothing else in the codebase hardcodes a phone number,
address, or license — fix a fact there and the header, footer, schema.org
markup, and chat widget all update together.

### Verification checklist

| Item | Status | Action |
|---|---|---|
| Phone `(702) 768-0428` | confident | Confirm it's the number they want published |
| License `#0078531` | confident | Confirm still current |
| Address `11456 Drappo Ave` | **verify** | Confirm this is a *publishable service address*, not a private home office |
| Hours | **verify** | From directory listings; confirm with owner |
| Service area cities | **verify** | Summerlin is confirmed; the other five are an assumption about travel radius |
| Service list | **verify** | Water heaters, leak detection, toilets, faucets, disposals are confirmed. Drains and repipes are assumed — cut anything they don't do |
| Testimonials | **🚨 placeholder** | Paraphrased from public reviews **without permission to republish**. Replace with signed-off quotes or embed the live Yelp widget |
| Logo | missing | Currently a generic droplet mark. Swap for their real logo if one exists |
| Photography | missing | No real job photos — the design is built to work without them, but real photos of Chance and completed work would lift it a lot |

Claims deliberately **not** made anywhere on the site, because they could not be
verified: 24/7 availability, free estimates, warranty terms, BBB rating,
star ratings, review counts, and year founded.

---

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run lint
```

## The AI receptionist

The chat bubble bottom-right is a Claude-powered receptionist that covers the
calls Chance can't take. It does two jobs:

**Answers questions.** Its knowledge base is generated at request time from
`lib/business.ts` — the service list, the service-area cities, the hours, and
the FAQs. Correcting a fact on the website corrects what the receptionist says,
with no hand-written duplicate to drift out of sync. It is explicitly forbidden
from stating prices, arrival times, warranty terms, or ratings, and is told to
give out the phone number rather than guess.

**Takes messages.** It collects name, phone, address, service type, and urgency
one question at a time, reads them back, then calls a `submit_lead` tool.

It knows whether the shop is currently open (`isOpenNow()` in `lib/notify.ts`,
Las Vegas local time) and adjusts what it promises accordingly. Active flooding,
burst pipes, sewage backups, and no-water calls short-circuit the whole script
and get pushed to the phone immediately.

### Configuration

```bash
cp .env.local.example .env.local
```

| Variable | Purpose |
|---|---|
| `ANTHROPIC_API_KEY` | Required. Without it `/api/intake` returns 503 and the widget falls back to a "call us" button |
| `TWILIO_*` + `LEAD_SMS_TO` | Texts each lead to the owner's phone |
| `RESEND_API_KEY` + `LEAD_EMAIL_*` | Emails each lead to the office |

**Configure at least one delivery channel.** `lib/notify.ts` pushes every
captured lead out by SMS and/or email the moment it arrives. If neither is
configured, the receptionist does *not* claim a message got through — it tells
the customer to call instead, because a false "he'll call you back" is worse
than no chat at all. `lib/bookings.ts` is an in-memory debugging aid, not
storage; it resets on deploy.

### Not built: answering the actual phone

This answers the *website*. It reaches someone who is already on the site and
clicks the bubble. A caller who dials (702) 768-0428 while Chance is under a
sink still gets voicemail.

Closing that gap is a separate build — a Twilio voice number that streams the
call to a speech-to-text → Claude → text-to-speech loop, reusing the exact
system prompt and `submit_lead` tool already in `app/api/intake/route.ts`. The
cheaper interim step is missed-call-to-text: Twilio catches the unanswered call
and immediately texts the caller a link to this chat.

## Deploying

Standard Next.js app — Vercel is the path of least resistance. Set
`ANTHROPIC_API_KEY` in the project's environment variables if you want the
intake widget live.

Note this app is **self-contained**: it has its own `package.json` and no
imports outside its own directory, so moving it to its own repository is a
`git mv` and nothing else.

## Layout

```
app/
  layout.tsx              metadata + schema.org (Plumber, FAQPage)
  page.tsx                all homepage sections
  globals.css             design tokens (navy + copper)
  icon.svg                favicon
  components/
    Header.tsx            sticky nav, mobile drawer
    Footer.tsx
    CallBar.tsx           sticky mobile call bar
    ChatWidget.tsx        AI intake chat
    Icons.tsx             inline SVGs, no icon dependency
  api/intake/route.ts     Claude intake endpoint
lib/
  business.ts             ← every business fact lives here
  bookings.ts             lead store (replace before launch)
```

## Design notes

Most Las Vegas plumbers land on the same primary blue, so the palette here is a
deeper navy lifted by a **copper** accent pulled from the trade itself. Copper
is reserved for actions and emphasis only.

Mobile gets a persistent tap-to-call bar — plumbing traffic skews heavily mobile
and the intent is nearly always "dial someone now". The phone number appears
nine times on the page and is never more than a thumb-reach away.

Accessibility: semantic landmarks, skip link, visible focus rings, labelled
form controls, `aria-expanded` on the disclosure controls, and a
`prefers-reduced-motion` block that disables the animations.

SEO: `Plumber` + `FAQPage` JSON-LD generated from `lib/business.ts`, per-section
heading hierarchy, and OpenGraph/Twitter metadata. Service-area cities are
marked up as `areaServed` for the local pack.
