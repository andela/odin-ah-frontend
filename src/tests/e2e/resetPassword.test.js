import puppeteer from 'puppeteer';

const baseHost = process.env.REACT_APP_HOST;

const timeout = 120000;
describe('End-to-End for resetPassword  Page', () => {
  let browser;
  let page;
  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: true,
      slowMo: 50
    });
    page = await browser.newPage();
    page.emulate({
      viewport: {
        width: 1440,
        height: 810
      },
      userAgent: ''
    });
  });
  afterEach(async () => {
    browser.close();
  });
  test(
    'should send email to user',
    async () => {
      const realUser = {
        email: 'dummy-user@local.host'
      };
      await page.goto(`${baseHost}/reset-password`);
      await page.waitForSelector('#resetPasswordBtn');
      await page.click('#resetPasswordBtn');

      await page.waitForSelector('#sendEmailForm');
      await page.click('input[type=email]');
      await page.type('input[type=email]', realUser.email);

      await page.click('button[type=submit]');
      return null;
    },
    timeout
  );

  test(
    'should prompt error when provided with invalid credentials',
    async () => {
      const realUser = {
        email: 'dummy-user@local.host'
      };
      await page.goto(`${baseHost}/reset-password`);
      await page.waitForSelector('#resetPasswordBtn');
      await page.click('#resetPasswordBtn');

      await page.waitForSelector('#sendEmailForm');
      await page.click('input[type=email]');
      await page.type('input[type=email]', realUser.email);

      await page.waitForSelector('.alert');
      const html = await page.$eval('.alert > p', e => e.innerHTML);
      expect(html).not.toBeNull();
      return null;
    },
    timeout
  );
});
