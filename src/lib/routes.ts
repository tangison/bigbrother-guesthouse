// Single source of truth for every route: label, path, brand, and per-route
// metadata (titles < 60 chars, descriptions < 155 chars, per the webmaster
// checklist). The site runs two brands: the Guesthouse (main site) and the
// Restaurant (its own section under /restaurant, different location).

export type RouteInfo = {
  key: string
  path: string
  label: string
  brand: "guesthouse" | "restaurant"
  title: string
  description: string
}

export const ROUTES: RouteInfo[] = [
  {
    key: "home",
    path: "/",
    label: "Home",
    brand: "guesthouse",
    title: "Big Brother Guesthouse | Usakos Accommodation on the B2",
    description:
      "Home away from home on the B2 in Usakos, halfway to Swakopmund. Rooms from N$450, restaurant and bar on site, pools, lapa and secure parking.",
  },
  {
    key: "rooms",
    path: "/rooms",
    label: "Rooms & Rates",
    brand: "guesthouse",
    title: "Rooms & Rates | Big Brother Guesthouse, Usakos",
    description:
      "Every room and every rate at Big Brother Guesthouse, Usakos: standard rooms from N$450, private units, a family unit for 8, and the conference room.",
  },
  {
    key: "facilities",
    path: "/facilities",
    label: "Facilities",
    brand: "guesthouse",
    title: "Facilities & Functions | Big Brother Guesthouse, Usakos",
    description:
      "Pool, lawn, thatched lapas, braai area, a conference room for 20 to 30 and day visits at N$30 per person at Big Brother Guesthouse, Plot 7, Usakos.",
  },
  {
    // The guesthouse's own menu. This exact URL is printed as a QR
    // on the guesthouse menu card (audited 16 Oct 2026), so /menu
    // must always serve the guesthouse menu. The restaurant menu
    // lives at /restaurant/menu.
    key: "menu",
    path: "/menu",
    label: "Menu",
    brand: "guesthouse",
    title: "Guesthouse Menu & Prices | Big Brother Guesthouse, Usakos",
    description:
      "The Big Brother Guesthouse menu with every price: breakfast, grills, pizza, traditional plates and the full bar list. Breakfast from N$80.",
  },
  {
    key: "plot-7",
    path: "/plot-7",
    label: "Plot 7",
    brand: "guesthouse",
    title: "Plot 7, Laaste Begin | Big Brother Guesthouse, Usakos",
    description:
      "Find us at Plot 7, Laaste Begin, Usakos South, on the B2 opposite the Shell station: 147 km from Swakopmund, 210 km from Windhoek.",
  },
  {
    key: "gallery",
    path: "/gallery",
    label: "Gallery",
    brand: "guesthouse",
    title: "Photo Gallery | Big Brother Guesthouse, Usakos, Namibia",
    description:
      "Real photos of Big Brother Guesthouse: the rooms, the grounds, the lapa and the garden on the Khan River bench in Usakos.",
  },
  {
    key: "vip",
    path: "/vip",
    label: "VIP Card",
    brand: "guesthouse",
    title: "VIP Membership Card | Big Brother Guesthouse, Usakos",
    description:
      "Pay N$1,200 once a year and get 20 percent off accommodation every time you book at Big Brother Guesthouse, Usakos.",
  },
  {
    key: "contact",
    path: "/contact",
    label: "Contact",
    brand: "guesthouse",
    title: "Contact & Directions | Big Brother Guesthouse, Usakos",
    description:
      "Stay: +264 81 264 7606. Eat: +264 81 302 9522. Plot 7, Laaste Begin, Usakos South for the guesthouse; the restaurant is in town centre.",
  },
  {
    key: "restaurant",
    path: "/restaurant",
    label: "Restaurant",
    brand: "restaurant",
    title: "Big Brothers Restaurant & Bar | Usakos Town Centre",
    description:
      "Big Brothers Restaurant in Usakos town centre: grills, seafood, pizza, kapana and a full bar. Est. 2023. Reserve a table on WhatsApp.",
  },
  {
    // The restaurant's own menu, a different price list from the
    // guesthouse menu. The printed restaurant QR card is being
    // replaced with one that points here (old card encodes /menu;
    // /restaurant-menu also 308-redirects here for safety).
    key: "restaurant-menu",
    path: "/restaurant/menu",
    label: "Menu",
    brand: "restaurant",
    title: "Menu & Prices | Big Brothers Restaurant, Usakos",
    description:
      "The Big Brothers Restaurant menu with every price: breakfast, kapana and pap, grills, pizzas, seafood and the full bar. From N$23 to the N$400 platter.",
  },
  {
    key: "reserve",
    path: "/restaurant/reserve",
    label: "Reserve a Table",
    brand: "restaurant",
    title: "Reserve a Table | Big Brothers Restaurant, Usakos",
    description:
      "Reserve a table at Big Brothers Restaurant, corner of Theo-Ben Gurirab and Bismarck Street, Usakos. WhatsApp +264 81 302 9522 or email.",
  },
]

export const RESTAURANT_ROUTES = ROUTES.filter((r) => r.brand === "restaurant")
export const GUESTHOUSE_ROUTES = ROUTES.filter((r) => r.brand === "guesthouse" && r.key !== "home")

// Pages that exist for trust and completeness, not in the main nav.
export const LEGAL_ROUTES: { path: string; label: string }[] = [
  { path: "/guesthouse", label: "The guesthouse" },
  { path: "/book", label: "Book" },
  { path: "/stay-nearby", label: "Fully booked?" },
  { path: "/feedback", label: "Feedback" },
  { path: "/guest-info", label: "Guest info" },
  { path: "/brand", label: "Brand book" },
  { path: "/privacy-policy", label: "Privacy policy" },
  { path: "/terms", label: "Terms" },
]

function routeMeta(path: string) {
  const r = ROUTES.find((x) => x.path === path)
  if (r) return { title: r.title, description: r.description }
  return null
}

export { routeMeta }
