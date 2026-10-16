// Visual QC: restaurant page gallery fold + gallery page, desktop and mobile.
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
  for (const [name, url, w, h] of [
    ["rest-desktop", "http://127.0.0.1:3111/restaurant", 1440, 900],
    ["rest-mobile", "http://127.0.0.1:3111/restaurant", 390, 844],
    ["gallery-desktop", "http://127.0.0.1:3111/restaurant/gallery", 1440, 900],
  ]) {
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    await page.goto(url, { waitUntil: "networkidle" });
    // Scroll to the gallery fold and book fold to trigger lazy images
    await page.evaluate(() => {
      const el = [...document.querySelectorAll("h2")].find((h) => h.textContent.includes("The gallery"));
      if (el) el.scrollIntoView({ block: "start" });
    });
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `/tmp/qc-${name}-gallery.png` });
    await page.evaluate(() => {
      const el = [...document.querySelectorAll("h2")].find((h) => h.textContent.includes("table waits"));
      if (el) el.scrollIntoView({ block: "center" });
    });
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `/tmp/qc-${name}-book.png` });
    // overflow check
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    console.log(name, "h-overflow px:", overflow);
    await page.close();
  }
  await browser.close();
  console.log("done");
})();
