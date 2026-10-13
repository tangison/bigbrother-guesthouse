// Single source of truth for every route: label, path, and per-route metadata.
// The webmaster checklist demands unique meta titles (<60 chars) and
// descriptions (<155 chars) on every route. Location keywords included so the
// site ranks for Usakos queries, which the old Google Sites never did.

export type RouteInfo = {
  key: string
  path: string
  label: string
  title: string
  description: string
}

export const ROUTES: RouteInfo[] = [
  {
    key: "home",
    path: "/",
    label: "Home",
    title: "Big Brother Guesthouse, B&B & Restaurant | Usakos, Namibia",
    description:
      "Home away from home in Usakos on the B2, halfway between Windhoek and Swakopmund. Rooms, a restaurant and bar on site, traditional food, pizzas and grills.",
  },
  {
    key: "restaurant",
    path: "/restaurant",
    label: "Restaurant",
    title: "Big Brothers Restaurant | Grills, Pizza & Bar in Usakos",
    description:
      "Big Brothers Restaurant in Usakos: local flavours, township classics, grills, seafood, pizza and a full bar. On the B2, opposite the Shell station. Est. 2023.",
  },
  {
    key: "menu",
    path: "/menu",
    label: "Menu",
    title: "Menu & Prices | Big Brothers Restaurant, Usakos, Namibia",
    description:
      "The full Big Brothers Restaurant menu with every price: breakfast, kapana and pap, grills, pizzas, seafood, cocktails. From a N$30 russian to the N$400 platter.",
  },
  {
    key: "guesthouse",
    path: "/guesthouse",
    label: "Guesthouse",
    title: "Guesthouse & B&B Rooms in Usakos | Big Brother Guesthouse",
    description:
      "Spacious rooms with mountain views, secure parking, pools and a garden, plus three luxury en suite B&B rooms. Your Usakos stopover on the B2, Erongo Region.",
  },
  {
    key: "facilities",
    path: "/facilities",
    label: "Facilities",
    title: "Facilities & Functions | Big Brother Guesthouse, Usakos",
    description:
      "Event venues, a boardroom, bar, braai area, pools and garden at Big Brother Guesthouse, Usakos. Weddings, conferences and family functions on the B2.",
  },
  {
    key: "gallery",
    path: "/gallery",
    label: "Gallery",
    title: "Photo Gallery | Big Brother Guesthouse, Usakos, Namibia",
    description:
      "Real photos from Big Brother Guesthouse and Big Brothers Restaurant in Usakos: rooms, food from our kitchen, functions, and life on the Khan River bench.",
  },
  {
    key: "contact",
    path: "/contact",
    label: "Contact",
    title: "Contact & Directions | Big Brother Guesthouse, Usakos",
    description:
      "Find Big Brother Guesthouse at Plot 7, Laaste Begin, Usakos South, opposite the Shell station. Call +264 81 264 7606 or WhatsApp us for bookings and orders.",
  },
]

// Pages that exist for trust and completeness, not in the main nav.
export const LEGAL_ROUTES: { path: string; label: string }[] = [
  { path: "/brand", label: "Brand book" },
  { path: "/privacy-policy", label: "Privacy policy" },
  { path: "/terms", label: "Terms" },
]
