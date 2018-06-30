import { Point } from "./point";
import { Shell } from "./shell";
import { Sprite } from "./sprite";

export class Tank extends Sprite {
    static ROTATE_SPEED = 4;
    static MOVEMENT_SPEED = 7;
    static RELOAD_SPEED = 400; // how many ms it takes to reload

    point: Point;
    angle: number;
    canFire: boolean;
    constructor(point = new Point(0, 0), angle = 0) {
        super(point, angle);

        this.canFire = true;
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
        if (this.canFire) {
            this.canFire = false;
            setTimeout(() => this.reload(), Tank.RELOAD_SPEED);
            return new Shell(this.point, this.angle, this);
        }
        return null;
    }

    reload() {
        this.canFire = true;
    }
}
