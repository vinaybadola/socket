const express = require('express');
const { createServer } = require('node:http');
const {join} = require('path');
const { Server } = require('socket.io');


const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

//  I initialize a new instance of socket.io by passing the server (the HTTP server) object. 
//  Then I listen on the connection event for incoming sockets and log it to the console.
// socket is an object that represents the connection to the client. It also fires events like on and emit. 
// The server listens for the connection event and logs a message to the console when a client connects.
// It also listens for the disconnect event and logs a message when a client disconnects.


io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});