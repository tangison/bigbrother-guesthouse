/* Round 7 probe: cold page weight + horizontal scroll at 390px + marker
 * checks for the guesthouse page's new "fully booked" fold. Same pattern
 * as the round-6 probes. */
const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({ executablePath: '/home/z/.agent-browser/browsers/chrome-155.0.8059.39/chrome', args: ['--no-sandbox'] });
  const base = 'http://127.0.0.1:3100';

  // 1. Cold home transfer
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const rows = [];
  page.on('response', async (r) => {
    const h = r.headers()['content-length'];
    if (h) rows.push([parseInt(h, 10), r.url().split('/').pop().slice(0, 60)]);
  });
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  rows.sort((a, b) => b[0] - a[0]);
  let t = 0;
  for (const [s, u] of rows.slice(0, 8)) { t += s; console.log((s / 1024).toFixed(0) + 'KB', u); }
  console.log('home total(all):', (rows.reduce((a, [s]) => a + s, 0) / 1024).toFixed(0) + 'KB', 'requests:', rows.length);
  await page.close();

  // 2. Mobile 390px: horizontal scroll + fully-booked fold present
  const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await m.goto(base + '/guesthouse', { waitUntil: 'networkidle' });
  await m.waitForTimeout(1200);
  const overflow = await m.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  const hasFold = await m.evaluate(() => Boolean(document.querySelector('#fully-booked')) && document.body.innerText.includes('Uitkyk Guest Farm'));
  console.log('guesthouse 390px overflow px:', overflow, '| fully-booked fold:', hasFold);
  const links = await m.evaluate(() => Array.from(document.querySelectorAll('#fully-booked a[target="_blank"]')).map(a => a.href));
  console.log('external links in fold:', links.length);
  console.log(links.join('\n'));
  await m.screenshot({ path: '/home/z/my-project/scripts/tangison/round7_guesthouse_fold.png', fullPage: false });
  await m.evaluate(() => document.querySelector('#fully-booked').scrollIntoView());
  await m.waitForTimeout(800);
  await m.screenshot({ path: '/home/z/my-project/scripts/tangison/round7_fullybooked.png' });
  await browser.close();
  console.log('probe done');
})();
