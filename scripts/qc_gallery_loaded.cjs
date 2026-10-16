// Verify gallery images actually load (naturalWidth > 0) after scrolling.
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
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://127.0.0.1:3111/restaurant", { waitUntil: "networkidle" });
  // Scroll through the gallery area slowly to trigger lazy loads
  await page.evaluate(async () => {
    const el = [...document.querySelectorAll("h2")].find((h) => h.textContent.includes("The gallery"));
    const top = el.getBoundingClientRect().top + window.scrollY;
    for (let y = top; y < top + 6000; y += 700) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 350));
    }
  });
  await page.waitForTimeout(2500);
  const stats = await page.evaluate(() => {
    const imgs = [...document.querySelectorAll('section[aria-label="Restaurant photo gallery"] img')];
    const loaded = imgs.filter((i) => i.complete && i.naturalWidth > 0);
    return { total: imgs.length, loaded: loaded.length };
  });
  console.log("gallery imgs loaded:", stats.loaded, "/", stats.total);
  const el = await page.$('section[aria-label="Restaurant photo gallery"]');
  await el.screenshot({ path: "/tmp/qc-gallery-loaded.png" });
  // Lightbox check: click first photo
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.evaluate(() => {
    const el = [...document.querySelectorAll("h2")].find((h) => h.textContent.includes("The gallery"));
    el.scrollIntoView({ block: "start" });
  });
  await page.waitForTimeout(800);
  await page.click('section[aria-label="Restaurant photo gallery"] button[aria-label^="View photo"]');
  await page.waitForTimeout(1500);
  const lightbox = await page.$('div[role="dialog"][aria-modal="true"]');
  console.log("lightbox opens:", !!lightbox);
  if (lightbox) await lightbox.screenshot({ path: "/tmp/qc-lightbox.png" });
  await browser.close();
  console.log("done");
})();
