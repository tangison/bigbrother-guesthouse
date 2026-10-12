import type { Metadata } from "next";
import "@fontsource/fraunces/400.css";
import "@fontsource/fraunces/600.css";
import "@fontsource/fraunces/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "./globals.css";
import { BIZ } from "@/lib/site-data";

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
    geo: { "@type": "GeoCoordinates", latitude: -22.0031, longitude: 15.5833, description: "Usakos town centre reference" },
    sameAs: [BIZ.socials.facebook, BIZ.socials.instagram],
  },
  {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: BIZ.restaurant.name,
    slogan: BIZ.restaurant.tagline,
    servesCuisine: ["Namibian", "Traditional", "Grills", "Pizza", "Seafood"],
    priceRange: "N$30 to N$400",
    url: `${BIZ.site}/#menu`,
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
    geo: { "@type": "GeoCoordinates", latitude: -22.0031, longitude: 15.5833 },
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
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
