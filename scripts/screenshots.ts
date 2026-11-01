/** Captures review screenshots from a running production server: `npm start` then `npx tsx scripts/screenshots.ts`. */
import { chromium, devices } from '@playwright/test';

const BASE = process.env.BASE_URL ?? 'http://localhost:3000';
const OUT = 'docs/screenshots';

async function scrollThrough(page: import('@playwright/test').Page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo({ top: y, behavior: 'instant' });
      await new Promise((r) => setTimeout(r, 80));
    }
    await new Promise((r) => setTimeout(r, 1600));
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
  await page.waitForTimeout(400);
}

const browser = await chromium.launch();

const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const d = await desktop.newPage();
await d.goto(`${BASE}/`);
await d.waitForTimeout(2200);
await d.screenshot({ path: `${OUT}/desktop-1440-hero.png` });
for (const [route, name] of [['/', 'home'], ['/services', 'services'], ['/services/brows', 'treatment-brows'], ['/our-work', 'our-work'], ['/the-studio', 'studio'], ['/visit', 'visit']] as const) {
  await d.goto(`${BASE}${route}`);
  await scrollThrough(d);
  await d.screenshot({ path: `${OUT}/desktop-1440-${name}-full.jpg`, fullPage: true, quality: 72, type: 'jpeg' });
}

const mobile = await browser.newContext({ ...devices['iPhone 15'], deviceScaleFactor: 2 });
const m = await mobile.newPage();
await m.goto(`${BASE}/`);
await m.waitForTimeout(2200);
await m.screenshot({ path: `${OUT}/mobile-390-hero.png` });
await scrollThrough(m);
await m.screenshot({ path: `${OUT}/mobile-390-home-full.jpg`, fullPage: true, quality: 70, type: 'jpeg' });
await m.getByRole('button', { name: 'Menu' }).click();
await m.waitForTimeout(800);
await m.screenshot({ path: `${OUT}/mobile-390-menu.png` });
await m.keyboard.press('Escape');
await m.goto(`${BASE}/services`);
await scrollThrough(m);
await m.screenshot({ path: `${OUT}/mobile-390-services-full.jpg`, fullPage: true, quality: 70, type: 'jpeg' });

await browser.close();
console.log('saved to', OUT);
