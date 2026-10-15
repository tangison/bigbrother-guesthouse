import type { Metadata } from "next";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import { StickyActionBar } from "@/components/site/sticky-action-bar";
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
  // Opening hours: the owner's confirmed schedule is Monday to Saturday with
  // a 09:30/10:00 open. Closing times are not confirmed, so no machine hours
  // are published here (an invalid closes value would be worse than none).
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
    </div>
  );
}
