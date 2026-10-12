import type { Metadata } from "next";
import { MenuView } from "@/components/site/menu-view";
import { routeMetadata } from "@/lib/metadata";
import { MENU } from "@/lib/menu-data";
import { BIZ } from "@/lib/site-data";

export const metadata: Metadata = routeMetadata("menu", "/images/hero-braise.jpg");

// Menu schema built straight from the transcribed client menu so search
// engines can read every real price. Currency: NAD (Namibian dollar, shown
// on the site as N$).
const menuJsonLd = {
  "@context": "https://schema.org",
  "@type": "Menu",
  name: "Big Brothers Restaurant Menu",
  url: `${BIZ.site}/menu`,
  inLanguage: "en",
  hasMenuSection: MENU.map((s) => ({
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

export default function MenuPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuJsonLd) }}
      />
      <MenuView />
    </>
  );
}
