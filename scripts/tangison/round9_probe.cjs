/* Round 9 probe: gallery completion checks the SSR curl cannot do —
 * 390px overflow on both gallery pages, lightbox open/next/escape on
 * /gallery and /restaurant/gallery, alt text on a new photo, and the
 * rebuilt masters actually loading (room-double-wardrobe at 1600w,
 * watermark-cropped property-pool-wide). */
const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({
    executablePath: '/home/z/.agent-browser/browsers/chrome-155.0.8059.39/chrome',
    args: ['--no-sandbox'],
  });
  const base = 'http://127.0.0.1:3200';
  let bad = 0;
  const must = (cond, label) => { console.log((cond ? 'PASS  ' : 'FAIL  ') + label); if (!cond) bad++; };

  // 1. 390px horizontal overflow on the two gallery pages
  for (const route of ['/gallery', '/restaurant/gallery']) {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.goto(base + route, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    must(over === 0, `390px ${route} horizontal overflow ${over}px`);
    await page.close();
  }

  // 2. /gallery lightbox: open the new wardrobe photo, arrow through, escape
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.goto(base + '/gallery', { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);
    const btn = page.locator('button[aria-label="View photo: Spacious double room with built-in cupboards, ceiling fan and air-conditioner"]');
    must((await btn.count()) === 1, '/gallery new wardrobe photo present with alt');
    await btn.click({ timeout: 15000 });
    const dlg = page.locator('div[role="dialog"]');
    await dlg.waitFor({ state: 'visible', timeout: 4000 });
    must(await dlg.isVisible(), '/gallery lightbox opens on new photo');
    const src1 = await dlg.locator('img').getAttribute('src');
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(400);
    const src2 = await dlg.locator('img').getAttribute('src');
    must(src1 !== src2, `/gallery lightbox arrow next changes photo (${src1} -> ${src2})`);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    must(!(await dlg.isVisible().catch(() => false)), '/gallery lightbox escape closes');
    await page.close();
  }

  // 3. /restaurant/gallery: place section renders, lightbox covers both sections
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.goto(base + '/restaurant/gallery', { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);
    must((await page.getByRole('heading', { name: 'The place', exact: true }).count()) === 1, '/restaurant/gallery "The place" heading');
    must((await page.getByRole('heading', { name: 'Plates & drinks' }).count()) === 1, '/restaurant/gallery "Plates & drinks" heading');
    const first = page.locator('button[aria-label="View photo: The restaurant entrance with green and yellow posts"]');
    await first.waitFor({ state: 'attached', timeout: 15000 });
    await first.click({ timeout: 15000 });
    const dlg = page.locator('div[role="dialog"]');
    await dlg.waitFor({ state: 'visible', timeout: 4000 });
    const alt1 = await dlg.getAttribute('aria-label');
    must(alt1 === 'The restaurant entrance with green and yellow posts', `/restaurant/gallery lightbox opens on place photo (${alt1})`);
    await page.keyboard.press('Escape');
    await dlg.waitFor({ state: 'hidden', timeout: 4000 });
    await page.waitForTimeout(500);
    // deep index: a plate far into the second section must also open in the SAME dialog
    const plate = page.locator('button[aria-label="View photo: Pap with braised meat topped with onion rings"]');
    must((await plate.count()) === 1, '/restaurant/gallery new pap-braise plate present');
    await plate.waitFor({ state: 'attached', timeout: 15000 });
    await plate.click({ timeout: 15000 });
    await dlg.waitFor({ state: 'visible', timeout: 4000 });
    must((await dlg.getAttribute('aria-label')) === 'Pap with braised meat topped with onion rings', '/restaurant/gallery lightbox index spans both sections');
    await page.close();
  }

  // 4. Rebuilt masters load with real bytes
  for (const [f, minKB] of [['room-double-wardrobe.jpg', 150], ['property-pool-wide.jpg', 150], ['plate-yellow-rice-curry.jpg', 60], ['plate-pap-braise.jpg', 60]]) {
    const r = await page2size(base + '/images/' + f);
    must(r && r.ok && r.kb >= minKB, `/images/${f} ${r ? r.kb : '?'}KB status ${r ? r.status : 'none'} (>= ${minKB}KB)`);
  }
  must(!(await page2size(base + '/images/guesthouse-exterior-deck.jpg')).ok, 'deleted guesthouse-exterior-deck.jpg is gone');
  must(!(await page2size(base + '/images/breakfast-board-wors.jpg')).ok, 'deleted breakfast-board-wors.jpg is gone');

  await browser.close();
  console.log(bad === 0 ? 'ROUND9 PROBE: ALL PASS' : `ROUND9 PROBE: ${bad} FAIL`);
  process.exit(bad === 0 ? 0 : 1);

  async function page2size(url) {
    const page = await browser.newPage();
    const resp = await page.goto(url).catch(() => null);
    const body = resp ? await resp.body().catch(() => Buffer.alloc(0)) : Buffer.alloc(0);
    const out = resp ? { ok: resp.ok(), status: resp.status(), kb: Math.round(body.length / 1024) } : null;
    await page.close();
    return out;
  }
})();
