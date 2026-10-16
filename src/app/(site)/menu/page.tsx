import type { Metadata } from "next";
import { MenuBook } from "@/components/site/menu-view";
import { routeMetadata } from "@/lib/metadata";
import { GUESTHOUSE_MENU } from "@/lib/menu-data";
import { GUESTHOUSE, HOLDINGS } from "@/lib/site-data";

export const metadata: Metadata = routeMetadata("menu", null);

// The guesthouse's own menu. The printed guesthouse menu card carries a
// QR that decodes to /menu (audited from the print file itself, 16 Oct
// 2026), so this page must always serve the guesthouse price list.
// Menu schema built straight from the guesthouse print file
// (data/menu-guesthouse.json). Currency: NAD, shown as N$.
const menuJsonLd = {
  "@context": "https://schema.org",
  "@type": "Menu",
  name: "Big Brother Guesthouse Menu",
  url: `${HOLDINGS.site}/menu`,
  inLanguage: "en",
  hasMenuSection: GUESTHOUSE_MENU.map((s) => ({
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

export default function GuesthouseMenuPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuJsonLd) }}
      />
      <MenuBook
        brand="guesthouse"
        sections={GUESTHOUSE_MENU}
        heroTitle="Home cooking at Plot 7."
        heroCopy="Every price below comes from our own printed guesthouse menu, from a N$20 tea to the N$400 seafood platter. Residents eat here first; day visitors order from the same kitchen."
        heroImage="/images/dish-breakfast.jpg"
        photoBand={[
          { src: "/images/plate-pap-braise.jpg", alt: "Pap with slow-braised meat from the guesthouse kitchen" },
          { src: "/images/plate-steak-onion-rings.jpg", alt: "Steak with chips and onion rings on a plate" },
          { src: "/images/dish-breakfast.jpg", alt: "Breakfast plate with eggs, sausage and toast" },
        ]}
        contact={{
          tel: GUESTHOUSE.phoneStay,
          telDisplay: GUESTHOUSE.phoneStayDisplay,
          whatsapp: GUESTHOUSE.phoneStayWhatsapp,
          whatsappText: "Hello Big Brother Guesthouse, I have a question about your menu.",
          ctaHref: "/book",
          ctaLabel: "Book a room",
        }}
        crossMenu={{
          href: "/restaurant/menu",
          label: "Open the Big Brothers Restaurant menu",
          note: "Two kitchens, two menus. This is the guesthouse menu, at Plot 7 on the B2.",
        }}
        closing={{
          title: "The kitchen is at Plot 7.",
          line: `${GUESTHOUSE.address.street}, on the B2 opposite the Shell station. Bring the family or stop while you travel.`,
        }}
      />
    </>
  );
}
