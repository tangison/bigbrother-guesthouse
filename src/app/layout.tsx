import type { Metadata } from "next";
import "@fontsource/fraunces/600.css";
import "@fontsource/fraunces/700.css";
import "@fontsource/outfit/400.css";
import "@fontsource/outfit/500.css";
import "@fontsource/outfit/600.css";
/* Engine CSS is layered from within globals.css (layer(engine), declared before
 * Tailwind's layers) so Tailwind utilities win cascade ties. Both engine files
 * are verbatim copies of skills/scroll-craft/engine; only the tokens are
 * re-pointed, in globals.css. */
import "./globals.css";
import { BIZ } from "@/lib/site-data";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { B2Odometer } from "@/components/site/odometer";
import { ScrollEngine } from "@/components/site/scroll-engine";

const title = "Big Brother Guesthouse, B&B & Restaurant | Usakos, Namibia";
const description =
  "Home away from home in Usakos on the B2, halfway between Windhoek and Swakopmund. Guesthouse and B&B rooms, a restaurant and bar on site, traditional food, pizzas and grills. Plot 7, Laaste Begin, Usakos South.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Big Brother Guesthouse",
    "Usakos accommodation",
    "Usakos restaurant",
    "Namibia B&B",
    "B2 road Namibia",
    "Erongo Region guesthouse",
    "Windhoek Swakopmund stopover",
  ],
  metadataBase: new URL(BIZ.site),
  openGraph: {
    title,
    description,
    url: BIZ.site,
    siteName: "Big Brother Holdings",
    locale: "en_NA",
    type: "website",
    images: [{ url: "/images/hero-platter.jpg", width: 1600, height: 1200, alt: "Big Brothers Restaurant family platter" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/hero-platter.jpg"],
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: "Big Brother Guesthouse",
    alternateName: "Big Brother Holdings",
    description,
    url: BIZ.site,
    telephone: BIZ.guesthouse.phone1Display,
    email: BIZ.guesthouse.email,
    image: `${BIZ.site}/images/hero-platter.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: BIZ.address.street,
      addressLocality: BIZ.address.town,
      addressRegion: BIZ.address.region,
      addressCountry: "NA",
    },
    geo: { "@type": "GeoCoordinates", latitude: -22.0064087, longitude: 15.5786901, description: "Google Maps place listing, Big Brother Guesthouse" },
    sameAs: [BIZ.socials.facebook, BIZ.socials.instagram],
  },
  {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: BIZ.restaurant.name,
    slogan: BIZ.restaurant.tagline,
    servesCuisine: ["Namibian", "Traditional", "Grills", "Pizza", "Seafood"],
    priceRange: "N$30 to N$400",
    url: `${BIZ.site}/restaurant`,
    hasMenu: {
      "@type": "Menu",
      name: "Big Brothers Restaurant Menu",
      url: `${BIZ.site}/menu`,
    },
    acceptsReservations: `https://wa.me/${BIZ.restaurant.whatsapp}`,
    telephone: BIZ.restaurant.phoneDisplay,
    email: BIZ.restaurant.email,
    image: `${BIZ.site}/images/hero-braise.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: BIZ.address.street,
      addressLocality: BIZ.address.town,
      addressRegion: BIZ.address.region,
      addressCountry: "NA",
    },
    geo: { "@type": "GeoCoordinates", latitude: -22.0064087, longitude: 15.5786901 },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "22:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "08:00",
        closes: "21:00",
      },
    ],
    sameAs: [BIZ.socials.facebook, BIZ.socials.instagram],
  },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to main content
        </a>
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <B2Odometer />
        <ScrollEngine />
        <noscript>
          {/* The engine reveals cue content on mount; without JS the acts must
           * still read. Static layout, everything visible. */}
          <style>{`[data-sc-cue]{opacity:1!important}[data-sc-act]{height:auto!important}[data-sc-stage],.sc-stage{position:static!important;height:auto!important}[data-sc-reveal]{clip-path:none!important}[data-sc-in],[data-sc-stagger]>*{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </body>
    </html>
  );
}
