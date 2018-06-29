import { EntityMap, Room } from "colyseus";
import { Player } from "../../imports/players";
import { GameMap } from "../../imports/gameMap";
import { Shell } from "../../imports/shell";
import { v4 } from "uuid";

export class State {
    players: EntityMap<Player> = {};
    shells: EntityMap<Shell> = {};
    map = new GameMap(50, 50);

    createPlayer(id: string) {
        this.players[ id ] = new Player(id);
    }

    removePlayer(id: string) {
        delete this.players[ id ];
    }

    moveTank(id: string, movement: any) {
        if (movement.input) {
            const tank = this.players[ id ].tank;
            switch (movement.input) {
                case "right":
                    tank.rotateRight();
                    break;
                case "left":
                    tank.rotateLeft();
                    break;
                case "up":
                    tank.forward();
                    break;
                case "down":
                    tank.reverse();
                    break;
                case "fire":
                    const shell = tank.fire();
                    if (shell) {
                        this.shells[ v4() ] = shell;
                    }
                    break;
            }
            tank.point = this.map.lockInMap(tank.point);
        }
    }

    update() {
        for (const uuid in this.shells) {
            if (this.shells.hasOwnProperty(uuid)) {
                const shell = this.shells[uuid];
                if (this.map.isInside(shell.point)) {
                    shell.update();
                } else {
                    delete this.shells[uuid];
                }
            }
        }
    }
}

export class BattleRoom extends Room<State> {
    public onInit(options) {
        console.log(this.roomName + " created!", options);

        this.setState(new State());

        this.setSimulationInterval(() => this.update());
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
        this.state.update();
    }
}
