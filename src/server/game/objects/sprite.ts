import { Body, Bodies, World, Vector, Events} from "matter-js";
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

        Events.on(this.body, "collision", (pair: Matter.IPair) => {
            const sprite1 = this.game.findSpriteByBody(pair.bodyA);
            const sprite2 = this.game.findSpriteByBody(pair.bodyB);
            const sprite = sprite1 === this ? sprite2 : sprite1;

            this.checkCollision(sprite);
        });

        this.game.sprites.push(this);
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

    checkCollision(sprite: Sprite) {
        return;
    }
}
