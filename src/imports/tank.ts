import { deg2Rad } from "@gamestdio/mathf/lib";
import { Point } from "./point";
import { Shell } from "./shell";
import { Sprite } from "./sprite";

export class Tank extends Sprite {
    static ROTATE_SPEED = 4;
    static MOVEMENT_SPEED = 7;

    point: Point;
    angle: number;
    constructor(point = new Point(0, 0), angle = 0) {
        super(point, angle);
    }

    rotateRight() {
        this.angle += Tank.ROTATE_SPEED;
    }

    rotateLeft() {
        this.angle -= Tank.ROTATE_SPEED;
    }

    forward() {
        this.point.add(this.vector.multiply(Tank.MOVEMENT_SPEED));
    }

    reverse() {
        this.point.subtract(this.vector.multiply(Tank.MOVEMENT_SPEED));
    }

    fire() {
        return new Shell(this.point, this.angle, this);
    }
}
