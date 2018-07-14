import { Sprite } from "./sprite";
import { Constants } from "../../../imports/constants";
import { Vector, Bodies } from "matter-js";
import { Global } from "./global";
import { Game } from "../game";

export class Explosion extends Sprite {
    constructor(game: Game, position: Vector) {
        super(
            game,
            Bodies.circle(position.x, position.y, 2, {
                mass: 10,
                isStatic: true,
            }),
        );
        Global.clock.setTimeout(() => {
            this.destroy();
        }, Constants.EXPLOSION.LENGTH);
    }
}
