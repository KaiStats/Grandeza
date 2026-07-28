# Grandeza.io — Technical SEO Strategy

**Goal:** own the intersection of *TCPA/SMS compliance* and *home-services (HVAC & plumbing)* —
a high-intent, under-served, commercially valuable niche — and convert that organic traffic
into free-scan leads.

Ships with real, developer-ready assets: [`robots.txt`](../robots.txt),
[`sitemap.xml`](../sitemap.xml), and drop-in JSON-LD in
[`assets/schema/`](../assets/schema/). Visual map: [`/seo.html`](../seo.html).

---

## 1. Strategy in one paragraph
Grandeza is a **niche authority play**, not a volume play. The winning position is the
**pillar–cluster (topic hub) model**: two deep pillar hubs (*TCPA compliance for HVAC &
plumbing*, *the 16-control framework*) surrounded by high-intent cluster articles that answer
the exact questions a worried operator types, each routing to the **free scan** (the money
action). We win on *relevance + intent + E-E-A-T* against generic legal sites that don't speak
to contractors and generic contractor-software sites that don't understand TCPA.

---

## 2. Site architecture (flat, hub-and-spoke)
Keep every important page ≤3 clicks from home. URLs are short, lowercase, hyphenated, keyword-
bearing, no dates, no stop-word clutter.

```
/                                   Home (brand + free-scan hub)
├── /scan                           Free Grandeza Score  ★ conversion
├── /pricing                        Plans + ROI
├── /product/
│   ├── /hardening                  Service (Door 1)
│   ├── /protected-intake           Service (Door 2)
│   └── /guardian                   Monitoring
│
├── /tcpa-compliance-hvac-plumbing  ◆ PILLAR 1 (compliance hub)
│   ├── /tcpa-penalties
│   ├── /tcpa-sms-consent
│   ├── /a2p-10dlc-registration
│   ├── /dnc-compliance-contractors
│   └── /appointment-reminder-compliance
│
├── /the-16-controls               ◆ PILLAR 2 (methodology hub)
│   └── /the-16-controls/{consent, audit-trail, rate-limiting, dnc, …}  (16 leaf pages)
│
├── /ai-intake-compliance          Cross-pillar (AI/chatbot angle)
│
├── /solutions/
│   ├── /hvac                       Vertical LP
│   └── /plumbing                   Vertical LP
│
├── /resources/
│   ├── /tcpa-101                   Top-of-funnel primer
│   ├── /glossary                   Term hub (internal-link farm, done right)
│   └── /blog/*                     Fresh cluster content + nurture
│
└── /about  /contact  /legal/{privacy, terms}
```

**URL rules:** one canonical per page (`rel=canonical` self-referencing); trailing-slash
consistency enforced by 301; no `?` parameters indexed (see robots); `www`→apex 301; HTTPS-only.

---

## 3. Keyword clusters
Organized as **pillars → clusters → intents**. Target the *problem language contractors use*,
not legal jargon. (Volumes are directional; validate in your keyword tool before committing.)

### Pillar 1 — TCPA / SMS compliance (commercial-informational) ◆ *primary revenue*
| Cluster keyword | Intent | Funnel | Target page |
|---|---|---|---|
| tcpa compliance for hvac / contractors / plumbers | commercial | Mid | Pillar 1 |
| tcpa penalties / fines per text | informational | Top→Mid | /tcpa-penalties |
| tcpa sms consent / express written consent | informational | Mid | /tcpa-sms-consent |
| tcpa compliance checklist | informational | Mid | Pillar 1 + /scan |
| is my business tcpa compliant | investigational | Mid→Bottom | /scan |
| tcpa text message rules 2026 | informational | Top | Pillar 1 |

### Pillar 2 — Automated/AI intake compliance
| Cluster keyword | Intent | Page |
|---|---|---|
| a2p 10dlc registration (hvac) | transactional-technical | /a2p-10dlc-registration |
| ai receptionist / chatbot tcpa compliance | investigational | /ai-intake-compliance |
| ai phone agent legal / compliant | investigational | /ai-intake-compliance |
| business texting laws | informational | Pillar 1 |

### Cluster — Do-Not-Call
dnc compliance for contractors · how to scrub a dnc list · national do not call registry for business → **/dnc-compliance-contractors**

