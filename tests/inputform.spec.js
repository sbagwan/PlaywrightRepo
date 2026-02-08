const { test } = require('../lambdatest-setup');
const { expect } = require('@playwright/test');

test('Input Form validation', async ({ page }) => {
  // Open Selenium Playground
  await page.goto('https://www.testmuai.com/selenium-playground/');

  // Navigate to Input Form page
  await page.getByText('Input Form Submit').click();

  // Scope to the correct form using visible heading
  const form = page
    .getByRole('heading', { name: 'Input form validations' })
    .locator('..')
    .locator('form');

  // Submit empty form
  const submitButton = form.getByRole('button', { name: 'Submit' });
  await submitButton.click();

  // Validate required attribute
  const nameInput = form.getByRole('textbox', { name: 'Name', exact: true });
  await expect(nameInput).toHaveAttribute('required', '');

  // Fill form fields (strict-mode safe locators)
  await nameInput.fill('John Doe');
  await form.getByRole('textbox', { name: 'Email*', exact: true }).fill('john@example.com');
  await form.getByRole('textbox', { name: 'Password*', exact: true }).fill('Password123');
  await form.getByRole('textbox', { name: 'Company', exact: true }).fill('TestMu');
  await form.getByRole('textbox', { name: 'Website', exact: true }).fill('https://testmuai.com');

  await form.getByRole('combobox').selectOption({ label: 'United States' });

  await form.getByRole('textbox', { name: 'City', exact: true }).fill('New York');
  await form.getByPlaceholder('Address 1').fill('123 Main St');
  await form.getByPlaceholder('Address 2').fill('Apt 1');
  await form.getByPlaceholder('State').fill('NY');
  await form.getByPlaceholder('Zip code').fill('10001');

  // Submit filled form
  await submitButton.click();

  // Assert success message
  await expect(page.locator('.success-msg')).toHaveText(
    'Thanks for contacting us, we will get back to you shortly.'
  );
});
