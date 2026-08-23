import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const majorRoutes = ['/', '/work', '/services', '/hire-me'] as const;

for (const route of majorRoutes) {
  test(`${route} has no serious or critical axe violations`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator('main')).toBeVisible();
    await page.evaluate(() => document.fonts.ready.then(() => undefined));

    // Axe can otherwise sample Framer Motion's temporary partial opacity and
    // report contrast failures that disappear at the animation's final state.
    // Disable motion and let pending frames settle before evaluating colors.
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-duration: 0s !important;
          transition-duration: 0s !important;
          scroll-behavior: auto !important;
        }
      `,
    });
    await page.evaluate(async () => {
      document.getAnimations().forEach((animation) => animation.finish());
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
      );
    });

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
