import express from 'express';
import http from "http";
import socketio from "socket.io";

var app = express();
var server = new http.Server(app);
var io = socketio(server);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
      console.log('user disconnected');
    });
});

server.listen(3000, function(){
  console.log('listening on *:3000');
});
