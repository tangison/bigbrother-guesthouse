// Two menus, two sources of truth. Every price comes from the
// client's own print files (menus/ in the v3 asset pack, QR-
// audited 16 Oct 2026):
//   data/menu-guesthouse.json  <- Big-Brother-Guesthouse-Menu.pdf
//   data/menu-restaurant.json  <- Big-Brothers-Restaurant-Menu.pdf
// The two menus are DIFFERENT price lists (500 ml beers, cool
// drinks, ciders, wine, hot stuff and desserts all differ, and
// each list carries items the other does not). No page may
// hardcode a price: read the menu for its brand from here.
//
// Note for editors: the print files are authoritative. Where the
// print gives no description, none is invented.

import guesthouseJson from "../../data/menu-guesthouse.json";
import restaurantJson from "../../data/menu-restaurant.json";

export type MenuItem = { name: string; price: number | string; note?: string };
export type MenuSection = {
  id: string;
  title: string;
  kicker?: string;
  items: MenuItem[];
  foot?: string;
};

type RawSection = {
  id: string;
  title: string;
  kicker?: string;
  items: { name: string; price: number | string; note?: string }[];
  foot?: string;
};

function load(raw: RawSection[]): MenuSection[] {
  return raw.map((s) => ({
    id: s.id,
    title: s.title,
    ...(s.kicker ? { kicker: s.kicker } : {}),
    items: s.items.map((it) => ({
      name: it.name,
      price: it.price,
      ...(it.note ? { note: it.note } : {}),
    })),
    ...(s.foot ? { foot: s.foot } : {}),
  }));
}

/** The guesthouse's own menu, served at /menu (the printed QR target). */
export const GUESTHOUSE_MENU: MenuSection[] = load(guesthouseJson);

/** Big Brothers Restaurant's own menu, served at /restaurant/menu. */
export const RESTAURANT_MENU: MenuSection[] = load(restaurantJson);

export const nads = (p: number | string) => `N$${p}`;
