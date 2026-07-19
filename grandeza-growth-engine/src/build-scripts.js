const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  BorderStyle, PageBreak, Table, TableRow, TableCell, WidthType, ShadingType
} = require('docx');
const { CONTROLS, DAYS } = require('../data/content-bank.js');

const NAVY = "1F2A44";
const GOLD = "B8862B";
const SLATE = "3A3F4B";
const LIGHT = "F1EFE9";

const fmtColor = {
  MATH: "8A5A00", AUDIT: "1F5C4D", EXPLAINER: "1F3A5C", SCORE: "6B2A5C", STORY: "7A3520"
};

function rule(color = GOLD, size = 12) {
  return new Paragraph({
    spacing: { before: 60, after: 120 },
    border: { bottom: { color, space: 1, style: BorderStyle.SINGLE, size } },
    children: []
  });
}
function P(text, opts = {}) {
  return new Paragraph({
    spacing: { after: opts.after ?? 120, before: opts.before ?? 0, line: 276 },
    alignment: opts.align,
    children: [new TextRun({ text, bold: opts.bold, italics: opts.italics, size: opts.size ?? 21, color: opts.color ?? SLATE, font: "Calibri" })]
  });
}
function label(text, color) {
  return new Paragraph({
    spacing: { after: 60, before: 40 },
    children: [new TextRun({ text, bold: true, size: 17, color, font: "Calibri", allCaps: true, characterSpacing: 20 })]
  });
}

function controlName(c) {
  if (CONTROLS[c]) return `Control ${c} — ${CONTROLS[c].name} (weight ${CONTROLS[c].wt})`;
  const map = { MULTI: "Composite — multiple controls", BANDS: "Score bands", BRAND: "Founder / brand", SCAN: "The scan itself" };
  return map[c] || c;
}

const children = [];

// ---- Cover ----
children.push(new Paragraph({ spacing: { before: 1200, after: 60 }, alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: "GRANDEZA", bold: true, size: 60, color: NAVY, font: "Calibri", characterSpacing: 60 })] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 300 },
  children: [new TextRun({ text: "30-DAY DAILY CONTENT BANK", size: 26, color: GOLD, font: "Calibri", characterSpacing: 40, bold: true })] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 },
  children: [new TextRun({ text: "LinkedIn + Facebook  ·  one post every morning  ·  built on the 16-control Grandeza Scan", size: 20, italics: true, color: SLATE, font: "Calibri" })] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 },
  children: [new TextRun({ text: "grandeza.io", size: 20, bold: true, color: NAVY, font: "Calibri" })] }));

children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200, after: 60 },
  children: [new TextRun({ text: "LEGAL FRAMING — READ FIRST", bold: true, size: 18, color: "8A5A00", font: "Calibri", characterSpacing: 20 })] }));
[
  "This bank uses only defensible, verified law. There is NO reference to a \"Nevada SB 149\" or an \"October 1 deadline\" — that claim originated from an unreliable source and is not real. Nevada's comprehensive AI bill (SB 199) failed in the 2025 session.",
  "The spine is: Federal TCPA ($500–$1,500/text, no class-action cap, One-to-One Consent Rule live since Jan 2026); NRS 200.620 (Nevada all-party recording consent — category D felony); NRS 603A (Nevada data notice & breach); FTC Section 5 (deceptive practices, incl. undisclosed AI); and the live multi-state AI-disclosure wave (CA SB 1001, CO, UT, TX, IL).",
  "AI-disclosure content is framed as \"get ahead of it,\" not a deadline. This is evergreen and stronger.",
  "Nothing here is legal advice; it is marketing copy grounded in current law. Get a one-time Nevada attorney review before scaling the paid binder product."
].forEach(t => children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 },
  children: [new TextRun({ text: t, size: 16, color: SLATE, font: "Calibri", italics: true })] })));

children.push(new Paragraph({ children: [new PageBreak()] }));

// ---- How to use ----
children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { after: 100 },
  children: [new TextRun({ text: "How to run this", bold: true, size: 30, color: NAVY, font: "Calibri" })] }));
children.push(rule());
[
  ["Cadence", "One post per morning. Each day below gives you a LinkedIn caption and a Facebook caption — post both, or alternate. The Script/VO block is your 30–45 second Reel or Short if you film."],
  ["Scheduling (no tool purchase needed)", "Batch a week on Sunday night in ~20 min. LinkedIn schedules posts natively; Meta Business Suite schedules Facebook free. You also have Zapier + OmniSocials connected if you want one dashboard for both."],
  ["Format rotation", "Days rotate MATH → AUDIT → EXPLAINER → SCORE → STORY so nothing feels repetitive. Days 1–16 walk the controls by weight; days 17–30 are composites, proof, and founder-story angles."],
  ["Order logic", "Heaviest controls lead: Day 1 is TCPA (weight 9), then AI Disclosure, Recording Consent, and Audit Trail (all weight 8). The critical-four auto-fails anchor the back half."],
  ["Your edge", "Every post ends at grandeza.io/scan and points to the free 16-control scan. The whole bank sells the evidence layer — never bot features."]
].forEach(([h, b]) => {
  children.push(label(h, GOLD));
  children.push(P(b, { after: 140 }));
});

