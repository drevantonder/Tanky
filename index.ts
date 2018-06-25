import * as path from 'path';
import * as express from 'express';
import * as WebSocket from 'uws';
import { createServer } from 'http';
import { Server } from 'colyseus';
import { monitor } from '@colyseus/monitor';

// Import demo room handlers
import { BattleRoom } from "./rooms/battleRoom";

const port = Number(process.env.PORT || 2567);
const app = express();

// Attach WebSocket Server on HTTP Server.
const gameServer = new Server({
  engine: WebSocket.Server,
  server: createServer(app)
});

// Register StateHandlerRoom as "state_handler"
gameServer.register("battle", BattleRoom);

app.use('/', express.static(path.join(__dirname, "dist")));

// (optional) attach web monitoring panel
app.use('/colyseus', monitor(gameServer));

gameServer.onShutdown(function(){
  console.log(`game server is going down.`);
});

gameServer.listen(port);
console.log(`Listening on http://localhost:${ port }`);
