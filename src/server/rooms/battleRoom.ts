import { EntityMap, Room } from "colyseus";
import { Player } from "../objects/players";
import { GameMap } from "../../server/objects/gameMap";
import { Shell } from "../objects/shell";
import { v4 } from "uuid";
import { Explosion } from "../../server/objects/explosion";
import { Global } from "../objects/global";
import { Engine } from "matter-js";

export class State {
    players: EntityMap<Player> = {};
    shells: EntityMap<Shell> = {};
    explosions: EntityMap<Explosion> = {};
    map: GameMap;

    constructor() {
        Global.engine = Engine.create();
        Global.engine.world.gravity.x = 0;
        Global.engine.world.gravity.y = 0;
        Global.engine.world.gravity.scale = 0;

        this.map = new GameMap(15, 15);

        Global.engine.world.bounds = {
            min: {
                x: 0,
                y: 0,
            },
            max: {
                x: this.map.widthInPixels,
                y: this.map.heightInPixels,
            },
        };
    }

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
        Engine.update(Global.engine, 1000 / 60);

        Object.values(this.explosions).forEach((explosion) => {
            explosion.update();
        });

        Object.values(this.players).forEach((player) => {
            player.tank.update();
        });

        Object.values(this.shells).forEach((shell) => {
            if (this.map.isInside(shell.point)) {
                shell.update();
            } else {
                shell.destroy();
            }
            if (shell.destroyed) {
                this.explosions[ v4() ] = new Explosion(shell.point, 0);
            }
        });

        this.deleteDestroyed();
    }

    deleteDestroyed() {
        Object.entries(this.shells).forEach(([uuid, shell]) => {
            if (shell.destroyed) {
                delete this.shells[uuid];
            }
        });

        Object.entries(this.explosions).forEach(([uuid, explosion]) => {
            if (explosion.destroyed) {
                delete this.explosions[uuid];
            }
        });
    }
}

export class BattleRoom extends Room<State> {
    public onInit(options) {
        console.log(this.roomName + " created!", options);

        Global.clock = this.clock;

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
