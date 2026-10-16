import type { Metadata } from "next";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import { StickyActionBar } from "@/components/site/sticky-action-bar";
import { BackToTop } from "@/components/site/back-to-top";
import { RESTAURANT, GUESTHOUSE, HOLDINGS } from "@/lib/site-data";

/* The Restaurant is its own small website inside the main one: own nav,
 * footer, lime theme scope (.brand-restaurant), address, numbers and schema.
 * It is NOT at the guesthouse location. */

export const metadata: Metadata = {
  title: "Big Brothers Restaurant & Bar | Usakos Town Centre",
  description:
    "Big Brothers Restaurant in Usakos town centre: grills, seafood, pizza, kapana and a full bar. Est. 2023. Reserve a table on WhatsApp.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: RESTAURANT.name,
  slogan: RESTAURANT.tagline,
  servesCuisine: ["Namibian", "Traditional", "Grills", "Pizza", "Seafood"],
  priceRange: "N$30 to N$400",
  url: `${HOLDINGS.site}/restaurant`,
  hasMenu: {
    "@type": "Menu",
    name: "Big Brothers Restaurant Menu",
    url: `${HOLDINGS.site}/restaurant/menu`,
  },
  acceptsReservations: `https://wa.me/${RESTAURANT.phoneEatWhatsapp}`,
  telephone: RESTAURANT.phoneEatDisplay,
  email: RESTAURANT.email,
  image: `${HOLDINGS.site}/images/og-restaurant.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: RESTAURANT.address.street,
    addressLocality: RESTAURANT.address.town,
    addressRegion: RESTAURANT.address.region,
    addressCountry: "NA",
  },
  // Opening hours (owner audit, 16 Oct 2026, confirmed): the venue schedule.
  // The kitchen closes up to 30 minutes earlier on weekends; schema carries
  // the venue hours guests can plan around.
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "22:00",
    },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "22:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "09:30", closes: "21:30" },
  ],
  sameAs: [GUESTHOUSE.facebook, GUESTHOUSE.instagram, GUESTHOUSE.tiktok],
};

export default function RestaurantLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="brand-restaurant flex min-h-screen flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteNav brand="restaurant" />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter brand="restaurant" />
      <StickyActionBar brand="restaurant" />
      <BackToTop />
    </div>
  );
}
