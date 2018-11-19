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


    test('shows message when signing up with real name taken', async () => {
      await page.waitForSelector('.Form');
      await page.click('input[name=fakeName]');
      await page.type('input[name=fakeName]', 'unicorn2a');
      await page.click('input[name=realName]');
      await page.type('input[name=realName]', 'Vu2');
      await page.click('button[type=submit]');
      await page.waitForSelector('.signupError');
      const html = await page.$eval('.signupError', e => e.innerHTML);
      expect(html).toBe('This real name is already taken. Maybe add your last name?');
    })

    test('shows error message when fake and realname equal', async () => {
      await page.waitForSelector('.Form');
      await page.click('input[name=fakeName]');
      await page.type('input[name=fakeName]', 'unicorn5');
      await page.click('input[name=realName]');
      await page.type('input[name=realName]', 'unicorn5');
      await page.click('button[type=submit]');
      await page.waitForSelector('.signupError');
      const html = await page.$eval('.signupError', e => e.innerHTML);
      expect(html).toBe("Your fake name can't be your real name");
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
      await page.click('.submitMsg');
      const html = await page.$eval('.DisplayedMessages', e => e.innerHTML);
      expect(html).toEqual(expect.stringContaining('test message'));
    });
  });

  describe('Guessing', () => {
    test('correct guess', async () => {
      // Needs to be changed after we reset the server for each test
      await page.waitForSelector('.Form');
      await page.click('input[name=fakeName]');
      await page.type('input[name=fakeName]', 'unicorn6');
      await page.click('input[name=realName]');
      await page.type('input[name=realName]', 'Vu6');
      await page.click('button[type=submit]');
      await page.waitForSelector('.guessing');
      await page.waitForSelector('.guessForm');
      await page.click('input[name=guessFakeName]');
      await page.type('input[name=guessFakeName]', 'unicorn1');
      await page.click('input[name=guessRealName]');
      await page.type('input[name=guessRealName]', 'Vu1');
      await page.click('.submitGuess');
      await page.waitForSelector('.outcome');
      const html = await page.$eval('.outcome', e => e.innerHTML);
      expect(html).toEqual(expect.stringContaining('You guessed correctly!'));
    });

    test('Incorrect guess', async () => {
      // Needs to be changed after we reset the server for each test
      await page.waitForSelector('.Form');
      await page.click('input[name=fakeName]');
      await page.type('input[name=fakeName]', 'unicorn7');
      await page.click('input[name=realName]');
      await page.type('input[name=realName]', 'Vu7');
      await page.click('button[type=submit]');
      await page.waitForSelector('.guessing');
      await page.waitForSelector('.guessForm');
      await page.click('input[name=guessFakeName]');
      await page.type('input[name=guessFakeName]', 'unicorn1');
      await page.click('input[name=guessRealName]');
      await page.type('input[name=guessRealName]', 'Wrong guess');
      await page.click('.submitGuess');
      await page.waitForSelector('.outcome');
      const html = await page.$eval('.outcome', e => e.innerHTML);
      expect(html).toEqual(expect.stringContaining('Sorry, not this time!'));
    });
  });

  describe('Start game', () => {
    test('fake and real names are displayed', async () => {
      // Needs to be changed after we reset the server for each test
      await page.waitForSelector('.Form');
      await page.click('input[name=fakeName]');
      await page.type('input[name=fakeName]', 'unicorn4');
      await page.click('input[name=realName]');
      await page.type('input[name=realName]', 'Vu4');
      await page.click('button[type=submit]');
      await page.waitForSelector('.startGame');
      await page.click('.startGame');
      await page.waitForSelector('.allRealNames');
      const htmlRealNames = await page.$eval('.allRealNames', e => e.innerHTML)
      expect(htmlRealNames).toEqual(expect.stringContaining('Vu4'));
      const htmlFakeNames = await page.$eval('.allFakeNames', e => e.innerHTML);
      expect(htmlFakeNames).toEqual(expect.stringContaining('unicorn4'));
    });

    test('Cannot join if the game has started', async () => {
      await page.waitForSelector('.Form');
      await page.click('input[name=fakeName]');
      await page.type('input[name=fakeName]', 'unicorn9');
      await page.click('input[name=realName]');
      await page.type('input[name=realName]', 'Vu9');
      await page.click('button[type=submit]');
      await page.waitForSelector('.signupError');
      console.log('signupError shows');
      const html = await page.$eval('.signupError', e => e.innerHTML);
      expect(html).toEqual(expect.stringContaining('Sorry, you cannot join, the game has started.'));
    })

  });

});
