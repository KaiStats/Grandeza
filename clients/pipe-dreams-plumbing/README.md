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

## The AI intake widget

The chat bubble bottom-right runs a Claude-powered intake flow that collects
name, phone, address, service type, and urgency, then calls a `submit_lead`
tool. It's ported from the `KaiStats/HVAC` repo and retargeted to plumbing
triage.

```bash
cp .env.local.example .env.local   # add ANTHROPIC_API_KEY
```

Without a key, `/api/intake` returns 503 and the widget falls back to a
"call us" button. That's intentional — the site is fully usable with the
widget unconfigured, so it can ship before the key is provisioned.

**`lib/bookings.ts` is an in-memory store.** It resets on deploy and is not
shared across serverless instances. Before launch, forward leads somewhere the
owner will actually see them — SMS via Twilio or email via Resend is simpler and
more appropriate here than a database. A lead that only lives in server memory
is a lead nobody reads.

The system prompt instructs the assistant to redirect true emergencies
(flooding, sewage backup, no water) straight to the phone rather than working
through the intake questions.

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
