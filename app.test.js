const puppeteer = require('puppeteer');

let browser, page;

beforeEach(async (done) => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto('http://localhost:3001/');
  done();
});

afterEach(() => {
  browser.close();
})

describe("Guess Vu", () => {
  test('loads h1 with Guess Vu', async () => {
    await page.waitForSelector('.App');
    const html = await page.$eval('.App-title', e => e.innerHTML);
    expect(html).toBe('Guess Vu!');
  });
  test('form works', async () => {
    await page.waitForSelector('.Form');
    await page.click("input[name=fakeName]");
    await page.type("input[name=fakeName]", "unicorn42");
    await page.click("button[type=submit]");
  })
  test('redirects to chatroom after signup', async () => {
    await page.waitForSelector('.Form');
    await page.click("input[name=fakeName]");
    await page.type("input[name=fakeName]", "unicorn42");
    await page.click("button[type=submit]");
    await page.waitForSelector('.ChatRoom');
    const html = await page.$eval('.ChatRoom-title', e => e.innerHTML);
    expect(html).toEqual(expect.stringContaining('Welcome'));
  })

  test('redirects to chatroom after signup', async () => {
    await page.waitForSelector('.Form');
    await page.click("input[name=fakeName]");
    await page.type("input[name=fakeName]", "unicorn42");
    await page.click("button[type=submit]");
    await page.waitForSelector('.ChatRoom');
    const html = await page.$eval('.ChatRoom-title', e => e.innerHTML);
    expect(html).toBe('Welcome unicorn42');
  })
})
