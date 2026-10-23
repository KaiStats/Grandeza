/**
 * GRANDEZA — Maya health check (Cloudflare Pages Function)
 * Route: GET /api/maya/health
 *
 * Open it in a browser to see why Maya can't answer: whether the API key is
 * set, and what Anthropic says to a tiny (1-token) test call with the same
 * model chat.js uses. Never echoes the key.
 */

import { MODEL, apiKey } from "./chat.js";

const memBucket = new Map();
function rateLimited(ip) {
  const id = `${ip}:${Math.floor(Date.now() / 3600000)}`;
  const n = (memBucket.get(id) || 0) + 1;
  memBucket.set(id, n);
  if (memBucket.size > 5000) memBucket.clear();
  return n > 20;
}

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj, null, 2), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

export async function onRequestGet({ request, env }) {
  const key = apiKey(env);
  const out = { model: MODEL, apiKeySet: !!key, keyHadStrayCharacters: !!env.ANTHROPIC_API_KEY && key !== env.ANTHROPIC_API_KEY, kvBound: !!env.MAYA_KV, webhookSet: !!env.INTAKE_WEBHOOK_URL };
  if (!out.apiKeySet) return json({ ...out, ok: false, problem: "ANTHROPIC_API_KEY secret is missing in Cloudflare Pages settings." });
  if (rateLimited(request.headers.get("cf-connecting-ip") || "anon")) return json({ ...out, ok: false, problem: "Health check rate limit — try again later." }, 429);

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({ model: MODEL, max_tokens: 1, messages: [{ role: "user", content: "ping" }] }),
    });
    out.anthropicStatus = res.status;
    if (res.ok) return json({ ...out, ok: true });
    let detail = "";
    try { detail = (await res.text()).slice(0, 400); } catch {}
    return json({ ...out, ok: false, anthropicError: detail });
  } catch (err) {
    return json({ ...out, ok: false, problem: "Could not reach api.anthropic.com: " + String(err && err.message) });
  }
}
