import { v4 as uuidv4 } from 'uuid';
import { test, expect } from './fixtures';
// import { test, expect } from '@playwright/test';

function getBackendURL() {
  const userId = uuidv4();
  return `http://localhost:3000/${userId}/todo`;
}

test('flaky TODO', async ({ page, chaos }) => {
  await chaos();

  const backendURL = getBackendURL();
  await page.goto(
    `https://todobackend.com/client/index.html?${backendURL}`,
  );

  const inputLocator = page.getByRole('textbox', {
    name: 'What needs to be done?',
  });
  await inputLocator.fill('tomatoes');
  await inputLocator.press('Enter');
  await page.reload();

  await expect(page.getByText('tomatoes')).toBeVisible();
});

test('flaky TODO fixed', async ({ page, chaos }) => {
  await chaos();

  const backendURL = getBackendURL();
  await page.goto(
    `https://todobackend.com/client/index.html?${backendURL}`,
  );

  const inputLocator = page.getByRole('textbox', {
    name: 'What needs to be done?',
  });
  await inputLocator.fill('tomatoes');
  const responsePromise = page.waitForResponse(
    (response) =>
      response.url() === backendURL &&
      response.request().method() === 'POST',
  );
  await inputLocator.press('Enter');
  // Wait for POST
  await responsePromise;
  await page.reload();

  await expect(page.getByText('tomatoes')).toBeVisible();
});

test('flaky TODO fixed - Promise.all', async ({ page, chaos }) => {
  await chaos();

  const backendURL = getBackendURL();
  await page.goto(
    `https://todobackend.com/client/index.html?${backendURL}`,
  );

  const inputLocator = page.getByRole('textbox', {
    name: 'What needs to be done?',
  });
  await inputLocator.fill('tomatoes');

  await Promise.all([
    inputLocator.press('Enter'),
    page.waitForResponse(
      (response) =>
        response.url() === backendURL &&
        response.request().method() === 'POST',
    ),
  ]);
  await page.reload();

  await expect(page.getByText('tomatoes')).toBeVisible();
});
