/* Exact harness replication: stylesheet-hide all cues + fixed chrome, shoot, sample. */
const { chromium } = require('playwright-core');

(async () => {
  const browser = await chromium.launch({
    executablePath: '/home/z/.agent-browser/browsers/chrome-155.0.8059.39/chrome',
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.evaluate(() => window.scrollTo(0, 535));
  await page.waitForTimeout(1200);

  // mark fixed chrome exactly like the harness
  await page.evaluate(() => {
    document.querySelectorAll('body *').forEach((el) => {
      if (getComputedStyle(el).position !== 'fixed') return;
      if (el.closest('[data-sc-world],[data-sc-world-copy]')) return;
      el.setAttribute('data-sc-shot-fixed', '');
    });
  });
  await page.addStyleTag({
    content: '[data-sc-cue],[data-sc-cue] *,[data-sc-copy],[data-sc-copy] *,[data-sc-shot-fixed]{visibility:hidden!important}',
  });
  await page.waitForTimeout(400);
  await page.screenshot({ path: '/tmp/bare_535.png' });

  // sample the cue rects from the screenshot
  const buf = require('fs').readFileSync('/tmp/bare_535.png');
  const { PNG } = require('pngjs');
  const img = PNG.sync.read(buf);
  const rects = await page.evaluate(() => {
    const out = [];
    document.querySelectorAll('[data-sc-cue]').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width > 8 && r.bottom > 0 && r.top < innerHeight) {
        out.push({ t: (el.textContent || '').trim().slice(0, 30), x: r.left, y: r.top, w: r.width, h: r.height });
      }
    });
    return out;
  });
  console.log('cue rects:', JSON.stringify(rects));
  const lum = (r, g, b) => {
    const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  for (const r of rects) {
    let maxL = 0, minL = 1, sum = 0, n = 0;
    for (let yy = Math.max(0, Math.floor(r.y)); yy < Math.min(900, r.y + r.h); yy += 4) {
      for (let xx = Math.max(0, Math.floor(r.x)); xx < Math.min(1440, r.x + r.w); xx += 8) {
        const idx = (yy * img.width + xx) * 4;
        const L = lum(img.data[idx], img.data[idx + 1], img.data[idx + 2]);
        maxL = Math.max(maxL, L); minL = Math.min(minL, L); sum += L; n++;
      }
    }
    console.log(`${r.t}: meanL=${(sum / n).toFixed(3)} maxL=${maxL.toFixed(3)} minL=${minL.toFixed(3)}`);
  }
  await browser.close();
})();
