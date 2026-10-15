/* Round 7 lab vitals on the LIVE site: FCP, LCP, CLS, transfer size, requests.
 * Chromium + PerformanceObserver, mobile viewport + throttling like a mid phone. */
const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({ executablePath: '/home/z/.agent-browser/browsers/chrome-155.0.8059.39/chrome', args: ['--no-sandbox'] });
  const ctx = await browser.newContext({ viewport: { width: 412, height: 823 }, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  let bytes = 0, reqs = 0;
  page.on('response', async (r) => {
    reqs++;
    const h = r.headers()['content-length'];
    if (h) bytes += parseInt(h, 10);
  });
  const t0 = Date.now();
  await page.goto('https://www.bigbrotherguesthouse.com/', { waitUntil: 'load', timeout: 60000 });
  const loadMs = Date.now() - t0;
  await page.waitForTimeout(2500);
  const vitals = await page.evaluate(() => new Promise((resolve) => {
    const out = {};
    try {
      new PerformanceObserver((l) => { const e = l.getEntries(); out.fcp = e[e.length - 1].startTime; }).observe({ type: 'paint', buffered: true });
    } catch (e) {}
    try {
      new PerformanceObserver((l) => { const e = l.getEntries(); out.lcp = e[e.length - 1].startTime; out.lcpEl = (e[e.length - 1].element || {}).tagName || '?'; }).observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {}
    try {
      let cls = 0; new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) cls += e.value; }).observe({ type: 'layout-shift', buffered: true });
      setTimeout(() => { out.cls = cls; resolve(out); }, 1500);
    } catch (e) { resolve(out); }
  }));
  console.log('load ms:', loadMs);
  console.log('FCP ms:', vitals.fcp ? vitals.fcp.toFixed(0) : 'n/a');
  console.log('LCP ms:', vitals.lcp ? vitals.lcp.toFixed(0) : 'n/a', '| LCP element:', vitals.lcpEl || '?');
  console.log('CLS:', typeof vitals.cls === 'number' ? vitals.cls.toFixed(4) : 'n/a');
  console.log('requests:', reqs, '| measured transfer:', (bytes / 1024).toFixed(0) + 'KB');
  await browser.close();
})();
