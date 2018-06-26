import { deg2Rad } from "@gamestdio/mathf/lib";
import { Point } from "./point";

export class Tank {
    static ROTATE_SPEED = 4;
    static MOVEMENT_SPEED = 7;

    point: Point;
    angle: number;
    constructor() {
        this.point = new Point(0, 0);
        this.angle = 0;
    }

    rotateRight() {
        this.angle += Tank.ROTATE_SPEED;
    }

    rotateLeft() {
        this.angle -= Tank.ROTATE_SPEED;
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
