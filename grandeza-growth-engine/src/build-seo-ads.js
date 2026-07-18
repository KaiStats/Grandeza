const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  BorderStyle, PageBreak, Table, TableRow, TableCell, WidthType, ShadingType
} = require('docx');

const NAVY="1F2A44", GOLD="B8862B", SLATE="3A3F4B", LIGHT="F1EFE9", MONO="2B2B2B";

const rule=(color=GOLD,size=12)=>new Paragraph({spacing:{before:40,after:120},border:{bottom:{color,space:1,style:BorderStyle.SINGLE,size}},children:[]});
const P=(t,o={})=>new Paragraph({spacing:{after:o.after??120,before:o.before??0,line:276},alignment:o.align,indent:o.indent,children:[new TextRun({text:t,bold:o.bold,italics:o.italics,size:o.size??21,color:o.color??SLATE,font:"Calibri"})]});
const H1=(t)=>new Paragraph({heading:HeadingLevel.HEADING_1,spacing:{before:160,after:80},children:[new TextRun({text:t,bold:true,size:30,color:NAVY,font:"Calibri"})]});
const H2=(t)=>new Paragraph({heading:HeadingLevel.HEADING_2,spacing:{before:140,after:60},children:[new TextRun({text:t,bold:true,size:24,color:NAVY,font:"Calibri"})]});
const label=(t,c=GOLD)=>new Paragraph({spacing:{after:60,before:40},children:[new TextRun({text:t,bold:true,size:17,color:c,font:"Calibri",allCaps:true,characterSpacing:20})]});
const bullet=(t,o={})=>new Paragraph({spacing:{after:60},indent:{left:280,hanging:180},children:[new TextRun({text:"•  ",bold:true,color:GOLD,size:20,font:"Calibri"}),new TextRun({text:t,size:o.size??20,color:o.color??SLATE,font:"Calibri",bold:o.bold})]});
const code=(t)=>new Paragraph({spacing:{after:20},shading:{type:ShadingType.CLEAR,fill:"F4F2ED",color:"auto"},children:[new TextRun({text:t,size:16,color:MONO,font:"Consolas"})]});

function cover(title,sub,tagline){
  return [
    new Paragraph({spacing:{before:1200,after:60},alignment:AlignmentType.CENTER,children:[new TextRun({text:"GRANDEZA",bold:true,size:60,color:NAVY,font:"Calibri",characterSpacing:60})]}),
    new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:280},children:[new TextRun({text:title,size:26,color:GOLD,font:"Calibri",characterSpacing:40,bold:true})]}),
    new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:100},children:[new TextRun({text:sub,size:20,italics:true,color:SLATE,font:"Calibri"})]}),
    new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:400},children:[new TextRun({text:tagline,size:18,color:NAVY,font:"Calibri",bold:true})]}),
    new Paragraph({children:[new PageBreak()]})
  ];
}

function table(headers,rows,colw){
  if(headers.length!==colw.length) throw new Error(`HEADER mismatch: ${headers.length} headers vs ${colw.length} widths :: ${headers.join("|")}`);
  rows.forEach((r,i)=>{ if(r.length!==colw.length) throw new Error(`ROW ${i} mismatch: ${r.length} cells vs ${colw.length} widths :: ${r.join("|")}`); });
  const total=colw.reduce((a,b)=>a+b,0);
  const cell=(t,w,o={})=>new TableCell({width:{size:w,type:WidthType.DXA},
    shading:o.fill?{type:ShadingType.CLEAR,fill:o.fill,color:"auto"}:undefined,
    margins:{top:40,bottom:40,left:80,right:80},
    children:String(t).split("\n").map(line=>new Paragraph({children:[new TextRun({text:line,bold:o.bold,size:o.size??15,color:o.color??SLATE,font:"Calibri"})]}))});
  const trs=[new TableRow({tableHeader:true,children:headers.map((h,i)=>cell(h,colw[i],{bold:true,color:"FFFFFF",fill:NAVY,size:15}))})];
  rows.forEach((r,ri)=>trs.push(new TableRow({children:r.map((c,i)=>cell(c,colw[i],{fill:ri%2?LIGHT:"FFFFFF"}))})));
  return new Table({width:{size:total,type:WidthType.DXA},columnWidths:colw,
    borders:{top:{style:BorderStyle.SINGLE,size:2,color:"D8D2C4"},bottom:{style:BorderStyle.SINGLE,size:2,color:"D8D2C4"},
      left:{style:BorderStyle.NONE},right:{style:BorderStyle.NONE},
      insideHorizontal:{style:BorderStyle.SINGLE,size:1,color:"E6E1D6"},insideVertical:{style:BorderStyle.NONE}},
    rows:trs});
}
const section=(children)=>({properties:{page:{size:{width:12240,height:15840},margin:{top:1080,bottom:1080,left:1200,right:1200}}},children});
const save=(doc,path)=>Packer.toBuffer(doc).then(b=>{fs.writeFileSync(path,b);console.log(path.split("/").pop(),b.length,"bytes");});

