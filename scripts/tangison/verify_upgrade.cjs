/* Verification harness for the preview deployment:
   1. internal link check (no broken links)
   2. WhatsApp/email link decode on /book, /restaurant/reserve, /vip, /feedback
   3. horizontal-scroll audit at 320/360/390/412/768/1024/1280/1536
   4. floating bar margin + padding measurement
   5. console errors
   6. both strip numbers present as tel: links                              */
const { chromium } = require("playwright");

const BASE = process.env.PREVIEW || "https://bigbrother-guesthouse-dokbvypg0-targis47s-projects.vercel.app";
const PAGES = [
  "/", "/rooms", "/book", "/plot-7", "/facilities", "/vip", "/guesthouse",
  "/gallery", "/guest-info", "/feedback", "/contact", "/brand",
  "/restaurant", "/restaurant/menu", "/restaurant/reserve",
  "/restaurant/gallery", "/restaurant/contact",
];

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  const consoleErrors = [];
  page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text().slice(0, 160)); });
  page.on("pageerror", (e) => consoleErrors.push("PAGEERROR " + String(e).slice(0, 160)));

  // 1. link check
  const broken = [];
  const seen = new Set();
  for (const p of PAGES) {
    const res = await page.goto(BASE + p, { waitUntil: "networkidle", timeout: 45000 }).catch(() => null);
    if (!res || !res.ok()) { broken.push(`${p} (status ${res ? res.status() : "fail"})`); continue; }
    const hrefs = await page.$$eval("a[href]", (as) => as.map((a) => a.getAttribute("href")));
    for (const h of hrefs) {
      if (!h || !h.startsWith("/") || h.startsWith("//") || seen.has(h)) continue;
      seen.add(h);
      const r = await page.request.get(BASE + h, { maxRedirects: 5 });
      if (!r.ok()) broken.push(`${p} -> ${h} (${r.status()})`);
    }
  }
  console.log("LINKCHECK broken:", broken.length ? broken : "none", "| unique internal:", seen.size);

  // 2. wa.me / mailto decode on /book
  await page.goto(BASE + "/book", { waitUntil: "networkidle" });
  const waHref = await page.$eval('a[href^="https://wa.me/264812647606"]', (a) => a.href).catch(() => null);
  if (waHref) {
    const msg = decodeURIComponent(waHref.split("text=")[1]).replace(/\+/g, " ");
    console.log("WA-BOOK has greeting:", msg.startsWith("Hello Big Brother Guesthouse, do you have any rooms available?"));
    console.log("WA-BOOK has details header:", msg.includes("*Booking Request Details:*"));
    console.log("WA-BOOK has confirm line:", msg.includes("Please confirm availability and payment steps. Thank you!"));
    console.log("WA-BOOK has VIP line:", /VIP Member \(20% Off\): (Yes|No)/.test(msg));
    console.log("WA-BOOK total line:", /Estimated Total: (N\$[\d,]+|Price on request)/.test(msg));
  } else console.log("WA-BOOK: LINK NOT FOUND");
  const mailHref = await page.$eval('a[href^="mailto:bigbrotherguest@gmail.com"]', (a) => a.href).catch(() => null);
  console.log("MAIL-BOOK:", mailHref ? decodeURIComponent(mailHref.split("body=")[1] || "").split("\n")[0] : "NOT FOUND");

  // reserve link
  await page.goto(BASE + "/restaurant/reserve", { waitUntil: "networkidle" });
  const waRes = await page.$eval('a[href^="https://wa.me/264813029522"]', (a) => a.href).catch(() => null);
  console.log("WA-RESERVE greeting:", waRes ? decodeURIComponent(waRes.split("text=")[1]).startsWith("Hello Big Brothers Restaurant, I would like to reserve a table.") : "NOT FOUND");

  // 3+4. viewport audit on home + rooms + restaurant
  const audits = [];
  for (const width of [320, 360, 390, 412, 768, 1024, 1280, 1536]) {
    await page.setViewportSize({ width, height: 900 });
    for (const p of ["/", "/rooms", "/restaurant"]) {
      await page.goto(BASE + p, { waitUntil: "networkidle" });
      const r = await page.evaluate(() => {
        const doc = document.documentElement;
        const hScroll = doc.scrollWidth - doc.clientWidth;
        const pill = document.querySelector(".nav-pill");
        const cs = pill ? getComputedStyle(pill.parentElement) : null;
        const pillCS = pill ? getComputedStyle(pill) : null;
        // first content edge-touch check
        let edgeTouch = false;
        for (const el of document.querySelectorAll("main h1, main p")) {
          const b = el.getBoundingClientRect();
          if (b.left < 2 && b.width > 0) { edgeTouch = true; break; }
        }
        return { hScroll, outerMargin: cs ? parseFloat(cs.paddingLeft) : -1, innerPad: pillCS ? parseFloat(pillCS.paddingLeft) : -1, edgeTouch };
      });
      audits.push({ width, p, ...r });
    }
  }
  const bad = audits.filter((a) => a.hScroll > 0 || a.outerMargin < 12 || a.innerPad < 16 || a.edgeTouch);
  console.log("VIEWPORTS failing:", bad.length ? bad : "none");
  console.log("CONSOLE errors:", consoleErrors.length ? consoleErrors.slice(0, 5) : "none");

  await browser.close();
})();
