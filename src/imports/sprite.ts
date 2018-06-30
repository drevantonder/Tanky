import { Point } from "./point";
import { deg2Rad } from "@gamestdio/mathf/lib";

export class Sprite {
    point: Point;
    angle: number;
    destroyed: boolean = false;

    constructor(point = new Point(0, 0), angle = 0) {
        this.point = point;
        this.angle = angle;
    }

    get vector() {
        const x = Math.cos(this.angle * deg2Rad);
        const y = Math.sin(this.angle * deg2Rad);
        return new Point(x, y);
    }

    destroy() {
        this.destroyed = true;
    }

    update() {
        return;
    }

}
