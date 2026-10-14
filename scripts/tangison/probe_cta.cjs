const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({ executablePath: '/home/z/.agent-browser/browsers/chrome-155.0.8059.39/chrome', args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  const info = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a')).filter(a => /See the menu|Check Rates|Check rates/.test(a.textContent || ''));
    return links.map(a => {
      const cs = getComputedStyle(a);
      const r = a.getBoundingClientRect();
      return { text: a.textContent.trim(), color: cs.color, bg: cs.backgroundColor, opacity: cs.opacity, visibility: cs.visibility, fontSize: cs.fontSize, rect: { w: Math.round(r.width), h: Math.round(r.height) }, html: a.outerHTML.slice(0, 220) };
    });
  });
  console.log(JSON.stringify(info, null, 1));
  await browser.close();
})();
