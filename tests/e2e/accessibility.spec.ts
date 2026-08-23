import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const majorRoutes = ['/', '/work', '/services', '/hire-me'] as const;

for (const route of majorRoutes) {
  test(`${route} has no serious or critical axe violations`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator('main')).toBeVisible();
    await page.evaluate(() => document.fonts.ready.then(() => undefined));

    const results = await new AxeBuilder({ page }).analyze();
    const violations = results.violations.filter(
      (violation) => violation.impact === 'serious' || violation.impact === 'critical'
    );
    const summary = violations.map((violation) => ({
      id: violation.id,
      impact: violation.impact,
      description: violation.description,
      targets: violation.nodes.flatMap((node) => node.target),
    }));

    expect(summary, JSON.stringify(summary, null, 2)).toEqual([]);
  });
}
