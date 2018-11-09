import puppeteer from 'puppeteer';
import faker from 'faker';

const baseHost = process.env.REACT_APP_HOST;
const user = {
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password()
};
const timeout = 12000;
describe.only('End-to-End for Signup Page', () => {
  let browser;
  let page;
  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: true,
      // slowMo: 50,
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
  test('should sign up user', async () => {
    const realUser = {
      ...user,
      username: 'dummyUser'
    };
    await page.goto(baseHost);
    await page.waitForSelector('#signupBtn');
    await page.click('#signupBtn');

    await page.waitForSelector('#signupForm');
    await page.click('input[name=username]');
    await page.type('input[name=username]', realUser.username);
    await page.click('input[name=email]');
    await page.type('input[name=email]', realUser.email);
    await page.click('input[name=password]');
    await page.type('input[name=password]', realUser.password);
    await page.click('input[name=confirmPassword]');
    await page.type('input[name=confirmPassword]', realUser.password);
    await page.click('button[type=submit]');
    await page.waitForSelector('.alert');
    const html = await page.$eval('.alert > p', e => e.innerHTML);
    expect(html)
      .not
      .toBeNull();
    return null;
  }, timeout);

  test('should not sign up user when there is a validation error', async () => {
    const realUser = {
      ...user,
      username: 'dummyUser****'
    };
    await page.goto(baseHost);
    await page.waitForSelector('#signupBtn');
    await page.click('#signupBtn');

    await page.waitForSelector('#signupForm');
    await page.click('input[name=username]');
    await page.type('input[name=username]', realUser.username);
    await page.click('input[name=email]');
    await page.type('input[name=email]', realUser.email);
    await page.click('input[name=password]');
    await page.type('input[name=password]', realUser.password);
    await page.click('input[name=confirmPassword]');
    await page.type('input[name=confirmPassword]', realUser.password);
    await page.click('button[type=submit]');
    await page.waitForSelector('.error-js');
    const html = await page.$eval('.error-js', e => e.innerHTML);
    expect(html)
      .not
      .toBeNull();
    return null;
  }, timeout);

  test('should display error when invalid username is provided', async () => {
    await page.goto(baseHost);
    await page.waitForSelector('#signupBtn');
    await page.click('#signupBtn');
    // wait for the signup form to be loaded
    await page.waitForSelector('#signupForm');
    await page.click('input[name=username]');
    await page.type('input[name=username]', 'de');
    // click another input field to remove focus from username input field
    await page.click('input[name=email]');

    await page.waitForSelector('.error-js');
    let html = await page.$eval('.error-js', e => e.innerHTML);
    expect(html)
      .toBe('Username must be at least 4 characters');

    // triple click the input field to select all the text
    await page.click('input[name=username]', { clickCount: 3 });

    await page.type('input[name=username]', 'invalid username');
    await page.click('input[name=email]');
    await page.waitForSelector('.error-js');
    html = await page.$eval('.error-js', e => e.innerHTML);

    expect(html)
      .toBe('Username must be alphanumeric');
    return null;
  }, timeout);

  test('should display error when invalid email is provided', async () => {
    await page.goto(baseHost);
    await page.waitForSelector('#signupBtn');
    await page.click('#signupBtn');

    await page.waitForSelector('#signupForm');
    await page.click('input[name=email]');
    await page.type('input[name=email]', 'invalid email');
    await page.click('input[name=username]');

    await page.waitForSelector('.error-js');
    const html = await page.$eval('.error-js', e => e.innerHTML);
    expect(html)
      .toBe('Email provided is not valid');
    return null;
  }, timeout);

  test('should display error when invalid password is provided', async () => {
    await page.goto(baseHost);
    await page.waitForSelector('#signupBtn');
    await page.click('#signupBtn');

    await page.waitForSelector('#signupForm');
    await page.click('input[name=password]');
    await page.type('input[name=password]', 'weak');
    await page.click('input[name=username]');

    await page.waitForSelector('.error-js');
    const html = await page.$eval('.error-js', e => e.innerHTML);
    expect(html)
      .toBe('Password must be at least 8 characters');
  }, timeout);

  test('should display error when confirm password does not match the password provided', async () => {
    await page.goto(baseHost);
    await page.waitForSelector('#signupBtn');
    await page.click('#signupBtn');

    await page.waitForSelector('#signupForm');
    await page.click('input[name=password]');
    await page.type('input[name=password]', user.password);
    await page.click('input[name=confirmPassword]');
    await page.type('input[name=confirmPassword]', 'very strong password');
    await page.click('input[name=username]');

    await page.waitForSelector('.error-js');
    const html = await page.$eval('.error-js', e => e.innerHTML);
    expect(html)
      .toBe('Confirm password is not equal to password');
  }, timeout);
});
