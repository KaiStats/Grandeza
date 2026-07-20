/* ============================================================================
   GRANDEZA MOTION SYSTEM · motion.js
   Behavior layer for motion.css. Vanilla, dependency-free, ~2kb.
   Exposes window.GZMotion. Everything is a no-op / instant under
   prefers-reduced-motion. Uses IntersectionObserver + rAF only —
   never scroll-event thrash.
   Usage:  GZMotion.init();   // wires reveals, counters, gauges, header
   ============================================================================ */
(function (root) {
  "use strict";

  var reduced = function () {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
           document.documentElement.getAttribute("data-gz-motion") === "off";
  };

  /* ---- easing (mirrors the CSS tokens for JS-driven tweens) ---- */
  var easeOutCubic = function (t) { return 1 - Math.pow(1 - t, 3); };
  var easeOutExpo  = function (t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); };

  /* ---- rAF tween helper ---- */
  function tween(from, to, duration, onUpdate, opts) {
    opts = opts || {};
    var ease = opts.ease || easeOutCubic;
    if (reduced()) { onUpdate(to, 1); if (opts.onDone) opts.onDone(); return; }
    var start = performance.now();
    (function frame(now) {
      var p = Math.min(1, (now - start) / duration);
      onUpdate(from + (to - from) * ease(p), p);
      if (p < 1) requestAnimationFrame(frame);
      else if (opts.onDone) opts.onDone();
    })(start);
  }

  /* ---- 1. Scroll reveal + stagger --------------------------------------- */
  function revealOnScroll(selector) {
    var els = Array.prototype.slice.call(document.querySelectorAll(selector || ".gz-reveal"));
    if (reduced() || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    // assign stagger index within each .gz-stagger parent
    document.querySelectorAll(".gz-stagger").forEach(function (group) {
      Array.prototype.slice.call(group.children).forEach(function (child, i) {
        child.style.setProperty("--i", i);
      });
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---- 2. Count-up (fires when the number scrolls into view) ------------ */
  function countUp(el, opts) {
    opts = opts || {};
    var to = opts.to != null ? opts.to : parseFloat(el.getAttribute("data-count") || el.textContent) || 0;
    var dur = opts.duration || 1100;
    var fmt = opts.format || function (v) { return Math.round(v).toLocaleString(); };
    var run = function () { tween(opts.from || 0, to, dur, function (v) { el.textContent = fmt(v); }); };
    if (opts.now) return run();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { run(); io.disconnect(); } });
    }, { threshold: 0.6 });
    io.observe(el);
  }

  /* ---- 3. Score gauge sweep (the one cinematic beat) -------------------- */
  // arc = 270deg of r=100 => 471.24
  function gauge(opts) {
    var ARC = 471.24;
    var valEl = opts.arc, numEl = opts.number, bandEl = opts.band;
    function bandOf(s){
      if(s<34) return ["Critical","var(--fail,#c4463a)"];
      if(s<=50)return ["High Risk","var(--fail,#c4463a)"];
      if(s<=65)return ["At Risk","var(--warn,#d68a2e)"];
      if(s<=80)return ["Moderate","var(--warn,#d68a2e)"];
      return ["Protected","var(--pass,#2f8f5b)"];
    }
    function paint(s){
      var b = bandOf(s);
      if (valEl){ valEl.style.strokeDashoffset = String(ARC*(1 - s/100)); valEl.style.stroke = b[1]; }
      if (numEl) numEl.textContent = String(Math.round(s));
      if (bandEl){ bandEl.textContent = b[0]; bandEl.style.color = b[1]; }
    }
    function to(target, opts2){ opts2 = opts2||{};
      tween(opts2.from||0, target, opts2.duration||1100, paint, {ease: easeOutExpo, onDone: opts2.onDone});
    }
    return { paint: paint, to: to,
      // signature narrative: baseline risk -> hardened
      sweep: function(baseline, hardened){
        if (reduced()){ paint(hardened); return; }
        to(baseline, { duration: 1000, onDone: function(){
          setTimeout(function(){ to(hardened, { from: baseline, duration: 1300 }); }, 850);
        }});
      }
    };
  }

  /* ---- 4. Header condense on scroll (rAF-throttled) --------------------- */
  function stickyHeader(el, threshold) {
    if (!el) return; threshold = threshold || 8; var ticking = false;
    function update(){ el.classList.toggle("scrolled", window.scrollY > threshold); ticking = false; }
    addEventListener("scroll", function(){ if(!ticking){ requestAnimationFrame(update); ticking = true; } }, {passive:true});
    update();
  }

  /* ---- 5. Pointer tilt / spotlight for feature cards (desktop only) ----- */
  function tilt(el, opts){ opts = opts||{};
    if (reduced() || matchMedia("(pointer:coarse)").matches) return;
    var max = opts.max || 6;
    el.addEventListener("pointermove", function(e){
      var r = el.getBoundingClientRect();
      var px = (e.clientX - r.left)/r.width - .5, py = (e.clientY - r.top)/r.height - .5;
      el.style.transform = "perspective(800px) rotateX("+(-py*max)+"deg) rotateY("+(px*max)+"deg)";
    });
    el.addEventListener("pointerleave", function(){ el.style.transform = ""; });
  }

  /* ---- 6. Certify loader: draw the seal, stamp, then release the page --- */
  function certifyLoader(el, onDone){
    if (!el){ if(onDone) onDone(); return; }
    var finish = function(){ el.setAttribute("data-done","1"); if(onDone) onDone(); };
    if (reduced()){ el.style.display="none"; finish(); return; }
    // el is expected to contain a .gz-draw path; CSS runs the draw, we time the exit.
    setTimeout(function(){
      el.style.transition = "opacity 320ms var(--gz-ease-exit)";
      el.style.opacity = "0";
      setTimeout(function(){ el.style.display = "none"; finish(); }, 340);
    }, 1150);
  }

  /* ---- 7. Progressive View Transitions for same-origin links ------------ */
  // Safe even where the API is absent (falls back to normal navigation).
  function enableViewTransitions(){
    if (!document.startViewTransition) return; // browser handles @view-transition CSS itself for MPA
    // For SPA-style swaps you'd wrap DOM updates in document.startViewTransition(cb).
  }

  root.GZMotion = {
    reduced: reduced, tween: tween,
    ease: { outCubic: easeOutCubic, outExpo: easeOutExpo },
    revealOnScroll: revealOnScroll, countUp: countUp, gauge: gauge,
    stickyHeader: stickyHeader, tilt: tilt, certifyLoader: certifyLoader,
    enableViewTransitions: enableViewTransitions,
    init: function () {
      revealOnScroll(".gz-reveal");
      stickyHeader(document.querySelector("[data-gz-sticky]"));
      document.querySelectorAll("[data-count]").forEach(function (el) { countUp(el); });
      document.querySelectorAll("[data-gz-tilt]").forEach(function (el) { tilt(el); });
      enableViewTransitions();
    }
  };
})(window);
