import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import { StickyActionBar } from "@/components/site/sticky-action-bar";
import { GUESTHOUSE, HOLDINGS } from "@/lib/site-data";

const description =
  "Home away from home at Plot 7 on the B2 in Usakos, halfway between Windhoek and Swakopmund. Rooms from N$450, pools, lapa and garden, secure parking.";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: GUESTHOUSE.name,
  description,
  url: `${HOLDINGS.site}/`,
  telephone: [GUESTHOUSE.phoneStayDisplay, GUESTHOUSE.phoneStay2Display],
  email: HOLDINGS.email,
  image: `${HOLDINGS.site}/images/og-guesthouse.jpg`,
  priceRange: "N$450 to N$3,050 per night",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Plot 7, Laaste Begin, Usakos South",
    addressLocality: GUESTHOUSE.address.town,
    addressRegion: GUESTHOUSE.address.region,
    addressCountry: "NA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -22.0064087,
    longitude: 15.5786901,
    description: "Google Maps place listing, Big Brother Guesthouse",
  },
  identifier: {
    "@type": "PropertyValue",
    name: "Namibia Tourism Board registration",
    value: GUESTHOUSE.ntb.number,
  },
  sameAs: [GUESTHOUSE.facebook, GUESTHOUSE.instagram, GUESTHOUSE.tiktok],
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteNav brand="guesthouse" />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter brand="guesthouse" />
      <StickyActionBar brand="guesthouse" />
    </>
  );
}
