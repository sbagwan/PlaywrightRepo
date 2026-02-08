// tests/simpleform.spec.js
const { test } = require('@playwright/test');
const { SimpleFormPage } = require('../Pages/SimpleFormPage');

test.describe('Simple Form Demo validation', () => {
  let simpleFormPage;

  test.beforeEach(async ({ page }) => {
    simpleFormPage = new SimpleFormPage(page);
    await simpleFormPage.open();
  });

  test('should display entered message correctly', async () => {
    const message = 'Welcome to TestMu AI';

    // Fill message and verify input
    await simpleFormPage.fillMessage(message);

    // Click the "Get Checked Value" button
    await simpleFormPage.clickGetCheckedValue();

    // Assert that the message is displayed correctly
    await simpleFormPage.assertMessage(message);
  });
});
