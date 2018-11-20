class Game {
  constructor(usersClass, messagesClass) {
    this.users = new usersClass();
    this.messages = new messagesClass();
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
}

module.exports = Game;
