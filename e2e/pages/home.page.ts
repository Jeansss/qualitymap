import { Page } from "@playwright/test";

class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  homeElements = {
    aRegister: () => this.page.locator("//a[contains(@href, 'register')]"),
  };

  async navigateToRegister() {
    await this.homeElements.aRegister().click();
  }
}

export { HomePage };