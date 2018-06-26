import { deg2Rad } from "@gamestdio/mathf/lib";

export class Tank {
    static ROTATE_SPEED = 4;
    static MOVEMENT_SPEED = 10;

    x: number;
    y: number;
    angle: number;
    constructor() {
        this.x = 0;
        this.y = 0;
        this.angle = 0;
    }

    rotateRight() {
        this.angle += Tank.ROTATE_SPEED;
    }

    rotateLeft() {
        this.angle -= Tank.ROTATE_SPEED;
    }

    forward() {
        this.x += Math.cos(this.angle * deg2Rad) * Tank.MOVEMENT_SPEED;
        this.y += Math.sin(this.angle * deg2Rad) * Tank.MOVEMENT_SPEED;
    }

    reverse() {
        this.x -= Math.cos(this.angle * deg2Rad) * Tank.MOVEMENT_SPEED;
        this.y -= Math.sin(this.angle * deg2Rad) * Tank.MOVEMENT_SPEED;
    }
}
