import { business, services, testimonials, faqs } from "@/lib/business";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";
import CallBar from "./components/CallBar";
import {
  PhoneIcon,
  ShieldIcon,
  ClockIcon,
  PinIcon,
  StarIcon,
  CheckIcon,
  ChevronIcon,
  serviceIcons,
  WrenchIcon,
} from "./components/Icons";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <TrustBar />
        <Services />
        <WhyUs />
        <Process />
        <Reviews />
        <ServiceArea />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <CallBar />
      <ChatWidget />
    </>
  );
}

/* ---------------------------------------------------------------- hero -- */

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-navy-950 pt-20">
      <div className="hero-sheen absolute inset-0" aria-hidden="true" />
      {/*
        Faint pipe-run motif. Desktop only — at narrow widths the strokes cut
        across the headline and read as a rendering artifact rather than texture.
      */}
      <svg
        className="pointer-events-none absolute -right-16 top-24 hidden h-[440px] w-[440px] text-white/[0.05] lg:block"
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <path d="M20 45h45a18 18 0 0 1 18 18v34a18 18 0 0 0 18 18h60" />
        <path d="M20 135h25a18 18 0 0 0 18-18V78" />
        <circle cx="63" cy="63" r="4" />
        <circle cx="101" cy="115" r="4" />
      </svg>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:py-28">
        <div className="lg:col-span-7">
          <p className="rise-in inline-flex items-center gap-2 rounded-full border border-copper-400/30 bg-copper-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-copper-300">
            <span className="pulse-dot h-2 w-2 rounded-full bg-copper-400" />
            Family owned · Las Vegas native
          </p>

          <h1 className="rise-in mt-6 font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Las Vegas plumbing,
            <span className="block text-copper-400">done right the first time.</span>
          </h1>

          <p className="rise-in mt-6 max-w-xl text-lg leading-relaxed text-navy-100">
            {business.yearsExperience}+ years in the valley, owner-operated by{" "}
            {business.owner}. Water heaters, leaks, drains, and repipes — priced
            straight, explained plainly, and cleaned up after.
          </p>

          <div className="rise-in mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={business.phoneHref}
              className="group flex items-center justify-center gap-3 rounded-full bg-copper-500 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-copper-900/40 transition-all hover:bg-copper-600 hover:shadow-2xl"
            >
              <PhoneIcon className="h-5 w-5 transition-transform group-hover:-rotate-12" />
              {business.phone}
            </a>
            <a
              href="#services"
              className="flex items-center justify-center gap-2 rounded-full border-2 border-white/20 px-8 py-4 text-lg font-bold text-white transition-colors hover:border-white/50 hover:bg-white/5"
            >
              See what we fix
            </a>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {[
              { v: `${business.yearsExperience}+`, l: "Years in the trade" },
              { v: "Lic.", l: `#${business.license}` },
              { v: "Same", l: "Day when we can" },
            ].map((stat) => (
              <div key={stat.l}>
                <dt className="font-display text-3xl font-bold text-copper-400">
                  {stat.v}
                </dt>
                <dd className="mt-1 text-xs font-medium uppercase tracking-wider text-navy-200">
                  {stat.l}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Quote card */}
        <div className="lg:col-span-5">
          <div className="rise-in rounded-2xl border border-white/10 bg-white/[0.06] p-7 backdrop-blur-sm sm:p-8">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
              Tell us what&rsquo;s wrong
            </h2>
            <p className="mt-2 text-sm text-navy-100">
              Call and talk to {business.owner} directly — no call center, no
              runaround.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                "No hot water",
                "Active leak or water damage",
                "Main line backed up",
                "Running or leaking toilet",
                "Fixture install or replacement",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-copper-400" />
                  {item}
                </li>
              ))}
            </ul>

            <a
              href={business.phoneHref}
              className="mt-7 flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 text-lg font-bold text-navy-950 transition-transform hover:scale-[1.02]"
            >
              <PhoneIcon className="h-5 w-5" />
              Call {business.phone}
            </a>

            <p className="mt-4 text-center text-xs text-navy-200">
              {business.hours[0].days}: {business.hours[0].time} ·{" "}
              {business.hours[1].days}: {business.hours[1].time}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- trust bar -- */

