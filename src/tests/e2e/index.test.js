import puppeteer from 'puppeteer';
import faker from 'faker';

const baseHost = process.env.REACT_APP_HOST;
const person = {
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password()
};
describe.only('H1 Text', () => {
  let browser; let page;
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
    });
    page = await browser.newPage();
    page.emulate({
      viewport: {
        width: 500,
        height: 900
      },
      userAgent: ''
    });
  });
  afterAll(async () => {
    browser.close();
  });
  test('h1 loads correctly', async () => {
    await page.goto(baseHost);
    await page.waitForSelector('h1');

    const html = await page.$eval('h1', e => e.innerHTML);
    expect(html).toBe('Home page');
  }, 16000);
  test('Registration successful', async () => {
    await page.goto(`${baseHost}/register`);
    await page.waitForSelector('#signupForm');

    await page.click('input[name=username]');
    await page.type('input[name=username]', person.username);
    await page.click('input[name=email]');
    await page.type('input[name=email]', person.email);
    await page.click('input[name=password]');
    await page.type('input[name=password]', person.password);
    await page.click('button[type=button]');
  }, 1000);
});
