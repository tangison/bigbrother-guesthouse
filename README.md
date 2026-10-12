# Big Brother Guesthouse · B&B · Restaurant — Usakos, Namibia

Official website rebuild for Big Brother Holdings: a guesthouse, a bed and breakfast, and
a restaurant on the B2 road in Usakos, Erongo Region, Namibia.
210 km from Windhoek, 147 km from Swakopmund.

> Home away from home. Good food, great vibes.

## What is inside

- **Home** layered hero with the real Big Brothers platter and restaurant badge
- **Restaurant** story, real business hours, real contact numbers, kitchen rail
- **Menu** every dish and price transcribed from the client's own A3 print menu (v3):
  breakfast, toasted sandwiches, burgers, wraps, traditional food (kapana, matangara,
  mopane worms, smiley), pizzas, lunch, dinner grills, seafood, salads, wings, kiddies,
  desserts, soft drinks, beer and ciders, cocktails, wine, shooters
- **Guesthouse** rooms and B&B info, honest rates card (no invented prices)
- **Facilities** boardroom and functions, guest facilities
- **Gallery** 30 real photos with alt text and a keyboard-friendly lightbox
- **Contact** real NAP details, WhatsApp deep links, Google Maps directions

## Signature detail

The **B2 Odometer**: as you scroll, a chip counts your kilometres along the B2, from
Windhoek (210 km) through Usakos (0) toward Swakopmund (147 km).

## Data provenance

Every figure on the site has a source:

| Data | Source |
|------|--------|
| Menu items and prices (N$) | `Big_Brother_Guesthouse_Menu_A3_v3.pdf`, client filebin, Oct 2026 |
| Address, distances, phone numbers | Client contact page, Oct 2026 audit |
| Restaurant hours, restaurant phone, email | Client restaurant page, Oct 2026 audit |
| B&B: three luxury en suite rooms | Client bed and breakfast page |
| Facilities and boardroom features | Client facilities page |
| Logos and all photos | Client uploads (filebin, Oct 2026) |
| Restaurant est. 2023 | Client restaurant logo badge |

Nothing is fabricated. Where the client publishes no figures (room rates), the site says
"contact us" instead of inventing numbers.

## Stack

- Next.js 16 (App Router, single route with hash-based views: `#home #restaurant #menu #guesthouse #facilities #gallery #contact`)
- TypeScript, Tailwind CSS 4
- Fraunces + Inter via Fontsource (latin subsets, ~71 KB total)
- Vanilla scroll animation with IntersectionObserver, full `prefers-reduced-motion` support
- SEO: title, meta description, OpenGraph, Twitter card, and JSON-LD
  (`LodgingBusiness` + `Restaurant` with real NAP, geo and opening hours)
- Page weight: production build lands under 500 KB on first load (dev mode measures higher
  because Next dev tooling is unminified)

## Run it

```bash
bun install
bun run dev
```

## Deploy

Works out of the box on Vercel:

```bash
npx vercel
```

Domain note: the printed menu advertises `bigbrotherguesthouse.com/menu`. When you connect
the domain in Vercel, add a redirect from `/menu` to `/#menu` (a one-line rewrite in
`next.config.ts` or a Vercel redirect rule). Hash views need no server config.

## Accessibility

Semantic landmarks, alt text on every content image, visible focus rings, keyboard
navigation in the lightbox (Esc, arrow keys), and reduced-motion fallbacks.
