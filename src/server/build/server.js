"use strict";
exports.__esModule = true;
var express_1 = require("express");
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var path_1 = require("path");
var app = express_1["default"]();
var server = new http_1["default"].Server(app);
var io = socket_io_1["default"](server);
var clientPath = path_1["default"].join(process.cwd(), "dist/");
app.use(express_1["default"].static(clientPath));
var Server = /** @class */ (function () {
    function Server() {
    }
    Server.start = function () {
        app.get("/", function (req, res) {
            res.sendFile("index.html");
        });
        io.on("connection", function (socket) {
            console.log("a user connected");
            socket.on("disconnect", function () {
                console.log("user disconnected");
            });
            socket.emit('hello', 'can you hear me?');
        });
        server.listen(3000, function () {
            console.log("listening on *:3000");
        });
    };
    return Server;
}());
exports["default"] = Server;
