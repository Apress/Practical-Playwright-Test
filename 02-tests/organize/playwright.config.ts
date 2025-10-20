import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',

  projects: [
    {
      name: 'checkout',
      testDir: './e2e/checkout',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'TV',
      use: {
        userAgent:
          'Mozilla/5.0 (SMART-TV; LINUX; Tizen 8.0) AppleWebKit/537.36 (KHTML, like Gecko) 108.0.5359.1/8.0 TV Safari/537.36',
        viewport: {
          width: 1920,
          height: 1080,
        },
        defaultBrowserType: 'chromium',
      },
      grepInvert: /@noTV/,
    },

    {
      name: 'mobile',
      use: { ...devices['Pixel 5'] },
      grep: /@mobile/,
    },
  ],
});
