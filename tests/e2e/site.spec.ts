import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

const ROUTES = ['/', '/services', '/services/threading', '/services/brows', '/our-work', '/the-studio', '/visit', '/privacy'];
const WIDTHS = [320, 390, 768, 1024, 1440, 1920];

/** Scroll through the page so lazy images load and run-once reveals fire. */
async function scrollThrough(page: Page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo({ top: y, behavior: 'instant' });
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
}

test.describe('every route', () => {
  for (const route of ROUTES) {
    test(`${route} renders without console errors or broken images`, async ({ page }) => {
      const errors: string[] = [];
      page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
      page.on('pageerror', (e) => errors.push(e.message));
      const res = await page.goto(route);
      expect(res?.status()).toBe(200);
      await expect(page.locator('h1')).toHaveCount(1);
      await scrollThrough(page);
      await page.waitForLoadState('networkidle');
      const broken = await page.$$eval('img', (imgs) =>
        imgs.filter((i) => i.complete && i.naturalWidth === 0 && i.loading !== 'lazy').map((i) => i.src),
      );
      expect(broken).toEqual([]);
      // Every motion-revealed element must end fully visible
      await page.waitForTimeout(1800);
      const stuck = await page.$$eval(
        '[data-intro-media], [data-image-reveal], [data-reveal], [data-split], [data-intro-title], [data-intro-fade]',
        (els) =>
          els
            .filter((e) => {
              const cs = getComputedStyle(e);
              return cs.clipPath.includes('100%') || cs.opacity === '0' || cs.visibility === 'hidden';
            })
            .map((e) => e.outerHTML.slice(0, 80)),
      );
      expect(stuck).toEqual([]);
      expect(errors).toEqual([]);
    });
  }
});

test('no horizontal overflow at target widths', async ({ page }, info) => {
  test.skip(info.project.name !== 'desktop', 'width sweep runs once');
  for (const width of WIDTHS) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ROUTES) {
      await page.goto(route);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, `${route} @ ${width}px`).toBeLessThanOrEqual(0);
    }
  }
});

test('every booking control resolves to the shared booking destination', async ({ page }) => {
  await page.goto('/');
  const hrefs = await page.$$eval('a', (as) =>
    as.filter((a) => /book appointment/i.test(a.textContent ?? '')).map((a) => a.getAttribute('href')),
  );
  expect(hrefs.length).toBeGreaterThan(1);
  expect(new Set(hrefs).size).toBe(1);
  // No provider is configured yet, so booking falls back to the salon phone line.
  expect(hrefs[0]).toMatch(/^(tel:|https:)/);
});

test('treatment explorer links to service pages', async ({ page }) => {
  await page.goto('/');
  const links = page.locator('section[aria-labelledby="menu-title"] ol a');
  await expect(links).toHaveCount(5);
  await links.nth(1).click();
  await expect(page).toHaveURL(/\/services\/brows$/);
});

test('mobile navigation dialog traps focus, closes on Escape and restores focus', async ({ page }, info) => {
  test.skip(info.project.name !== 'mobile', 'mobile only');
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'Menu' });
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'Site menu' });
  await expect(dialog).toBeVisible();
  await expect(page.getByRole('button', { name: 'Close' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await dialog.getByRole('link', { name: /Our Work/ }).click();
  await expect(page).toHaveURL(/\/our-work$/);
  await expect(dialog).toBeHidden();
});

test('gallery lightbox supports keyboard and restores focus', async ({ page }) => {
  await page.goto('/our-work');
  const tiles = page.locator('main ul button');
  const second = tiles.nth(1);
  await second.focus();
  await page.keyboard.press('Enter');
  const dialog = page.getByRole('dialog', { name: 'Image viewer' });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText(/^02 \/ \d+$/)).toBeVisible();
  await page.keyboard.press('ArrowRight');
  await expect(dialog.getByText(/^03 \/ \d+$/)).toBeVisible();
  await page.keyboard.press('ArrowLeft');
  await page.keyboard.press('ArrowLeft');
  await expect(dialog.getByText(/^01 \/ \d+$/)).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(second).toBeFocused();
});

test('gallery filters narrow the grid', async ({ page }) => {
  await page.goto('/our-work');
  const all = await page.locator('main ul li').count();
  await page.getByRole('button', { name: 'Nails' }).click();
  await expect(page.getByRole('button', { name: 'Nails' })).toHaveAttribute('aria-pressed', 'true');
  const nails = await page.locator('main ul li').count();
  expect(nails).toBeLessThan(all);
});

test('skip link moves focus to main content', async ({ page }, info) => {
  test.skip(info.project.name !== 'desktop', 'keyboard journey on desktop');
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Skip to content' });
  await expect(skip).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main$/);
});

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });
  test('all content is visible without animation', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
    const hidden = await page.$$eval('[data-reveal], [data-hero-line], [data-hero-fade]', (els) =>
      els.filter((e) => getComputedStyle(e).opacity === '0').length,
    );
    expect(hidden).toBe(0);
    expect(await page.evaluate(() => document.documentElement.classList.contains('js-motion'))).toBe(false);
  });
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  test('server-rendered content is fully visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('The art of');
    await expect(page.getByRole('heading', { name: /Little rituals/ })).toBeVisible();
    const hidden = await page.$$eval('[data-reveal]', (els) => els.filter((e) => getComputedStyle(e).opacity === '0').length);
    expect(hidden).toBe(0);
  });
});

test.describe('automated accessibility scan (not a WCAG compliance claim)', () => {
  test.use({ reducedMotion: 'reduce' });
  for (const route of ROUTES) {
    test(`axe: ${route}`, async ({ page }, info) => {
      test.skip(info.project.name !== 'desktop', 'scan once');
      await page.goto(route);
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
      expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
    });
  }
});

test('hero intro settles with no leftover offsets', async ({ page }) => {
  await page.goto('/');
  await page.waitForTimeout(2500);
  const offsets = await page.$$eval('[data-hero-line]', (els) =>
    els.map((e) => new DOMMatrix(getComputedStyle(e).transform).m42),
  );
  expect(offsets.every((y) => Math.abs(y) < 0.5)).toBe(true);
  const h1Bottom = await page.locator('h1').evaluate((e) => e.getBoundingClientRect().bottom);
  const supportTop = await page.getByText('Thoughtful beauty. Beautifully you.').first().evaluate((e) => e.getBoundingClientRect().top);
  expect(supportTop).toBeGreaterThan(h1Bottom);
});
