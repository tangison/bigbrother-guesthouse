#!/usr/bin/env node
/* Booking.com chip must render a real search-results page for the
 * guesthouse; Agoda gets one last format attempt. */
const { chromium } = require("playwright-core");
const fs = require("fs");
const exe = fs.readdirSync("/home/z/.cache/ms-playwright")
  .filter(d => d.startsWith("chromium-"))
  .map(d => `/home/z/.cache/ms-playwright/${d}/chrome-linux64/chrome`)
  .find(p => fs.existsSync(p));

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ["--no-sandbox"] });
  const ctx = await browser.newContext({
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    viewport: { width: 1280, height: 800 }, locale: "en-US",
  });
  const page = await ctx.newPage();

  const targets = [
    ["Booking search chip", "https://www.booking.com/searchresults.html?ss=Big+Brother+Guesthouse+Usakos+Namibia", "big brother"],
    ["Agoda variant 2", "https://www.agoda.com/Search?textToSearch=Big%20Brother%20Guesthouse%20Usakos&locale=en-us", "big brother"],
  ];
  for (const [name, url, needle] of targets) {
    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
      await page.waitForTimeout(7000);
      const final = page.url();
      const title = await page.title();
      const text = (await page.content()).toLowerCase();
      console.log(`${name}\n  lands: ${final.slice(0, 110)}\n  title: ${title.slice(0, 90)}\n  mentions "${needle}": ${text.includes(needle)}\n`);
    } catch (e) {
      console.log(`${name}\n  ERROR: ${String(e).slice(0, 120)}\n`);
    }
  }
  await browser.close();
})();