function TrustBar() {
  const items = [
    { icon: ShieldIcon, title: "Licensed & insured", sub: business.licenseLabel },
    { icon: WrenchIcon, title: "Owner on the job", sub: `${business.owner}, ${business.yearsExperience}+ years` },
    { icon: PinIcon, title: "Based in Summerlin", sub: "Valley-wide service" },
    { icon: ClockIcon, title: "Straight pricing", sub: "Quoted before we start" },
  ];

  return (
    <section className="border-b border-navy-100 bg-navy-50">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {items.map(({ icon: Icon, title, sub }) => (
          <div key={title} className="flex items-center gap-3 py-6 lg:justify-center">
            <Icon className="h-7 w-7 shrink-0 text-copper-600" />
            <div className="min-w-0">
              <p className="text-sm font-bold text-navy-900">{title}</p>
              <p className="truncate text-xs text-navy-600">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ services -- */

function SectionHeading({
  eyebrow,
  title,
  sub,
  light = false,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  light?: boolean;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p
        className={`text-xs font-bold uppercase tracking-[0.2em] ${
          light ? "text-copper-400" : "text-copper-600"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-3 font-display text-4xl font-bold uppercase leading-tight tracking-tight sm:text-5xl ${
          light ? "text-white" : "text-navy-900"
        }`}
      >
        {title}
      </h2>
      {sub && (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            light ? "text-navy-100" : "text-navy-600"
          }`}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

function Services() {
  return (
    <section id="services" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What we do"
          title="Residential & commercial plumbing"
          sub="If it carries water, we work on it. Here's what we get called for most."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = serviceIcons[service.slug] ?? WrenchIcon;
            return (
              <article
                key={service.slug}
                className="group relative flex flex-col rounded-card border border-navy-100 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-copper-200 hover:shadow-xl hover:shadow-navy-900/5"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy-50 text-navy-700 transition-colors group-hover:bg-copper-500 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-2xl font-bold uppercase tracking-wide text-navy-900">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-600">
                  {service.blurb}
                </p>
                <ul className="mt-5 space-y-2 border-t border-navy-100 pt-5">
                  {service.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-center gap-2 text-sm font-medium text-navy-700"
                    >
                      <CheckIcon className="h-4 w-4 shrink-0 text-copper-500" />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <p className="mt-12 text-center text-navy-600">
          Not on the list?{" "}
          <a
            href={business.phoneHref}
            className="font-bold text-copper-600 underline decoration-copper-300 underline-offset-4 hover:text-copper-700"
          >
            Call {business.phone}
          </a>{" "}
          and ask — odds are we handle it.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- why us -- */

function WhyUs() {
  const reasons = [
    {
      title: "You get the owner, not a dispatcher",
      body: `${business.owner} has been doing this in Las Vegas for over ${business.yearsExperience} years. When you call, you talk to someone who can actually diagnose the problem.`,
    },
    {
      title: "The price you're told is the price you pay",
      body: "We quote the job before we start. If we find something underneath, we stop and tell you what it means before touching it.",
    },
    {
      title: "We clean up",
      body: "Drop cloths, shoe covers, and the wall patched behind us. You shouldn't be able to tell we were there except that the thing works.",
    },
    {
      title: "Family owned, and it shows",
      body: "We're a small local shop, not a franchise with a quota. Repeat customers and neighbor referrals are the whole business.",
    },
  ];

  return (
    <section id="why" className="bg-navy-950 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          light
          eyebrow="Why Pipe Dreams"
          title="The plumber your neighbor already recommended"
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-12">
          {reasons.map((r, i) => (
            <div key={r.title} className="flex gap-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-copper-400/30 bg-copper-500/10 font-display text-xl font-bold text-copper-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
                  {r.title}
                </h3>
                <p className="mt-2 leading-relaxed text-navy-100">{r.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- process -- */

function Process() {
  const steps = [
    { n: "Call", d: `Reach us at ${business.phone}. Describe the problem in plain words — we'll ask the right follow-ups.` },
    { n: "Quote", d: "We give you a price or a tight range up front, and a realistic window for getting out there." },
    { n: "Fix", d: "We do the work, show you what was wrong, and clean up before we leave." },
  ];

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="How it works" title="Three steps, no surprises" />
        <ol className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.n} className="relative">
              {i < steps.length - 1 && (
                <span
                  className="absolute left-full top-7 hidden h-px w-8 -translate-x-4 bg-navy-200 md:block"
                  aria-hidden="true"
                />
              )}
              <span className="grid h-14 w-14 place-items-center rounded-full bg-copper-500 font-display text-2xl font-bold text-white">
                {i + 1}
              </span>
              <h3 className="mt-5 font-display text-2xl font-bold uppercase tracking-wide text-navy-900">
                {s.n}
              </h3>
              <p className="mt-2 leading-relaxed text-navy-600">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- reviews -- */

function Reviews() {
  return (
    <section className="bg-navy-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What people say"
          title="Word of mouth, mostly"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.quote}
              className="flex flex-col rounded-card border border-navy-100 bg-white p-7"
            >
              <div className="flex gap-0.5 text-copper-500" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 leading-relaxed text-navy-800">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 border-t border-navy-100 pt-4 text-sm">
                <span className="font-bold text-navy-900">{t.author}</span>
                <span className="text-navy-500"> · via {t.source}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-10 text-center">
          <a
            href={business.social.yelp}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-copper-600 underline decoration-copper-300 underline-offset-4 hover:text-copper-700"
          >
            Read more reviews on Yelp
          </a>
        </p>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- service area -- */

function ServiceArea() {
  return (
    <section id="area" className="py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-copper-600">
            Where we work
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold uppercase leading-tight tracking-tight text-navy-900 sm:text-5xl">
            The whole valley, from a shop in Summerlin
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-navy-600">
            We&rsquo;re local — not a national brand with a Las Vegas phone
            number. If you&rsquo;re not sure whether you&rsquo;re in range, call
            and ask.
          </p>
          <a
            href={business.phoneHref}
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-navy-900 px-7 py-4 text-lg font-bold text-white transition-colors hover:bg-navy-800"
          >
            <PhoneIcon className="h-5 w-5" />
            {business.phone}
          </a>
        </div>

        <ul className="grid grid-cols-2 gap-3">
          {business.serviceArea.map((city) => (
            <li
              key={city}
              className="flex items-center gap-2.5 rounded-xl border border-navy-100 bg-navy-50 px-4 py-4 font-semibold text-navy-800"
            >
              <PinIcon className="h-5 w-5 shrink-0 text-copper-500" />
              {city}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- faq -- */

function Faq() {
  return (
    <section id="faq" className="bg-navy-50 py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Questions" title="Straight answers" />
        <div className="mt-12 space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-card border border-navy-100 bg-white [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 font-display text-xl font-bold uppercase tracking-wide text-navy-900">
                {f.q}
                <ChevronIcon className="h-5 w-5 shrink-0 text-copper-500 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="px-6 pb-6 leading-relaxed text-navy-600">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- final cta -- */

function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-copper-600 py-20 lg:py-24">
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-4xl font-bold uppercase leading-tight tracking-tight text-white sm:text-5xl">
          Water where it shouldn&rsquo;t be?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-copper-50">
          Call {business.owner} directly. Most problems get diagnosed on the
          phone in under five minutes.
        </p>
        <a
          href={business.phoneHref}
          className="mt-9 inline-flex items-center gap-3 rounded-full bg-white px-9 py-5 text-xl font-bold text-copper-700 shadow-2xl transition-transform hover:scale-105"
        >
          <PhoneIcon className="h-6 w-6" />
          {business.phone}
        </a>
        <p className="mt-6 text-sm font-medium text-copper-100">
          {business.licenseLabel} · Licensed &amp; insured
        </p>
      </div>
    </section>
  );
}
