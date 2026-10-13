/* Functional + budget audit: console errors, failed requests, transfer size,
 * and every widget exercised (slider, carousel, tabs, accordion, lightbox). */
const { chromium } = require('playwright-core');

(async () => {
  const browser = await chromium.launch({
    executablePath: '/home/z/.agent-browser/browsers/chrome-155.0.8059.39/chrome',
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  let bytes = 0, reqs = 0;
  page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') errors.push(`${m.type()}: ${m.text().slice(0, 140)}`); });
  page.on('responsefailed', (r) => errors.push(`FAILED: ${r.url().slice(0, 100)} ${r.failure()?.errorText}`));
  page.on('response', (r) => {
    reqs++;
    const h = r.headers()['content-length'];
    if (h) bytes += parseInt(h, 10);
  });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // --- Hero slider: dots + arrows
  const dot1 = page.locator('[role=group][aria-roledescription=carousel] [role=tab]').first();
  await dot1.click();
  await page.waitForTimeout(1400);
  const slide1Shown = await page.evaluate(() => {
    const slides = document.querySelectorAll('[aria-roledescription=carousel] > div');
    return slides[0]?.getAttribute('aria-hidden') === 'false';
  });
  console.log('hero slider dot->slide1:', slide1Shown);

  // --- Scroll through the page (triggers engine devices)
  await page.evaluate(async () => {
    const h = document.documentElement.scrollHeight;
    for (let y = 0; y < h; y += 450) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
  });
  await page.waitForTimeout(800);

  // --- Restaurant page carousel
  await page.goto('http://localhost:3000/restaurant', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  const prevBtn = page.getByLabel('Previous dishes');
  await prevBtn.click();
  await page.waitForTimeout(600);
  console.log('restaurant carousel prev clicked ok');

  // --- Facilities tabs
  await page.goto('http://localhost:3000/facilities', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.getByRole('tab', { name: 'Celebrations' }).click();
  await page.waitForTimeout(400);
  const celebrateVisible = await page.getByText('Birthdays, braais, and family gatherings.').isVisible();
  console.log('facilities tabs -> Celebrations visible:', celebrateVisible);

  // --- Contact accordion
  await page.goto('http://localhost:3000/contact', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.getByRole('button', { name: /How do I book a room\?/ }).click();
  await page.waitForTimeout(400);
  const faq = await page.getByText("today's real rate straight away").isVisible();
  console.log('contact accordion opens:', faq);

  // --- Gallery lightbox with new photos
  await page.goto('http://localhost:3000/gallery', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  const poolBtn = page.getByRole('button', { name: /View photo: The stone-edged garden pond/ });
  await poolBtn.scrollIntoViewIfNeeded();
  await poolBtn.click();
  await page.waitForTimeout(500);
  const lightbox = await page.locator('[role=dialog][aria-modal]').isVisible();
  console.log('gallery lightbox opens on property photo:', lightbox);
  await page.keyboard.press('Escape');

  // --- Transfer budget for cold home load
  const b2 = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  let homeBytes = 0, homeReqs = 0;
  b2.on('response', (r) => {
    const h = r.headers()['content-length'];
    if (h) { homeBytes += parseInt(h, 10); homeReqs++; }
  });
  await b2.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await b2.waitForTimeout(1200);
  console.log(`home cold transfer: ${(homeBytes / 1024).toFixed(0)}KB across ${homeReqs} requests`);

  console.log('console problems:', errors.length ? errors.slice(0, 8) : 'none');
  await browser.close();
})();
