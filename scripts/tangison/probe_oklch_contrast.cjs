/* Colour-accurate contrast probe: reads REAL pixels under each cued line at
 * every scroll position the harness flagged, both ink luminance from computed
 * style (via canvas-independent parse of oklch) and background from the frame.
 * Written because shoot.mjs's `cs.color.match(/[\d.]+/g)` cannot parse oklch()
 * (Tailwind v4 theme colors), and grades paper text as near-black. */
const { chromium } = require('playwright-core');
const { PNG } = require('pngjs');

// oklch -> sRGB (D65), sufficient for contrast measurement
function oklchToRgb(L, C, Hdeg, alpha = 1) {
  const h = (Hdeg * Math.PI) / 180;
  const a = C * Math.cos(h), b = C * Math.sin(h);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  let r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  let g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  let bb = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;
  const f = (v) => {
    v = Math.min(1, Math.max(0, v));
    return v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055;
  };
  return [f(r), f(g), f(bb), alpha];
}
function parseColor(cs) {
  // handles oklch(...), lab(...), oklab(...) and rgb()/rgba()
  let m = cs.match(/oklch\(([\d.]+)%?\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.%]+))?\)/);
  if (m) {
    let L = parseFloat(m[1]); if (m[1].includes('%') || L > 1) L = L / (m[1].includes('%') ? 100 : (L > 1 ? 100 : 1));
    const a = m[4] ? (m[4].includes('%') ? parseFloat(m[4]) / 100 : parseFloat(m[4])) : 1;
    return oklchToRgb(L, parseFloat(m[2]), parseFloat(m[3]), a);
  }
  // lab()/oklab(): Chrome's computed form. Return [Y, Y, Y, a] — we only need
  // relative luminance, and lab L gives it directly.
  m = cs.match(/^lab\(([\d.]+)%?\s+(-?[\d.]+)\s+(-?[\d.]+)/);
  if (m) {
    const L = parseFloat(m[1]);
    const fy = (L + 16) / 116;
    const Y = L > 8 ? fy * fy * fy : L / 903.3;
    return [Y, Y, Y, 1];
  }
  m = cs.match(/^oklab\(([\d.]+)%?\s+(-?[\d.]+)\s+(-?[\d.]+)/);
  if (m) {
    let L = parseFloat(m[1]); if (L > 1) L = L / 100;
    const Y = L * L * L; // oklab L is the cube root of luminance
    return [Y, Y, Y, 1];
  }
  m = cs.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)/);
  if (m) return m.slice(1, 4).map((v) => parseFloat(v) / 255).concat([m[4] ? parseFloat(m[4]) : 1]);
  return null;
}
const lum = (rgb) => {
  const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
  return 0.2126 * f(rgb[0]) + 0.7152 * f(rgb[1]) + 0.0722 * f(rgb[2]);
};

(async () => {
  const browser = await chromium.launch({
    executablePath: '/home/z/.agent-browser/browsers/chrome-155.0.8059.39/chrome',
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // walk the flagged scroll positions
  const POSITIONS = [535, 866, 928, 1187, 1446, 1706, 1965, 2224, 2649, 9095, 9434, 9645];
  const results = [];
  for (const y of POSITIONS) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(700);
    // hide cues + fixed chrome + sticky nav, shoot
    await page.evaluate(() => {
      document.querySelectorAll('body *').forEach((el) => {
        const p = getComputedStyle(el).position;
        if (p === 'fixed' || p === 'sticky') el.setAttribute('data-probe-hide', '');
      });
    });
    await page.addStyleTag({ content: '[data-sc-cue],[data-sc-cue] *,[data-probe-hide]{visibility:hidden!important}' });
    await page.waitForTimeout(150);
    const buf = await page.screenshot();
    await page.evaluate(() => {
      document.querySelectorAll('[data-probe-hide]').forEach((el) => el.removeAttribute('data-probe-hide'));
    });
    // remove all style tags added so far to avoid stacking
    await page.evaluate(() => document.querySelectorAll('style[data-probe]').forEach((s) => s.remove()));

    const img = PNG.sync.read(buf);
    const lines = await page.evaluate(() => {
      const out = [];
      document.querySelectorAll('[data-sc-cue], [data-sc-magnet]').forEach((el) => {
        const cs = getComputedStyle(el);
        const o = parseFloat(cs.opacity) || 0;
        if (o < 0.85) return;
        const r = el.getBoundingClientRect();
        if (r.width < 8 || r.bottom < 0 || r.top > innerHeight) return;
        out.push({ t: (el.textContent || '').trim().slice(0, 34), x: r.left, y: r.top, w: r.width, h: r.height, color: cs.color });
      });
      return out;
    });
    for (const ln of lines) {
      let maxL = 0, sum = 0, n = 0;
      for (let yy = Math.max(0, Math.floor(ln.y)); yy < Math.min(900, ln.y + ln.h); yy += 3) {
        for (let xx = Math.max(0, Math.floor(ln.x)); xx < Math.min(1440, ln.x + ln.w); xx += 6) {
          const idx = (yy * img.width + xx) * 4;
          const L = lum([img.data[idx], img.data[idx + 1], img.data[idx + 2]]);
          maxL = Math.max(maxL, L); sum += L; n++;
        }
      }
      const fg = parseColor(ln.color);
      if (!fg) {
        console.log(`y=${y} SKIP unparseable color ${ln.color}  ${ln.t}`);
        continue;
      }
      const fl = lum([fg[0] * 255, fg[1] * 255, fg[2] * 255]);
      const meanL = sum / n;
      const ratio = fl > meanL ? (fl + 0.05) / (meanL + 0.05) : (maxL + 0.05) / (fl + 0.05);
      results.push({ y, t: ln.t, fl: +fl.toFixed(3), meanL: +meanL.toFixed(3), maxL: +maxL.toFixed(3), ratio: +ratio.toFixed(2) });
    }
  }
  let fails = 0;
  for (const r of results) {
    const pass = r.ratio >= 3;
    if (!pass) fails++;
    console.log(`y=${r.y} ${pass ? 'PASS' : 'FAIL'} ${r.ratio}:1  fl=${r.fl} meanL=${r.meanL} maxL=${r.maxL}  ${r.t}`);
  }
  console.log(`\n${results.length} lines probed, ${fails} below 3:1`);
  await browser.close();
})();
