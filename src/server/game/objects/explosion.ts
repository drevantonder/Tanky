import { Sprite } from "./sprite";
import { Constants } from "../../../imports/constants";
import { Vector, Bodies } from "matter-js";

export class Explosion extends Sprite {
    constructor(position: Vector, angle: number) {
        super({
            body: Bodies.circle(position.x, position.y, 20),
        });
        setTimeout(() => {
            this.destroy();
        }, Constants.EXPLOSION.LENGTH);
    }
}
