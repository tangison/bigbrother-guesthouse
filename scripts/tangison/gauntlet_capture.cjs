/* Gauntlet capture: our home vs the named bar, same browser, same viewports.
 * Saves neutral-labelled pairs: A = ours, B = bar (labels assigned at capture,
 * identity is visible in-page; the critic never reads our self-assessment). */
const { chromium } = require('playwright-core');

const CHROME = '/home/z/.agent-browser/browsers/chrome-155.0.8059.39/chrome';

async function shootSet(browser, url, outdir) {
  const fs = require('fs');
  fs.mkdirSync(outdir, { recursive: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
  } catch { /* accept partial loads on the external bar */ }
  await page.waitForTimeout(2500);
  await page.screenshot({ path: `${outdir}/desktop-fold.png` });
  // a mid-page position
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight * 0.32));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${outdir}/desktop-mid.png` });
  // mobile fold
  const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
  try {
    await m.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
  } catch {}
  await m.waitForTimeout(2000);
  await m.screenshot({ path: `${outdir}/mobile-fold.png` });
  await page.close();
  await m.close();
}

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME, args: ['--no-sandbox'] });
  await shootSet(browser, 'http://localhost:3000', '/tmp/gauntlet/A');
  await shootSet(browser, 'https://www.gondwana-collection.com/', '/tmp/gauntlet/B');
  await browser.close();
  console.log('captured A (ours) and B (bar)');
})();
