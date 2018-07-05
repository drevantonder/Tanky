import { Sprite } from "./sprite";
import { Constants } from "../../../imports/constants";
import { Vector, Bodies } from "matter-js";
import { Global } from "./global";

export class Explosion extends Sprite {
    constructor(position: Vector) {
        super(
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
