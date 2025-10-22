import test from '@playwright/test';

test.describe.configure({ mode: 'serial' });

test('runs in parallel 1', async ({ page }) => {});
test('runs in parallel 2', async ({ page }) => {});
