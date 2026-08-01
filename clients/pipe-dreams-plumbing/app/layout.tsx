import type { Metadata } from "next";
import { Inter, Barlow_Condensed } from "next/font/google";
import { business, services, faqs } from "@/lib/business";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const display = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: {
    default: `${business.name} — Las Vegas Plumber | ${business.licenseLabel}`,
    template: `%s | ${business.name}`,
  },
  description: `Family-owned Las Vegas plumbers with ${business.yearsExperience}+ years in the valley. Water heaters, leak detection, drains, and repipes across Summerlin, Henderson, and North Las Vegas. Call ${business.phone}.`,
  keywords: [
    "Las Vegas plumber",
    "Summerlin plumber",
    "water heater repair Las Vegas",
    "leak detection Las Vegas",
    "emergency plumber Las Vegas",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: business.siteUrl,
    siteName: business.name,
    title: `${business.name} — Las Vegas Plumbing Done Right`,
    description: `Licensed, family-owned, ${business.yearsExperience}+ years in the valley. Call ${business.phone}.`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${business.name} — Las Vegas Plumbing`,
    description: `Licensed, family-owned, ${business.yearsExperience}+ years in the valley.`,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport = {
  themeColor: "#122438",
};

/**
 * schema.org markup. Google leans on this for the local pack and for the
 * "hours / phone / service area" panel, so it is worth keeping in sync with
 * lib/business.ts rather than letting it drift.
 */
function StructuredData() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Plumber",
        "@id": `${business.siteUrl}/#business`,
        name: business.name,
        url: business.siteUrl,
        telephone: business.phone,
        description: `Family-owned plumbing company serving the Las Vegas valley for over ${business.yearsExperience} years.`,
        address: {
          "@type": "PostalAddress",
          streetAddress: business.address.street,
          addressLocality: business.address.city,
          addressRegion: business.address.region,
          postalCode: business.address.postalCode,
          addressCountry: business.address.country,
        },
        areaServed: business.serviceArea.map((name) => ({
          "@type": "City",
          name,
        })),
        openingHoursSpecification: business.hoursSpec.map((spec) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: spec.days,
          opens: spec.opens,
          closes: spec.closes,
        })),
        sameAs: [business.social.facebook, business.social.yelp],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Plumbing Services",
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.title, description: s.blurb },
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${business.siteUrl}/#faq`,
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <body className="min-h-dvh bg-white font-sans text-navy-900 antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-navy-900 focus:px-4 focus:py-3 focus:text-white"
        >
          Skip to content
        </a>
        {children}
        <StructuredData />
      </body>
    </html>
  );
}
