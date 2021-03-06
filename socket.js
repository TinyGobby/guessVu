module.exports = (app, game, io) => {
  io.on('connection', function(client) {
    console.log('Client connected...');
    // on receipt of new message, saves the message
    client.on('inputMessage', function(data) {
      game.messages.saveMessage(data.userId, data.fakeName, data.msg);
      // io.emit sends messageList to all game.users
      io.emit('listOfMessages', game.messages.messageList);
    });
    // this is so that when a user joins chatroom they immediately
    // see the updated version of the message list
    client.on('retrieveMessages', function() {
      client.emit('listOfMessages', game.messages.messageList);
    });

    client.on('retrieveUsers', function() {
      const allFakeNames = game.users.getAllFakeNames();
      const allRealNames = game.users.getAllRealNames();
      io.emit('listOfUsers', {
        allFakeNames,
        allRealNames
      });
    });

    client.on('startGameServer', function() {
      let success = true;
      let reason = null;
      let maxWrongGuesses = null;
      if (game.users.list.length < 3) {
        success = false;
        reason = 'You need at least three players to play.';
      } else {
        game.close();
        maxWrongGuesses = game.calculateMaxWrongGuesses(game.users.list.length);
        game.setMaxWrongGuesses(maxWrongGuesses);
      }
      io.emit('startGameClient', {
        success,
        reason,
        maxWrongGuesses
      });
    });

    client.on('discoverServer', function(data) {
      let discoveredUser = data.fakeName;
      game.users.discover(discoveredUser);
      io.emit('discoverClient', {
        fakeName: discoveredUser
      });
    });

    client.on('winServer', function(data) {
      io.emit('winClient', data);
    });

    client.on('startNewGame', function() {
      io.emit('newGameForAll');
    });

    client.on('usersLeftServer', function(data) {
      io.emit('usersLeftClient', data);
    });
  });
};
