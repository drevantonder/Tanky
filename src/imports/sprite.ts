import { Point } from "./point";
import { deg2Rad } from "@gamestdio/mathf/lib";
import { Clock, nosync } from "colyseus";

export class Sprite {
    static WIDTH = 64;
    static HEIGHT = 64;

    point: Point;
    angle: number;
    destroyed: boolean = false;
    width: number;
    height: number;

    constructor(point = new Point(0, 0), angle = 0, width = Sprite.WIDTH, height = Sprite.HEIGHT) {
        this.point = point;
        this.angle = angle;

        this.width = width;
        this.height = height;
    }

    get halfWidth() {
        return this.width / 2;
    }

    get halfHeight() {
        return this.height / 2;
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
