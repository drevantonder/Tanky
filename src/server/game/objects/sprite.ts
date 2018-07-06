import { Body, Bodies, World, Vector, Events } from "matter-js";
import { Global } from "./global";
import { ISerializable } from "./serializable";
import { Game } from "../game";

export class Sprite implements ISerializable {
    destroyed: boolean = false;
    body: Body;
    game: Game;

    constructor(
        game: Game,
        body: Body,
    ) {
        this.body = body;
        this.game = game;

        World.add(this.game.engine.world, this.body);

        Events.on(this.body, "collision", (event) => this.checkCollision(event));
    }

    get vector() {
        const x = Math.cos(this.body.angle);
        const y = Math.sin(this.body.angle);
        return Vector.create(x, y);
    }

    destroy() {
        this.destroyed = true;
        World.remove(this.game.engine.world, this.body);
    }

    update() {
        return;
    }

    toJSON() {
        return {
            x: this.body.position.x,
            y: this.body.position.y,
            angle: this.body.angle,
        };
    }

    checkCollision(event) {
        return;
    }
}
