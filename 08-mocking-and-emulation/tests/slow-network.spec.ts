import { setTimeout } from 'node:timers/promises';
import { test, expect } from '@playwright/test';

test('slow network', async ({ page }) => {
  // 1
  await page.route('**/api/v1/*', async (route) => {
    // 2
    await setTimeout(1_000);
    // 3
    await route.continue();
  });

  await page.goto(
    'https://todobackend.com/client/index.html?https://csharp-todo-backend.azurewebsites.net/api/v1/todo',
  );
  await page
    .getByRole('textbox', { name: 'What needs to be done?' })
    .fill('tomatoes');
  await page
    .getByRole('textbox', { name: 'What needs to be done?' })
    .press('Enter');
  await page.reload();
  await expect(page.getByText('tomatoes')).toBeVisible();
});
