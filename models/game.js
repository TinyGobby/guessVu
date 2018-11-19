class Game {
  constructor(usersClass, messagesClass) {
    this.users = new usersClass();
    this.messages = new messagesClass();
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  open() {
    this.isOpen = true;
    this.messages.deleteAllMessages();
  }
}

module.exports = Game;
