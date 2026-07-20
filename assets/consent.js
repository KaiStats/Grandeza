/* ============================================================================
   GRANDEZA — cookie consent + consent-gated analytics (assets/consent.js)
   Privacy-first: NOTHING that tracks loads until the visitor accepts.
   Self-injecting — include once per page: <script src="/assets/consent.js" defer></script>
   Reopen anywhere with a link/button that has [data-gz-cookie-settings].
   ============================================================================ */
(function () {
  "use strict";

  /* ===== CONFIG — set your analytics, then it loads only after consent ===== */
  var ANALYTICS = {
    // Cloudflare Web Analytics (cookieless, fits Cloudflare Pages). Paste the
    // token from dash → Analytics → Web Analytics to enable. Empty = disabled.
    cloudflareToken: "",
    // GA4 (optional): set to your "G-XXXXXXX" id to enable instead/as well.
    ga4Id: ""
  };

  var KEY = "gz-consent";
  var loaded = false;

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
      var ga = document.createElement("script");
      ga.async = true;
      ga.src = "https://www.googletagmanager.com/gtag/js?id=" + ANALYTICS.ga4Id;
      document.head.appendChild(ga);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag("js", new Date());
      window.gtag("config", ANALYTICS.ga4Id, { anonymize_ip: true });
    }
  }

  var bar = null;
  function hide() { if (bar) { bar.remove(); bar = null; } }
  function decide(v) { try { localStorage.setItem(KEY, v); } catch (e) {} if (v === "granted") loadAnalytics(); hide(); }

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
  var v = null; try { v = localStorage.getItem(KEY); } catch (e) {}
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
