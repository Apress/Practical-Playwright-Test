import { expect, type Page } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async fill() {
    await this.page
      .getByPlaceholder('email@example.com')
      .fill('user@example.com');
    await this.page.getByPlaceholder('Full name').fill('John Doe');
    await this.page
      .getByRole('button', { name: 'Enter address manually' })
      .click();
    await this.page.getByPlaceholder('Address line 1').fill('adress');
    await this.page.getByPlaceholder('Postal code').fill('10000');
    await this.page.getByPlaceholder('City').fill('City');
    await this.page
      .getByPlaceholder('1234 1234 1234')
      .fill('4242 4242 4242 4242');
    await this.page.getByPlaceholder('MM / YY').fill('01 / 28');
    await this.page.getByPlaceholder('CVC').fill('123');
  }

  async submit() {
    await this.page.getByTestId('hosted-payment-submit-button').click();
    await expect(this.page.getByTestId('submit-button-success')).toBeVisible();
  }
}
