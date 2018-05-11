var express = require('express');
var socket = require('socket.io');

//Setup app
var app = express();
var server = app.listen(4000, function(){
  console.log("Listening to port 4000");
});

//Static files
app.use(express.static('public'));

//creating setup socket
var io = socket(server);

//establishing connection to the server
io.on('connection', function(socket){
  console.log("Made socket connection", socket.id);

  //Grabing message from browser(client) & emit
  socket.on('chat', function(data){
    io.sockets.emit('chat', data);
  });

  socket.on('typing', function(data){
    socket.broadcast.emit('typing', data);
  });
});
