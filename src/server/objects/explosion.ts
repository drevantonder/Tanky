import { Sprite } from "./sprite";
import { Point } from "./point";
import { Constants } from "../../imports/constants";

export class Explosion extends Sprite {
    constructor(point: Point, angle: number) {
        super(point, angle);
        setTimeout(() => {
            this.destroy();
        }, Constants.EXPLOSION.LENGTH);
    }
}
