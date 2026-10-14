const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({ executablePath: '/home/z/.agent-browser/browsers/chrome-155.0.8059.39/chrome', args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const rows = [];
  page.on('response', async (r) => {
    const h = r.headers()['content-length'];
    if (h) rows.push([parseInt(h,10), r.url().split('/').pop().slice(0,60)]);
  });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  rows.sort((a,b)=>b[0]-a[0]);
  let t=0; for(const [s,u] of rows.slice(0,12)){ t+=s; console.log((s/1024).toFixed(0)+'KB', u); }
  console.log('total(all):', (rows.reduce((a,[s])=>a+s,0)/1024).toFixed(0)+'KB');
  await browser.close();
})();
