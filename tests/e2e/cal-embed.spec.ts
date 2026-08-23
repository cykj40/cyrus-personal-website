import { expect, test } from '@playwright/test';

test('Cal.com Project Call embed loads without creating a booking', async ({ page }) => {
  test.setTimeout(60_000);
  await page.goto('/services');

  const embed = page.locator('#my-cal-inline-project-call');
  await expect(embed).toBeVisible();
  await expect(page.locator('script[data-portfolio-cal="true"]')).toHaveAttribute(
    'src',
    'https://app.cal.com/embed/embed.js'
  );

  const iframe = embed.locator('iframe');
  await expect(iframe).toBeVisible({ timeout: 45_000 });
  await expect(iframe).toHaveAttribute('src', /cal\.com\/.*project-call/);

  const calFrame = page.frames().find((frame) => /cal\.com\/.*project-call/.test(frame.url()));
  expect(calFrame, 'expected the Project Call iframe to finish navigating').toBeTruthy();
  await expect(calFrame!.locator('body')).toBeVisible();

  // Deliberately stop at rendered embed content. Never select a date/time or submit a booking.
});
