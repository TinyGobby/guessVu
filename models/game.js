class Game {
  constructor(usersClass, messagesClass) {
    this.users = new usersClass();
    this.usersClass = usersClass;
    this.messages = new messagesClass();
    this.messagesClass = messagesClass;
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  open() {
    this.isOpen = true;
    this.messages.deleteAllMessages();
  }

  startNew() {
    this.users = new this.usersClass();
    this.messages = new this.messagesClass();
    this.isOpen = true;
  }
}

module.exports = Game;
