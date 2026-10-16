// Visual QC for the owner audit pass: reserve page (desktop/squarish/mobile),
// facilities media, restaurant hours, widgets (back-to-top + sticky bar).
const { chromium } = require("playwright-core");
const path = require("path");
const fs = require("fs");

const exe = (() => {
  const base = "/home/z/.cache/ms-playwright";
  const dir = fs.readdirSync(base).find((d) => d.startsWith("chromium-") && !d.includes("headless"));
  return path.join(base, dir, "chrome-linux64", "chrome");
})();

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ["--no-sandbox"] });

  // 1. Reserve page at three viewport classes
  for (const [name, w, h] of [["desktop", 1440, 900], ["squarish", 1024, 768], ["mobile", 390, 844]]) {
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    await page.goto("http://127.0.0.1:3111/restaurant/reserve", { waitUntil: "networkidle" });
    await page.waitForTimeout(800);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    console.log(`reserve-${name}: h-overflow ${overflow}px`);
    await page.screenshot({ path: `/tmp/qc-reserve-${name}-top.png` });
    // form bottom (inputs + buttons)
    await page.evaluate(() => document.querySelector('a[href^="https://wa.me"]')?.scrollIntoView({ block: "center" }));
    await page.waitForTimeout(600);
    await page.screenshot({ path: `/tmp/qc-reserve-${name}-form.png` });
    await page.close();
  }

  // 2. Facilities: day visits tier table + conference single image
  const fac = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await fac.goto("http://127.0.0.1:3111/facilities", { waitUntil: "networkidle" });
  await fac.waitForTimeout(600);
  await fac.screenshot({ path: "/tmp/qc-facilities-daytab.png" });
  const facTexts = await fac.evaluate(() => document.body.innerText);
  console.log("facilities has tiers:", ["Children", "Youths", "Adults", "Seniors", "N$20", "N$30", "N$50"].every((s) => facTexts.includes(s)));
  console.log("facilities old N$30 flat line gone:", !facTexts.includes("Day visit entry fee, per person"));
  console.log("facilities has kitchen 20:30:", facTexts.includes("20:30"));
  await fac.evaluate(() => { [...document.querySelectorAll("button")].find((b) => b.textContent.includes("Meetings"))?.click(); });
  await fac.waitForTimeout(800);
  await fac.screenshot({ path: "/tmp/qc-facilities-meettab.png" });
  const confImgs = await fac.evaluate(() => [...document.querySelectorAll('section[aria-label="Meetings and conferences"] img')].length);
  console.log("conference section img count (want 1):", confImgs);
  await fac.close();

  // 3. Restaurant page hours fold
  const rest = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await rest.goto("http://127.0.0.1:3111/restaurant", { waitUntil: "networkidle" });
  await rest.waitForTimeout(600);
  const restTexts = await rest.evaluate(() => document.body.innerText);
  console.log("restaurant hours rows:", ["Monday to Friday", "Saturday", "Sunday", "08:00 to 22:00", "09:00 to 22:00", "09:30 to 21:30", "Kitchen closes 21:30", "Kitchen closes 21:00"].every((s) => restTexts.includes(s)));
  console.log("restaurant nav has Guesthouse button:", await rest.evaluate(() => !![...document.querySelectorAll("nav a")].find((a) => a.textContent.trim() === "Guesthouse" && a.getAttribute("href") === "/")));
  console.log("restaurant plates last item bar gone:", !(await rest.evaluate(() => [...document.querySelectorAll("button[aria-label^='View photo']")].some((b) => b.getAttribute("aria-label").includes("Patio tables set out for dinner")))));
  await rest.evaluate(() => [...document.querySelectorAll("h2")].find((h) => h.textContent.includes("Hours of operation"))?.scrollIntoView({ block: "center" }));
  await rest.waitForTimeout(600);
  await rest.screenshot({ path: "/tmp/qc-restaurant-hours.png" });
  await rest.close();

  // 4. Widgets: back-to-top + sticky bar on mobile (guesthouse + restaurant)
  const mob = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mob.goto("http://127.0.0.1:3111/", { waitUntil: "networkidle" });
  await mob.evaluate(() => window.scrollTo(0, 1200));
  await mob.waitForTimeout(800);
  const btt = await mob.evaluate(() => {
    const b = document.querySelector('button[aria-label="Back to top"]');
    if (!b) return { found: false };
    const r = b.getBoundingClientRect();
    return { found: true, opacity: getComputedStyle(b).opacity, bottom: r.bottom, vw: window.innerHeight };
  });
  console.log("back-to-top on mobile after scroll:", JSON.stringify(btt));
  await mob.screenshot({ path: "/tmp/qc-mobile-widgets.png" });
  // book page: sticky bar must exist there now (2-col)
  await mob.goto("http://127.0.0.1:3111/book", { waitUntil: "networkidle" });
  const barOnBook = await mob.evaluate(() => {
    const bar = document.querySelector(".sticky-action-bar");
    return bar ? { children: bar.querySelectorAll("a, a[href^='/']").length, text: bar.innerText.replace(/\n/g, "|") } : null;
  });
  console.log("sticky bar on /book:", JSON.stringify(barOnBook));
  await mob.goto("http://127.0.0.1:3111/restaurant/reserve", { waitUntil: "networkidle" });
  const barOnReserve = await mob.evaluate(() => document.querySelector(".sticky-action-bar")?.innerText.replace(/\n/g, "|"));
  console.log("sticky bar on /restaurant/reserve:", barOnReserve);
  await mob.close();

  // 5. Guesthouse gallery night group got the moved photo
  const gal = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await gal.goto("http://127.0.0.1:3111/gallery", { waitUntil: "networkidle" });
  const patioMoved = await gal.evaluate(() => [...document.querySelectorAll("img")].some((i) => i.src.includes("evening-patio-dining")));
  console.log("guesthouse gallery has moved patio photo:", patioMoved);
  await gal.close();

  await browser.close();
  console.log("done");
})();
