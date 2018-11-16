

module.exports = (app, messages, server) => {
    const io = require('socket.io')(server);
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
      
      });
}

