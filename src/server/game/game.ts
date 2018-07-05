import { v4 } from "uuid";
import { Engine, Events, IEventCollision } from "matter-js";
import { Player } from "./objects/players";
import { Shell } from "./objects/shell";
import { Explosion } from "./objects/explosion";
import { GameMap, IGameMapState } from "./objects/gameMap";
import { Global } from "./objects/global";
import { EntityMap2 } from "./objects/EntityMap2";
import { ISerializable } from "./objects/serializable";

export interface IGameState {
    players: {};
    shells: {};
    explosions: {};
    map: IGameMapState;
}

export class Game implements ISerializable {
    players = new EntityMap2<Player>();
    shells = new EntityMap2<Shell>();
    explosions = new EntityMap2<Explosion>();
    map: GameMap;

    constructor() {
        Global.engine = Engine.create();
        Global.engine.world.gravity.x = 0;
        Global.engine.world.gravity.y = 0;

        this.map = new GameMap(20, 20);

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

        Events.on(Global.engine, "collisionStart", (event) => this.checkCollision(event));
        Events.on(Global.engine, "collisionActive", (event) => this.checkCollision(event));
    }

    createPlayer(id: string) {
        this.players.set(id, new Player(id));
    }

    removePlayer(id: string) {
        this.players.delete(id);
    }

    moveTank(id: string, movement: any) {
        if (movement.input) {
            const tank = this.players.get(id).tank;
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
                        this.shells.set(v4(), shell);
                    }
                    break;
            }
        }
    }

    update() {
        Engine.update(Global.engine, 1000 / 60);

        this.explosions.forEach((explosion) => {
            explosion.update();
        });

        this.players.forEach((player) => {
            player.tank.update();
        });

        this.shells.forEach((shell) => {
            if (this.map.isInside(shell.body.position)) {
                shell.update();
            } else {
                shell.destroy();
            }
            if (shell.destroyed) {
                this.explosions.set(v4(), new Explosion(shell.body.position));
            }
        });

        this.deleteDestroyed();
    }

    deleteDestroyed() {
        this.shells.forEach((shell, uuid) => {
            if (shell.destroyed) {
                this.shells.delete(uuid);
            }
        });

        this.explosions.forEach((explosion, uuid) => {
            if (explosion.destroyed) {
                this.explosions.delete(uuid);
            }
        });
    }

    toJSON(): IGameState {
        return {
            players: this.players.toJSON(),
            shells: this.shells.toJSON(),
            explosions: this.explosions.toJSON(),
            map: this.map.toJSON(),
        };
    }

    get state() {
        return this.toJSON();
    }

    checkCollision(event: IEventCollision<Engine>): any {
        event.pairs.forEach((pair) => {
            Events.trigger(pair.bodyA, "collision");
            Events.trigger(pair.bodyB, "collision");
        });
    }
}
