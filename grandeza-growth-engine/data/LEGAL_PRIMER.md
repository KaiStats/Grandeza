# The 4 laws behind the 16 controls

A plain-English explainer for future readers of this repo. If you're new here:
the Grandeza Scan checks 16 controls (`data/controls.json`), but almost all
the legal weight behind them traces back to just **four** underlying rules.
This doc explains those four rules in plain language, then explains why the
scan still uses 16 controls instead of 4.

## First: what's a "citation"?

It's just the address where a law lives, so anyone can look it up and check
you're telling the truth. Two rulebooks matter here:

- **U.S.C.** = the United States' big book of national laws.
- **NRS** = Nevada's book of state laws.
- **§** just means "section" — like a chapter number.

So "47 U.S.C. § 227" means: national rulebook, book 47, section 227.

## The four rules

### 1. The Texting Rule (TCPA)

If a business wants to text or robo-call a cell phone to sell something, it
needs the person's clear "yes, you can text me" — in writing — first.

- **Breaking it:** texting people who never said yes. Every text is its own
  violation.
- **The cost:** about $500 per text, up to $1,500 if done knowingly. No cap
  if a group sues together (class action).
- **Address:** 47 U.S.C. § 227.
- **Fun twist:** an even stricter version of this rule ("one-to-one consent")
  was supposed to take effect in 2025 — but a federal court threw it out
  (*Insurance Marketing Coalition v. FCC*, 11th Cir., Jan. 24, 2025) three
  days before it would have started. It never became real law. The older
  "get it in writing, for your business specifically" rule is the one that
  still counts — see `CORRECTIONS.md` and `data/legal-spine.json`.

### 2. The Recording Rule (Nevada)

In Nevada, if you record a phone call, everyone on the call has to agree —
not just you.

- **Breaking it:** recording a call when someone didn't consent.
- **The cost:** a felony — up to 4 years in prison and a $5,000 fine.
- **Address:** NRS 200.620, penalty NRS 193.130. Two court cases explain it:
  *Lane v. Allstate* (1998, regular phone calls) and *Sharpe v. State* (2015,
  extended the same rule to cell calls and text messages).

### 3. The Keep-It-Safe Rule (Nevada data law)

If a business keeps people's private info (like phone numbers), it has to
guard it — and if there's a breach, it has to tell people without
unreasonable delay.

- **Breaking it:** being careless with the info, or sitting on a breach.
- **The cost:** Nevada's Attorney General can come after the business.
- **Address:** NRS 603A — specifically .210 (security), .215 (payment-card
  data must follow PCI DSS), .220 (breach notice), .290 (AG enforcement).
- **Note:** there's no fixed "72 hours" clock in Nevada law — that number is
  from GDPR (the EU), not Nevada. Nevada just says "without unreasonable
  delay."

### 4. The No-Tricking Rule (FTC)

Businesses aren't allowed to fool people. An AI pretending to be a human
counts as fooling people.

- **Breaking it:** letting an AI act like a person without ever disclosing
  it's a bot.
- **Address:** 15 U.S.C. § 45 (FTC Act, Section 5).

## Why the scan still has 16 controls, not 4

The four rules above are the *legal domains*. The 16 controls are the
checklist inside each domain — and most of them don't collapse cleanly into
one pass/fail per law:

- **One law, several separate failure points.** "Follow the Texting Rule"
  isn't one action. Control 02 checks whether consent language exists at
  all; Control 03 checks whether that consent is the *right kind* (for your
  business specifically, not a shared lead list); Control 06 checks whether
  opt-out (STOP) actually works; and none of the four laws mention 10DLC
  carrier registration, which still breaks your texts if it's missing. A
  shop that's fixed 3 of these 4 things looks identical to a shop that's
  fixed none of them if you only score "Texting: pass/fail."

- **Half the controls aren't required by any of the four laws.** Controls
  07 (human override), 08 (employee AI policy), 10 (accuracy/scope limits),
  11 (vendor DPAs), 12 (incident response plan), 13 (bias/fairness review),
  15 (annual review), and 16 (insurance) don't come from a specific statute.
  They're the difference between "technically legal" and "defensible" —
  whether a business can actually produce evidence and recover cleanly when
  something goes wrong, not just whether it broke a rule on paper.

- **The scoring needs the resolution.** 0–100 with five bands (Critical →
  Protected) and four auto-fail controls only works with enough independent
  line items to produce a real spread. Four pass/fail checks give 16
  possible outcomes; a business can't be told "you're at 41/100, here's
  exactly what to fix next" with only four checkboxes.

So: four laws, sixteen controls. The laws are the "why." The controls are
the "what to actually go check."
