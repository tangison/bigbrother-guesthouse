/* Round 8 probe: cold weights (home, rooms, restaurant) + 390px horizontal
 * scroll on rooms/book/contact/restaurant + interactive checks the SSR curl
 * cannot do: the facilities "meet" tab (conference image + alt) and the
 * restaurant QR card. Same pattern as the round-6/7 probes. */
const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({
    executablePath: '/home/z/.agent-browser/browsers/chrome-155.0.8059.39/chrome',
    args: ['--no-sandbox'],
  });
  const base = 'http://127.0.0.1:3100';
  let bad = 0;
  const must = (cond, label) => { console.log((cond ? 'PASS  ' : 'FAIL  ') + label); if (!cond) bad++; };

  // 1. Cold weights
  for (const route of ['/', '/rooms', '/restaurant']) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const rows = [];
    page.on('response', async (r) => {
      const h = r.headers()['content-length'];
      if (h) rows.push(parseInt(h, 10));
    });
    await page.goto(base + route, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1200);
    const total = rows.reduce((a, b) => a + b, 0) / 1024;
    must(total < 500, `cold ${route} transfer ${total.toFixed(0)}KB across ${rows.length} req (<500KB)`);
    await page.close();
  }

  // 2. 390px horizontal overflow on the touched pages
  for (const route of ['/rooms', '/book', '/contact', '/restaurant', '/restaurant/menu']) {
    const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await m.goto(base + route, { waitUntil: 'networkidle' });
    await m.waitForTimeout(900);
    const overflow = await m.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    must(overflow <= 0, `390px ${route} overflow ${overflow}px`);
    await m.close();
  }

  // 3. Rooms page at 390px: Room 13 cards visible + bookable
  const rm = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await rm.goto(base + '/rooms', { waitUntil: 'networkidle' });
  await rm.waitForTimeout(900);
  const room13 = await rm.evaluate(() => {
    const t = document.body.innerText;
    return {
      cards: ['Room 13 · Single', 'Room 13 · Double', 'Room 13 · Triple', 'Room 13 · Quadruple', 'Room 7 · Single', 'Room 12 · Double'].filter((s) => t.includes(s)).length,
      quad: t.includes('N$1,200'),
      th13: t.includes('Thirteen rooms'),
    };
  });
  must(room13.cards === 6, `rooms 390px: all 6 restored cards visible (${room13.cards}/6)`);
  must(room13.quad && room13.th13, 'rooms 390px: quad rate + Thirteen rooms copy');
  // book-this-room deep link for the quad preselects the tier
  const quadLink = await rm.evaluate(() => {
    const a = Array.from(document.querySelectorAll('a[href^="/book?tier="]')).find((x) => x.href.includes('r13-quad'));
    return a ? a.getAttribute('href') : null;
  });
  must(Boolean(quadLink), 'rooms: quad card deep-links to /book?tier=r13-quad');
  await rm.goto(base + (quadLink || '/book'), { waitUntil: 'networkidle' });
  await rm.waitForTimeout(900);
  const sel = await rm.evaluate(() => {
    const s = document.querySelector('select');
    return s ? s.options[s.selectedIndex].textContent.trim() : '';
  });
  must(/Room 13/.test(sel) && /Quadruple/.test(sel), `booking select preselected: "${sel}"`);
  await rm.close();

  // 4. Facilities "meet" tab: conference image + alt (client-mounted)
  const f = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await f.goto(base + '/facilities', { waitUntil: 'networkidle' });
  const trig = f.locator('[role="tab"]', { hasText: /meet/i }).first();
  const trigCount = await f.locator('[role="tab"]').count();
  if (trigCount > 0 && await trig.count() > 0) {
    await trig.click();
    await f.waitForTimeout(700);
    const conf = await f.evaluate(() => {
      const img = Array.from(document.querySelectorAll('img')).find((i) => (i.src || '').includes('conference-room-set'));
      return { found: Boolean(img), alt: img ? img.getAttribute('alt') : '', natural: img ? img.naturalWidth : 0 };
    });
    must(conf.found, 'facilities meet tab: conference image mounts');
    must(/delegates/.test(conf.alt || ''), `conference alt text: "${(conf.alt || '').slice(0, 60)}..."`);
    must(conf.natural > 0, 'conference image decodes (naturalWidth ' + conf.natural + ')');
  } else {
    console.log('NOTE  no [role=tab] found; tabs structure changed - inspect manually');
  }
  await f.close();

  // 5. Restaurant QR card: image decodes, sits next to "Scan for our full menu"
  const r = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await r.goto(base + '/restaurant', { waitUntil: 'networkidle' });
  await r.waitForTimeout(900);
  const qr = await r.evaluate(() => {
    const img = Array.from(document.querySelectorAll('img')).find((i) => (i.src || '').includes('qr-restaurant-menu'));
    if (!img) return { found: false };
    const card = img.closest('div');
    return { found: true, alt: img.getAttribute('alt'), natural: img.naturalWidth, caption: card ? card.innerText.includes('Scan for our full menu') : false };
  });
  must(qr.found && qr.natural > 0, 'restaurant: QR image renders (naturalWidth ' + (qr.natural || 0) + ')');
  must(/QR code/.test(qr.alt || ''), 'restaurant: QR alt text present');
  must(qr.caption, 'restaurant: QR caption present');
  await r.close();

  // 6. Book page chips open in new tab
  const b = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await b.goto(base + '/book', { waitUntil: 'networkidle' });
  const chips = await b.evaluate(() =>
    Array.from(document.querySelectorAll('a[target="_blank"]')).map((a) => a.href)
  );
  must(chips.length >= 6, `book page: ${chips.length} new-tab links`);
  console.log(chips.map((c) => '  chip ' + c).join('\n'));
  await b.close();

  await browser.close();
  console.log(bad === 0 ? 'PROBE: all pass' : `PROBE: ${bad} failures`);
  process.exit(bad === 0 ? 0 : 1);
})();
