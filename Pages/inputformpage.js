class InputFormPage {
  constructor(page) {
    this.page = page;

    // Navigation
    this.inputFormLink = page.getByText('Input Form Submit');

    // Form fields
    this.name = page.locator('input[name="name"]');
    this.email = page.locator('input[name="email"]');
    this.password = page.locator('input[name="password"]');
    this.company = page.locator('input[name="company"]');
    this.website = page.locator('input[name="website"]');
    this.country = page.locator('select[name="country"]');
    this.city = page.locator('input[name="city"]');
    this.address1 = page.locator('input[name="address_line1"]');
    this.address2 = page.locator('input[name="address_line2"]');
    this.state = page.locator('input[name="state"]');
    this.zip = page.locator('input[name="zip"]');

    // Actions
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.successMessage = page.locator('.success-msg');
  }

  async goto() {
    await this.page.goto('https://www.testmuai.com/selenium-playground/');
    await this.inputFormLink.click();
  }

  async submitEmptyForm() {
    await this.submitButton.click();
  }

  async fillForm(data) {
    await this.name.fill(data.name);
    await this.email.fill(data.email);
    await this.password.fill(data.password);
    await this.company.fill(data.company);
    await this.website.fill(data.website);
    await this.country.selectOption({ label: data.country });
    await this.city.fill(data.city);
    await this.address1.fill(data.address1);
    await this.address2.fill(data.address2);
    await this.state.fill(data.state);
    await this.zip.fill(data.zip);
  }

  async submit() {
    await this.submitButton.click();
  }
}

module.exports = { InputFormPage };
