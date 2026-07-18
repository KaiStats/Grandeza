const {DAYS} = require('./content-bank.js');

// Generate Instagram-specific captions for all 30 days
// Instagram captions: shorter, hashtag-forward, conversational tone
const INSTAGRAM_CAPTIONS = DAYS.map(d => {
  const baseHooks = {
    1: "One text. $1,500. #TCPA",
    2: "Your chatbot just lied to a customer. 🚨",
    3: "Nevada: Recording without consent = felony 🔴",
    4: "41/100. Here's what broke it.",
    5: "Your form just started a legal clock ⏰",
    6: "\"I smell gas.\" The AI said Tuesday. 🔥",
    7: "72 hours to prove you told them.",
    8: "Every data field = more risk",
    9: "Your vendor got breached. Guess whose data.",
    10: "I watched an AI quote a price you don't offer.",
    11: "STOP = STOP. Every message after that counts.",
    12: "Your tech pasted customer data into ChatGPT.",
    13: "Your vendor's contract says they don't tell you.",
    14: "Your AI just broke fair-housing law quietly.",
    15: "Airtight in January. Leaking by summer.",
    16: "TCPA claim landed. Insurance says no.",
    17: "4 controls = auto-fails. Period.",
    18: "One audit. Three failures. Zero disclosure. (True story)",
    19: "Most shops score 31-58. Here's what it means.",
    20: "One bad call. Add it up.",
    21: "\"My vendor handles compliance.\" (Almost never true.)",
    22: "12 states already require this. Nevada's next.",
    23: "Policy PDF = not proof. Only the binder counts.",
    24: "Competitor's fancy setup scored a 38.",
    25: "I spent 10 years investigating for Clark County. Now I help you avoid it.",
    26: "One text to 1k customers. That's a class action.",
    27: "One-to-One Consent. Most missed it in Jan 2026.",
    28: "One beeps. One saves you in court. 🚭",
    29: "Free. No sales call. Here's what you get.",
    30: "30 days. 16 controls. One question: where do you stand?"
  };

  const hashtags = [
    "#AI #Compliance #HVAC #Plumbing #TCPA #Legal #SmallBusiness #LasVegas #Governance",
    "#AIChatbot #LegalRisk #SmallBusiness #Compliance #Nevada #NRS200620",
    "#RecordingLaws #Compliance #Nevada #ContractorLife #AI",
    "#ComplianceScan #RiskAssessment #Business #Legal",
    "#DataPrivacy #NRS603A #Nevada #Legal #Business",
    "#AIFail #Escalation #Customer #Safety #Compliance",
    "#DataBreach #NotificationLaw #Nevada #Security",
    "#DataMinimization #Privacy #AI #Legal",
    "#Cybersecurity #VendorRisk #DataPrivacy #Business",
    "#AI #QualityControl #Accuracy #Compliance",
    "#TCPA #Marketing #Compliance #Legal #SMS",
    "#ContractorCompliance #Vendor #Legal #Risk",
    "#VendorRisk #DataBreach #Contracts #Legal #Nevada",
    "#FairHousing #AI #Bias #Discrimination #LegalRisk",
    "#Compliance #LegalUpdates #Business #Risk",
    "#TCPA #Insurance #Legal #Risk #Business",
    "#Compliance #AutoFail #RiskManagement #Legal",
    "#RealAudit #Compliance #HVAC #Plumbing",
    "#ComplianceScore #RiskBands #Assessment #Business",
    "#TCPA #LegalRisk #Chatbot #Compliance #Business",
    "#AI #Compliance #VendorManagement #Legal",
    "#AIDisclosure #Compliance #Legal #MultiState",
    "#Compliance #Documentation #Audit #Legal",
    "#ComplianceAudit #AI #RiskManagement #Business",
    "#Investigation #Compliance #RiskManagement #LasVegas",
    "#TCPA #ClassAction #Legal #TextMarketing #Risk",
    "#TCPA #Compliance #TextConsent #Legal #NeedsKnow",
    "#Compliance #Audit #Documentation #Legal #SmokeDetector",
    "#FreeAudit #Compliance #Assessment #NoSalesCall",
    "#Compliance #Assessment #FinalCall #16Controls #AiRisk"
  ];

  const captions = [
    `One text. $1,500. Is your chatbot TCPA-compliant?\n\n${hashtags[0]}`,
    `"Am I talking to a real person?"\n\nMost AI receptionists can't answer this.\n\n${hashtags[1]}`,
    `In Nevada, the wrong recording isn't a fine. It's a felony. 🔴\n\nNRS 200.620 = up to 4 years + $5k.\n\n${hashtags[2]}`,
    `I ran the free scan on a real shop. It scored a 41.\n\nHere's the control that sank it.\n\n${hashtags[3]}`,
    `Your intake form asks for a phone number.\n\nUnder Nevada law, that is regulated personal data the moment you collect it.\n\n${hashtags[4]}`,
    `A homeowner texted: "I smell gas."\n\nThe AI booked her for Tuesday.\n\nThat's a Control 07 failure.\n\n${hashtags[5]}`,
    `Data breach = 72 hours to notify everyone.\n\nIf you don't have the receipts, you're done.\n\n${hashtags[6]}`,
    `Every extra field your AI collects = one more thing a breach can expose.\n\nData minimization is real.\n\n${hashtags[7]}`,
    `Your AI vendor gets breached.\n\nGuess whose customer data they had.\n\n${hashtags[8]}`,
    `I watched an AI quote a price the company doesn't offer.\n\nThen a warranty they don't honor.\n\n${hashtags[9]}`,
    `Customer texts STOP.\n\nIf your system doesn't honor it instantly, every message after = fresh violation.\n\n${hashtags[10]}`,
    `One of your techs pasted a customer's info into ChatGPT.\n\nThat's YOUR breach now.\n\n${hashtags[11]}`,
    `Your AI vendor's contract probably says they don't have to tell you when they get breached.\n\nRead it.\n\n${hashtags[12]}`,
    `If your AI decides who gets a callback and who waits, it can quietly break fair-housing law.\n\n${hashtags[13]}`,
    `The compliance setup that was airtight in January is already leaking by summer.\n\nThe law moves that fast.\n\n${hashtags[14]}`,
    `A TCPA claim lands.\n\nYou call your insurance.\n\nThey point to the exclusion for AI and automated dialing.\n\n${hashtags[15]}`,
    `Four of the 16 controls are auto-fails.\n\nOne FAIL on ANY of them = your score is a warning light.\n\n${hashtags[16]}`,
    `One real audit. Three failures. Zero disclosure.\n\nSound familiar?\n\n${hashtags[17]}`,
    `Most contractors score between 31 and 58 the first time.\n\nHere's what your number actually means.\n\n${hashtags[18]}`,
    `One bad phone call.\n\nAdd up what your own AI can cost you before they hang up.\n\n${hashtags[19]}`,
    `"My AI vendor handles compliance."\n\nI hear it every week. It's almost never true.\n\n${hashtags[20]}`,
    `A dozen states now require you to tell people they're talking to AI.\n\nNevada will be next.\n\nGet ahead of it.\n\n${hashtags[21]}`,
    `A compliance policy PDF proves you wrote a policy.\n\nIt doesn't prove you followed it.\n\nOnly the binder does.\n\n${hashtags[22]}`,
    `I scanned a fancy AI-receptionist setup a competitor installed.\n\nIt scored a 38.\n\n${hashtags[23]}`,
    `I spent years investigating people for Clark County.\n\nNow I make sure you're not the one getting investigated.\n\n${hashtags[24]}`,
    `One text to a thousand customers with bad consent.\n\nThat's not a fine.\n\nThat's a class action with no ceiling.\n\n${hashtags[25]}`,
    `The rule that quietly changed everything in January 2026:\n\nOne-to-One Consent.\n\nMost shops missed it.\n\n${hashtags[26]}`,
    `Two smoke detectors.\n\nOne beeps.\n\nOne logs, tests monthly, and hands you the report.\n\nOnly one saves you in court. 🚭\n\n${hashtags[27]}`,
    `The scan is free.\n\nThe report is yours.\n\nThere's no mandatory sales call.\n\nHere's exactly what you get.\n\n${hashtags[28]}`,
    `30 days.\n\n16 controls.\n\nOne question left:\n\nWhere does your shop actually stand?\n\nGrandeza.io/scan\n\n${hashtags[29]}`
  ];

  return {
    day: d.day,
    instagram_caption: captions[d.day - 1] || captions[0],
    hashtag_set: hashtags[d.day - 1] || hashtags[0]
  };
});

console.log(JSON.stringify(INSTAGRAM_CAPTIONS, null, 2));
