import { v4 } from "uuid";
import { Engine } from "matter-js";
import { Player } from "./objects/players";
import { Shell } from "./objects/shell";
import { Explosion } from "./objects/explosion";
import { GameMap } from "./objects/gameMap";
import { Global } from "./objects/global";

export class Game {
    players = new Map<string, Player>();
    shells = new Map<string, Shell>();
    explosions = new Map<string, Explosion>();
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
        this.shells.forEach((shell, uuid) => {
            if (shell.destroyed) {
                delete this.shells[uuid];
            }
        });

        this.shells.forEach((explosion, uuid) => {
            if (explosion.destroyed) {
                delete this.explosions[uuid];
            }
        });
    }

    get state() {
        return {};
    }
}
