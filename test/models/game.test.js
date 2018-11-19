const Game = require('../../models/game.js');
const Users = require('../../models/users.js');
const Messages = require('../../models/messages.js');
jest.mock('../../models/users.js')
jest.mock('../../models/messages.js')

describe('Game', () => {

  let game;

  beforeEach(() => {
    Users.mockClear();
    Messages.mockClear();
    game = new Game(Users, Messages);
  })

  it('On initialising Game, a users instances variable should be created', () => {
    expect(Users).toHaveBeenCalledTimes(1);
    expect(game.users).toBeDefined;
  })

  it('On initialising Game, a messages instances variable should be created', () => {
    expect(Messages).toHaveBeenCalledTimes(1);
    expect(game.messages).toBeDefined;
  })

  it('On initialising Game, open should be set to true', () => {
    expect(game.isOpen).toBe(true);
  })

  describe('close', () => {
    it('sets isOpen to false', () => {
      game.close();
      expect(game.isOpen).toBe(false);
    })
  })

  describe('open', () => {
    it('sets isOpen to true', () => {
      game.open();
      expect(game.isOpen).toBe(true);
    })
    it('delets all messages', () => {
      game.open();
      expect(game.messages.deleteAllMessages).toBeCalled();
    })
  })

})
