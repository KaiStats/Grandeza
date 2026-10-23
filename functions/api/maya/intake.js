/**
 * GRANDEZA — Maya intake hand-off (Cloudflare Pages Function)
 * Route: POST /api/maya/intake      Body: { intake: { matter, urgency, ... } }
 *
 * Forwards a completed law-demo intake to an automation webhook (Zapier "Catch
 * Hook", Make, n8n) that writes the CRM/Sheet row and alerts staff on urgent leads.
 *
 * Optional secret (Pages → Settings → Variables → Secret):
 *   INTAKE_WEBHOOK_URL — omit and the intake is accepted but not forwarded.
 */

const FIELDS = ["matter", "urgency", "name", "contact", "preferredTime", "otherParties", "summary", "language"];
const MAX_FIELD = 300;

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

const memBucket = new Map();
function rateLimited(ip) {
  const id = `${ip}:${Math.floor(Date.now() / 3600000)}`;
  const n = (memBucket.get(id) || 0) + 1;
  memBucket.set(id, n);
  if (memBucket.size > 5000) memBucket.clear();
  return n > 30;
}

export async function onRequestPost({ request, env }) {
  try {
    const origin = request.headers.get("origin");
    if (origin && new URL(request.url).origin !== origin) return json({ error: "Forbidden." }, 403);
    if (rateLimited(request.headers.get("cf-connecting-ip") || "anon")) return json({ error: "Too many." }, 429);

    let body;
    try { body = await request.json(); } catch { return json({ error: "Bad request." }, 400); }
    const raw = body && typeof body.intake === "object" ? body.intake : null;
    if (!raw) return json({ error: "Bad request." }, 400);

    // Only known fields, only strings, bounded. Trust nothing from the browser.
    const intake = {};
    for (const k of FIELDS) {
      const v = raw[k];
      intake[k] = typeof v === "string" ? v.slice(0, MAX_FIELD).trim() : "";
    }
    if (!intake.name || !intake.contact) return json({ error: "Missing name or contact." }, 400);
    intake.urgency = /urgent/i.test(intake.urgency) ? "Urgent" : "Standard";
    intake.receivedAt = new Date().toISOString();
    intake.source = "Website chat (Maya)";

    if (!env.INTAKE_WEBHOOK_URL) return json({ ok: true, forwarded: false });

    const res = await fetch(env.INTAKE_WEBHOOK_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(intake),
    });
    if (!res.ok) {
      console.error("maya/intake webhook", res.status);
      return json({ ok: true, forwarded: false }, 200);
    }
    return json({ ok: true, forwarded: true });
  } catch (err) {
    console.error("maya/intake:", err && err.stack ? err.stack : err);
    return json({ error: "Unexpected error." }, 500);
  }
}

const notAllowed = () =>
  new Response("Method Not Allowed", { status: 405, headers: { allow: "POST", "cache-control": "no-store" } });

export const onRequestGet = notAllowed;
export const onRequestPut = notAllowed;
export const onRequestPatch = notAllowed;
export const onRequestDelete = notAllowed;
