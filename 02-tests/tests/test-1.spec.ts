import { test, expect } from '@playwright/test';

test('anoying overlay from anoying news site', async ({ page }) => {
  const overlay = page.getByTitle('Consent window');
  await page.addLocatorHandler(overlay, async () => {
    await overlay
      .contentFrame()
      .getByRole('button', { name: 'Accept all' })
      .click();
  });

  await page.goto('https://www.lefigaro.fr/');
  await expect(
    page.getByRole('link', { name: 'Accéder à Le Figaro' }),
  ).toBeVisible();
});

test('more radical way to remove it', async ({ page }) => {
  const overlay = page.getByTitle('Consent window');
  await page.addLocatorHandler(overlay, async () => {
    await overlay.evaluate((el) => el.remove());
  });

  await page.goto('https://www.lefigaro.fr/');
  await expect(
    page.getByRole('link', { name: 'Accéder à Le Figaro' }),
  ).toBeVisible();
});