// ============================ SEO PACKAGE ============================
(function(){
  const c=[];
  c.push(...cover("SEO GROWTH PACKAGE","Keyword strategy · on-page · schema · content plan · local & AI visibility","grandeza.io"));

  c.push(H1("The wedge — why Grandeza can win search"));
  c.push(rule());
  c.push(P("The AI-compliance search space is crowded at the top (VerityAI, Vanta, Comp AI, Delve, ComplyGuard) — but every one of them chases enterprise buyers and EU/SOC-2 framing. None of them own the phrase that matters to your customer: a Las Vegas HVAC or plumbing owner who just realized their AI texts customers.",{after:120}));
  c.push(P("That gap is the whole strategy. Grandeza should not try to rank for \"AI compliance software.\" It should own the long-tail intersection of {trade} + {TCPA / call recording / AI disclosure} + {Nevada / Las Vegas}. Those queries are lower volume, far lower competition, and near-perfect purchase intent. As you expand to FL/TX, the same template clones per state.",{after:120}));
  c.push(label("One finding worth acting on today"));
  c.push(P("grandeza.io barely surfaces in organic search right now — it has almost no indexed footprint. That's not a problem, it's a blank canvas: you get to define the on-page structure and schema correctly from the start instead of untangling legacy SEO debt.",{after:120}));

  c.push(new Paragraph({children:[new PageBreak()]}));
  c.push(H1("Keyword strategy"));
  c.push(rule());
  c.push(P("Grouped by cluster and buyer intent. Competition ratings are directional (based on current SERP crowding, not a paid tool). Priority = where to spend first. Chase the LOW-competition, HIGH-intent local and trade terms before the broad ones.",{after:120,italics:true}));

  c.push(H2("Cluster 1 — Trade + TCPA (highest intent, lowest competition)"));
  c.push(table(
    ["Target keyword","Intent","Competition","Priority"],
    [
     ["HVAC TCPA compliance Las Vegas","Buyer","Low","P1"],
     ["plumber text message consent law Nevada","Buyer","Low","P1"],
     ["contractor AI chatbot compliance","Buyer","Low-Med","P1"],
     ["can HVAC companies text customers legally","Research→Buyer","Low","P1"],
     ["10DLC registration for HVAC contractors","Research","Med","P2"],
     ["TCPA compliance for home service businesses","Buyer","Med","P2"],
    ],[3600,1900,1900,1400]));

  c.push(H2("Cluster 2 — Nevada call recording & AI disclosure"));
  c.push(table(
    ["Target keyword","Intent","Competition","Priority"],
    [
     ["Nevada call recording consent law business","Research","Low-Med","P1"],
     ["NRS 200.620 recording consent explained","Research","Low","P1"],
     ["is it legal to record calls in Nevada","Research","Med","P2"],
     ["AI receptionist compliance Nevada","Buyer","Low","P1"],
     ["do I have to tell customers my chatbot is AI","Research","Low","P2"],
     ["AI disclosure law by state 2026","Research","Med","P3"],
    ],[3600,1900,1900,1400]));

  c.push(H2("Cluster 3 — Product / bottom-funnel"));
  c.push(table(
    ["Target keyword","Intent","Competition","Priority"],
    [
     ["free AI compliance scan","Buyer","Med","P1"],
     ["AI chatbot compliance audit","Buyer","Low-Med","P1"],
     ["AI compliance checklist small business","Research","Med","P2"],
     ["how to make my AI receptionist compliant","Buyer","Low","P1"],
    ],[3600,1900,1900,1400]));

  c.push(new Paragraph({children:[new PageBreak()]}));
  c.push(H1("On-page — build these pages"));
  c.push(rule());
  c.push(P("Each row is one page to build or optimize. Title tags ≤ 60 chars, meta descriptions ≤ 155. H1 matches search intent, not brand slogans.",{after:120,italics:true}));
  c.push(table(
    ["Page","Title tag","H1"],
    [
     ["Home","AI Compliance Scan for Contractors | Grandeza","Is your AI putting your business at legal risk?"],
     ["Free Scan (money page)","Free AI Compliance Scan — 16 Controls | Grandeza","Get your Grandeza Score in 12 minutes — free"],
     ["HVAC landing","HVAC AI & TCPA Compliance (Las Vegas) | Grandeza","Your HVAC chatbot is texting customers. Is it legal?"],
     ["Plumbing landing","Plumbing AI Compliance & TCPA | Grandeza","Plumbers: your AI can create $1,500-per-text exposure"],
     ["Nevada recording law","Nevada Call Recording Law for Business | Grandeza","NRS 200.620: recording a call wrong is a felony"],
     ["TCPA guide (pillar)","TCPA Texting Rules for Contractors (2026) | Grandeza","The 2026 TCPA texting rules every contractor needs"],
    ],[1700,3300,4360]));

  c.push(H2("On-page checklist (every page)"));
  [ "One H1 that contains the primary keyword and reads like the searcher's question.",
    "First 100 words answer the query directly — this is what AI engines (ChatGPT/Claude/Perplexity) quote.",
    "One clear CTA above the fold: \"Run the free scan.\" Repeat it after each section.",
    "Internal links: every trade/law page links to the Free Scan money page with descriptive anchor text.",
    "FAQ block at the bottom of each page (3–5 real questions) — powers FAQ schema AND AI citations.",
    "No fabricated law. Cite NRS 200.620, NRS 603A, the federal TCPA, FTC §5 accurately. Never reference a phantom 'SB 149' or deadline."
  ].forEach(t=>c.push(bullet(t)));

  c.push(new Paragraph({children:[new PageBreak()]}));
  c.push(H1("Schema markup (JSON-LD)"));
  c.push(rule());
  c.push(P("Paste into the <head> of the matching page. Schema is how you win rich results and get pulled into AI answers. Three types cover you: Organization (site-wide), Service (scan pages), FAQPage (any page with a FAQ block).",{after:120}));
  c.push(label("1 — Organization  (site-wide, in the footer or head)"));
  [ '<script type="application/ld+json">',
    '{',
    '  "@context":"https://schema.org",',
    '  "@type":"Organization",',
    '  "name":"Grandeza",',
    '  "url":"https://grandeza.io",',
    '  "description":"AI governance & compliance for service businesses. The',
    '   evidence layer: consent docs, audit trails, and the 16-control scan.",',
    '  "areaServed":["Las Vegas NV","Nevada","Florida","Texas"],',
    '  "knowsAbout":["TCPA compliance","NRS 200.620","AI disclosure","NRS 603A"],',
    '  "contactPoint":{"@type":"ContactPoint","email":"Kai@grandeza.io",',
    '   "contactType":"sales"}',
    '}</script>'
  ].forEach(l=>c.push(code(l)));
  c.push(label("2 — Service  (on the Free Scan page)"));
  [ '<script type="application/ld+json">',
    '{',
    '  "@context":"https://schema.org",',
    '  "@type":"Service",',
    '  "serviceType":"AI Compliance Scan",',
    '  "url":"https://grandeza.io/scan",',
    '  "provider":{"@type":"Organization","name":"Grandeza"},',
    '  "areaServed":"US",',
    '  "description":"A free, human-led audit across 16 weighted controls',
    '   producing a 0–100 Grandeza Score and a plain-English exposure report.",',
    '  "offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}',
    '}</script>'
  ].forEach(l=>c.push(code(l)));
  c.push(label("3 — FAQPage  (bottom of each trade/law page)"));
  [ '<script type="application/ld+json">',
    '{',
    '  "@context":"https://schema.org","@type":"FAQPage",',
    '  "mainEntity":[{',
    '    "@type":"Question",',
    '    "name":"Can HVAC companies text customers legally?",',
    '    "acceptedAnswer":{"@type":"Answer","text":"Only with prior express',
    '     written consent on file, from a registered 10DLC number. Under the',
    '     federal TCPA each non-compliant text is $500–$1,500 in exposure."}',
    '  }]',
    '}</script>'
  ].forEach(l=>c.push(code(l)));

  c.push(new Paragraph({children:[new PageBreak()]}));
  c.push(H1("Content plan — turn the 30-day bank into evergreen SEO"));
  c.push(rule());
  c.push(P("Your daily social scripts are already keyword-rich. Repurpose them into a pillar-and-cluster blog structure. One pillar page per cluster, each control script becomes a supporting article that links up to the pillar and over to the Free Scan.",{after:120}));
  c.push(table(
    ["Pillar page","Supporting articles (from the 30-day bank)","Links to"],
    [
     ["The 2026 TCPA Texting Rules for Contractors","Day 1 ($1,500/text), Day 11 (STOP), Day 26 (class-action math), Day 27 (One-to-One Consent)","Free Scan"],
     ["Nevada AI & Recording Law for Businesses","Day 3 (NRS 200.620), Day 5 (NRS 603A), Day 22 (disclosure/get-ahead)","HVAC + Plumbing pages"],
     ["What a Compliant AI Receptionist Looks Like","Day 6 (escalation), Day 10 (scope limits), Day 23 (policy vs binder), Day 28 (smoke-detector)","Free Scan"],
     ["The 16-Control AI Compliance Checklist","Day 17 (critical four), Day 19 (score bands), Day 29 (what the report is)","Free Scan"],
    ],[3000,4360,2000]));
  c.push(H2("Publishing cadence"));
  c.push(bullet("2 blog posts/week, each expanded from a day's script to ~800–1,200 words. 30 days of social = ~15 weeks of blog fuel."));
  c.push(bullet("Every post: target one keyword from the tables above, put the answer in the first paragraph, end with the Free Scan CTA + FAQ schema."));
  c.push(bullet("Republish each social post's hook as the meta description — you already wrote the highest-converting version."));

  c.push(new Paragraph({children:[new PageBreak()]}));
  c.push(H1("Local + AI visibility (do these too)"));
  c.push(rule());
  c.push(H2("Local SEO (Las Vegas first, clone per market)"));
  [ "Google Business Profile: category \"Business management consultant\" / \"Software company\"; service area = Las Vegas metro; post the smoke-detector graphic weekly.",
    "Get listed accurately in NAP-consistent directories. Consistency > volume.",
    "Build one city page per expansion market (Las Vegas → Henderson → then FL/TX cities) using the same template with local law swapped in.",
  ].forEach(t=>c.push(bullet(t)));
  c.push(H2("AI visibility / GEO — get cited by ChatGPT, Claude, Perplexity"));
  [ "AI engines quote pages that answer the question cleanly in the first paragraph and carry FAQ schema. Your content is already structured for this — lean into it.",
    "Target the exact questions contractors type into AI: \"is my HVAC chatbot legal,\" \"do I need consent to text customers,\" \"Nevada call recording law.\" Own the clean answer and you become the cited source.",
    "This is where a small brand beats Vanta: they write for CISOs; you write for the owner asking the AI a plain question. That's the query AI assistants actually get."
  ].forEach(t=>c.push(bullet(t)));

  save(new Document({creator:"Grandeza",styles:{default:{document:{run:{font:"Calibri"}}}},sections:[section(c)]}),
    require("path").join(__dirname,"..","outputs","Grandeza_SEO_Growth_Package.docx"));
})();

