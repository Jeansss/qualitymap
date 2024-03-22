import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { RegisterPage } from '../pages/register.page';
import { UserFactory } from '../factory/user.factory';
import cases from '../../data/e2e-scenarios.json';
import messages from '../../data/messages.json';

const alerts: JSONValue = messages;
let homePage: HomePage;
let registerPage: RegisterPage;
let user: UserFactory;


test.beforeEach(async ({ page }) => {
  await page.goto('/');
  homePage = new HomePage(page);
  registerPage = new RegisterPage(page);
  user = new UserFactory();
});

test('Register Consumer', async ({ page }) => {
  await homePage.navigateToRegister();
  await registerPage.registerUser(user);

  expect(await registerPage.registerElements.divSuccess().textContent()).toBe(alerts.success['registered']);
});

cases.register.forEach((item) => {
  test(`Register Consumer with ${item.scenario}`, async ({ page }) => {
    await (user as any)[`set${item.scenario.charAt(0).toUpperCase()}${item.scenario.slice(1)}`]();
    await homePage.navigateToRegister();
    await registerPage.registerUser(user);

    expect(await registerPage.registerElements.spanErrorMsg().first().textContent()).toBe(alerts.error[item.scenario]);
  });
});