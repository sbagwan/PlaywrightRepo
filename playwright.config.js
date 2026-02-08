const { defineConfig, devices } = require('@playwright/test');
require('dotenv').config();

// Pull LambdaTest credentials from secrets
const LT_USERNAME = process.env.LT_USERNAME;
const LT_ACCESS_KEY = process.env.LT_ACCESS_KEY;
const BASE_URL = process.env.BASE_URL || 'https://www.testmuai.com/selenium-playground/';

if (!LT_USERNAME || !LT_ACCESS_KEY) {
  console.warn('⚠️ LT_USERNAME or LT_ACCESS_KEY not set. Tests may fail on cloud.');
}

module.exports = defineConfig({
  testDir: './tests',
  timeout: 120000,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    video: 'on',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'Win10_Chrome_latest',
      use: {
        browserName: 'chromium',
        platform: process.env.HYPEREXECUTE_PLATFORM_WIN || 'Windows 10',
        channel: 'chrome',
        baseURL: BASE_URL,
        // HyperExecute cloud credentials
        connectOptions: {
          wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify({
            browserName: 'chrome',
            browserVersion: 'latest',
            platform: 'Windows 10',
            LT: {
              username: LT_USERNAME,
              accessKey: LT_ACCESS_KEY
            }
          }))}`
        }
      },
    },
    {
      name: 'Linux_Firefox_latest',
      use: {
        browserName: 'firefox',
        platform: process.env.HYPEREXECUTE_PLATFORM_LINUX || 'Linux',
        baseURL: BASE_URL,
        connectOptions: {
          wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify({
            browserName: 'firefox',
            browserVersion: 'latest',
            platform: 'Linux',
            LT: {
              username: LT_USERNAME,
              accessKey: LT_ACCESS_KEY
            }
          }))}`
        }
      },
    },
  ],
});
