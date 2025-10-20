import test from '@playwright/test';

test('context request', async ({ page }) => {
  await page.request.post('https://dummyjson.com/auth/login', {
    data: {
      username: 'emilys',
      password: 'emilyspass',
    },
  });

  const res = await page.request.get('https://dummyjson.com/auth/me');
  const data = await res.json();

  console.log(data.firstName, data.lastName);
});
