import { expect, test, type Page } from '@playwright/test';

const hireMeQuestions = [
  'What has Cyrus shipped in production?',
  'How does he work with AI coding agents?',
  "Walk me through T1Copilot's architecture.",
  'Is Cyrus open to full-time roles?',
] as const;

const servicesQuestions = [
  'What does a custom MCP server cost?',
  'How does the Automation Audit work?',
  "What's included in ongoing support?",
  'Can you build a RAG chatbot for us?',
] as const;

async function mockChatApi(page: Page) {
  let requestCount = 0;
  await page.route('**/api/chat', async (route) => {
    requestCount += 1;
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ message: 'Mocked chatbot response.', sources: [] }),
    });
  });
  return () => requestCount;
}

async function openChat(page: Page) {
  await page.getByRole('button', { name: /Ask me about Cyrus.*open chat assistant/ }).click();
  const panel = page.getByRole('dialog', { name: "Chat with Cyrus's AI Assistant" });
  await expect(panel).toBeVisible();
  return panel;
}

test.describe('chatbot widget', () => {
  test('opens on /hire-me and shows the hire-me suggestions', async ({ page }) => {
    const getRequestCount = await mockChatApi(page);
    await page.goto('/hire-me');
    const panel = await openChat(page);

    for (const question of hireMeQuestions) {
      await expect(panel.getByRole('button', { name: question, exact: true })).toBeVisible();
    }
    for (const question of servicesQuestions) {
      await expect(panel.getByRole('button', { name: question, exact: true })).toHaveCount(0);
    }
    expect(getRequestCount()).toBe(0);
  });

  test('shows the services suggestions and sends through the mocked API only', async ({ page }) => {
    const getRequestCount = await mockChatApi(page);
    await page.goto('/services');
    const panel = await openChat(page);

    for (const question of servicesQuestions) {
      await expect(panel.getByRole('button', { name: question, exact: true })).toBeVisible();
    }
    for (const question of hireMeQuestions) {
      await expect(panel.getByRole('button', { name: question, exact: true })).toHaveCount(0);
    }

    await panel.getByRole('button', { name: servicesQuestions[0], exact: true }).click();
    await expect(panel.getByText('Mocked chatbot response.')).toBeVisible();
    expect(getRequestCount()).toBe(1);
  });
});
