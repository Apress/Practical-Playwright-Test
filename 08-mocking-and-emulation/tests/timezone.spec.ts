import { test, expect } from '@playwright/test';

test('Timezone', async ({ browser }) => {
  const func = () => new Date(1479579154987).toString();
  {
    const context = await browser.newContext({
      locale: 'en-US',
      timezoneId: 'America/Jamaica',
    });
    const page = await context.newPage();
    expect(await page.evaluate(func)).toBe(
      'Sat Nov 19 2016 13:12:34 GMT-0500 (Eastern Standard Time)',
    );
    await context.close();
  }
  {
    const context = await browser.newContext({
      locale: 'en-US',
      timezoneId: 'Pacific/Honolulu',
    });
    const page = await context.newPage();
    expect(await page.evaluate(func)).toBe(
      'Sat Nov 19 2016 08:12:34 GMT-1000 (Hawaii-Aleutian Standard Time)',
    );
    await context.close();
  }
  {
    const context = await browser.newContext({
      locale: 'en-US',
      timezoneId: 'America/Buenos_Aires',
    });
    const page = await context.newPage();
    expect(await page.evaluate(func)).toBe(
      'Sat Nov 19 2016 15:12:34 GMT-0300 (Argentina Standard Time)',
    );
    await context.close();
  }
  {
    const context = await browser.newContext({
      locale: 'en-US',
      timezoneId: 'Europe/Berlin',
    });
    const page = await context.newPage();
    expect(await page.evaluate(func)).toBe(
      'Sat Nov 19 2016 19:12:34 GMT+0100 (Central European Standard Time)',
    );
    await context.close();
  }
});
