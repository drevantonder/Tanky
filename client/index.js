import * as Colyseus from "colyseus.js";

var client = new Colyseus.Client('ws://localhost:2657');

var room = client.join("battle");
room.onJoin.add(function() {
    console.log(client.id, "joined", room.name);
});
