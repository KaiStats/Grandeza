/* ============================================================================
   GRANDEZA — Maya, the intake agent (assets/maya.js)
   Self-injecting launcher + chat panel. Include once per page:
       <script src="/assets/maya.js" defer></script>
   Talks only to /api/maya/chat on this origin. No third-party requests, no
   cookies, no tracking. Transcript lives in sessionStorage and dies with the tab.
   Suppress on any page with:  <body data-maya="off">
   Switch persona with:        <body data-maya-persona="law">  (demo law-firm intake)
   ============================================================================ */
(function () {
  "use strict";

  if (window.__gzMaya) return;
  window.__gzMaya = true;

  var ENDPOINT = "/api/maya/chat";
  var SEEN = "gz-maya-seen";
  var MAXLEN = 2000;

  /* Copy per persona. The server holds the matching system prompt; the
     browser only says which one it wants. */
  var PERSONAS = {
    grandeza: {
      store: "gz-maya-log",
      greeting:
        "I'm Maya — Grandeza's intake agent. I can tell you what the free scan checks, " +
        "which door fits your shop, or what the TCPA actually requires of contractors. " +
        "What answers your phone and web form right now?",
      chips: [
        "What does the free scan check?",
        "What would this cost?",
        "We already use a bot — what changes?",
        "What's my TCPA exposure?"
      ],
      org: "Grandeza's intake agent",
      sub: "Grandeza intake agent · web &amp; SMS",
      placeholder: "Ask about your intake…",
      legal: "Maya is an AI agent, not a lawyer — Grandeza does compliance engineering, not legal advice. " +
        'Don\'t send customer data. <a href="/privacy">Privacy</a>.',
      fallback: "Maya couldn't answer just then. Your message is back in the box — try again, or start the free scan at /scan."
    },
    law: {
      store: "gz-maya-law-log",
      greeting:
        "Hi, I'm Maya, the intake assistant for Silver Mesa Law Group. I can help you figure out " +
        "whether we handle your kind of matter and set up a free consultation with an attorney. " +
        "What's going on that brings you here today?",
      chips: [
        "I was hurt in a car accident",
        "I need help with a divorce",
        "Do I have a case?",
        "What does a consultation cost?"
      ],
      org: "Silver Mesa Law Group's intake assistant",
      sub: "Silver Mesa Law Group · client intake",
      placeholder: "Tell us briefly what happened…",
      legal: "Maya is an AI assistant, not an attorney. Chatting does not create an attorney-client relationship " +
        "and is not legal advice. Don't share confidential details here.",
      fallback: "Maya couldn't answer just then. Your message is back in the box — try again in a moment."
    }
  };
  var PERSONA = document.body && document.body.getAttribute("data-maya-persona") === "law" ? "law" : "grandeza";
  var P = PERSONAS[PERSONA];
  var STORE = P.store;
  var GREETING = P.greeting;
  var CHIPS = P.chips;

  var reduce = false;
  try { reduce = matchMedia("(prefers-reduced-motion:reduce)").matches; } catch (e) {}

  /* ── state ─────────────────────────────────────────────────────────────── */
  var log = [];       // [{role, content}]
  var open = false;
  var busy = false;
  var els = {};

  try { log = JSON.parse(sessionStorage.getItem(STORE) || "[]") || []; } catch (e) { log = []; }
  if (!Array.isArray(log)) log = [];

  function persist() {
    try { sessionStorage.setItem(STORE, JSON.stringify(log.slice(-24))); } catch (e) {}
  }

  /* ── styles ────────────────────────────────────────────────────────────── */
  var CSS = [
    ".gz-maya-fab{position:fixed;right:1.25rem;bottom:1.25rem;z-index:9990;display:flex;align-items:center;gap:.6rem;",
      "font-family:var(--font-body,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif);",
      "font-size:.9rem;font-weight:600;padding:.7rem 1.05rem .7rem .8rem;border:1px solid rgba(198,161,91,.35);",
      "border-radius:999px;cursor:pointer;color:#e9efec;background:#0b1517;",
      "box-shadow:0 2px 8px rgba(0,0,0,.24),0 18px 40px -18px rgba(0,0,0,.55);transition:transform .18s var(--ease,cubic-bezier(.22,.61,.36,1)),border-color .18s,box-shadow .18s}",
    ".gz-maya-fab:hover{border-color:#c6a15b;transform:translateY(-2px);box-shadow:0 4px 12px rgba(0,0,0,.28),0 24px 52px -18px rgba(0,0,0,.62)}",
    ".gz-maya-fab:focus-visible{outline:2px solid #c6a15b;outline-offset:3px}",
    ".gz-maya-fab[hidden]{display:none}",
    ".gz-maya-av{width:30px;height:30px;border-radius:50%;flex:0 0 auto;display:grid;place-items:center;",
      "background:linear-gradient(180deg,#e0c079,#b78f3f);color:#20180a;font-weight:700;font-size:.82rem;",
      "font-family:var(--font-display,Georgia,serif);letter-spacing:.01em}",
    ".gz-maya-dot{position:absolute;top:.55rem;right:.55rem;width:9px;height:9px;border-radius:50%;background:#c6a15b;border:2px solid #0b1517}",

    ".gz-maya-panel{position:fixed;right:1.25rem;bottom:1.25rem;z-index:9991;width:min(400px,calc(100vw - 2.5rem));",
      "height:min(620px,calc(100vh - 2.5rem));display:flex;flex-direction:column;overflow:hidden;",
      "background:var(--surface,#f5f7f6);color:var(--ink,#0c1618);border:1px solid var(--line-strong,rgba(12,22,24,.22));",
      "border-radius:16px;box-shadow:0 4px 14px rgba(0,0,0,.14),0 40px 80px -28px rgba(0,0,0,.5);",
      "font-family:var(--font-body,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif)}",
    ".gz-maya-panel[hidden]{display:none}",

    ".gz-maya-head{display:flex;align-items:center;gap:.7rem;padding:.85rem 1rem;background:#0b1517;color:#e9efec;flex:0 0 auto}",
    ".gz-maya-head h2{margin:0;font-size:.95rem;font-weight:600;font-family:var(--font-display,Georgia,serif);letter-spacing:-.01em;line-height:1.2}",
    ".gz-maya-head p{margin:.1rem 0 0;font-size:.72rem;color:#9fb3ad;line-height:1.3}",
    ".gz-maya-x{margin-left:auto;background:none;border:0;color:#9fb3ad;cursor:pointer;padding:.35rem;border-radius:7px;display:grid;place-items:center}",
    ".gz-maya-x:hover{color:#e9efec;background:rgba(255,255,255,.08)}",
    ".gz-maya-x:focus-visible{outline:2px solid #c6a15b;outline-offset:2px}",

    // scroll-behavior stays AUTO: a smooth animation is restarted by every
    // streamed token, so it never converges and the log sticks mid-scroll.
    // min-height:0 lets the flex child actually shrink and scroll.
    ".gz-maya-body{flex:1 1 auto;min-height:0;overflow-y:auto;overscroll-behavior:contain;padding:1rem;display:flex;flex-direction:column;gap:.7rem;scroll-behavior:auto}",
    ".gz-maya-msg{max-width:88%;padding:.6rem .85rem;border-radius:13px;font-size:.88rem;line-height:1.55;white-space:pre-wrap;word-wrap:break-word}",
    ".gz-maya-msg.a{align-self:flex-start;background:var(--surface-2,#fff);border:1px solid var(--line,rgba(12,22,24,.12));border-bottom-left-radius:5px}",
    ".gz-maya-msg.u{align-self:flex-end;background:#0b1517;color:#e9efec;border-bottom-right-radius:5px}",
    ".gz-maya-msg.e{align-self:flex-start;background:rgba(196,70,58,.09);border:1px solid rgba(196,70,58,.35);color:var(--ink,#0c1618);font-size:.84rem}",
    ".gz-maya-msg a{color:var(--link,#2e6e6a);text-decoration:underline;text-underline-offset:2px}",
    ".gz-maya-msg.u a{color:#e0c079}",

    ".gz-maya-typing{display:flex;gap:4px;align-items:center;padding:.75rem .85rem}",
    ".gz-maya-typing i{width:6px;height:6px;border-radius:50%;background:var(--ink-faint,#6b7d78);display:block;animation:gzmb 1.1s infinite ease-in-out}",
    ".gz-maya-typing i:nth-child(2){animation-delay:.16s}.gz-maya-typing i:nth-child(3){animation-delay:.32s}",
    "@keyframes gzmb{0%,80%,100%{opacity:.28;transform:translateY(0)}40%{opacity:1;transform:translateY(-3px)}}",
    "@media (prefers-reduced-motion:reduce){.gz-maya-typing i{animation:none;opacity:.5}}",

    ".gz-maya-chips{display:flex;flex-wrap:wrap;gap:.4rem;padding:0 1rem .6rem}",
    ".gz-maya-chips[hidden]{display:none}",
    ".gz-maya-chips button{font:inherit;font-size:.78rem;line-height:1.3;text-align:left;padding:.42em .7em;border-radius:999px;cursor:pointer;",
      "border:1px solid var(--line-strong,rgba(12,22,24,.22));background:transparent;color:var(--ink-soft,#42544f)}",
    ".gz-maya-chips button:hover{border-color:var(--accent,#8a6a2e);color:var(--ink,#0c1618)}",
    ".gz-maya-chips button:focus-visible{outline:2px solid var(--accent,#8a6a2e);outline-offset:2px}",

    ".gz-maya-foot{flex:0 0 auto;border-top:1px solid var(--line,rgba(12,22,24,.12));padding:.65rem .7rem .7rem;background:var(--surface-2,#fff)}",
    ".gz-maya-row{display:flex;gap:.5rem;align-items:flex-end}",
    ".gz-maya-row textarea{flex:1;font:inherit;font-size:.88rem;line-height:1.5;resize:none;max-height:120px;padding:.55rem .7rem;",
      "border-radius:10px;border:1px solid var(--line-strong,rgba(12,22,24,.22));background:var(--surface,#f5f7f6);color:var(--ink,#0c1618)}",
    ".gz-maya-row textarea:focus{outline:2px solid var(--accent,#8a6a2e);outline-offset:-1px;border-color:transparent}",
    ".gz-maya-send{flex:0 0 auto;width:36px;height:36px;border-radius:10px;border:0;cursor:pointer;display:grid;place-items:center;",
      "background:linear-gradient(180deg,#e0c079,#b78f3f);color:#20180a}",
    ".gz-maya-send:disabled{opacity:.4;cursor:default}",
    ".gz-maya-send:focus-visible{outline:2px solid var(--accent,#8a6a2e);outline-offset:2px}",
    ".gz-maya-legal{margin:.5rem .2rem 0;font-size:.68rem;line-height:1.4;color:var(--ink-faint,#6b7d78)}",
    ".gz-maya-legal a{color:var(--ink-faint,#6b7d78);text-decoration:underline}",

    "@media (max-width:480px){.gz-maya-panel{right:0;bottom:0;width:100vw;height:100dvh;border-radius:0;border:0}",
      ".gz-maya-fab{right:1rem;bottom:1rem}}",
    "@media (prefers-reduced-motion:no-preference){.gz-maya-panel{animation:gzmp .22s var(--ease,cubic-bezier(.22,.61,.36,1))}",
      "@keyframes gzmp{from{opacity:0;transform:translateY(14px) scale(.985)}}}"
  ].join("");

  /* ── build ─────────────────────────────────────────────────────────────── */
  function icon(d, w) {
    return '<svg width="' + (w || 18) + '" height="' + (w || 18) + '" viewBox="0 0 24 24" fill="none" ' +
      'stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + "</svg>";
  }

  function build() {
    var st = document.createElement("style");
    st.textContent = CSS;
    document.head.appendChild(st);

    var fab = document.createElement("button");
    fab.type = "button";
    fab.className = "gz-maya-fab";
    fab.setAttribute("aria-haspopup", "dialog");
    fab.setAttribute("aria-expanded", "false");
    fab.setAttribute("aria-label", "Ask Maya, " + P.org);
    fab.innerHTML = '<span class="gz-maya-av" aria-hidden="true">M</span><span>Ask Maya</span>';
    var seen = false;
    try { seen = sessionStorage.getItem(SEEN) === "1"; } catch (e) {}
    if (!seen && !log.length) {
      fab.style.position = "fixed";
      var dot = document.createElement("span");
      dot.className = "gz-maya-dot";
      fab.appendChild(dot);
    }
    document.body.appendChild(fab);

    var panel = document.createElement("div");
    panel.className = "gz-maya-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "false");
    panel.setAttribute("aria-label", "Chat with Maya, " + P.org);
    panel.hidden = true;
    panel.innerHTML =
      '<div class="gz-maya-head">' +
        '<span class="gz-maya-av" aria-hidden="true">M</span>' +
        '<div><h2>Maya</h2><p>' + P.sub + '</p></div>' +
        '<button type="button" class="gz-maya-x" aria-label="Close chat">' + icon('<path d="M18 6L6 18M6 6l12 12"/>', 17) + "</button>" +
      "</div>" +
      '<div class="gz-maya-body" role="log" aria-live="polite" aria-relevant="additions text"></div>' +
      '<div class="gz-maya-chips"></div>' +
      '<div class="gz-maya-foot">' +
        '<div class="gz-maya-row">' +
          '<textarea rows="1" placeholder="' + P.placeholder + '" aria-label="Message Maya" maxlength="' + MAXLEN + '"></textarea>' +
          '<button type="button" class="gz-maya-send" aria-label="Send">' + icon('<path d="M4 12h15M13 6l6 6-6 6"/>', 17) + "</button>" +
        "</div>" +
        '<p class="gz-maya-legal">' + P.legal + '</p>' +
      "</div>";
    document.body.appendChild(panel);

    els = {
      fab: fab,
      panel: panel,
      body: panel.querySelector(".gz-maya-body"),
      chips: panel.querySelector(".gz-maya-chips"),
      ta: panel.querySelector("textarea"),
      send: panel.querySelector(".gz-maya-send"),
      close: panel.querySelector(".gz-maya-x")
    };

    fab.addEventListener("click", toggle);
    els.close.addEventListener("click", toggle);
    els.send.addEventListener("click", submit);

    els.ta.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); }
    });
    els.ta.addEventListener("input", function () {
      els.ta.style.height = "auto";
      els.ta.style.height = Math.min(els.ta.scrollHeight, 120) + "px";
    });

    els.body.addEventListener("scroll", function () {
      stick = nearBottom();
    }, { passive: true });

    /* The scroll event is async — a token landing in the same frame would
       re-pin before it fires. Wheel/touch/keys are the actual "I want to read
       back" signals, so honour them synchronously. */
    ["wheel", "touchmove", "keydown"].forEach(function (evt) {
      els.body.addEventListener(evt, function (e) {
        if (evt === "wheel" && e.deltaY >= 0) return;      // only scrolling up
        if (evt === "keydown" && !/^(ArrowUp|PageUp|Home)$/.test(e.key)) return;
        stick = false;
      }, { passive: true });
    });

    els.chips.addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (b && !busy) ask(b.textContent);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && open) toggle();
    });

    // Any [data-maya-open] element opens Maya, optionally with a seeded question.
    document.addEventListener("click", function (e) {
      var t = e.target.closest("[data-maya-open]");
      if (!t) return;
      e.preventDefault();
      var q = t.getAttribute("data-maya-open");
      if (!open) toggle();
      if (q && !busy) ask(q);
    });

    render();
  }

  /* ── render ────────────────────────────────────────────────────────────── */

  function esc(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  /** Escape first, then linkify bare site paths and **bold**. No raw HTML ever. */
  function fmt(text) {
    var s = esc(text);
    s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    s = s.replace(/(^|[\s(])\/((?:scan|pricing|about|security|privacy|terms|landing|product\/[a-z-]+|[a-z0-9-]+))\b/g,
      function (m, pre, path) { return pre + '<a href="/' + path + '">/' + path + "</a>"; });
    s = s.replace(/\b([a-z0-9._%+-]+@grandeza\.io)\b/gi, '<a href="mailto:$1">$1</a>');
    return s;
  }

  function bubble(role, text) {
    var d = document.createElement("div");
    d.className = "gz-maya-msg " + (role === "user" ? "u" : role === "error" ? "e" : "a");
    d.innerHTML = fmt(text);
    els.body.appendChild(d);
    return d;
  }

  /* Scroll after layout settles — assigning scrollTop synchronously races the
     smooth-scroll animation and lands short, clipping the newest message. */
  /* `stick` tracks whether the reader is riding the bottom of the log. A real
     scroll event is the only thing that clears it, so a reader who scrolls up
     mid-stream is never yanked back down — and a queued frame can't override
     that decision after the fact. */
  var stick = true;
  var scrollQueued = false;

  function nearBottom() {
    var b = els.body;
    return b.scrollHeight - b.scrollTop - b.clientHeight < 90;
  }
  function pin() {
    var b = els.body;
    b.scrollTop = b.scrollHeight - b.clientHeight;
  }
  /* force: a new message or a panel open always jumps to the bottom. */
  function scroll(force) {
    if (force) stick = true;
    if (!stick) return;
    pin();                 // immediate — rAF never fires in a background tab
    if (scrollQueued) return;
    scrollQueued = true;
    requestAnimationFrame(function () {   // again once layout has settled
      scrollQueued = false;
      if (stick) pin();
    });
  }

  function render() {
    els.body.innerHTML = "";
    if (!log.length) bubble("assistant", GREETING);
    else log.forEach(function (m) { bubble(m.role, m.content); });
    chips();
    scroll(true);
  }

  function chips() {
    var show = !busy && log.length < 2;
    els.chips.hidden = !show;
    if (!show) { els.chips.innerHTML = ""; return; }
    els.chips.innerHTML = "";
    CHIPS.forEach(function (c) {
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = c;
      els.chips.appendChild(b);
    });
  }

  /* ── open/close ────────────────────────────────────────────────────────── */
  function toggle() {
    open = !open;
    els.panel.hidden = !open;
    els.fab.hidden = open;
    els.fab.setAttribute("aria-expanded", String(open));
    if (open) {
      try { sessionStorage.setItem(SEEN, "1"); } catch (e) {}
      var dot = els.fab.querySelector(".gz-maya-dot");
      if (dot) dot.remove();
      scroll(true);
      if (!matchMedia("(max-width:480px)").matches) els.ta.focus();
      if (window.gzTrack) window.gzTrack("maya_open", { page: location.pathname });
    } else {
      els.fab.focus();
    }
  }

  /* ── send ──────────────────────────────────────────────────────────────── */
  function submit() {
    var v = els.ta.value.trim();
    if (v) ask(v);
  }

  function ask(text) {
    if (busy) return;
    text = String(text).slice(0, MAXLEN).trim();
    if (!text) return;

    if (!log.length && window.gzTrack) window.gzTrack("maya_first_message", { page: location.pathname });

    log.push({ role: "user", content: text });
    persist();
    els.ta.value = "";
    els.ta.style.height = "auto";
    bubble("user", text);
    chips();
    scroll(true);
    stream();
  }

  function stream() {
    busy = true;
    els.send.disabled = true;

    var wrap = document.createElement("div");
    wrap.className = "gz-maya-msg a";
    wrap.innerHTML = '<span class="gz-maya-typing"><i></i><i></i><i></i></span>';
    els.body.appendChild(wrap);
    scroll(true);

    var acc = "";
    var first = true;
    var ctl = typeof AbortController !== "undefined" ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctl) ctl.abort(); }, 45000);

    /* A failed turn must not leave an unpaired user message in the log: the
       server requires strictly alternating roles and silently drops the odd one
       out, so the NEXT question would be answered against the wrong text. Roll
       the turn back and hand the visitor their words to retry. */
    function fail(msg) {
      clearTimeout(timer);
      wrap.remove();
      var sent = log[log.length - 1];
      if (sent && sent.role === "user") {
        log.pop();
        persist();
        var us = els.body.querySelectorAll(".gz-maya-msg.u");
        if (us.length) us[us.length - 1].remove();
        if (!els.ta.value) {
          els.ta.value = sent.content;
          els.ta.style.height = "auto";
          els.ta.style.height = Math.min(els.ta.scrollHeight, 120) + "px";
        }
      }
      bubble("error", msg || P.fallback);
      busy = false;
      els.send.disabled = false;
      chips();
      scroll(true);
    }

    fetch(ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json" },
      signal: ctl ? ctl.signal : undefined,
      body: JSON.stringify({ messages: log.slice(-24), page: location.pathname, persona: PERSONA })
    })
      .then(function (res) {
        if (!res.ok || !res.body) {
          return res.json().then(
            function (j) { throw new Error(j && j.error); },
            function () { throw new Error(""); }
          );
        }
        var reader = res.body.getReader();
        var dec = new TextDecoder();
        var buf = "";

        return (function pump() {
          return reader.read().then(function (r) {
            if (r.done) return;
            buf += dec.decode(r.value, { stream: true });
            var lines = buf.split("\n");
            buf = lines.pop() || "";
            for (var i = 0; i < lines.length; i++) {
              var ln = lines[i];
              if (ln.indexOf("data:") !== 0) continue;
              var raw = ln.slice(5).trim();
              if (!raw) continue;
              var ev;
              try { ev = JSON.parse(raw); } catch (e) { continue; }
              if (ev.error) throw new Error(ev.error);
              if (ev.t) {
                acc += ev.t;
                if (first) { wrap.innerHTML = ""; first = false; }
                wrap.innerHTML = fmt(acc);
                scroll();
              }
            }
            return pump();
          });
        })();
      })
      .then(function () {
        clearTimeout(timer);
        if (!acc.trim()) return fail();
        log.push({ role: "assistant", content: acc });
        persist();
        if (PERSONA === "law") handoff(acc);
        busy = false;
        els.send.disabled = false;
        chips();
        scroll(true);
      })
      .catch(function (e) {
        fail(e && e.message ? e.message : "");
      });
  }

  /* ── intake hand-off (law persona) ─────────────────────────────────────────
     Maya ends a finished intake with a fixed "Intake summary" block. Parse it,
     announce it to the page (window "maya:intake" event) and send it to the
     server, which forwards it to the firm's automation webhook. */
  var KEYS = {
    "matter": "matter", "urgency": "urgency", "name": "name", "contact": "contact",
    "preferred time": "preferredTime", "other parties": "otherParties",
    "summary": "summary", "language": "language"
  };
  var lastIntake = "";

  function parseIntake(text) {
    var at = text.search(/intake summary/i);
    if (at < 0) return null;
    var out = {};
    text.slice(at).split("\n").slice(1).forEach(function (ln) {
      var m = ln.replace(/[*_`]/g, "").replace(/^\s*[-•]\s*/, "").match(/^\s*([A-Za-z ]+?)\s*:\s*(.+)$/);
      if (!m) return;
      var k = KEYS[m[1].toLowerCase()];
      if (k && !out[k]) out[k] = m[2].trim();
    });
    return out.name && out.contact ? out : null;
  }

  function handoff(text) {
    var intake = parseIntake(text);
    if (!intake) return;
    var sig = JSON.stringify(intake);
    if (sig === lastIntake) return;
    lastIntake = sig;
    var detail = { intake: intake, status: "sending" };
    try { dispatchEvent(new CustomEvent("maya:intake", { detail: detail })); } catch (e) {}
    fetch("/api/maya/intake", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ intake: intake })
    })
      .then(function (res) { return res.json(); })
      .then(function (j) { detail.status = j && j.forwarded ? "forwarded" : j && j.ok ? "saved" : "failed"; })
      .catch(function () { detail.status = "failed"; })
      .then(function () {
        try { dispatchEvent(new CustomEvent("maya:intake-status", { detail: detail })); } catch (e) {}
      });
  }

  /* ── init ──────────────────────────────────────────────────────────────── */
  function init() {
    if (document.body.getAttribute("data-maya") === "off") return;
    build();
  }
  if (document.readyState === "loading") addEventListener("DOMContentLoaded", init);
  else init();
})();
