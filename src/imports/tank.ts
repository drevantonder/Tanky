import { deg2Rad } from "@gamestdio/mathf/lib";
import { Point } from "./point";

export class Tank {
    static ROTATE_SPEED = 4;
    static MOVEMENT_SPEED = 7;

    point: Point;
    angle: number;
    constructor(point = new Point(0, 0), angle = 0) {
        this.point = point;
        this.setAngle(angle);
    }

    rotateRight() {
        this.setAngle(this.angle + Tank.ROTATE_SPEED);
    }

    rotateLeft() {
        this.setAngle(this.angle - Tank.ROTATE_SPEED);
    }

    setAngle(angle) {
        this.angle = angle % 360;
    }

    forward() {
        this.point.x += Math.cos(this.angle * deg2Rad) * Tank.MOVEMENT_SPEED;
        this.point.y += Math.sin(this.angle * deg2Rad) * Tank.MOVEMENT_SPEED;
    }

    reverse() {
        this.point.x -= Math.cos(this.angle * deg2Rad) * Tank.MOVEMENT_SPEED;
        this.point.y -= Math.sin(this.angle * deg2Rad) * Tank.MOVEMENT_SPEED;
    }
}
