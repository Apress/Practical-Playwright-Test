const { chromium, devices } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    slowMo: 1000,
  });
  const context = await browser.newContext({
    recordVideo: { dir: 'videos/' },
    ...devices['Pixel 5'],
  });
  const page = await context.newPage();

  await page.goto('http://playwright.dev');
  await page.click('text=Get started');
  await page.waitForTimeout(3000);

  await context.close();
  await browser.close();
})();
