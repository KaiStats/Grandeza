import type { Booking } from "./bookings";
import { business } from "./business";

/**
 * Lead delivery.
 *
 * A captured lead is worthless until a human sees it, so every lead is pushed
 * out immediately rather than parked in storage waiting to be checked. Both
 * channels are optional and independently env-gated — configure either, both,
 * or neither.
 *
 *   Twilio SMS   TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER, LEAD_SMS_TO
 *   Resend email RESEND_API_KEY, LEAD_EMAIL_TO, LEAD_EMAIL_FROM
 *
 * With neither configured the lead is logged and `delivered` comes back false,
 * which the intake route uses to tell the customer to call instead of leaving
 * them believing a message got through.
 */

export type DeliveryResult = {
  delivered: boolean;
  channels: string[];
  errors: string[];
};

function formatLead(lead: Booking): string {
  const lines = [
    `NEW LEAD — ${business.shortName}`,
    ``,
    `Name:    ${lead.customer_name}`,
    `Phone:   ${lead.phone}`,
    `Service: ${lead.service_type}`,
    `Urgency: ${lead.urgency}`,
    `Address: ${lead.address}`,
  ];
  if (lead.notes) lines.push(`Notes:   ${lead.notes}`);
  lines.push(``, `Received ${new Date(lead.created_at).toLocaleString("en-US", { timeZone: "America/Los_Angeles" })} PT`);
  return lines.join("\n");
}

async function sendSms(lead: Booking): Promise<string> {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;
  const to = process.env.LEAD_SMS_TO;

  if (!sid || !token || !from || !to) throw new Error("twilio env incomplete");

  const res = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ From: from, To: to, Body: formatLead(lead) }),
    }
  );

  if (!res.ok) throw new Error(`twilio ${res.status}: ${await res.text()}`);
  return "sms";
}

async function sendEmail(lead: Booking): Promise<string> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_EMAIL_TO;
  const from = process.env.LEAD_EMAIL_FROM;

  if (!key || !to || !from) throw new Error("resend env incomplete");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: lead.phone,
      subject: `New lead — ${lead.customer_name} (${lead.service_type})`,
      text: formatLead(lead),
    }),
  });

  if (!res.ok) throw new Error(`resend ${res.status}: ${await res.text()}`);
  return "email";
}

export async function deliverLead(lead: Booking): Promise<DeliveryResult> {
  const configured: Array<Promise<string>> = [];

  if (process.env.TWILIO_ACCOUNT_SID) configured.push(sendSms(lead));
  if (process.env.RESEND_API_KEY) configured.push(sendEmail(lead));

  if (configured.length === 0) {
    console.warn(
      "[intake] LEAD NOT DELIVERED — no notification channel configured. Lead follows:\n" +
        formatLead(lead)
    );
    return { delivered: false, channels: [], errors: ["no channel configured"] };
  }

  const settled = await Promise.allSettled(configured);
  const channels = settled
    .filter((r): r is PromiseFulfilledResult<string> => r.status === "fulfilled")
    .map((r) => r.value);
  const errors = settled
    .filter((r): r is PromiseRejectedResult => r.status === "rejected")
    .map((r) => String(r.reason));

  if (errors.length) console.error("[intake] delivery errors:", errors);
  if (!channels.length) console.error("[intake] LEAD NOT DELIVERED:\n" + formatLead(lead));

  return { delivered: channels.length > 0, channels, errors };
}

/** True if the shop is currently open, in Las Vegas local time. */
export function isOpenNow(now = new Date()): boolean {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = get("weekday");
  const minutes = Number(get("hour")) * 60 + Number(get("minute"));

  if (["Mon", "Tue", "Wed", "Thu", "Fri"].includes(day)) {
    return minutes >= 8 * 60 && minutes < 17 * 60;
  }
  if (day === "Sat") return minutes >= 9 * 60 && minutes < 16 * 60;
  return false;
}
