import { Page, expect } from "@playwright/test";

class RegisterPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  registerElements = {
    inptGender: () => this.page.locator("//*[@id='gender']//input"),
    inptFirstName: () => this.page.locator("//*[@id='FirstName']"),
    inptLastName: () => this.page.locator("//*[@id='LastName']"),
    inptDayOfBirth: () => this.page.locator("//select[contains(@name, 'Day')]"),
    inptMonthOfBirth: () => this.page.locator("//select[contains(@name, 'Month')]"),
    inptYearOfBirth: () => this.page.locator("//select[contains(@name, 'Year')]"),
    inptEmail: () => this.page.locator("//*[@id='Email']"),
    inptCompany: () => this.page.locator("//*[@id='Company']"),
    inptPassword: () => this.page.locator("//*[@id='Password']"),
    ConfirmPassword: () => this.page.locator("//*[@id='ConfirmPassword']"),
    btnRegister: () => this.page.locator("//*[@id='register-button']"),
    divSuccess: () => this.page.locator("//div[contains(@class, 'page-body')]//div[contains(@class, 'result')]"),
    spanErrorMsg: () => this.page.locator("//span[contains(@class, 'field-validation-error')]"),
  };

  async registerUser(user: User) {
    await this.registerElements.inptGender().first().check();
    await this.registerElements.inptFirstName().fill(user.firstName);
    await this.registerElements.inptLastName().fill(user.lastName);
    await this.registerElements.inptDayOfBirth().selectOption({ value: user.dayOfBirth });
    await this.registerElements.inptMonthOfBirth().selectOption({ value: user.monthOfBirth });
    await this.registerElements.inptYearOfBirth().selectOption({ value: user.yearOfBirth });

    //validando se a data foi preenchida corretamente (conforme solicitado no desafio)
    const date = await this.formatDate(user.dayOfBirth, user.monthOfBirth, user.yearOfBirth);
    const filledDate = await this.formatDate(await this.registerElements.inptDayOfBirth().inputValue(),
      await this.registerElements.inptMonthOfBirth().inputValue(),
      await this.registerElements.inptYearOfBirth().inputValue());

    expect(date).toBe(filledDate);

    await this.registerElements.inptEmail().fill(user.email);
    await this.registerElements.inptCompany().fill(user.company);
    await this.registerElements.inptPassword().fill(user.password);
    await this.registerElements.ConfirmPassword().fill(user.confirmPassword);
    await this.registerElements.btnRegister().click();
  }

  private async formatDate(day: string, month: string, year: string) {
    return day + '/' + month + '/' + year;
  }
}

export { RegisterPage };
