const Messages = require('../../models/messages');

describe('Messages', () => {
  let messages;

  beforeEach(() => {
    messages = new Messages();
  });

  describe('getMessages', () => {
    it('should return the messageList', () => {
      expect(messages.getMessages()).toEqual([]);
    });
  });

  describe('saveMessage', () => {
    it('should add a message to the message list', () => {
      messages.saveMessage("1", "test", "test message");
      expect(messages.getMessages()).toEqual([{
        "userid": "1",
        "fakeName": "test",
        "message": "test message"
      }])
    })
  });
});
