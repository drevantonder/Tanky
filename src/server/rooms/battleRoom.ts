import { Game } from "../game/game";
import { Room } from "colyseus";
import { Global } from "../game/objects/global";

export class BattleRoom extends Room<any> {
    game: Game;
    public onInit(options) {
        console.log(this.roomName + " created!", options);

        Global.clock = this.clock;

        this.setSimulationInterval(() => this.update());

        this.game = new Game();
    }

    public onJoin(client) {
        this.state.createPlayer(client.sessionId);
    }

    public onLeave(client) {
        this.state.removePlayer(client.sessionId);
    }

    public onMessage(client, data) {
        console.log(this.roomName + " received message from", client.sessionId, ":", data);
        this.state.moveTank(client.sessionId, data);
    }

    public onDispose() {
        console.log("Dispose " + this.roomName);
    }

    update() {
        this.setState(this.game.state);
    }
}
