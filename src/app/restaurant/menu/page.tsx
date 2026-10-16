import type { Metadata } from "next";
import { MenuBook } from "@/components/site/menu-view";
import { routeMetadata } from "@/lib/metadata";
import { RESTAURANT_MENU } from "@/lib/menu-data";
import { RESTAURANT, HOLDINGS, wa } from "@/lib/site-data";

export const metadata: Metadata = routeMetadata("restaurant-menu", null);

// Menu schema built straight from the restaurant's own print file
// (data/menu-restaurant.json) so search engines can read every real
// price. Currency: NAD (Namibian dollar, shown on the site as N$).
const menuJsonLd = {
  "@context": "https://schema.org",
  "@type": "Menu",
  name: "Big Brothers Restaurant Menu",
  url: `${HOLDINGS.site}/restaurant/menu`,
  inLanguage: "en",
  hasMenuSection: RESTAURANT_MENU.map((s) => ({
    "@type": "MenuSection",
    name: s.title,
    ...(s.kicker ? { description: s.kicker } : {}),
    hasMenuItem: s.items.map((it) => ({
      "@type": "MenuItem",
      name: it.name,
      ...(it.note ? { description: it.note } : {}),
      offers: {
        "@type": "Offer",
        price: it.price,
        priceCurrency: "NAD",
        availability: "https://schema.org/InStock",
      },
    })),
  })),
};

export default function RestaurantMenuPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuJsonLd) }}
      />
      <MenuBook
        brand="restaurant"
        sections={RESTAURANT_MENU}
        heroTitle="Good food, great vibes."
        heroCopy="Every price below comes from our own printed menu, from a N$23 cool drink to the N$400 seafood platter. The kitchen opens Monday to Saturday, from 09:30 or 10:00 depending on the day."
        heroImage="/images/dish-feast.jpg"
        photoBand={[
          { src: "/images/dish-samoosa.jpg", alt: "Golden samoosas with sauce and salad on a plate" },
          { src: "/images/dish-matangara.jpg", alt: "Matangara tripe in tomato gravy served with pap" },
          { src: "/images/cocktail-blue.jpg", alt: "Blue cocktail from the Big Brothers bar" },
        ]}
        contact={{
          tel: RESTAURANT.phoneEat,
          telDisplay: RESTAURANT.phoneEatDisplay,
          whatsapp: RESTAURANT.phoneEatWhatsapp,
          whatsappText: "Hello Big Brothers Restaurant, please reserve us a table.",
          ctaHref: "/restaurant/reserve",
          ctaLabel: "Reserve a table",
        }}
        crossMenu={{
          href: "/menu",
          label: "Open the guesthouse menu",
          note: "Two kitchens, two menus. This is the Big Brothers Restaurant menu, in town centre.",
        }}
        closing={{
          title: "Hungry? We are in town centre.",
          line: `${RESTAURANT.address.street}, Usakos. Kitchen hours: ${RESTAURANT.hoursKnown}.`,
        }}
      />
    </>
  );
}
