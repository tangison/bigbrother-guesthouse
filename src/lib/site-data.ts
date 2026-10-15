// Real business data for Big Brother Holdings (two brands, two locations).
// Sources: owner master file Big_Brother_Guesthouse_Master_Prompt.md (Oct 2026),
// live site audit Oct 2026, NTB approval letter + certificate (2017) in master file.
// Restaurant hours (round 6): Monday to Saturday, opening 09:30/10:00 by day.
// Closing times are not confirmed and are NOT invented here.

export type Brand = "guesthouse" | "restaurant";

export const HOLDINGS = {
  name: "Big Brother Holdings",
  email: "bigbrotherguest@gmail.com",
  postal: "P.O. Box 324, Usakos, Namibia",
  site: "https://www.bigbrotherguesthouse.com",
};

export const GUESTHOUSE = {
  name: "Big Brother Guesthouse",
  short: "Big Brother",
  tagline: "Home away from home",
  // Stay lines, owner instruction (round 6): both lines visible everywhere.
  // phoneStay is the MTC mobile line and the WhatsApp line; phoneStay2 is
  // the Telecom line. The master file's other old lines (081 264 7607,
  // 081 645 6442) are still not displayed.
  phoneStay: "+264812647606",
  phoneStayDisplay: "+264 81 264 7606",
  phoneStayWhatsapp: "264812647606",
  phoneStay2: "+264852647609",
  phoneStay2Display: "+264 85 264 7609",
  // Deprecated: kept only so old imports still compile. Do not display.
  phoneSecondary: "+264812647606",
  phoneSecondaryDisplay: "+264 81 264 7606",
  phoneBnb: "+264812647606",
  phoneBnbDisplay: "+264 81 264 7606",
  address: {
    street: "Plot 7, Laaste Begin, Usakos South",
    area: "B2 road, bench of the Khan River, 1 km turn-off south, opposite the Shell station",
    town: "Usakos",
    region: "Erongo Region",
    country: "Namibia",
  },
  distances: { swakopmundKm: 147, windhoekKm: 210 },
  // NTB registration: approval letter 14 March 2017, effective 10 March 2017;
  // certificate awarded 09/05/2017. Registration No. GHO01094, class: Guest Houses.
  ntb: {
    number: "GHO01094",
    className: "Guest Houses",
    act: "Namibia Tourism Board Act, 2000 (Act No. 21 of 2000), Section 20",
    approved: "10 March 2017",
    certificate: "9 May 2017",
    // The board's own public establishment listing (visitnamibia.com.na is
    // the NTB's directory; verified live 15 Oct 2026). The old
    // namibiatourism.com.na domain currently serves a bare hosting
    // placeholder, so it is not linked anywhere.
    directory: "https://visitnamibia.com.na/directory/big_brother_guesthouse/",
  },
  // Official socials, owner supplied (round 6). Canonical profile URLs
  // resolved from the owner's own share links.
  facebook: "https://www.facebook.com/bigbrotherguesthouse/",
  instagram: "https://www.instagram.com/bigbrotherguesthouse/",
  tiktok: "https://www.tiktok.com/@bigbrotherguest",
};

export const SOCIALS = [
  { name: "Facebook", href: GUESTHOUSE.facebook },
  { name: "Instagram", href: GUESTHOUSE.instagram },
  { name: "TikTok", href: GUESTHOUSE.tiktok },
];

export const RESTAURANT = {
  name: "Big Brothers Restaurant",
  short: "Big Brothers",
  tagline: "Good food, great vibes",
  est: "2023",
  phoneEat: "+264813029522",
  phoneEatDisplay: "+264 81 302 9522",
  phoneEatWhatsapp: "264813029522",
  // Restaurant's own email from the old site's restaurant page.
  email: "bigbrothersrestaurant@gmail.com",
  address: {
    street: "Corner of Theo-Ben Gurirab Street and Bismarck Street",
    area: "Usakos town centre",
    town: "Usakos",
    region: "Erongo Region",
    country: "Namibia",
  },
  // Kitchen hours, owner instruction (round 6): Monday to Saturday, opening
  // from 09:30 or 10:00 depending on the day. Closing times are not confirmed,
  // so none are displayed.
  hoursKnown: "Monday to Saturday, opening from 09:30 or 10:00 depending on the day",
  hoursShort: "Mon to Sat, from 09:30",
  facebook: GUESTHOUSE.facebook,
};

// Kept as BIZ for existing imports during the split; per-brand data above wins.
export const BIZ = {
  name: HOLDINGS.name,
  guesthouse: {
    name: GUESTHOUSE.name,
    tagline: GUESTHOUSE.tagline,
    phone1: GUESTHOUSE.phoneStay,
    phone1Display: GUESTHOUSE.phoneStayDisplay,
    phone2: GUESTHOUSE.phoneStay,
    phone2Display: GUESTHOUSE.phoneStayDisplay,
    email: HOLDINGS.email,
    postal: HOLDINGS.postal,
  },
  restaurant: {
    name: RESTAURANT.name,
    tagline: RESTAURANT.tagline,
    phone: RESTAURANT.phoneEat,
    phoneDisplay: RESTAURANT.phoneEatDisplay,
    whatsapp: RESTAURANT.phoneEatWhatsapp,
    email: RESTAURANT.email,
    hours: [{ days: RESTAURANT.hoursKnown, time: "Open" }],
  },
  address: GUESTHOUSE.address,
  distances: GUESTHOUSE.distances,
  socials: { facebook: GUESTHOUSE.facebook },
  established: { restaurant: RESTAURANT.est },
  site: HOLDINGS.site,
};

export const wa = (num: string, text: string) =>
  `https://wa.me/${num}?text=${encodeURIComponent(text)}`;

export const GUESTHOUSE_WA_GREETING =
  "Hello Big Brother Guesthouse, do you have any rooms available?";
export const RESTAURANT_WA_GREETING =
  "Hello Big Brothers Restaurant, I would like to reserve a table.";
