const path = require('path');
const http = require ('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'Kitchen Bot';

// run when client connects
io.on('connection', socket => {
  console.log('new ws connection ...');

  //WELCOME CURRENT USER -emit to 1 user
  socket.emit('message', formatMessage(botName, 'welcome to kitchen heaven'));

  // broadcast when a user connect to all users that are connected 
  socket.broadcast.emit('message', formatMessage(botName, 'a user has JOINED the chat'));

  //run when user DISCONNECT 
  socket.on('disconnect', () => {
    io.emit ('message', formatMessage(botName,'a user has DISCONNECTED from the chat'))
  })

  //listen for chatMessage
  socket.on('chatMessage', msg => {
    console.log(`from client to server ${msg}`);
    io.emit('message', formatMessage('user', msg));
  });
  //to all the client in general
  // io.emit()
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, ()=> console.log(`server running on port ${PORT}`));


