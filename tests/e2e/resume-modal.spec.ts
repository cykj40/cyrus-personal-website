import { expect, test, type Page } from '@playwright/test';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

async function openResume(page: Page) {
  await page.goto('/hire-me');
  const trigger = page.getByRole('button', { name: 'View my resume', exact: true });
  await expect(trigger).toBeVisible();
  await trigger.click();

  const dialog = page.getByRole('dialog', { name: 'Cyrus Khiabani' });
  await expect(dialog).toBeVisible();
  return { dialog, trigger };
}

test.describe('resume modal', () => {
  test('opens and traps focus through all 14 controls in both directions', async ({ page }) => {
    const { dialog } = await openResume(page);
    const focusable = dialog.locator(FOCUSABLE_SELECTOR);

    await expect(focusable).toHaveCount(14);
    await expect(focusable.first()).toBeFocused();

    for (let step = 1; step <= 14; step += 1) {
      await page.keyboard.press('Tab');
      await expect(focusable.nth(step % 14)).toBeFocused();
      expect(await dialog.evaluate((node) => node.contains(document.activeElement))).toBe(true);
    }

    for (let step = 1; step <= 14; step += 1) {
      await page.keyboard.press('Shift+Tab');
      await expect(focusable.nth((14 - step) % 14)).toBeFocused();
      expect(await dialog.evaluate((node) => node.contains(document.activeElement))).toBe(true);
    }
  });

  test('Escape closes the modal and returns focus to the trigger', async ({ page }) => {
    const { dialog, trigger } = await openResume(page);

    await page.keyboard.press('Escape');

    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test('overlay click closes the modal and returns focus to the trigger', async ({ page }) => {
    const { dialog, trigger } = await openResume(page);
    const overlay = dialog.locator('..').locator('[aria-hidden="true"]');

    await overlay.click({ position: { x: 5, y: 5 } });

    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test('close button closes the modal and returns focus to the trigger', async ({ page }) => {
    const { dialog, trigger } = await openResume(page);

    await dialog.getByRole('button', { name: 'Close resume' }).click();

    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test('modal PDF download resolves to a real PDF with HTTP 200', async ({ page }) => {
    const { dialog } = await openResume(page);
    const download = dialog.getByRole('link', { name: 'Download PDF', exact: true });
    const href = await download.getAttribute('href');

    expect(href).toBeTruthy();
    const response = await page.request.get(href!);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/pdf');
    expect((await response.body()).subarray(0, 4).toString()).toBe('%PDF');
  });
});
