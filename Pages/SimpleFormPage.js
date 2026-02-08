// Pages/SimpleFormPage.js
const { expect } = require('@playwright/test');

class SimpleFormPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Navigation
    this.simpleFormLink = page.getByText('Simple Form Demo');

    // Single Input Field elements
    this.messageInput = page.getByPlaceholder('Please enter your Message');
    this.getCheckedValueButton = page.getByRole('button', { name: 'Get Checked Value' });

    // Result paragraph (dynamic)
    this.displayedMessage = page.locator("xpath=(//div[@id='user-message']/p)[1]");
 // directly points to the message paragraph
  }

  async open() {
    await this.page.goto('https://www.testmuai.com/selenium-playground/');
    await this.simpleFormLink.click();
  }

  async fillMessage(message) {
    await this.messageInput.fill(message);
    await expect(this.messageInput).toHaveValue(message);
  }

  async clickGetCheckedValue() {
    await this.getCheckedValueButton.click();
  }

  async assertMessage(message) {
    // Wait for paragraph to contain the expected message
    await expect(this.displayedMessage).toHaveText(message, { timeout: 5000 });
  }
}

module.exports = { SimpleFormPage };
