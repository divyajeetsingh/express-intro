var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server ,{
    cookie: false, // some custom config here
    pingTimeout: 30000,
    pingInterval: 2000
});

io.sockets.on('connection', function (socket) {
  const query = socket.handshake.query;

  socket.on('event', function() { 

   })
}
)