// 390px horizontal-overflow probe for the new v3 pages.
const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  let fails = 0;
  for (const p of ["/menu", "/restaurant/menu", "/stay-nearby", "/facilities"]) {
    await page.goto(`http://127.0.0.1:3300${p}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    const over = await page.evaluate(() => {
      const w = document.documentElement.scrollWidth;
      const vw = window.innerWidth;
      const bad = [];
      if (w > vw) {
        document.querySelectorAll("*").forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.right > vw + 1 && r.width > 24) bad.push(`${el.tagName}.${String(el.className).slice(0, 60)} right=${Math.round(r.right)}`);
        });
      }
      return { w, vw, bad: bad.slice(0, 4) };
    });
    const pass = over.w <= over.vw;
    if (!pass) fails++;
    console.log(`${pass ? "PASS" : "FAIL"} 390px ${p}  scrollWidth=${over.w} vw=${over.vw}${pass ? "" : "  offenders: " + over.bad.join(" | ")}`);
  }
  // lightbox + rail sanity on /menu
  await page.goto("http://127.0.0.1:3300/menu", { waitUntil: "networkidle" });
  const railCount = await page.locator("#menu-top nav a").count();
  console.log(`${railCount >= 20 ? "PASS" : "FAIL"} /menu category rail links: ${railCount}`);
  if (railCount < 20) fails++;
  await browser.close();
  console.log(fails === 0 ? "PROBE ALL PASS" : `${fails} PROBE FAILURES`);
  process.exit(fails === 0 ? 0 : 1);
})();
