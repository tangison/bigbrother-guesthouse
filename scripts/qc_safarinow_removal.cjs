#!/usr/bin/env node
/* QC for the SafariNow removal + full link sanity pass.
 * 1. SafariNow gone from /, /contact, /book (footer/contact/book chips)
 * 2. Remaining listing chips all present (Booking.com, Google Maps, Agoda,
 *    Our website, TripAdvisor)
 * 3. Contact copy updated (no "SafariNow takes bookings")
 * 4. All guesthouse + restaurant routes 200
 * 5. Legacy QR redirects: /restaurant-menu -> /restaurant/menu, /home -> /
 */
const BASE = "http://127.0.0.1:3111";
let pass = 0, fail = 0;
function chk(name, cond, extra = "") {
  if (cond) { pass++; console.log(`  ok  ${name}${extra ? " | " + extra : ""}`); }
  else { fail++; console.log(`FAIL  ${name}${extra ? " | " + extra : ""}`); }
}

const ROUTES = ["/", "/rooms", "/facilities", "/menu", "/plot-7", "/gallery", "/vip",
  "/contact", "/restaurant", "/restaurant/menu", "/restaurant/gallery",
  "/restaurant/reserve", "/restaurant/contact", "/book", "/stay-nearby",
  "/guesthouse", "/guest-info", "/feedback", "/brand", "/privacy-policy", "/terms"];

async function get(path, redirect = "manual") {
  const r = await fetch(BASE + path, { redirect });
  let body = "";
  if (redirect === "follow") body = await r.text();
  return { status: r.status, body, headers: r.headers };
}

(async () => {
  // 1+2+3: content checks on the three LISTINGS surfaces
  for (const path of ["/", "/contact", "/book"]) {
    const { body } = await get(path, "follow");
    chk(`${path}: SafariNow absent`, !body.toLowerCase().includes("safarinow"));
    chk(`${path}: "safari" absent`, !body.toLowerCase().includes("safari"), "");
    for (const chip of ["Booking.com", "Google Maps", "Agoda", "TripAdvisor", "Our website"]) {
      chk(`${path}: chip ${chip}`, body.includes(chip));
    }
    chk(`${path}: chip count 5 listings`, (body.match(/safarinow|booking\.com\/searchresults|google\.com\/maps\/search\/\?api=1&query=Big\+Brother\+Guesthouse|agoda\.com\/search|bigbrotherguesthouse\.com|tripadvisor\.com\/Hotel_Review/g) || []).length >= 5, "");
  }
  const { body: contact } = await get("/contact", "follow");
  chk("/contact: updated copy present", contact.includes("TripAdvisor carries") && contact.includes("the guest reviews"));
  chk("/contact: no SafariNow takes bookings", !contact.includes("SafariNow takes"));

  // 4: all routes 200
  for (const p of ROUTES) {
    const r = await get(p, "follow");
    chk(`route ${p} = 200`, r.status === 200, `got ${r.status}`);
  }

  // 5: legacy QR redirects
  const rm = await get("/restaurant-menu", "manual");
  chk("/restaurant-menu 308 -> /restaurant/menu",
    rm.status === 308 && (rm.headers.get("location") || "").includes("/restaurant/menu"),
    `${rm.status} ${rm.headers.get("location")}`);
  const hm = await get("/home", "manual");
  chk("/home 308 -> /", hm.status === 308 && (hm.headers.get("location") || "").endsWith("/"),
    `${hm.status} ${hm.headers.get("location")}`);

  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})();