children.push(new Paragraph({ children: [new PageBreak()] }));

// ---- 30-day at-a-glance table ----
children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { after: 100 },
  children: [new TextRun({ text: "30 days at a glance", bold: true, size: 30, color: NAVY, font: "Calibri" })] }));
children.push(rule());

const TW = 9360;
const cols = [700, 1400, 3860, 3400];
function tCell(text, w, opts = {}) {
  return new TableCell({
    width: { size: w, type: WidthType.DXA },
    shading: opts.fill ? { type: ShadingType.CLEAR, fill: opts.fill, color: "auto" } : undefined,
    margins: { top: 40, bottom: 40, left: 80, right: 80 },
    children: [new Paragraph({ children: [new TextRun({ text, bold: opts.bold, size: opts.size ?? 16, color: opts.color ?? SLATE, font: "Calibri" })] })]
  });
}
const glanceRows = [new TableRow({ tableHeader: true, children: [
  tCell("Day", cols[0], { bold: true, color: "FFFFFF", fill: NAVY }),
  tCell("Format", cols[1], { bold: true, color: "FFFFFF", fill: NAVY }),
  tCell("Control", cols[2], { bold: true, color: "FFFFFF", fill: NAVY }),
  tCell("Hook (opening line)", cols[3], { bold: true, color: "FFFFFF", fill: NAVY })
] })];
DAYS.forEach((d, i) => {
  glanceRows.push(new TableRow({ children: [
    tCell(String(d.day), cols[0], { bold: true, fill: i % 2 ? LIGHT : "FFFFFF" }),
    tCell(d.format, cols[1], { color: fmtColor[d.format], bold: true, fill: i % 2 ? LIGHT : "FFFFFF" }),
    tCell(controlName(d.control), cols[2], { fill: i % 2 ? LIGHT : "FFFFFF" }),
    tCell(d.hook.length > 90 ? d.hook.slice(0, 88) + "…" : d.hook, cols[3], { fill: i % 2 ? LIGHT : "FFFFFF" })
  ] }));
});
children.push(new Table({ width: { size: TW, type: WidthType.DXA }, columnWidths: cols,
  borders: { top: { style: BorderStyle.SINGLE, size: 2, color: "D8D2C4" }, bottom: { style: BorderStyle.SINGLE, size: 2, color: "D8D2C4" },
    left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
    insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: "E6E1D6" }, insideVertical: { style: BorderStyle.NONE } },
  rows: glanceRows }));

children.push(new Paragraph({ children: [new PageBreak()] }));

// ---- Full day-by-day scripts ----
DAYS.forEach((d, idx) => {
  // Day header band
  children.push(new Paragraph({
    spacing: { before: 40, after: 40 },
    shading: { type: ShadingType.CLEAR, fill: NAVY, color: "auto" },
    children: [
      new TextRun({ text: `  DAY ${d.day}  `, bold: true, size: 24, color: "FFFFFF", font: "Calibri" }),
      new TextRun({ text: `   ${d.format}`, bold: true, size: 18, color: GOLD, font: "Calibri", characterSpacing: 20 })
    ]
  }));
  children.push(new Paragraph({ spacing: { after: 100, before: 20 },
    children: [new TextRun({ text: controlName(d.control), bold: true, size: 18, color: GOLD, font: "Calibri" })] }));

  children.push(label("Hook", GOLD));
  children.push(P(d.hook, { bold: true, size: 23, color: NAVY, after: 140 }));

  children.push(label("Script / Voiceover  (30–45 sec if filmed)", fmtColor[d.format]));
  children.push(P(d.script, { after: 140 }));

  children.push(label("On-screen text  (overlay beats)", fmtColor[d.format]));
  d.onscreen.forEach((t, i) => children.push(new Paragraph({
    spacing: { after: 30 }, indent: { left: 240 },
    children: [new TextRun({ text: `${i + 1}.  `, bold: true, size: 19, color: GOLD, font: "Calibri" }),
      new TextRun({ text: t, size: 19, color: SLATE, font: "Calibri" })] })));

  children.push(new Paragraph({ spacing: { before: 60 }, children: [] }));
  children.push(label("LinkedIn caption", "1F3A5C"));
  d.linkedin.split("\n").forEach(line => children.push(P(line || " ", { after: line ? 40 : 20, size: 19 })));

  children.push(new Paragraph({ spacing: { before: 60 }, children: [] }));
  children.push(label("Facebook caption", "1F5C4D"));
  d.facebook.split("\n").forEach(line => children.push(P(line || " ", { after: line ? 40 : 20, size: 19 })));

  if (idx < DAYS.length - 1) children.push(new Paragraph({ spacing: { before: 100 }, children: [new PageBreak()] }));
});

const doc = new Document({
  creator: "Grandeza",
  styles: { default: { document: { run: { font: "Calibri" } } } },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1080, bottom: 1080, left: 1200, right: 1200 } } },
    children
  }]
});

Packer.toBuffer(doc).then(b => {
  fs.writeFileSync(require('path').join(__dirname,'..','outputs','Grandeza_30Day_Script_Bank.docx'), b);
  console.log("script bank written:", b.length, "bytes");
});
