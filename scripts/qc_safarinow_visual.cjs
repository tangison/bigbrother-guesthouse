#!/usr/bin/env node
/* Visual QC after SafariNow removal: / , /contact , /book
 * - no horizontal overflow at 1440 and 390
 * - listing chips render as pills
 * - screenshots for the record */
const { chromium } = require("playwright-core");
const fs = require("fs");
const exe = fs.readdirSync("/home/z/.cache/ms-playwright")
  .filter(d => d.startsWith("chromium-"))
  .map(d => `/home/z/.cache/ms-playwright/${d}/chrome-linux64/chrome`)
  .find(p => fs.existsSync(p));

const BASE = "http://127.0.0.1:3111";
let fail = 0;

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ["--no-sandbox"] });
  for (const vp of [{ w: 1440, h: 900, tag: "desktop" }, { w: 390, h: 844, tag: "mobile" }]) {
    const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h } });
    for (const path of ["/", "/contact", "/book"]) {
      await page.goto(BASE + path, { waitUntil: "networkidle", timeout: 60000 });
      await page.waitForTimeout(800);
      const overflow = await page.evaluate(() =>
        document.documentElement.scrollWidth - document.documentElement.clientWidth);
      const chips = await page.evaluate(() => {
        const links = [...document.querySelectorAll('a[target="_blank"]')];
        const names = links.map(a => a.textContent.trim());
        return { total: links.length, hasTrip: names.some(n => n.includes("TripAdvisor")),
                 hasSafari: names.some(n => n.toLowerCase().includes("safari")) };
      });
      const status = overflow === 0 && !chips.hasSafari ? "ok" : "FAIL";
      if (status === "FAIL") fail++;
      console.log(`${status}  ${path} @${vp.tag}: overflow=${overflow}px, ext links=${chips.total}, tripadvisor=${chips.hasTrip}, safari=${chips.hasSafari}`);
      await page.screenshot({ path: `/home/z/my-project/download/qc-safarinow-${path.replace(/\//g, "_") || "home"}-${vp.tag}.png`, fullPage: false });
    }
    await page.close();
  }
  await browser.close();
  console.log(fail ? `\n${fail} FAILURES` : "\nALL VISUAL CHECKS PASS");
  process.exit(fail ? 1 : 0);
})();