### Cluster — Use-case
sms appointment reminder compliance · service reminder text laws → **/appointment-reminder-compliance**

### Vertical / bottom-funnel
hvac answering service compliance · hvac customer intake software · plumbing dispatch compliance · hvac crm tcpa → **/solutions/hvac**, **/solutions/plumbing**, /pricing

### Risk/insurance (emotional, high-converting)
tcpa lawsuit defense cost · contractor tcpa lawsuit · e&o insurance tcpa → **/tcpa-penalties**, Pillar 1

### Branded / comparison (defensive + bottom-funnel)
grandeza · grandeza reviews · grandeza vs [competitor] · tcpa compliance software → branded + /pricing

**Mapping discipline:** one primary keyword + a handful of secondary/semantic variants per
page. Never two pages targeting the same intent (kills cannibalization).

---

## 4. Top 10 pages to build (ranked by traffic × intent × winnability)
| # | Page | Primary keyword | Intent | Format | Primary CTA |
|---|------|-----------------|--------|--------|-------------|
| 1 | **/tcpa-compliance-hvac-plumbing** | tcpa compliance for hvac & plumbing | commercial | Pillar guide (2.5–4k words) | Free scan |
| 2 | **/scan** | free tcpa compliance check | transactional | Interactive tool (link magnet) | *is* the conversion |
| 3 | **/tcpa-penalties** | tcpa penalties per text | informational | Guide + calculator | Free scan |
| 4 | **/tcpa-sms-consent** | tcpa sms consent requirements | informational | HowTo guide | Free scan |
| 5 | **/a2p-10dlc-registration** | a2p 10dlc registration hvac | technical how-to | Step-by-step (underserved!) | Free scan |
| 6 | **/the-16-controls** | tcpa compliance framework | commercial-info | Pillar + 16 leaf pages | Free scan |
| 7 | **/ai-intake-compliance** | ai receptionist / chatbot compliance | investigational | Guide (fast-growing query) | Free scan |
| 8 | **/dnc-compliance-contractors** | do not call compliance contractors | informational | Guide + checklist | Free scan |
| 9 | **/solutions/hvac** (+ mirror /plumbing) | tcpa compliance for hvac | commercial | Vertical landing | Free scan |
| 10 | **/appointment-reminder-compliance** | sms appointment reminder compliance | informational | Use-case guide | Free scan |

**Why these:** #1/#6 are authority anchors everything links to; #2 is the conversion tool and a
natural **link magnet** (free assessment tools earn backlinks); #5 and #7 target *high-intent,
low-competition* queries competitors ignore; #3 carries the emotional "what could this cost me"
search that converts; #9 captures the exact-match vertical buyer.

---

## 5. Internal linking model
The single biggest lever for a small site. Rules:
1. **Bidirectional pillar↔cluster:** every cluster page links up to its pillar; the pillar links
   down to every cluster (contextually, with descriptive anchors).
2. **Lateral cluster links** where genuinely relevant (e.g. /tcpa-sms-consent ↔ /a2p-10dlc-registration).
3. **Every informational page links to the money page** (`/scan`) in-body *and* via a CTA block —
   passing intent + authority to the conversion page.
4. **Vertical LPs** link to Pillar 1 and to /pricing; Pillar 1 links out to both vertical LPs.
5. **Descriptive anchor text** (target keyword or close variant) — never "click here".
6. **Breadcrumbs** on every deep page (with `BreadcrumbList` schema) for crawl + UX.
7. **Glossary** cross-links terms into cluster pages (hub-and-spoke micro-network) — useful, not
   spammy; ≤3–4 contextual links per term.
8. **No orphans:** every published URL is reachable from at least the sitemap *and* one in-body
   link. Cap ~100 links/page; keep the important ones high in the DOM.

**Authority flow:** Home → Pillars → Clusters → `/scan`. Backlinks earned by the tool and pillars
concentrate PageRank, which internal links funnel to the conversion page.

---

