import { faker } from '@faker-js/faker/locale/fr';
import { expect, test } from '@playwright/test';

test('should create an account', async ({ page }) => {
  const dateBirth = faker.date.birthdate().toISOString().split('T')[0];

  await page.goto('https://practicesoftwaretesting.com/auth/register');

  await page.getByLabel('First name').fill(faker.person.firstName());
  await page.getByLabel('Last name').fill(faker.person.lastName());
  await page.getByLabel('Date of Birth').fill(dateBirth);
  await page.getByLabel('Street').fill(faker.location.streetAddress());
  await page.getByLabel('Postal Code').fill(faker.location.zipCode());
  await page.getByLabel('City').fill(faker.location.city());
  await page.getByLabel('Phone').fill(faker.phone.number());
  await page.getByLabel('Email').fill(faker.internet.email());
});

test.describe('reproducible tests', () => {
  // 3. Re-seed the faker instance to guarantee test independance.
  test.afterEach(() => {
    faker.seed();
  });

  test('Reuse value for assertion', async ({ page }) => {
    const firstName = faker.person.firstName();
    const welcomeLocator = page.locator('.something');

    await page.goto('/');
    await page.getByLabel('First name').fill(firstName);

    // ...

    // 2. Reuse the generated value
    await expect(welcomeLocator).toContainText(firstName);
  });

  test('Seed', async ({ page }) => {
    // 3. Seed our faker instance with some static number.
    faker.seed(123);
    await page.goto('https://practicesoftwaretesting.com/auth/register');

    const dateBirth = faker.date.birthdate().toISOString().split('T')[0];

    await page.getByLabel('First name').fill(faker.person.firstName());
    await page.getByLabel('Last name').fill(faker.person.lastName());
    await page.getByLabel('Date of Birth').fill(dateBirth);
    await page.getByLabel('Street').fill(faker.location.streetAddress());
    await page.getByLabel('Postal Code').fill(faker.location.zipCode());
    await page.getByLabel('City').fill(faker.location.city());
    await page.getByLabel('Phone').fill(faker.phone.number());
    await page.getByLabel('Email').fill(faker.internet.email());
  });
});
