import puppeteer from 'puppeteer';
import faker from 'faker';

const baseHost = process.env.REACT_APP_HOST;
const user = {
  email: faker.internet.email(),
  password: faker.internet.password()
};
const timeout = 12000;
describe('End-to-End for Log in Page', () => {
  let browser;
  let page;
  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: true,
      // slowMo: 50
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
    'should log in user',
    async () => {
      const realUser = {
        password: 'password',
        email: 'dummy-user@local.host'
      };
      await page.goto(`${baseHost}/?login`);

      await page.waitForSelector('#loginForm');
      await page.click('input[name=email]');
      await page.type('input[name=email]', realUser.email);
      await page.click('input[name=password]');
      await page.type('input[name=password]', realUser.password);
      await page.click('button[type=submit]');
      return null;
    },
    timeout
  );

  test(
    'should not log in user when provided with invalid credentials',
    async () => {
      const realUser = {
        password: 'invalid password',
        email: 'dummy-user@local.host'
      };
      await page.goto(`${baseHost}/?login`);

      await page.waitForSelector('#loginForm');
      await page.click('input[name=email]');
      await page.type('input[name=email]', realUser.email);
      await page.click('input[name=password]');
      await page.type('input[name=password]', realUser.password);
      await page.click('button[type=submit]');

      await page.waitForSelector('.alert');
      const html = await page.$eval('.alert > p', e => e.innerHTML);
      expect(html).not.toBeNull();
      return null;
    },
    timeout
  );

  test(
    'should display error when invalid email is provided',
    async () => {
      const realUser = {
        ...user,
        email: 'test@mail>>>>>>>>>'
      };
      await page.goto(`${baseHost}/?login`);

      await page.waitForSelector('#loginForm');
      await page.click('input[name=email]');
      await page.type('input[name=email]', realUser.email);
      await page.click('input[name=password]');
      await page.type('input[name=password]', realUser.password);
      await page.click('button[type=submit]');
      await page.waitForSelector('.error-js');
      const html = await page.$eval('.error-js', e => e.innerHTML);
      expect(html).not.toBeNull();
      return null;
    },
    timeout
  );

  test(
    'should display error when invalid password is provided',
    async () => {
      await page.goto(`${baseHost}/?login`);

      await page.waitForSelector('#loginForm');
      await page.click('input[name=email]');
      await page.type('input[name=email]', user.email);
      await page.click('input[name=password]');
      await page.type('input[name=password]', '');
      await page.click('button[type=submit]');
      await page.waitForSelector('.error-js');
      const html = await page.$eval('.error-js', e => e.innerHTML);
      expect(html).toBe('This field is required');
      return null;
    },
    timeout
  );
});
