/* Final precision pass: eyeball both menu pages (Sauces section) + /home redirect. */
const { chromium } = require('playwright-core');
const fs = require('fs');

function chromePath() {
  const cands = [
    '/home/z/.agent-browser/browsers/chrome-155.0.8059.39/chrome',
    '/home/z/.cache/ms-playwright/chromium-1200/chrome-linux/chrome',
    '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-linux/headless_shell',
  ];
  return cands.find((p) => fs.existsSync(p));
}

(async () => {
  const exe = chromePath();
  if (!exe) throw new Error('no chrome binary found');
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const p = await browser.newPage({ viewport: { width: 1380, height: 900 } });
  for (const [path, name] of [['/menu', 'gh_menu'], ['/restaurant/menu', 'rest_menu']]) {
    await p.goto('http://localhost:3300' + path, { waitUntil: 'networkidle' });
    const sauces = p.locator('text=Creamy Garlic, Cheese, Pepper, Mushroom or White').first();
    await sauces.scrollIntoViewIfNeeded();
    await p.waitForTimeout(400);
    await p.screenshot({ path: `/home/z/my-project/scripts/v3_${name}_sauces.png` });
    console.log(name, 'sauces visible:', await sauces.isVisible());
  }
  await p.goto('http://localhost:3300/home', { waitUntil: 'networkidle' });
  console.log('/home lands on:', new URL(p.url()).pathname);
  await browser.close();
})().catch((e) => { console.error(e.message); process.exit(1); });
