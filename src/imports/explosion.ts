import { Sprite } from "./sprite";
import { Point } from "./point";

export class Explosion extends Sprite {
    static LENGTH = 300; // time in ms this is alive

    constructor(point: Point, angle: number) {
        super(point, angle);
        setTimeout(() => {
            this.destroy();
        }, Explosion.LENGTH);
    }
}
