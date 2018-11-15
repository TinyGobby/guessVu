const puppeteer = require('puppeteer');

let browser, page;

beforeEach(async done => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto('http://localhost:3001/');
  done();
});

afterEach(() => {
  browser.close();
});

describe('Guess Vu', () => {
  describe('Homepage', () => {
    test('loads h1 with Guess Vu', async () => {
      const html = await page.$eval('.App-title', e => e.innerHTML);
      expect(html).toBe('Guess Vu!');
    });
  });

  describe('Name form', () => {
    test('redirects to chatroom after signup', async () => {
      await page.waitForSelector('.Form');
      await page.click('input[name=fakeName]');
      await page.type('input[name=fakeName]', 'unicorn1');
      await page.click('input[name=realName]');
      await page.type('input[name=realName]', 'Vu1');
      await page.click('button[type=submit]');
      await page.waitForSelector('.ChatRoom');

      const html = await page.$eval('.ChatRoom-title', e => e.innerHTML);
      expect(html).toEqual(expect.stringContaining('Welcome'));
    });

    test('redirects to chatroom after signup and greets with name', async () => {
      await page.waitForSelector('.Form');
      await page.click('input[name=fakeName]');
      await page.type('input[name=fakeName]', 'unicorn2');
      await page.click('input[name=realName]');
      await page.type('input[name=realName]', 'Vu2');
      await page.click('button[type=submit]');
      await page.waitForSelector('.ChatRoom');
      const html = await page.$eval('.ChatRoom-title', e => e.innerHTML);
      expect(html).toBe('Welcome unicorn2');
    });
  });

  describe('Chatroom messages input', () => {
    test('messages are displayed once sent', async () => {
      await page.waitForSelector('.Form');
      await page.click('input[name=fakeName]');
      await page.type('input[name=fakeName]', 'unicorn3');
      await page.click('input[name=realName]');
      await page.type('input[name=realName]', 'Vu3');
      await page.click('button[type=submit]');
      await page.waitForSelector('.MessageForm');
      await page.click('input[name=message]');
      await page.type('input[name=message]', 'test message');
      await page.click('button[type=submit]');
      const html = await page.$eval('.DisplayedMessages', e => e.innerHTML);
      expect(html).toEqual(expect.stringContaining('test message'));
    });
  });

  describe('Real names shown', () => {
    test('names are displayed', async () => {
      // Needs to be changed after we reset the server for each test
      await page.waitForSelector('.Form');
      await page.click('input[name=fakeName]');
      await page.type('input[name=fakeName]', 'unicorn4');
      await page.click('input[name=realName]');
      await page.type('input[name=realName]', 'Vu4');
      await page.click('button[type=submit]');
      await page.waitForSelector('.allRealNames');
      const html = await page.$eval('.allRealNames', e => e.innerHTML);
      expect(html).toEqual(expect.stringContaining('Vu1')); // Already logged in
    });
  });
});
