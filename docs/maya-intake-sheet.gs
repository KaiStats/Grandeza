/**
 * Maya intake → Google Sheet + urgent email alert.
 *
 * Setup (about 5 minutes):
 *  1. Create a Google Sheet named "Maya Intake Leads".
 *  2. Extensions → Apps Script. Delete the sample code, paste this whole file, Save.
 *  3. Set ALERT_EMAIL below to your address.
 *  4. Deploy → New deployment → type: Web app.
 *       Execute as: Me    Who has access: Anyone
 *     Click Deploy, authorize (Advanced → Go to project → Allow), copy the Web app URL.
 *  5. Cloudflare Pages → Settings → Variables and Secrets → add secret
 *       INTAKE_WEBHOOK_URL = that URL   → Retry deployment.
 *  6. Check grandeza.io/api/maya/health shows "webhookSet": true, then run a chat.
 *
 * Optional: run testUrgent() once from the editor to see a row and an email.
 */

const ALERT_EMAIL = "you@example.com"; // ← change this
const COLUMNS = ["receivedAt", "urgency", "name", "contact", "matter", "preferredTime", "otherParties", "summary", "language", "source"];

function doPost(e) {
  const lead = JSON.parse((e && e.postData && e.postData.contents) || "{}");
  record(lead);
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}

function record(lead) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS);
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  sheet.appendRow(COLUMNS.map(function (c) { return lead[c] || ""; }));
  const row = sheet.getLastRow();
  if (lead.urgency === "Urgent") {
    sheet.getRange(row, 1, 1, COLUMNS.length).setBackground("#fde2df");
    MailApp.sendEmail({
      to: ALERT_EMAIL,
      subject: "URGENT intake: " + lead.name + " — " + lead.matter,
      body:
        "Maya flagged an urgent intake.\n\n" +
        COLUMNS.map(function (c) { return c + ": " + (lead[c] || ""); }).join("\n") +
        "\n\nSheet: " + SpreadsheetApp.getActiveSpreadsheet().getUrl(),
    });
  }
}

function testUrgent() {
  record({
    receivedAt: new Date().toISOString(), urgency: "Urgent", name: "Test Lead",
    contact: "(702) 555-0100", matter: "Criminal defense — arrest", preferredTime: "ASAP",
    otherParties: "State of Nevada", summary: "Brother arrested last night.", language: "English",
    source: "Website chat (Maya)",
  });
}
