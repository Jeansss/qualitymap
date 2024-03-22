import { defineConfig, devices, expect } from '@playwright/test';
import playwrightApiMatchers from 'odottaa';

expect.extend(playwrightApiMatchers);

let testDir = './e2e/specs';

if (process.env.API) {
  testDir = './api/specs';
}

export default defineConfig({
  timeout: 60000,
  expect: { timeout: 10000 },
  testDir,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 3 : 2,
  workers: process.env.CI ? 4 : 4,
  reporter: 'html',
  use: {
    baseURL: 'https://demo.nopcommerce.com/',
    actionTimeout: 15000,
    navigationTimeout: 30000,
    extraHTTPHeaders: {
      Accept: 'application/json',
    },
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome']},
    },
    {
      name: 'mobileChrome',
      use: { ...devices['Pixel 4']},
    },
  ],
});
