import { test, expect } from '@playwright/test';

test.describe('API', () => {
  test('basic GET', async ({ request }) => {
    const response = await request.get('https://dummyjson.com/quotes/1');

    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.id).toBe(1);
    expect(data.quote).toBe(
      'Your heart is the size of an ocean. Go find yourself in its hidden depths.',
    );
    expect(data.author).toBe('Rumi');
  });

  test('toMatchObject', async ({ request }) => {
    const response = await request.get('https://dummyjson.com/quotes/1');

    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data).toMatchObject({
      quote:
        'Your heart is the size of an ocean. Go find yourself in its hidden depths.',
      author: 'Rumi',
    });
  });

  test('toMatchObject with asymmetric matchers', async ({ request }) => {
    const response = await request.get(
      'https://dummyjson.com/quotes/random',
    );

    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data).toMatchObject({
      id: expect.any(Number),
      quote: expect.any(String),
      author: expect.any(String),
    });
  });
});
