import { expect, test, type Locator, type Page } from '@playwright/test';

const navTargets = [
  { name: 'Work', path: '/work' },
  { name: 'Services', path: '/services' },
  { name: 'Hire Me', path: '/hire-me' },
  { name: 'Get in touch', path: '/contact' },
] as const;

async function expectLinkTargetToReturn200(page: Page, link: Locator) {
  const href = await link.getAttribute('href');
  expect(href).toBeTruthy();
  expect((await page.request.get(href!)).status()).toBe(200);
}

test.describe('desktop navigation and routing', () => {
  for (const target of navTargets) {
    test(`${target.name} resolves with 200 and navigates to ${target.path}`, async ({ page }) => {
      await page.goto('/');
      const link = page.getByRole('navigation').getByRole('link', {
        name: target.name,
        exact: true,
      });

      await expectLinkTargetToReturn200(page, link);
      await link.click();
      await expect(page).toHaveURL(new RegExp(`${target.path}/?$`));
    });
  }

  test('logo resolves with 200 and returns to the homepage', async ({ page }) => {
    await page.goto('/work');
    const logo = page.getByRole('navigation').getByRole('link', {
      name: 'Cyrus Khiabani',
      exact: true,
    });

    await expectLinkTargetToReturn200(page, logo);
    await logo.click();
    await expect.poll(() => new URL(page.url()).pathname).toBe('/');
  });

  for (const legacyPath of ['/resume', '/engineering']) {
    test(`${legacyPath} redirects to /hire-me`, async ({ page }) => {
      const response = await page.goto(legacyPath);

      expect(response?.status()).toBe(200);
      await expect(page).toHaveURL(/\/hire-me\/?$/);
    });
  }

  for (const cta of [
    { name: 'Hire Me', path: '/hire-me' },
    { name: 'Freelance & Project Work', path: '/services' },
  ] as const) {
    test(`homepage ${cta.name} CTA resolves with 200 and lands on ${cta.path}`, async ({ page }) => {
      await page.goto('/');
      const link = page.locator('#hero').getByRole('link', { name: cta.name, exact: true });

      await expectLinkTargetToReturn200(page, link);
      await link.click();
      await expect(page).toHaveURL(new RegExp(`${cta.path}/?$`));
    });
  }
});

test.describe('mobile navigation', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  for (const target of navTargets) {
    test(`${target.name} resolves with 200 and navigates to ${target.path}`, async ({ page }) => {
      await page.goto('/');
      const nav = page.getByRole('navigation');
      await nav.getByRole('button', { name: 'Toggle menu' }).click();
      const link = nav.locator('a:visible', { hasText: new RegExp(`^${target.name}$`) });

      await expectLinkTargetToReturn200(page, link);
      await link.click();
      await expect(page).toHaveURL(new RegExp(`${target.path}/?$`));
    });
  }

  test('logo resolves with 200 and returns to the homepage', async ({ page }) => {
    await page.goto('/work');
    const logo = page.getByRole('navigation').getByRole('link', {
      name: 'Cyrus Khiabani',
      exact: true,
    });

    await expectLinkTargetToReturn200(page, logo);
    await logo.click();
    await expect.poll(() => new URL(page.url()).pathname).toBe('/');
  });
});
