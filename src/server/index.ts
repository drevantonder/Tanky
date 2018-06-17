import express from "express";
import http from "http";
import socketio from "socket.io";

const app = express();
const server = new http.Server(app);
const io = socketio(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
      console.log("user disconnected");
    });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
