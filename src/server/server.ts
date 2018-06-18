import express from "express";
import http from "http";
import socketio from "socket.io";
import path from "path";

const app = express();
const server = new http.Server(app);
const io = socketio(server);

const clientPath = path.join(process.cwd(), "dist/")

app.use(express.static(clientPath));

export default class Server {
  public static start(){
    app.get("/", (req, res) => {
      res.sendFile("index.html");
    });
    
    io.on("connection", (socket) => {
      console.log("a user connected");
      socket.on("disconnect", () => {
          console.log("user disconnected");
        });
      
      socket.emit('hello', 'can you hear me?');
    });
    
    server.listen(3000, () => {
      console.log("listening on *:3000");
    });
  }
}
