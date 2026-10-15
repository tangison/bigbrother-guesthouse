/* Round 8 visual pass: rooms page (Room 13 cards + H1) and restaurant QR aside. */
const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({
    executablePath: '/home/z/.agent-browser/browsers/chrome-155.0.8059.39/chrome',
    args: ['--no-sandbox'],
  });
  const base = 'http://127.0.0.1:3100';
  const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await m.goto(base + '/rooms', { waitUntil: 'networkidle' });
  await m.waitForTimeout(1000);
  await m.screenshot({ path: '/home/z/my-project/scripts/tangison/round8_rooms_top.png' });
  await m.evaluate(() => {
    const el = Array.from(document.querySelectorAll('h3')).find((h) => h.textContent.includes('Room 13 · Quadruple'));
    if (el) el.scrollIntoView({ block: 'center' });
  });
  await m.waitForTimeout(500);
  await m.screenshot({ path: '/home/z/my-project/scripts/tangison/round8_room13_card.png' });

  const d = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await d.goto(base + '/restaurant', { waitUntil: 'networkidle' });
  await d.waitForTimeout(1200);
  await d.evaluate(() => {
    const el = Array.from(document.querySelectorAll('p')).find((p) => p.textContent.includes('Scan for our full menu'));
    if (el) el.scrollIntoView({ block: 'center' });
  });
  await d.waitForTimeout(600);
  await d.screenshot({ path: '/home/z/my-project/scripts/tangison/round8_restaurant_qr.png' });
  await browser.close();
  console.log('screenshots done');
})();
