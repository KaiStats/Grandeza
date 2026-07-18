// data/content-bank.js
//
// Reconstructed draft. The original shipped in a zip whose git history was
// truncated and could not be recovered; this version was re-authored from
// the maintainer's plain-language description (30 entries: control, format,
// hook, script, onscreen, linkedin, facebook — days 1-16 walk the controls
// heaviest-first, days 17-30 are composites/proofs/founder angles).
//
// Facts referenced below (TCPA per-text penalty range, NRS 200.620 felony
// exposure, NRS 603A breach notice, FTC Section 5) are the same verified
// figures already cited in src/build-scripts.js's "LEGAL FRAMING" block —
// nothing new is asserted here. No phantom law, no real prospect names.

const CONTROLS = {
  "01": { name: "AI Identity Disclosure",         wt: 8, pillar: "Disclosure" },
  "02": { name: "Consent Language & NRS 603A",    wt: 7, pillar: "Privacy" },
  "03": { name: "TCPA Outbound Compliance",       wt: 9, pillar: "Outbound" },
  "04": { name: "Data Minimization",              wt: 6, pillar: "Privacy" },
  "05": { name: "Third-Party Data Sharing",       wt: 6, pillar: "Privacy" },
  "06": { name: "Opt-Out Mechanism",              wt: 5, pillar: "Privacy" },
  "07": { name: "Human Override & Escalation",    wt: 7, pillar: "Guardrails" },
  "08": { name: "Employee AI Use Policy",         wt: 5, pillar: "Governance" },
  "09": { name: "Recording Consent & Disclosure", wt: 8, pillar: "Disclosure" },
  "10": { name: "Accuracy & Scope Limits",        wt: 6, pillar: "Guardrails" },
  "11": { name: "Vendor Contracts (DPA)",         wt: 5, pillar: "Governance" },
  "12": { name: "Incident Response Plan",         wt: 7, pillar: "Governance" },
  "13": { name: "Bias & Fairness Review",         wt: 5, pillar: "Guardrails" },
  "14": { name: "Audit Trail & Logs",             wt: 8, pillar: "Governance" },
  "15": { name: "Annual Compliance Review",       wt: 4, pillar: "Governance" },
  "16": { name: "Insurance (E&O / GL for AI)",    wt: 4, pillar: "Governance" },
};

function day(n, format, control, hook, script, onscreen, linkedin, facebook) {
  return { day: n, format, control, hook, script, onscreen, linkedin, facebook };
}

