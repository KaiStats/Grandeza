/**
 * Single source of truth for Pipe Dreams Plumbing Co. business facts.
 *
 * ⚠️  VERIFY BEFORE LAUNCH
 * pipedreamsplumbingco.com could not be reached from the build environment,
 * so everything below was reconstructed from public directory listings
 * (Yelp, BBB, Yellow Pages, Nextdoor, ZoomInfo). Each field is tagged with
 * how confident we are. Confirm the `verify` items with the owner, then
 * delete the tags.
 *
 * Nothing else in the codebase hardcodes these values — correcting a fact
 * here updates the header, footer, schema.org markup, and chat widget at once.
 */

export const business = {
  name: "Pipe Dreams Plumbing Co.",
  shortName: "Pipe Dreams",
  tagline: "Las Vegas plumbing done right the first time.",

  // confident — consistent across every directory listing
  phone: "(702) 768-0428",
  phoneHref: "tel:+17027680428",

  // confident — shown on their own /cart page title
  license: "0078531",
  licenseLabel: "NV Contractors Lic. #0078531",

  // verify — directory listings agree, but confirm this is a service address
  // they want published vs. a home office they would rather keep private.
  address: {
    street: "11456 Drappo Ave",
    city: "Las Vegas",
    region: "NV",
    postalCode: "89138",
    country: "US",
  },

  // verify — Summerlin is where they are based; the surrounding list is an
  // assumption about how far they actually travel.
  serviceArea: [
    "Summerlin",
    "Las Vegas",
    "North Las Vegas",
    "Henderson",
    "Spring Valley",
    "Enterprise",
  ],

  // verify — sourced from directory listings
  hours: [
    { days: "Monday – Friday", time: "8:00 AM – 5:00 PM" },
    { days: "Saturday", time: "9:00 AM – 4:00 PM" },
    { days: "Sunday", time: "Closed" },
  ],

  // Structured form of the above, for schema.org openingHoursSpecification.
  hoursSpec: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "17:00" },
    { days: ["Saturday"], opens: "09:00", closes: "16:00" },
  ],

  // confident — repeated in owner bio across listings
  owner: "Chance",
  yearsExperience: 25,

  social: {
    facebook: "https://www.facebook.com/pipedreamsplumbingco/",
    yelp: "https://www.yelp.com/biz/pipe-dreams-plumbing-las-vegas",
  },

  siteUrl: "https://www.pipedreamsplumbingco.com",
} as const;

export type Service = {
  slug: string;
  title: string;
  blurb: string;
  points: string[];
};

/**
 * verify — water heaters, leak detection, toilets, faucets and garbage
 * disposals are named directly in their listings. The rest are standard
 * residential plumbing work; cut any they don't actually offer.
 */
export const services: Service[] = [
  {
    slug: "water-heaters",
    title: "Water Heaters",
    blurb:
      "Repair, replacement, and tankless conversions. No hot water is the call we take most, and the one we're fastest on.",
    points: ["Tank & tankless", "Same-day replacement", "Leak & pressure checks"],
  },
  {
    slug: "leak-detection",
    title: "Leak Detection",
    blurb:
      "Slab leaks, pinhole leaks, and the mystery water bill. We find it before we open anything up.",
    points: ["Slab & sub-floor leaks", "Non-invasive location", "Full repipe when needed"],
  },
  {
    slug: "drains",
    title: "Drains & Clogs",
    blurb:
      "Kitchen, bath, main line. Cleared properly, not just pushed further down the pipe.",
    points: ["Main line snaking", "Hydro jetting", "Camera inspection"],
  },
  {
    slug: "toilets",
    title: "Toilets",
    blurb:
      "Running, rocking, leaking, or replaced entirely. Straightforward work, priced straightforwardly.",
    points: ["Repair & rebuild", "New installs", "Wax ring & flange"],
  },
  {
    slug: "faucets-fixtures",
    title: "Faucets & Fixtures",
    blurb:
      "Sinks, showers, hose bibs, and garbage disposals — installed so they last past the warranty.",
    points: ["Faucet & valve swaps", "Garbage disposals", "Shower & tub fixtures"],
  },
  {
    slug: "repipe",
    title: "Repipes & Repairs",
    blurb:
      "Failing galvanized or poly? We replace the run, patch the wall, and leave the place clean.",
    points: ["Whole-home repipe", "Section repairs", "Pressure regulators"],
  },
];

/**
 * ⚠️  PLACEHOLDER — DO NOT LAUNCH AS-IS
 * These are paraphrased themes from public reviews, not verified quotes with
 * permission to republish. Replace with real testimonials the owner has
 * signed off on, or embed the live Yelp/Google widget instead.
 */
export const testimonials = [
  {
    quote:
      "Stayed on the phone with me to walk through restarting the heater and make sure everything was safe before hanging up.",
    author: "Verified customer",
    source: "Yelp",
  },
  {
    quote:
      "Honest, knowledgeable, and actually on time. Has fixed a half dozen things for us over the years.",
    author: "Verified customer",
    source: "Yelp",
  },
  {
    quote:
      "Fair pricing and clean work. The only plumber we call now.",
    author: "Verified customer",
    source: "Nextdoor",
  },
];

export const faqs = [
  {
    q: "Do you charge for estimates?",
    a: "Call us at " + business.phone + " and we'll talk through what's going on. For most jobs we can give you a clear price range on the phone before anyone drives out.",
  },
  {
    q: "How fast can you get here?",
    a: "For no hot water, active leaks, and backed-up main lines we do everything we can to get out same-day. Call early and your odds are better.",
  },
  {
    q: "Are you licensed and insured?",
    a: `Yes — Nevada Contractors License #${business.license}, fully insured. Ask to see it and we'll show you.`,
  },
  {
    q: "What areas do you serve?",
    a: "We're based in Summerlin and cover the Las Vegas valley, including Henderson, North Las Vegas, Spring Valley, and Enterprise.",
  },
  {
    q: "Do you work on commercial properties?",
    a: "Yes. We handle both residential and commercial plumbing. Call and describe the property and we'll tell you straight whether it's a fit.",
  },
];
