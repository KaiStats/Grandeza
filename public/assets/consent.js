/* ============================================================================
   GRANDEZA — cookie consent + consent-gated analytics (assets/consent.js)
   Privacy-first: NOTHING that tracks loads until the visitor accepts.
   Self-injecting — include once per page: <script src="/assets/consent.js" defer></script>
   Reopen anywhere with a link/button that has [data-gz-cookie-settings].
   ============================================================================ */
(function () {
  "use strict";

  /* ===== CONFIG — set your analytics, then it loads only after consent =====
     ┌────────────────────────────────────────────────────────────────────┐
     │  TO TURN ON GOOGLE ANALYTICS: paste your GA4 Measurement ID below. │
     │  Find it at analytics.google.com → Admin → Data streams → your     │
     │  web stream. It looks like  G-ABC1234XYZ                           │
     │  That is the ONLY edit required. Everything else is already wired. │
     └────────────────────────────────────────────────────────────────────┘ */
  var ANALYTICS = {
    // GA4 Measurement ID, e.g. "G-ABC1234XYZ". Empty = Google Analytics off.
    ga4Id: "",
    // Cloudflare Web Analytics (cookieless, no consent needed in most regions).
    // Token from dash → Analytics → Web Analytics. Empty = disabled.
    cloudflareToken: ""
  };

  var KEY = "gz-consent";
  var loaded = false;
  var queued = [];   // events fired before consent; replayed on grant

  /* --- Consent retention -------------------------------------------------
     Consent is not permanent. Storing a grant forever means a visitor who
     clicked "Accept" once is tracked indefinitely with no chance to revisit
     the decision — which contradicts the retention discipline our own
     privacy policy commits to, and sits badly with CNIL/ICO guidance that
     cookie consent be refreshed periodically. 180 days matches the CNIL
     recommendation. After that the banner reappears and the visitor
     re-decides. */
  var TTL_DAYS = 180;
  var TTL_MS = TTL_DAYS * 24 * 60 * 60 * 1000;

  /* Read the stored decision, honouring expiry.
     Returns "granted" | "denied" | null (never asked / expired).
     Tolerates the legacy bare-string format written before expiry existed:
     those are treated as expired so the visitor is asked once more. */
  function readConsent() {
    var raw = null;
    try { raw = localStorage.getItem(KEY); } catch (e) { return null; }
    if (!raw) return null;
    if (raw === "granted" || raw === "denied") {
      try { localStorage.removeItem(KEY); } catch (e) {}
      return null;                       // legacy value, undated — re-ask
    }
    try {
      var rec = JSON.parse(raw);
      if (!rec || !rec.v || !rec.t) return null;
      if (Date.now() - rec.t > TTL_MS) { // expired
        try { localStorage.removeItem(KEY); } catch (e) {}
        return null;
      }
      return rec.v;
    } catch (e) { return null; }
  }

  function writeConsent(v) {
    try { localStorage.setItem(KEY, JSON.stringify({ v: v, t: Date.now() })); } catch (e) {}
  }

  /* --- Google Consent Mode v2 -------------------------------------------
     Declared BEFORE any Google tag loads. Without this, GA4 traffic from the
     EEA/UK is dropped outright. We default every storage type to "denied",
     then flip only what the visitor grants. Queued on dataLayer so it applies
     even though gtag.js has not been fetched yet. */
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;
  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    functionality_storage: "granted",
    security_storage: "granted",
    wait_for_update: 500
  });

  function loadAnalytics() {
    if (loaded) return; loaded = true;
    if (ANALYTICS.cloudflareToken) {
      var cf = document.createElement("script");
      cf.defer = true;
      cf.src = "https://static.cloudflareinsights.com/beacon.min.js";
      cf.setAttribute("data-cf-beacon", '{"token":"' + ANALYTICS.cloudflareToken + '"}');
      document.head.appendChild(cf);
    }
    if (ANALYTICS.ga4Id) {
      gtag("consent", "update", { analytics_storage: "granted" });
      var ga = document.createElement("script");
      ga.async = true;
      ga.src = "https://www.googletagmanager.com/gtag/js?id=" + ANALYTICS.ga4Id;
      document.head.appendChild(ga);
      gtag("js", new Date());
      gtag("config", ANALYTICS.ga4Id, { anonymize_ip: true });
      // Replay any events fired before consent was granted.
      for (var i = 0; i < queued.length; i++) gtag("event", queued[i][0], queued[i][1]);
      queued.length = 0;
    }
  }

  /* --- gzTrack: fire a conversion event from anywhere --------------------
     Usage:  window.gzTrack("scan_complete", { grade: "C" });
     Safe to call at any time — before consent, before gtag.js loads, or with
     analytics switched off entirely. Never throws, never blocks the UI. */
  window.gzTrack = function (name, params) {
    try {
      if (!name) return;
      if (loaded && ANALYTICS.ga4Id) gtag("event", name, params || {});
      else if (queued.length < 25) queued.push([name, params || {}]);
    } catch (e) { /* analytics must never break the page */ }
  };

  var bar = null;
  function hide() { if (bar) { bar.remove(); bar = null; } }
  function decide(v) { writeConsent(v); if (v === "granted") loadAnalytics(); hide(); }

  function show() {
    if (bar) return;
    bar = document.createElement("div");
    bar.className = "gz-consent";
    bar.setAttribute("role", "dialog");
    bar.setAttribute("aria-label", "Cookie consent");
    bar.innerHTML =
      '<p>We use a few cookies to run the site and, with your ok, to measure what’s working. You’re in control.</p>' +
      '<div class="gz-consent-btns">' +
        '<button type="button" data-a="deny">Only essential</button>' +
        '<button type="button" class="primary" data-a="grant">Accept</button>' +
        '<a href="/privacy">Privacy</a>' +
      '</div>';
    document.body.appendChild(bar);
    bar.addEventListener("click", function (e) {
      var b = e.target.closest("[data-a]");
      if (b) decide(b.getAttribute("data-a") === "grant" ? "granted" : "denied");
    });
  }

  // Inject styles (dark brand band; theme-agnostic, safe on any page)
  var css =
    '.gz-consent{position:fixed;left:1rem;right:1rem;bottom:1rem;z-index:9999;max-width:580px;margin-inline:auto;' +
    'background:#0b1517;color:#e9efec;border:1px solid rgba(198,161,91,.3);border-radius:14px;padding:1rem 1.1rem;' +
    'box-shadow:0 20px 50px -20px rgba(0,0,0,.6);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;' +
    'display:flex;flex-wrap:wrap;gap:.7rem 1rem;align-items:center}' +
    '.gz-consent p{margin:0;font-size:.88rem;line-height:1.5;color:#c9d6d1;flex:1;min-width:220px}' +
    '.gz-consent-btns{display:flex;gap:.5rem;align-items:center}' +
    '.gz-consent button{font:inherit;font-weight:600;font-size:.85rem;padding:.55em 1em;border-radius:9px;cursor:pointer;' +
    'border:1px solid rgba(198,161,91,.4);background:transparent;color:#e9efec}' +
    '.gz-consent button:hover{border-color:#c6a15b}' +
    '.gz-consent button.primary{background:linear-gradient(180deg,#e0c079,#b78f3f);color:#20180a;border-color:transparent}' +
    '.gz-consent a{color:#c6a15b;font-size:.82rem;text-decoration:none}' +
    '.gz-consent a:hover{text-decoration:underline}' +
    '@media (prefers-reduced-motion:no-preference){.gz-consent{animation:gzc .3s ease}}' +
    '@keyframes gzc{from{opacity:0;transform:translateY(12px)}}';
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  // Init from stored choice
  var v = readConsent();
  if (v === "granted") loadAnalytics();
  else if (v !== "denied") {
    if (document.readyState !== "loading") show();
    else addEventListener("DOMContentLoaded", show);
  }

  // Reopen the banner from any [data-gz-cookie-settings] element
  document.addEventListener("click", function (e) {
    if (e.target.closest("[data-gz-cookie-settings]")) {
      e.preventDefault();
      try { localStorage.removeItem(KEY); } catch (x) {}
      show();
    }
  });
})();
