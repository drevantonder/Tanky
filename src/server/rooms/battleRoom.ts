import { Game, IGameState } from "../game/game";
import { Room, nosync } from "colyseus";
import { Global } from "../game/objects/global";

export class State implements IGameState {
    players: {};
    shells: {};
    explosions: {};
    map;

    @nosync
    game: Game;

    constructor() {
        this.game = new Game();
    }

    update() {
        this.game.update();

        const state = this.game.toJSON();
        this.players = state.players;
        this.shells = state.shells;
        this.explosions = state.explosions;
        this.map = state.map;
    }
}

export class BattleRoom extends Room<State> {
    public onInit(options) {
        console.log(this.roomName + " created!", options);

        Global.clock = this.clock;

        this.setSimulationInterval(() => this.update());

        this.setState(new State());
    }

    public onJoin(client) {
        this.state.game.createPlayer(client.sessionId);
    }

    public onLeave(client) {
        this.state.game.removePlayer(client.sessionId);
    }

    public onMessage(client, data) {
        console.log(this.roomName + " received message from", client.sessionId, ":", data);
        this.state.game.moveTank(client.sessionId, data);
    }

    public onDispose() {
        console.log("Dispose " + this.roomName);
    }

    update() {
        this.state.update();
    }
}
