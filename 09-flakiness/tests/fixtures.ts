import { setTimeout } from 'node:timers/promises';
import { test as base, Page } from '@playwright/test';

export type MyFixtures = {
  chaos: () => Promise<void>;
};

export const test = base.extend<MyFixtures>({
  chaos: async ({ browserName, page }, use) => {
    await use(async () => {
      // 1
      if (browserName !== 'chromium') {
        test.skip();
      }

      // 2 CPU throttling
      const client = await page.context().newCDPSession(page);
      await client.send('Emulation.setCPUThrottlingRate', { rate: 4 });

      // 3 Slow XHR
      await page.route('**', async (route) => {
        if (route.request().resourceType() === 'xhr') {
          await setTimeout(1_000);
        }
        await route.continue();
      });
    });
  },
});

export { expect } from '@playwright/test';
