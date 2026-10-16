// Where to stay when Big Brother is full. The owner asked for a section
// about "the competitors should the bigbrothers be full" (15 Oct 2026).
// Every entry was researched and verified on 15 Oct 2026 (worklog Task 2-b):
// the URL was either fetched directly or confirmed through the platform's
// own search listing. Nothing invented, nothing estimated. Distances are
// from the research notes, rounded.

export type NearbyArea = "In town" | "Nearby farms" | "Worth the drive";

export type NearbyStay = {
  name: string;
  type: string;
  area: NearbyArea;
  blurb: string;
  href: string;
  linkLabel: string;
};

export const NEARBY: NearbyStay[] = [
  {
    name: "Bahnhof Hotel",
    type: "Hotel",
    area: "In town",
    blurb:
      "Usakos's historic railway hotel on the main street: rooms with aircon, a restaurant, a bar and a pool, steps from the station.",
    href: "https://www.booking.com/hotel/na/bahnhof-usakos.html",
    linkLabel: "See the Bahnhof Hotel on Booking.com",
  },
  {
    name: "Nubeb Self-Catering",
    type: "Self-catering",
    area: "In town",
    blurb:
      "Town-centre rooms and a flat that sleeps four, each with aircon, a mini-kitchen and free Wi-Fi.",
    href: "http://www.nubeb.biz",
    linkLabel: "Visit Nubeb's own site",
  },
  {
    name: "Issa Guesthouse",
    type: "Guesthouse",
    area: "In town",
    blurb:
      "A 13-bedroom house on a plot by the B2 with a garden, a bar and a pool, about two kilometres from the station.",
    href: "https://visitnamibia.com.na/directory/issa_guesthouse",
    linkLabel: "See Issa Guesthouse in the NTB directory",
  },
  {
    name: "Uitkyk Guest Farm",
    type: "Guest farm",
    area: "Nearby farms",
    blurb:
      "A green oasis on the Khan River about five kilometres out of town: seven en-suite rooms, shaded campsites, a pool and pizza nights.",
    href: "https://www.uitkykguestfarm.com",
    linkLabel: "Visit Uitkyk Guest Farm",
  },
  {
    name: "Carlo's Mountain Lodge",
    type: "Eco lodge",
    area: "Nearby farms",
    blurb:
      "Eco rooms and glamping at the foot of the hills with a pool, restaurant and bar, about four kilometres from Usakos.",
    href: "https://www.mountainlodgenamibia.com",
    linkLabel: "Visit Carlo's Mountain Lodge",
  },
  {
    name: "Achab Camping",
    type: "Eco camp",
    area: "Nearby farms",
    blurb:
      "Cabins and glamping tents with private splash pools, hiking and free-roaming game on a farm about ten kilometres south.",
    href: "https://www.achabcamp.com",
    linkLabel: "Visit Achab Camping",
  },
  {
    name: "Hohenstein Lodge",
    type: "Lodge",
    area: "Worth the drive",
    blurb:
      "An upmarket 14-room lodge under the Erongo mountains' highest peak, about 25 minutes north of town.",
    href: "https://www.ondili.com/lodges/hohenstein-lodge",
    linkLabel: "Visit Hohenstein Lodge",
  },
  {
    name: "Ameib Guesthouse & Camping",
    type: "Guest farm",
    area: "Worth the drive",
    blurb:
      "A family-run ranch at the foot of the Erongo massif with bungalows, campsites and rock-art trails, about 27 km out on gravel.",
    href: "https://www.ameib.com/site/home.html",
    linkLabel: "Visit Ameib",
  },
  {
    name: "Spitzkoppe Cabin Camp",
    type: "Cabin camp",
    area: "Worth the drive",
    blurb:
      "Twelve glamping cabins near the Spitzkoppe granite arches, about half an hour west on the D1918.",
    href: "https://www.spitzkoppecabincamp.com",
    linkLabel: "Visit Spitzkoppe Cabin Camp",
  },
];

// Booking and listing links (owner round 8, 15 Oct 2026): a button for each
// of the owner's list, all opening in a new tab. Verified 16 Oct 2026.
// SafariNow was on the owner's original list, but the owner removed it on
// 16 Oct 2026 ("remove safari now from the list, it is redirecting to a
// wrong place") and the audit agreed: safarinow.com/go/big-brother-guest-house
// now dumps on travelstart.co.za/accommodation, a generic Travelstart page
// that is not our listing. Google Maps is the official Maps-URL format to
// the verified GBP pin; TripAdvisor is the property page. Booking.com and
// Agoda: research (worklog Task 2-a) found NO direct Big Brother listing on
// either platform on 15 Oct 2026, so per the owner's instruction these go to
// the platform's own search for the guesthouse - they always resolve, and
// surface the listing as soon as it exists. Owner: send the direct listing
// URLs and they get swapped in.
export const LISTINGS = [
  {
    name: "Booking.com",
    href: "https://www.booking.com/searchresults.html?ss=Big+Brother+Guesthouse+Usakos+Namibia",
  },
  {
    name: "Google Maps",
    href: "https://www.google.com/maps/search/?api=1&query=Big+Brother+Guesthouse+Usakos",
  },
  {
    name: "Agoda",
    href: "https://www.agoda.com/search?textToSearch=Big+Brother+Guesthouse+Usakos",
  },
  {
    name: "Our website",
    href: "https://www.bigbrotherguesthouse.com",
  },
  {
    name: "TripAdvisor",
    href: "https://www.tripadvisor.com/Hotel_Review-g1182990-d11826846-Reviews-Big_Brother_Guesthouse_Usakos-Usakos_Erongo_Region.html",
  },
];
