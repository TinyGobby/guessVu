module.exports = (app, game, io) => {
    const messages = game.messages;
    const users = game.users;
    io.on('connection', function(client) {
        console.log('Client connected...');
        // on receipt of new message, saves the message
        client.on('inputMessage', function(data) {
          messages.saveMessage(data.userId, data.fakeName, data.msg);
          // io.emit sends messageList to all users
          io.emit('listOfMessages', messages.messageList);
        });
        // this is so that when a user joins chatroom they immediately
        // see the updated version of the message list
        client.on('retrieveMessages', function() {
          client.emit('listOfMessages', messages.messageList);
        });

        client.on('retrieveUsers', function () {
            const allFakeNames = users.getAllFakeNames();
            const allRealNames = users.getAllRealNames();
          io.emit('listOfUsers', {
            allFakeNames,
            allRealNames
          });
        })

        client.on('startGameServer', function() {
          console.log('received startgameserver')
          game.close();
          console.log('close game')
          io.emit('startGameClient');
        })

      });
}