// ============================ ADS + COMMERCIALS ============================
(function(){
  const c=[];
  c.push(...cover("ADVERTISING & COMMERCIAL SCRIPTS","Meta + LinkedIn + Google paid ads · 15/30/60-sec commercials · production notes","grandeza.io"));

  c.push(H1("Read first"));
  c.push(rule());
  c.push(P("Every ad here sells the evidence layer — never bot features. The legal figures are verified: federal TCPA ($500–$1,500/text), NRS 200.620 (Nevada felony recording), FTC §5. No 'SB 149,' no deadline. Ad platforms reject unverifiable legal-fear claims, so the copy stays on solid, provable ground.",{after:120}));

  c.push(H1("Meta (Facebook / Instagram) — paid ad sets"));
  c.push(rule());
  c.push(P("Structure per ad: Primary text (above image) · Headline (bold, under image) · Description · CTA button. Target: HVAC/plumbing business owners, Las Vegas metro, interests in ServiceTitan/Housecall Pro/contractor groups. Run as a 3-variant test.",{after:120,italics:true}));

  const metaAds=[
    ["A — The dollar hook (cold)","Your chatbot texted a customer this morning. If the consent isn't on file, that one text is worth up to $1,500 to a plaintiff's attorney — and the class action has no cap.\n\nMost HVAC & plumbing shops can't prove consent if a lawyer asks. The free Grandeza Scan checks all 16 ways your AI can expose you, in about 12 minutes.","Is your AI texting you into a lawsuit?","Free scan. Your report to keep. No mandatory call.","Get offer / Learn more"],
    ["B — The Nevada felony hook (local)","In Nevada, recording a customer call the wrong way isn't a fine — under NRS 200.620 it's a felony. And it applies based on where your customer is standing, not their area code.\n\nIf your AI receptionist records calls, does it ask consent every time — and log it? Find out free.","Your AI records calls. Is that a felony?","16-control scan · built for Las Vegas contractors","Learn more"],
    ["C — The good-shop hook (retargeting)","You run a clean shop. Licensed techs, quality work, good reviews. But your AI chatbot might be texting without consent, recording without disclosure, and keeping no records to prove any of it.\n\nA great business can still have a wide-open AI. See your Grandeza Score free.","A clean shop can have a wide-open AI.","Most contractors score 31–58 the first time.","Get your score"],
    ["D — The smoke-detector hook (brand)","Two smoke detectors. Both work. But only one logs every test and can prove it was working when it mattered. In court, only one saves you.\n\nYour AI 'works' — it books jobs. But can it prove what it did and who consented? That's the evidence layer. That's Grandeza.","The AI that can prove it. Not just the one that beeps.","Free 16-control scan → grandeza.io/scan","Learn more"],
  ];
  metaAds.forEach(a=>{
    c.push(label(a[0]));
    c.push(P("Primary text:",{bold:true,after:20,size:18}));
    a[1].split("\n").forEach(l=>c.push(P(l||" ",{after:l?40:20,size:19})));
    c.push(new Paragraph({spacing:{after:40},children:[new TextRun({text:"Headline:  ",bold:true,size:18,color:NAVY,font:"Calibri"}),new TextRun({text:a[2],size:19,color:SLATE,font:"Calibri",bold:true})]}));
    c.push(new Paragraph({spacing:{after:40},children:[new TextRun({text:"Description:  ",bold:true,size:18,color:NAVY,font:"Calibri"}),new TextRun({text:a[3],size:19,color:SLATE,font:"Calibri"})]}));
    c.push(new Paragraph({spacing:{after:140},children:[new TextRun({text:"CTA button:  ",bold:true,size:18,color:NAVY,font:"Calibri"}),new TextRun({text:a[4],size:19,color:SLATE,font:"Calibri"})]}));
  });

  c.push(new Paragraph({children:[new PageBreak()]}));
  c.push(H1("LinkedIn — paid ads"));
  c.push(rule());
  c.push(P("LinkedIn skews B2B and professional. Lead with the legal/authority frame. Target: owners/GMs of HVAC, plumbing, home-services companies; Las Vegas + Nevada; company size 1–50.",{after:120,italics:true}));
  c.push(label("Single-image ad"));
  c.push(P("Intro text:",{bold:true,after:20,size:18}));
  ["There's no Nevada law today forcing you to disclose your chatbot is AI — that bill (SB 199) failed last session.",
   "But FTC Section 5 already treats a bot posing as human as deceptive, and CA, CO, UT, TX, and IL have live disclosure laws. Nevada will be back.",
   "The shops documenting now aren't the ones scrambling later. The free Grandeza Scan checks all 16 controls. The report is yours."
  ].forEach(l=>c.push(P(l,{after:40,size:19})));
  c.push(new Paragraph({spacing:{after:40},children:[new TextRun({text:"Headline:  ",bold:true,size:18,color:NAVY,font:"Calibri"}),new TextRun({text:"Get ahead of AI compliance — before it's a deadline.",size:19,bold:true,color:SLATE,font:"Calibri"})]}));
  c.push(new Paragraph({spacing:{after:140},children:[new TextRun({text:"CTA:  ",bold:true,size:18,color:NAVY,font:"Calibri"}),new TextRun({text:"Learn more → grandeza.io/scan",size:19,color:SLATE,font:"Calibri"})]}));
  c.push(label("Document / carousel ad (lead magnet)"));
  c.push(P("Repurpose the \"16-Control AI Compliance Checklist\" as a downloadable PDF gated behind a LinkedIn lead form. Headline: \"The 16 ways your AI can cost you — free checklist.\" This captures leads who aren't ready to scan yet.",{after:120}));

  c.push(H1("Google Search — Responsive Search Ad"));
  c.push(rule());
  c.push(P("For high-intent searches (\"HVAC TCPA compliance,\" \"Nevada call recording law business,\" \"AI compliance scan\"). Provide these assets; Google assembles them.",{after:120,italics:true}));
  c.push(label("Headlines (30 char max each)"));
  ["Free AI Compliance Scan","Is Your AI Chatbot Legal?","HVAC TCPA Compliance Check","16-Control Grandeza Scan","$1,500 Per Non-Consent Text","Nevada AI Compliance","Score Your AI in 12 Minutes","Report Is Yours — No Catch"].forEach(h=>c.push(bullet(h,{size:19})));
  c.push(label("Descriptions (90 char max each)"));
  ["Free 16-control scan shows exactly where your AI creates legal exposure. Report yours to keep.",
   "One bad text can cost $1,500 under the TCPA. Find your gaps before a plaintiff's attorney does.",
   "Built for HVAC & plumbing contractors. Human-led audit, plain-English score. No mandatory call."
  ].forEach(d=>c.push(bullet(d,{size:19})));

  c.push(new Paragraph({children:[new PageBreak()]}));
  c.push(H1("The commercial — 30-second spot"));
  c.push(rule());
  c.push(P("The flagship. Cold open on the fear, land on the calm. Shootable on a phone with CapCut, or storyboard it for an editor. Two-column: what's on screen / what's said.",{after:120,italics:true}));
  c.push(table(
    ["Time · Shot","Voiceover / On-screen text"],
    [
     ["0–4s\nClose-up: a phone screen, a text sending to a customer","VO: \"This text just went out from your AI.\"\nText overlay: A customer just got a text from your AI."],
     ["4–9s\nCut to a legal-looking document, a gavel, or $ counter ticking","VO: \"If you can't prove they agreed to it — that's up to $1,500. Per text.\"\nOverlay: $500–$1,500 per text · TCPA"],
     ["9–15s\nQuick montage: bot recording a call, texting, no records saved","VO: \"Your AI records calls, sends texts, talks to customers all day. And keeps no proof of any of it.\"\nOverlay: Records · Texts · Remembers nothing"],
     ["15–21s\nTwo smoke detectors side by side; one beeps, one shows a green log","VO: \"Two smoke detectors. Both work. Only one can prove it. In court, that's the only one that matters.\"\nOverlay: Which one is your AI?"],
     ["21–27s\nClean shot: laptop showing the Grandeza Score populating to a number","VO: \"Grandeza scans your AI across 16 controls and shows you exactly where you're exposed. Free. The report is yours.\"\nOverlay: 16 controls · your Grandeza Score"],
     ["27–30s\nLogo + URL, calm and confident","VO: \"Be the shop that's ahead of it — not under it.\"\nOverlay: grandeza.io/scan · Free scan"],
    ],[2600,6760]));

  c.push(new Paragraph({children:[new PageBreak()]}));
  c.push(H1("15-second cut (Reels / Shorts / pre-roll)"));
  c.push(rule());
  c.push(table(
    ["Time","Voiceover / On-screen"],
    [
     ["0–4s","VO: \"Your AI just texted a customer. If they didn't consent — up to $1,500.\"\nOverlay: 1 text = up to $1,500"],
     ["4–9s","VO: \"It records calls, keeps no proof, never says it's AI. That's three violations before lunch.\"\nOverlay: No consent · No log · No disclosure"],
     ["9–15s","VO: \"Grandeza scans all 16. Free. Find out where you stand.\"\nOverlay: grandeza.io"],
    ],[1400,7960]));

  c.push(H1("60-second explainer (website hero / YouTube)"));
  c.push(rule());
  c.push(P("Same arc as the 30s, expanded with the gas-leak story and the founder authority beat. Structure:",{after:80}));
  c.push(bullet("0–10s — Hook: the text that costs $1,500. Establish the stakes."));
  c.push(bullet("10–25s — The gas-leak story (Day 6/18): a customer reported a gas smell, the AI booked Tuesday. Three heavy controls failed in one call. Makes it visceral."));
  c.push(bullet("25–40s — The reframe: a good shop can have a wide-open AI. The AI is a door most owners never checked."));
  c.push(bullet("40–52s — Founder beat: \"I spent years investigating for Clark County. I find the gaps that build a case — before someone else does.\""));
  c.push(bullet("52–60s — The scan: 16 controls, free, report is yours, no mandatory call. grandeza.io."));

  c.push(new Paragraph({children:[new PageBreak()]}));
  c.push(H1("Production notes"));
  c.push(rule());
  [ "Tool: CapCut (free) handles all of these on a phone. Film verticals (9:16) for Reels/Shorts/TikTok; export a 1:1 and 16:9 for feed and YouTube.",
    "The smoke-detector metaphor is your signature visual — build one clean graphic of it and reuse it across the commercial, Day 28, and the Meta 'D' ad. Consistency builds recognition.",
    "Live scan footage (a real Grandeza Score populating on screen) is your highest-trust asset. Screen-record one clean run and reuse the clip everywhere.",
    "Keep on-screen legal figures to the verified set: $500–$1,500/text (TCPA), NRS 200.620 (NV recording felony), 16 controls. Ad platforms reject unverifiable fear claims — provable numbers keep you approved.",
    "Captions on by default — 80%+ of Meta/LinkedIn video is watched muted. Every VO line above is already written as an on-screen overlay for exactly this reason.",
    "You have Higgsfield and Bloom connected for AI b-roll/creative, and Canva for the graphics. When you approve a direction, those generate the visuals — say the word and I'll fire them."
  ].forEach(t=>c.push(bullet(t)));

  save(new Document({creator:"Grandeza",styles:{default:{document:{run:{font:"Calibri"}}}},sections:[section(c)]}),
    require("path").join(__dirname,"..","outputs","Grandeza_Ads_and_Commercials.docx"));
})();