## 6. Metadata standards
| Element | Rule |
|---|---|
| **Title** | ≤60 chars, primary keyword first, brand suffix ` — Grandeza`. Unique per page. |
| **Meta description** | 140–155 chars, benefit + specificity + soft CTA. Unique. (Not a ranking factor but drives CTR.) |
| **H1** | One per page, matches search intent, not identical to title. |
| **Canonical** | Self-referencing on every page; cross-domain only for syndication. |
| **Open Graph / Twitter** | Present on all pages (already implemented on home/landing/scan) — `og:title/description/image`, `summary_large_image`. |
| **hreflang** | `en-US` only for now; add on internationalization. |
| **Robots meta** | `index,follow` default; `noindex,follow` on `/scan/result`, `/thank-you`. |

**Title templates**
- Pillar: `TCPA Compliance for HVAC & Plumbing (2026 Guide) — Grandeza`
- Cluster: `{Primary Keyword}: {Benefit/Angle} — Grandeza`
- Vertical: `TCPA Compliance for HVAC Contractors — Grandeza`
- Tool: `Free TCPA Compliance Check (3 min) — Grandeza Score`

---

## 7. Structured data (schema)
Drop-in files in `assets/schema/`. Deploy as `<script type="application/ld+json">` in `<head>`.
| Schema | Where | File |
|---|---|---|
| `Organization` + `WebSite` (+ `SearchAction`) | Site-wide (home) | `organization-website.jsonld` |
| `Service` + `Offer`/`OfferCatalog` | /product/*, /pricing | `service.jsonld` |
| `FAQPage` | Pillars, landing, /pricing (real FAQs only) | `faqpage.jsonld` |
| `HowTo` + `BreadcrumbList` | How-to guides + all deep pages | `howto-breadcrumb.jsonld` |
| `Article`/`BlogPosting` | Cluster + blog posts | (add `author`, `datePublished`, `dateModified`) |
| `SoftwareApplication` | /scan (the tool) | optional |
| `Review`/`AggregateRating` | Only when you have **genuine** collected reviews | **do not fabricate** |

> **Integrity note:** never emit `AggregateRating`/`Review` markup for testimonials that aren't
> real, verifiable customer reviews — it violates Google's policy and risks manual action.

Validate every template in Google's Rich Results Test before shipping.

---

## 8. Technical SEO checklist
- **Core Web Vitals:** the mobile build already targets this — system fonts, no libraries,
  `content-visibility`, lazy `.webp` with explicit dimensions (no CLS), transform/opacity-only
  animation. Budget: LCP <2.5s, INP <200ms, CLS <0.1 on mid-tier mobile.
- **Mobile-first indexing:** parity between mobile and desktop content (mobile build keeps all
  content, just re-patterned).
- **Crawlability:** clean `robots.txt`, XML `sitemap.xml` submitted in Search Console,
  logical internal links, breadcrumbs.
- **Indexation hygiene:** noindex thin/utility pages; canonical to kill parameter/duplicate URLs;
  301 (not 302) for any moves; custom 404 that links back into the hubs.
- **HTTPS + HSTS**, one hostname (apex, `www`→apex 301).
- **Rendering:** ship server-rendered/static HTML for content pages (the current files are static
  HTML — ideal); don't hide primary content behind JS.
- **Images:** descriptive `alt`, compressed `.webp`, `width`/`height` set, lazy below fold.
- **Freshness:** update `dateModified` + refresh pillars quarterly.

---

## 9. E-E-A-T (this niche lives or dies on trust)
Compliance is a YMYL-adjacent topic — Google weighs expertise heavily.
- Author bylines with real credentials on every guide; link to an `/about` that establishes
  expertise (the 16-control framework, security-architect depth).
- Cite primary sources (FCC/FTC TCPA rulings, statute) with outbound links.
- Keep the "not legal advice" disclaimer — honesty signal.
- Earn links via the free tool, a downloadable compliance binder sample, and original data
  (e.g. "average Grandeza Score across N shops").

## 10. Measurement
- **Search Console:** impressions/clicks/position per cluster; index coverage; CWV report.
- **North-star:** organic → free-scan starts (not just sessions).
- **Cadence:** publish 2–3 cluster pages/month; refresh pillars quarterly; quarterly internal-link
  audit for orphans + anchor diversity.

## 11. Files delivered
```
robots.txt
sitemap.xml
assets/schema/organization-website.jsonld
assets/schema/service.jsonld
assets/schema/faqpage.jsonld
assets/schema/howto-breadcrumb.jsonld
docs/seo-strategy.md   (this)
seo.html               (visual architecture + cluster map + top-10 dashboard)
```
