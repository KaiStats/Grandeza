/* Grandeza — shared site behavior (assets/site.js)
   Theme toggle, mobile nav, sticky-header condense, scroll reveal, footer year. */
(function () {
  "use strict";
  var root = document.documentElement;
  var reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;

  // Theme toggle (session-scoped)
  var t = document.getElementById("theme");
  if (t) t.addEventListener("click", function () {
    var c = root.getAttribute("data-theme");
    if (!c) c = matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light";
    root.setAttribute("data-theme", c === "dark" ? "light" : "dark");
  });

  // Mobile nav
  var mt = document.getElementById("menuToggle"), links = document.getElementById("navLinks");
  if (mt && links) {
    mt.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      mt.setAttribute("aria-expanded", String(open));
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") { links.classList.remove("open"); mt.setAttribute("aria-expanded", "false"); }
    });
  }

  // Sticky header condense
  var hdr = document.querySelector(".site-header"), ticking = false;
  if (hdr) {
    var upd = function () { hdr.classList.toggle("scrolled", window.scrollY > 8); ticking = false; };
    upd(); addEventListener("scroll", function () { if (!ticking) { requestAnimationFrame(upd); ticking = true; } }, { passive: true });
  }

  // Scroll reveal
  var els = document.querySelectorAll(".reveal");
  if (els.length && !reduce && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.14 });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add("in"); });
  }

  // Footer year
  var y = document.getElementById("year"); if (y) y.textContent = new Date().getFullYear();
})();
