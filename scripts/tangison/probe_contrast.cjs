/* Reproduce the harness's hide-and-measure to find the bright patch. */
const { chromium } = require('playwright-core');

(async () => {
  const browser = await chromium.launch({
    executablePath: '/home/z/.agent-browser/browsers/chrome-155.0.8059.39/chrome',
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);

  for (const y of [535, 900]) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(900);
    const probe = await page.evaluate(() => {
      const cues = Array.from(document.querySelectorAll('[data-sc-cue]'));
      const out = [];
      for (const c of cues) {
        const r = c.getBoundingClientRect();
        if (r.top > -50 && r.top < 900 && r.width > 10) {
          // hide it, sample the pixels underneath at its centre line
          const prev = c.style.visibility;
          c.style.visibility = 'hidden';
          out.push({ text: (c.textContent || '').trim().slice(0, 40), rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) } });
          c.style.visibility = prev;
        }
      }
      return out;
    });
    console.log('y=', y, JSON.stringify(probe, null, 1));

    // screenshot with the first cue actually hidden
    await page.evaluate(() => {
      const c = document.querySelector('[data-sc-cue]');
      if (c) c.style.visibility = 'hidden';
      document.title = 'PROBE';
    });
    await page.screenshot({ path: `/tmp/probe_${y}.png` });
    await page.evaluate(() => {
      const c = document.querySelector('[data-sc-cue]');
      if (c) c.style.visibility = '';
    });
  }
  await browser.close();
})();
