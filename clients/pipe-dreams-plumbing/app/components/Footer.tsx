import { business, services } from "@/lib/business";
import { PhoneIcon, PinIcon, ClockIcon, DropletIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-navy-100">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 text-white">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-copper-500">
                <DropletIcon className="h-6 w-6" />
              </span>
              <span className="leading-none">
                <span className="block font-display text-xl font-bold uppercase tracking-wide">
                  Pipe Dreams
                </span>
                <span className="block text-[11px] font-medium uppercase tracking-[0.18em] text-navy-300">
                  Plumbing Co.
                </span>
              </span>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-navy-300">
              Family-owned plumbing serving the Las Vegas valley for over{" "}
              {business.yearsExperience} years.
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-copper-400">
              {business.licenseLabel}
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-bold uppercase tracking-wide text-white">
              Services
            </h2>
            <ul className="mt-5 space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <a
                    href="#services"
                    className="text-sm text-navy-300 transition-colors hover:text-copper-300"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-lg font-bold uppercase tracking-wide text-white">
              Service Area
            </h2>
            <ul className="mt-5 space-y-2.5">
              {business.serviceArea.map((city) => (
                <li key={city} className="text-sm text-navy-300">
                  {city}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-lg font-bold uppercase tracking-wide text-white">
              Get In Touch
            </h2>
            <ul className="mt-5 space-y-4">
              <li>
                <a
                  href={business.phoneHref}
                  className="flex items-start gap-3 text-white transition-colors hover:text-copper-300"
                >
                  <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-copper-400" />
                  <span className="font-bold">{business.phone}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-navy-300">
                <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-copper-400" />
                <address className="not-italic">
                  {business.address.street}
                  <br />
                  {business.address.city}, {business.address.region}{" "}
                  {business.address.postalCode}
                </address>
              </li>
              <li className="flex items-start gap-3 text-sm text-navy-300">
                <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-copper-400" />
                <div className="space-y-1">
                  {business.hours.map((h) => (
                    <div key={h.days}>
                      <span className="text-navy-200">{h.days}:</span> {h.time}
                    </div>
                  ))}
                </div>
              </li>
            </ul>

            <div className="mt-6 flex gap-3">
              <a
                href={business.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/15 px-4 py-2 text-xs font-semibold text-navy-200 transition-colors hover:border-copper-400 hover:text-copper-300"
              >
                Facebook
              </a>
              <a
                href={business.social.yelp}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/15 px-4 py-2 text-xs font-semibold text-navy-200 transition-colors hover:border-copper-400 hover:text-copper-300"
              >
                Yelp
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-navy-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {business.name}. All rights
            reserved.
          </p>
          <p>{business.licenseLabel} · Licensed &amp; insured</p>
        </div>
      </div>
    </footer>
  );
}
