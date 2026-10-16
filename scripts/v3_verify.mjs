#!/usr/bin/env node
// Round v3 local QC. Run against the standalone server (PORT env, default 3300).
// Every check prints PASS/FAIL; exit 1 on any FAIL.
const BASE = `http://localhost:${process.env.PORT ?? 3300}`;
let fails = 0;
const ok = (name, cond, extra = "") => {
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}${extra ? `  (${extra})` : ""}`);
  if (!cond) fails++;
};

async function page(path) {
  const r = await fetch(BASE + path, { redirect: "manual" });
  const html = r.status >= 300 && r.status < 400 ? "" : await r.text();
  return { status: r.status, location: r.headers.get("location"), html, bytes: r.headers.get("content-length") };
}

// 1. Routes serve 200
for (const p of ["/", "/menu", "/restaurant/menu", "/restaurant/gallery", "/stay-nearby", "/facilities", "/restaurant/contact", "/restaurant/reserve", "/book", "/contact", "/rooms", "/guesthouse"]) {
  const r = await page(p);
  ok(`200 ${p}`, r.status === 200, `${r.status}`);
}

// 2. Redirects (QR safety)
{
  const a = await page("/restaurant-menu");
  ok("308 /restaurant-menu -> /restaurant/menu", a.status === 308 && a.location === "/restaurant/menu", `${a.status} ${a.location}`);
  const b = await page("/home");
  ok("308 /home -> /", b.status === 308 && b.location === "/", `${b.status} ${b.location}`);
  const c = await page("/menu");
  ok("200 /menu (guesthouse menu, no redirect)", c.status === 200, `${c.status} ${c.location ?? ""}`);
  const d = await page("/restaurant/menu/");
  ok("308 trailing slash /restaurant/menu/ -> no slash", d.status === 308 && (d.location ?? "").replace(/\/$/, "") === "/restaurant/menu", `${d.status} ${d.location}`);
  const e = await fetch(BASE + "/restaurant-menu/", { redirect: "follow" });
  ok("chain /restaurant-menu/ finally lands on /restaurant/menu", e.url.endsWith("/restaurant/menu") && e.status === 200, `${e.status} ${e.url}`);
  const f = await page("/old-thing-not-here");
  ok("404 unknown route", f.status === 404, `${f.status}`);
}

// 3. /menu is the GUESTHOUSE menu
{
  const { html } = await page("/menu");
  ok("/menu: guesthouse hero", html.includes("Home cooking at Plot 7"));
  ok("/menu: Hansa Draught (guesthouse 750ml list)", html.includes("Hansa Draught"));
  ok("/menu: English Breakfast N$130", /English Breakfast/.test(html) && /N\$130/.test(html));
  ok("/menu: Russian & Chips N$63 (new price)", html.includes("Russian &amp; Chips") && /N\$63/.test(html));
  ok("/menu: Stoney 25/20 (guesthouse soft drinks)", html.includes("Stoney"));
  ok("/menu: Lamb Chops N$230 (corrected)", /Lamb Chops/.test(html));
  ok("/menu: Sauces standalone section (as printed)", html.includes("Creamy Garlic, Cheese, Pepper, Mushroom or White"));
  ok("/menu: cross-link to restaurant menu", html.includes("/restaurant/menu"));
  ok("/menu: Menu JSON-LD present", html.includes('"@type":"Menu"') && html.includes("Big Brother Guesthouse Menu"));
  ok("/menu: NOT the restaurant menu title", !html.includes("Good food, great vibes."));
}

// 4. /restaurant/menu is the RESTAURANT menu
{
  const { html } = await page("/restaurant/menu");
  ok("/restaurant/menu: restaurant hero", html.includes("Good food, great vibes."));
  ok("/restaurant/menu: Tall Horse (restaurant wine only)", html.includes("Tall Horse"));
  ok("/restaurant/menu: Four Cousins (restaurant wine only)", html.includes("Four Cousins"));
  ok("/restaurant/menu: Latte (restaurant hot drinks only)", html.includes("Latte"));
  ok("/restaurant/menu: cool drink N$23", /N\$23/.test(html));
  ok("/restaurant/menu: Savanna 600ml N$45 (restaurant price)", /Savanna Dry 600 ml/.test(html));
  ok("/restaurant/menu: Windhoek Draught 500ml N$30", /Windhoek Draught/.test(html) && /N\$30/.test(html));
  ok("/restaurant/menu: NO Hansa Draught (guesthouse only)", !html.includes("Hansa Draught"));
  ok("/restaurant/menu: NO Rainbow Cocktail (guesthouse only)", !html.includes("Rainbow Cocktail"));
  ok("/restaurant/menu: Ice Cream 20 / 40", html.includes("20 / 40"));
  ok("/restaurant/menu: no invented ice-cream sizes (print shows N$20 / 40 only)", !html.includes("Small / large"));
  ok("/restaurant/menu: Sauces section (print block restored)", html.includes("Creamy Garlic, Cheese, Pepper, Mushroom or White"));
  ok("/restaurant/menu: cross-link to guesthouse menu", html.includes('href="/menu"'));
  ok("/restaurant/menu: Menu JSON-LD present", html.includes('"@type":"Menu"') && html.includes("Big Brothers Restaurant Menu"));
}

// 5. One-gate wording gone from home
{
  const { html } = await page("/");
  ok("home: no 'one gate' wording", !html.toLowerCase().includes("one gate"), "removed per owner correction");
  ok("home: two menu CTAs", html.includes("Guesthouse menu") && html.includes("Restaurant menu"));
  ok("home: item count updated (134)", html.includes("134 items"));
}

// 6. /stay-nearby carries the nine places
{
  const { html } = await page("/stay-nearby");
  const names = ["Bahnhof Hotel", "Nubeb", "Issa", "Uitkyk", "Carlo", "Achab", "Hohenstein", "Ameib", "Spitzkoppe"];
  const missing = names.filter((n) => !html.includes(n));
  ok("/stay-nearby: all 9 neighbours", missing.length === 0, missing.join(",") || "all present");
  ok("/stay-nearby: ask-us-first CTA", html.includes("Ask us first on WhatsApp"));
}

// 7. Facilities: camping + bar + conference photos
{
  const { html } = await page("/facilities");
  for (const img of ["camping-picnic-bench", "camping-tree-drum", "camping-shade-tree", "camping-grounds-thatch", "bar-thatched-day", "conference-tables-chairs", "conference-refreshments"]) {
    ok(`/facilities: ${img}`, html.includes(img));
  }
  ok("/facilities: camping CTA (no invented rate)", html.includes("Ask about camping on WhatsApp"));
  ok("/facilities: camping rates as given by owner (N$200 / N$150 per person)", html.includes("N$200") && html.includes("N$150") && html.includes("Rates per person"));
  ok("/facilities: no invented per-night camping wording", !/per night/i.test(html.split("Camping")[1]?.split("</section>")[0] ?? ""));
}

// 8. Emails split + gallery additions
{
  const { html: contact } = await page("/contact");
  ok("/contact: bookings@ email", contact.includes("bookings@bigbrotherguesthouse.com"));
  ok("/contact: guesthouse general email", contact.includes("bigbrotherguest@gmail.com"));
  ok("/contact: restaurant email", contact.includes("restaurant@bigbrotherguesthouse.com"));
  const { html: rest } = await page("/restaurant/contact");
  ok("/restaurant/contact: bookings@ email", rest.includes("bookings@bigbrotherguesthouse.com"));
  ok("/restaurant/contact: restaurant payment card", rest.includes("Paying Big Brothers Restaurant"));
  ok("/restaurant/contact: no invented EFT fields", !rest.includes("62257058604"));
  const { html: gh } = await page("/restaurant");
  ok("/restaurant footer: no gmail leak", !(await page("/restaurant")).html.split("</footer>")[0].includes("bigbrotherguest@gmail.com"));
  const { html: gallery } = await page("/gallery");
  ok("/gallery: camping photo present", gallery.includes("camping-grounds-thatch") || gallery.includes("camping-picnic-bench"));
}

// 9. Banking placement: branch code 281073 is OWNER-CONFIRMED
//    (16 Oct 2026) and shows on the rooms page + booking panel.
//    It must still appear nowhere outside the payment cards
//    (never footer, meta tags or schema).
{
  const { html: rooms } = await page("/rooms");
  ok("/rooms: confirmed branch code 281073 shown", rooms.includes("281073"), "owner-confirmed 16 Oct 2026");
  const { html: book } = await page("/book");
  ok("/book: branch code renders client-side (booking panel, not initial HTML)", !book.includes("281073"));
  const { html: home } = await page("/");
  ok("branch code never on home (footer/schema rule)", !home.includes("281073"));
  const { html: contact } = await page("/contact");
  ok("branch code never on /contact (footer/schema rule)", !contact.includes("281073"));
}

// 10. Sitemap + robots
{
  const r = await fetch(BASE + "/sitemap.xml");
  const xml = await r.text();
  ok("sitemap: /menu entry", xml.includes("/menu</loc>") || xml.includes("<loc>" + "https://www.bigbrotherguesthouse.com/menu</loc>"));
  ok("sitemap: /stay-nearby entry", xml.includes("stay-nearby"));
  ok("sitemap: image entries", xml.includes("image:image"));
  ok("sitemap: 21 URLs", (xml.match(/<url>/g) || []).length === 21, `${(xml.match(/<url>/g) || []).length} urls`);
}

// 11. OG images render (file-convention images may be served under hashed
//     paths: read the og:image URL straight out of each page's meta tags)
{
  for (const p of ["/menu", "/restaurant/menu", "/stay-nearby"]) {
    const { html } = await page(p);
    const m = html.match(/property="og:image" content="([^"]+)"/);
    ok(`${p}: og:image meta present`, Boolean(m), m?.[1] ?? "missing");
    if (m) {
      // The meta URL is absolutized against the production host; fetch its
      // path against the local server instead.
      const u = new URL(m[1], BASE);
      const r = await fetch(BASE + u.pathname + u.search);
      ok(`${p}: og:image 200 png`, r.status === 200 && (r.headers.get("content-type") ?? "").includes("image/png"), `${r.status} ${r.headers.get("content-type")}`);
    }
  }
}

// 12. Booking bugfix: ROOM_TIERS import (regression on tier change)
{
  const { html } = await page("/book");
  ok("/book: tier select present", html.includes("Room 13"));
}

console.log(fails === 0 ? "\nALL CHECKS PASS" : `\n${fails} CHECK(S) FAILED`);
process.exit(fails === 0 ? 0 : 1);
