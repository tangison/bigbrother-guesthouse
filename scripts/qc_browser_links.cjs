#!/usr/bin/env node
/* Real-browser check of the two bot-ambiguous external links:
 * Agoda search chip and TikTok profile. Captures final URL + title
 * exactly as a headless-Chrome user would see them. */
const { chromium } = require("playwright-core");
const fs = require("fs");
const glob = require("fs").readdirSync("/home/z/.cache/ms-playwright")
  .filter(d => d.startsWith("chromium-"))
  .map(d => `/home/z/.cache/ms-playwright/${d}/chrome-linux64/chrome`)
  .find(p => fs.existsSync(p));

(async () => {
  const browser = await chromium.launch({ executablePath: glob, args: ["--no-sandbox"] });
  const ctx = await browser.newContext({
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    viewport: { width: 1280, height: 800 },
    locale: "en-US",
  });
  const page = await ctx.newPage();

  for (const [name, url, needle] of [
    ["Agoda search", "https://www.agoda.com/search?textToSearch=Big+Brother+Guesthouse+Usakos", "big brother"],
    ["TikTok profile", "https://www.tiktok.com/@bigbrotherguest", "bigbrotherguest"],
  ]) {
    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
      await page.waitForTimeout(6000); // let client redirects settle
      const final = page.url();
      const title = await page.title();
      const text = (await page.content()).toLowerCase();
      const found = text.includes(needle);
      console.log(`${name}\n  lands: ${final.slice(0, 110)}\n  title: ${title.slice(0, 90)}\n  mentions "${needle}" in DOM: ${found}\n`);
    } catch (e) {
      console.log(`${name}\n  ERROR: ${String(e).slice(0, 120)}\n`);
    }
  }
  await browser.close();
})();
