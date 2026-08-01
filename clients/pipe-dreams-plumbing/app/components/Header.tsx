"use client";

import { useEffect, useState } from "react";
import { business } from "@/lib/business";
import { PhoneIcon, DropletIcon } from "./Icons";

const NAV = [
  { href: "#services", label: "Services" },
  { href: "#why", label: "Why Us" },
  { href: "#area", label: "Service Area" },
  { href: "#faq", label: "FAQ" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy-950/95 shadow-lg shadow-navy-950/20 backdrop-blur"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2.5 text-white">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-copper-500 text-white">
            <DropletIcon className="h-6 w-6" />
          </span>
          <span className="leading-none">
            <span className="block font-display text-xl font-bold uppercase tracking-wide">
              Pipe Dreams
            </span>
            <span className="block text-[11px] font-medium uppercase tracking-[0.18em] text-navy-200">
              Plumbing Co.
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-navy-100 transition-colors hover:text-copper-300"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={business.phoneHref}
            className="hidden items-center gap-2 rounded-full bg-copper-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-copper-900/30 transition-all hover:bg-copper-600 hover:shadow-copper-900/40 sm:flex"
          >
            <PhoneIcon className="h-4 w-4" />
            {business.phone}
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-11 w-11 place-items-center rounded-lg text-white transition-colors hover:bg-white/10 lg:hidden"
          >
            <span className="relative block h-4 w-6">
              <span
                className={`absolute left-0 block h-0.5 w-6 bg-current transition-transform duration-300 ${
                  open ? "top-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 block h-0.5 w-6 -translate-y-1/2 bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-6 bg-current transition-transform duration-300 ${
                  open ? "top-1/2 -rotate-45" : "bottom-0"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-white/10 bg-navy-950 lg:hidden"
      >
        <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6" aria-label="Mobile">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block border-b border-white/5 py-4 text-base font-semibold text-white last:border-0"
            >
              {item.label}
            </a>
          ))}
          <a
            href={business.phoneHref}
            className="mt-4 flex items-center justify-center gap-2 rounded-full bg-copper-500 px-5 py-4 text-base font-bold text-white"
          >
            <PhoneIcon className="h-5 w-5" />
            {business.phone}
          </a>
        </nav>
      </div>
    </header>
  );
}