const DAYS = [
  day(1, "MATH", "03",
    "One bad AI text costs more than your monthly ad budget.",
    "TCPA penalties run $500 to $1,500 per unsolicited text — no class-action cap. If your AI agent is texting leads without a compliant consent trail, that's not one fine, it's one per message sent. Run the free scan before your outbound volume finds the ceiling for you.",
    ["$500–$1,500 / text", "NO class-action cap", "grandeza.io/scan"],
    "Your AI agent doesn't know it's exposing you to TCPA penalties.\n\nMost outbound AI setups skip the one thing that matters: a documented, compliant consent trail before the first text goes out.\n\n$500–$1,500 per text. No cap on how many stack up.\n\nWe built a free 16-control scan that checks this in minutes: grandeza.io/scan",
    "Quick math nobody wants to do: TCPA fines are $500–$1,500 PER text, and there's no cap. If your AI is texting leads, check your consent trail before it checks you. Free scan → grandeza.io/scan"),

  day(2, "AUDIT", "01",
    "Would your customers know they're talking to AI right now?",
    "AI identity disclosure isn't optional anymore — it's the fastest-moving compliance wave in the country, with states rolling out their own rules on top of FTC Section 5's ban on deceptive practices. If your voice agent or chatbot never says what it is, that's an audit finding waiting to happen. Get ahead of it.",
    ["Does it say \"I'm an AI\"?", "FTC Section 5: no deceptive practices", "grandeza.io/scan"],
    "Quick audit question: does your AI agent ever actually say it's AI?\n\nNot buried in a footer — out loud, at the start of the interaction.\n\nFTC Section 5 already bans deceptive trade practices, and a wave of state AI-disclosure laws is stacking on top of it. This is the easiest control to fix and the easiest one to get caught missing.\n\nFree 16-control scan: grandeza.io/scan",
    "Does your AI ever say \"I'm an AI\"? If the answer is no, that's control #1 on our free scan — and it's the cheapest fix on the whole list. grandeza.io/scan"),

  day(3, "EXPLAINER", "09",
    "In Nevada, recording a call without consent isn't a fine. It's a felony.",
    "NRS 200.620 makes unauthorized call recording a category D felony in Nevada — all-party consent, no exceptions for \"the AI didn't know.\" If your intake agent records calls for training or QA and never discloses it, that liability sits with the business, not the vendor. It's a one-line fix. Most setups never make it.",
    ["NRS 200.620", "Category D felony", "All-party consent required"],
    "This one surprises people: recording a call without disclosure in Nevada isn't a civil fine — it's a category D felony under NRS 200.620.\n\nAll-party consent, no carve-out for \"our AI vendor handled it.\"\n\nIf your intake system records for QA or training, the disclosure line has to be there and it has to be documented. One control, real exposure.\n\ngrandeza.io/scan",
    "Recording a call without consent in Nevada is a FELONY, not a fine (NRS 200.620). If your AI agent records calls, make sure the disclosure is actually there. grandeza.io/scan"),

  day(4, "SCORE", "14",
    "If you got audited tomorrow, could you produce the log?",
    "Audit trail isn't glamorous, but it's the control that decides whether every other control is provable. No logs means no evidence — and no evidence means every other 'we're compliant' claim is just a claim. It's weighted heavy in our scan for a reason: it's the one that backs up all the others.",
    ["No log = no proof", "Weight 8 of 16", "grandeza.io/scan"],
    "Here's the control most teams skip: audit trail & logs.\n\nEvery other compliance claim you make — disclosure, consent, opt-out — is only as good as your ability to prove it happened. Without logs, \"we're compliant\" is just a sentence.\n\nIt's one of our four auto-fail controls for exactly this reason. Score yours free: grandeza.io/scan",
    "Could you produce the log if you got audited tomorrow? If not, that's an auto-fail on our scan — and it's fixable in an afternoon. grandeza.io/scan"),

  day(5, "STORY", "02",
    "The consent checkbox everyone copies and nobody reads.",
    "Most intake forms borrow a consent line from a template that predates NRS 603A. It technically exists, so it feels done. It isn't. Consent language has to actually name what data is collected, why, and for how long — or it doesn't hold up. We see this gap on almost every first scan.",
    ["Copied ≠ compliant", "NRS 603A: name it, or it doesn't count", "grandeza.io/scan"],
    "The most common gap we see isn't a missing consent checkbox — it's a checkbox that was copied from a template three companies ago.\n\nNRS 603A requires consent language to actually name what's collected and why. \"I agree to the terms\" doesn't clear that bar.\n\nIt's a five-minute rewrite once you know it's the problem. grandeza.io/scan",
    "That consent checkbox on your form — was it written for your business, or copied from a template? NRS 603A cares about the difference. Free scan: grandeza.io/scan"),

  day(6, "MATH", "07",
    "What happens when your AI agent doesn't know the answer?",
    "Every AI intake flow eventually hits a question it shouldn't answer alone — a legal question, a pricing exception, an angry customer. Human override & escalation is the control that decides whether that moment becomes a save or a liability. No escalation path, no safety net.",
    ["No escalation path = no safety net", "Weight 7 of 16", "grandeza.io/scan"],
    "Your AI agent will eventually hit a question it shouldn't answer alone.\n\nThe question isn't whether that happens — it's whether there's a documented human escalation path when it does.\n\nWe weight this control at 7 of 16 because it's the difference between a recoverable moment and a liability. grandeza.io/scan",
    "What happens when your AI doesn't know the answer? If there's no human escalation path, that's the gap. Free scan → grandeza.io/scan"),

  day(7, "AUDIT", "12",
    "You have a fire extinguisher. Do you have an incident response plan for a data leak?",
    "Every business plans for the physical emergency. Almost none plan for the digital one. An incident response plan for AI-handled data isn't bureaucracy — it's the difference between a contained problem and a headline. If your answer to 'what happens if this leaks' is a shrug, that's the finding.",
    ["Physical emergency: planned for", "Data emergency: usually not", "grandeza.io/scan"],
    "Quick gut check: you almost certainly have a fire extinguisher and an evacuation plan.\n\nDo you have a written incident response plan for what happens if the data your AI agent handles leaks?\n\nMost businesses we scan don't. It's control #12, and it's the one that turns a bad day into a survivable one. grandeza.io/scan",
    "Fire extinguisher: yes. Incident response plan for a data leak: usually no. Which one are you missing? grandeza.io/scan"),

  day(8, "EXPLAINER", "04",
    "Your AI agent is collecting more data than it needs. That's the liability.",
    "Data minimization sounds abstract until you look at an actual intake transcript and count the fields being stored that never get used. Every field you don't need is a field you have to secure, disclose, and eventually explain. Less collected is less exposed.",
    ["Every unused field = exposure", "Collect less, secure less", "grandeza.io/scan"],
    "We pulled an intake transcript during a scan recently — well, we do this constantly — and the pattern is always the same: AI agents collect more than the business ever uses.\n\nEvery field stored is a field you have to secure and disclose. Data minimization isn't a privacy nicety, it's a smaller attack surface.\n\ngrandeza.io/scan",
    "If your AI agent is storing data it never actually uses, that's not thoroughness — it's unnecessary exposure. grandeza.io/scan"),

  day(9, "SCORE", "05",
    "Who else sees the data your AI agent collects?",
    "Third-party data sharing is the control businesses are least able to answer on the spot. Your AI vendor, your CRM, your marketing platform — each one is a hop the data takes, and each hop needs a documented reason. If you can't map it, you can't defend it.",
    ["Can you map every hop?", "Weight 6 of 16", "grandeza.io/scan"],
    "Ask yourself: every platform your AI agent's data touches after the conversation ends — can you list them?\n\nCRM, vendor, marketing tool, backup service. Each hop needs a reason you can point to.\n\nThis is control #5 on our scan, and it's usually the one people answer with a shrug. grandeza.io/scan",
    "Who else sees the data your AI agent collects? If you can't answer fast, that's the gap. Free scan: grandeza.io/scan"),

  day(10, "STORY", "10",
    "\"The AI told the customer something that wasn't true.\" We hear this more than you'd think.",
    "Accuracy & scope limits exists because AI agents are confident even when they're wrong. Without a documented scope — what it can and can't speak to — a hallucinated answer becomes your liability, not the vendor's. The fix isn't complicated: define the edges, log the exceptions.",
    ["Confident ≠ correct", "Undefined scope = your liability", "grandeza.io/scan"],
    "\"The AI told the customer something that wasn't true\" is a sentence we hear more than any vendor wants to admit.\n\nAI agents are confident by default, even when wrong. Without a documented scope of what it's allowed to speak to, that confidence becomes your liability.\n\nDefine the edges. Log the exceptions. grandeza.io/scan",
    "AI agents are confident even when they're wrong. Does yours have a documented scope of what it can and can't answer? grandeza.io/scan"),

  day(11, "MATH", "06",
    "\"STOP\" has to actually stop something.",
    "Opt-out mechanisms fail quietly — a keyword that doesn't route anywhere, a form that submits into a void. TCPA and CAN-SPAM both expect it to work in practice, not just exist in policy. Test yours today: text STOP, see what happens.",
    ["Test it: does STOP actually stop it?", "Weight 5 of 16", "grandeza.io/scan"],
    "Quick test you can run right now: text \"STOP\" to your own AI outbound number.\n\nDoes it actually stop, or does it just acknowledge and keep going?\n\nOpt-out mechanisms are one of the most-failed controls on our scan because they look done on paper and aren't tested in practice. grandeza.io/scan",
    "Text \"STOP\" to your own number. Did it actually stop? That's control #6. grandeza.io/scan"),

  day(12, "AUDIT", "08",
    "Does your team even know the rules for using AI at work?",
    "Employee AI use policy is the control that closes the human gap — the well-meaning staffer who pastes a customer's info into a chatbot to get a quick answer. Without a written policy, that's not an edge case, it's a matter of time.",
    ["No policy = matter of time", "Close the human gap", "grandeza.io/scan"],
    "The AI risk in your business isn't always the agent you built — sometimes it's a well-meaning employee pasting customer data into a chatbot for a quick answer.\n\nAn employee AI use policy closes that gap. Without one, it's not an edge case, it's a matter of time.\n\ngrandeza.io/scan",
    "Does your team have a written policy for using AI tools at work? If not, that's the gap most businesses miss. grandeza.io/scan"),

  day(13, "EXPLAINER", "11",
    "Your AI vendor's data practices are your data practices.",
    "A Data Processing Agreement isn't paperwork for its own sake — it's the document that puts liability where it belongs when a vendor mishandles data. Without one, every vendor failure lands on you by default. Check your contracts before you need to.",
    ["No DPA = liability defaults to you", "Weight 5 of 16", "grandeza.io/scan"],
    "If your AI vendor mishandles customer data and you don't have a signed DPA, the liability doesn't stay with the vendor — it defaults back to you.\n\nA Data Processing Agreement is the document that fixes that. Most businesses assume it exists. Fewer have actually checked.\n\ngrandeza.io/scan",
    "Do you have a signed DPA with every AI vendor touching customer data? If you're not sure, that's worth five minutes to check. grandeza.io/scan"),

  day(14, "SCORE", "13",
    "Has anyone checked your AI agent for bias?",
    "Bias & fairness review is the control businesses assume doesn't apply to them because they're not a hiring platform. But any AI system that scores, ranks, or filters people — leads, applicants, claims — carries the same exposure. A documented review is the answer, not a guess.",
    ["\"We're not hiring, so it doesn't apply\" — wrong", "Weight 5 of 16", "grandeza.io/scan"],
    "\"Bias review doesn't apply to us, we're not a hiring platform\" is the most common thing we hear right before we point out the lead-scoring model doing exactly that job.\n\nAny AI system that scores, ranks, or filters people carries this exposure. A documented review beats a guess. grandeza.io/scan",
    "If your AI scores, ranks, or filters people in any way — leads, applicants, claims — bias review applies to you. grandeza.io/scan"),

  day(15, "STORY", "15",
    "Compliant on launch day isn't compliant a year later.",
    "Laws change. Vendors change their terms. Your AI agent's scope creeps. Annual compliance review is the least exciting control on the list and the one that keeps every other control from going stale. Set the calendar reminder now.",
    ["Launch-day compliant ≠ still compliant", "Set the annual review", "grandeza.io/scan"],
    "The compliance work you did at launch has a shelf life. Laws change, vendor terms change, and your AI agent's scope quietly expands over a year.\n\nAn annual review is the least exciting control on our list — and the one that keeps every other control from going stale.\n\ngrandeza.io/scan",
    "Compliant on launch day isn't compliant a year later. When's your last review? grandeza.io/scan"),

  day(16, "MATH", "16",
    "Does your insurance actually cover an AI mistake?",
    "Most general liability and E&O policies were written before AI agents existed, and plenty of insurers now carve out AI-related claims explicitly. If you haven't asked your broker this exact question, you likely don't have coverage for the thing you're most exposed to.",
    ["Ask your broker this exact question", "Weight 4 of 16", "grandeza.io/scan"],
    "Have you asked your insurance broker, specifically, whether your E&O or GL policy covers a mistake made by your AI agent?\n\nA lot of policies were written before AI agents existed and now carve these claims out entirely. It's the lowest-weighted control on our scan and one of the most overlooked. grandeza.io/scan",
    "Does your insurance actually cover an AI mistake? Ask your broker the direct question — most policies don't. grandeza.io/scan"),

  day(17, "SCORE", "BANDS",
    "31 to 58. That's the typical first-scan score.",
    "Most businesses that run our free scan for the first time land between 31 and 58 out of 100 — \"Exposed\" to \"Developing.\" That's not a scare tactic, it's just what an unaudited AI intake setup looks like. The scan tells you exactly which controls to fix first.",
    ["Typical first score: 31–58", "That's Exposed to Developing", "grandeza.io/scan"],
    "Curious where you'd land? Most businesses running our free scan for the first time score between 31 and 58 out of 100.\n\nThat's the \"Exposed\" to \"Developing\" range — not a failing grade, just an honest starting point. The scan tells you exactly which of the 16 controls to fix first.\n\ngrandeza.io/scan",
    "Most first-time scores land 31–58 out of 100. Where would you land? grandeza.io/scan"),

  day(18, "AUDIT", "MULTI",
    "One FAIL and the whole scan flags red. Here's why.",
    "Four controls on our scan are auto-fails: TCPA outbound, AI identity disclosure, recording consent, and audit trail. Fail any one of those and your overall score doesn't matter — the scan flags red regardless of total. They're the controls with real legal teeth, not just best practice.",
    ["4 auto-fail controls", "One FAIL = red, regardless of score", "grandeza.io/scan"],
    "Here's a detail people miss about our scan: 4 of the 16 controls are auto-fails.\n\nTCPA outbound compliance, AI identity disclosure, recording consent, and audit trail. Fail any single one and the overall score doesn't save you — it flags red regardless of total.\n\nThose four have the sharpest legal teeth. Start there. grandeza.io/scan",
    "4 controls on our scan are auto-fails. Fail one and your score doesn't matter — it flags red no matter what. grandeza.io/scan"),

  day(19, "EXPLAINER", "SCAN",
    "The scan takes less time than reading this caption.",
    "grandeza.io/scan runs all 16 controls against your AI intake setup and hands back a scored breakdown — what's passing, what's failing, and which auto-fails need attention first. No sales call required to see where you stand.",
    ["16 controls, one scan", "No sales call required", "grandeza.io/scan"],
    "You don't need a sales call to find out where you stand. The free scan at grandeza.io/scan runs all 16 controls against your AI intake setup and hands back a scored breakdown in minutes — including which auto-fails to fix first.\n\ngrandeza.io/scan",
    "Free scan, 16 controls, no sales call. grandeza.io/scan"),

  day(20, "STORY", "BRAND",
    "Why we built the evidence layer instead of another AI feature.",
    "Every AI vendor sells you the agent. Almost none of them sell you the proof that the agent is compliant. We built Grandeza because the businesses adopting AI fastest are the ones with the least documentation to show for it — and that gap is where the real risk lives.",
    ["Everyone sells the agent", "Almost nobody sells the proof", "grandeza.io/scan"],
    "Every AI vendor pitch sounds the same: faster intake, more leads, less staff time.\n\nAlmost none of them hand you proof that the agent is compliant while it does that. We built Grandeza to be the evidence layer — the documentation that backs up the AI feature you already bought.\n\ngrandeza.io/scan",
    "AI vendors sell you the agent. We built the proof that it's compliant. grandeza.io/scan"),

  day(21, "MATH", "MULTI",
    "TCPA + recording consent + audit trail. Same call, three exposures.",
    "One inbound call handled by an AI agent can touch three auto-fail controls at once: was the AI disclosed, was the recording consented to, and is there a log of both? Most businesses have checked none of the three. Stack the fixes, don't stack the fines.",
    ["1 call, 3 auto-fail controls", "Check all three at once", "grandeza.io/scan"],
    "One AI-handled call can touch three auto-fail controls simultaneously: AI disclosure, recording consent, and the audit log proving both happened.\n\nMost businesses we scan have addressed none of the three. Good news — fixing them together takes an afternoon, not a quarter. grandeza.io/scan",
    "One call. Three auto-fail controls. Have you checked all three? grandeza.io/scan"),

  day(22, "SCORE", "MULTI",
    "Disclosure, Privacy, Outbound, Guardrails, Governance. Which pillar is weakest for you?",
    "Our 16 controls roll up into five pillars. Most businesses are strong in one and blind in another — usually Governance, because it's the least visible until an audit asks for it. The scan breaks your score down by pillar, not just a single number.",
    ["5 pillars, 1 score each", "Governance is usually the blind spot", "grandeza.io/scan"],
    "Our 16 controls roll up into 5 pillars: Disclosure, Privacy, Outbound, Guardrails, Governance.\n\nMost businesses we scan are decent in one or two and blind in Governance specifically — it's the least visible pillar until someone actually asks for the paperwork.\n\nThe scan scores each pillar separately, not just a single number. grandeza.io/scan",
    "5 pillars. Which one is your weak spot? Free breakdown: grandeza.io/scan"),

  day(23, "AUDIT", "MULTI",
    "The 5-minute version of a 16-control audit.",
    "You don't need the full scan to spot the biggest risks. Ask three questions right now: does your AI ever say it's AI, does STOP actually stop outbound texts, and could you produce a log if asked. Two or more \"no\"s means it's time to run the real thing.",
    ["3 questions, 5 minutes", "2+ \"no\"s = run the full scan", "grandeza.io/scan"],
    "Try the 5-minute version of our audit right now:\n\n1. Does your AI ever say it's AI?\n2. Does texting STOP actually stop outbound messages?\n3. Could you produce a log if someone asked?\n\nTwo or more \"no\"s means it's worth running the real 16-control scan. grandeza.io/scan",
    "3 quick questions to self-audit your AI setup — full list in comments/link. grandeza.io/scan"),

  day(24, "STORY", "SCRIPT",
    "\"We didn't think we needed a script for the AI. We were wrong.\"",
    "A composite from calls we've reviewed: an AI intake agent with no documented scope started answering pricing questions it was never trained to answer confidently — and inconsistently. No script, no scope limit, no audit trail to catch it until a customer flagged the mismatch. Every one of those is a control on our list.",
    ["No script = no scope", "Composite example, not a real client", "grandeza.io/scan"],
    "A pattern we see often enough to be a composite, not a one-off: an AI intake agent with no documented scope starts answering questions it was never scoped for — confidently, and inconsistently.\n\nNo script. No scope limit. No log to catch it until a customer notices. Every piece of that is a control on our scan.\n\ngrandeza.io/scan",
    "No documented scope for your AI agent means it'll eventually answer something it shouldn't. grandeza.io/scan"),

  day(25, "EXPLAINER", "BANDS",
    "\"Protected\" isn't a marketing word on our scan. It's a number.",
    "91 to 100 is our top band: Protected. It means all four auto-fail controls pass and the weighted total clears 91. Very few businesses land there on a first scan — it's a target you build toward, control by control, not a claim you make on day one.",
    ["91–100 = Protected", "Built control-by-control, not claimed", "grandeza.io/scan"],
    "\"Protected\" isn't a marketing label on our scan — it's a specific number: 91–100, with all four auto-fail controls passing.\n\nVery few businesses land there on a first scan, and that's fine. It's a target you build toward one control at a time, not something you claim on day one.\n\ngrandeza.io/scan",
    "Our top band is \"Protected\" — 91+ with every auto-fail passing. It's earned, not claimed. grandeza.io/scan"),

  day(26, "MATH", "MULTI",
    "16 controls. 4 are auto-fails. That's your priority order right there.",
    "If you're triaging with limited time, fix the auto-fails first: TCPA outbound, AI identity disclosure, recording consent, audit trail. Everything else adds points; those four determine the color of your result. Start where the scan starts.",
    ["Fix auto-fails first", "Everything else is points, these are the color", "grandeza.io/scan"],
    "If you only have time to fix a handful of things this week, fix the 4 auto-fails: TCPA outbound, AI disclosure, recording consent, audit trail.\n\nEverything else adds to your score. Those four determine whether the result is red at all. grandeza.io/scan",
    "4 controls determine red or not-red. Fix those first. grandeza.io/scan"),

  day(27, "STORY", "BRAND",
    "The scan exists because we kept seeing the same gap.",
    "We didn't set out to build a compliance product. We kept reviewing AI intake setups for other reasons and kept finding the same handful of missing controls, over and over, across businesses that had nothing else in common. The scan is that pattern, turned into a checklist anyone can run themselves.",
    ["Same gaps, different businesses", "Turned the pattern into a checklist", "grandeza.io/scan"],
    "We didn't set out to build a compliance tool. We kept reviewing AI intake setups and kept finding the same handful of missing controls, in businesses that had nothing else in common.\n\nThe scan is that pattern, turned into something you can run on yourself in minutes. grandeza.io/scan",
    "Same gaps, different businesses, every time. That's why we built the scan. grandeza.io/scan"),

  day(28, "SCORE", "MULTI",
    "Where do most businesses actually fail — Disclosure or Governance?",
    "Across the scans we run, Governance controls (audit trail, incident response, vendor DPAs) fail more often than Disclosure controls — not because they're harder, but because they're invisible day-to-day. Nobody notices a missing log until someone asks for it.",
    ["Governance fails more than Disclosure", "Invisible until someone asks", "grandeza.io/scan"],
    "Across the scans we run, Governance controls — audit trail, incident response, vendor DPAs — fail more often than Disclosure controls.\n\nNot because they're harder. Because they're invisible day-to-day. Nobody notices a missing log until someone asks for it. grandeza.io/scan",
    "Governance controls fail more than Disclosure ones. Not harder — just invisible until someone asks. grandeza.io/scan"),

  day(29, "AUDIT", "MULTI",
    "Run this before your next AI vendor demo.",
    "Before you sign anything, ask the vendor three things: do you support disclosure language out of the box, do you log every interaction by default, and is there a signed DPA available today. Their answers tell you more about your future audit than the product demo does.",
    ["3 questions for your next vendor demo", "The answers matter more than the demo", "grandeza.io/scan"],
    "Before your next AI vendor demo, ask three questions: does it support disclosure language out of the box, does it log every interaction by default, and is a signed DPA available today.\n\nThe answers tell you more about your future audit exposure than the feature demo ever will. grandeza.io/scan",
    "3 questions to ask before you sign with any AI vendor. grandeza.io/scan"),

  day(30, "STORY", "SCAN",
    "30 days of controls. One free scan to check them all.",
    "We've walked all 16 controls this month — the auto-fails, the quiet governance gaps, the composite pillars. If you've been following along and want the actual number, the scan takes less time than this post did to read. grandeza.io/scan.",
    ["16 controls, 30 days, 1 scan", "grandeza.io/scan", "Start where you are"],
    "That's 30 days and all 16 controls — the auto-fails, the quiet governance gaps, the pillars that roll them up.\n\nIf you've been following along, the natural next step is just running the actual scan on your own setup. It takes less time than this post did.\n\ngrandeza.io/scan",
    "16 controls, 30 days of posts, 1 free scan to see where you actually stand. grandeza.io/scan"),
];

module.exports = { CONTROLS, DAYS };
