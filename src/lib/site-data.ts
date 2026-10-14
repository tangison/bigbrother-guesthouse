// Real business data for Big Brother Holdings (two brands, two locations).
// Sources: owner master file Big_Brother_Guesthouse_Master_Prompt.md (Oct 2026),
// live site audit Oct 2026, NTB approval letter + certificate (2017) in master file.
// Restaurant hours: only Saturday/Sunday from 07:00 are confirmed. Weekday
// hours and closing times are an open owner question and are NOT invented here.

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
  // The one number (owner instruction: use this on every number, it is the
  // one on the old site's contact page and the WhatsApp line). The master
  // file's other lines (081 264 7607, 081 645 6442) are no longer displayed.
  phoneStay: "+264812647606",
  phoneStayDisplay: "+264 81 264 7606",
  phoneStayWhatsapp: "264812647606",
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
  },
  facebook: "https://www.facebook.com/bigbrotherguesthouse/",
};

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
  // Full business hours, taken from the old site's restaurant page at the
  // owner's instruction ("get it from the site").
  hoursKnown: "Monday to Friday: 07:00 - 22:00, Saturday and Sunday: 08:00 - 21:00",
  hoursMonFri: "07:00 - 22:00",
  hoursSatSun: "08:00 - 21:00",
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
