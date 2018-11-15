const messagesclass = require('./models/messages');
const createError = require('http-errors');

const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const port = process.env.PORT || 3001;

const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//serve built react app as frontend
app.use(express.static('frontend/dist'));

require('./routes.js')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use(cors({ credentials: true, origin: true }));

const messages = new messagesclass();
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

  // needs method name for retrieving real names
  // client.on('getRealNames', function() {
  //   io.emit('listOfRealNames', users.);
  // });
});

server.listen(port, () => console.log(`app listening on port ${port}`));
module.exports = app;
