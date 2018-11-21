class Game {
  constructor(usersClass, messagesClass) {
    this.users = new usersClass();
    this.usersClass = usersClass;
    this.messages = new messagesClass();
    this.messagesClass = messagesClass;
    this.isOpen = true;
    this.maxWrongGuesses = 0;
  }

  calculateMaxWrongGuesses(numberOfPlayers) {
    return numberOfPlayers - 3;
  }

  close() {
    this.isOpen = false;
  }

  open() {
    this.isOpen = true;
    this.messages.deleteAllMessages();
  }


  setMaxWrongGuesses(num) {
    this.maxWrongGuesses = num;
  }

  startNew() {
    this.users = new this.usersClass();
    this.messages = new this.messagesClass();
    this.isOpen = true;
  }
}

module.exports = Game;
