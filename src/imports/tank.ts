import { Point } from "./point";
import { Shell } from "./shell";
import { Sprite } from "./sprite";

export class Tank extends Sprite {
    static DEFUALT_ROTATE_SPEED = 4;
    static DEFUALT_MOVEMENT_SPEED = 7;
    static DEFUALT_RELOAD_SPEED = 400; // how many ms it takes to reload
    static DEFUALT_RECOIL = 10;
    static DEFULT_RECOIL_RESET_TIME = 100; // ms
    static DEFUALT_WIDTH = 42;
    static DEFUALT_HEIGHT = 46;

    canFire: boolean;
    movementSpeed: number;
    rotateSpeed: number;
    reloadSpeed: number;
    recoil: number;
    recoilResetTime: number;

    constructor(
        point = new Point(0, 0),
        angle = 0,
        movementSpeed = Tank.DEFUALT_MOVEMENT_SPEED,
        rotateSpeed = Tank.DEFUALT_ROTATE_SPEED,
        reloadSpeed = Tank.DEFUALT_RELOAD_SPEED,
        width = Tank.WIDTH,
        height = Tank.HEIGHT,
        recoil = Tank.DEFUALT_RECOIL,
        recoilResetTime = Tank.DEFULT_RECOIL_RESET_TIME) {
        super(point, angle, width, height);

        this.canFire = true;
        this.movementSpeed = movementSpeed;
        this.rotateSpeed = rotateSpeed;
        this.reloadSpeed = reloadSpeed;
        this.recoil = recoil;
        this.recoilResetTime = recoilResetTime;
    }

    rotateRight() {
        this.angle += this.rotateSpeed;
    }

    rotateLeft() {
        this.angle -= this.rotateSpeed;
    }

    forward() {
        this.point = this.point.add(this.vector.multiply(this.movementSpeed));
    }

    reverse() {
        this.point = this.point.subtract(this.vector.multiply(this.movementSpeed));
    }

    fire() {
        if (this.canFire) {
            this.canFire = false;
            setTimeout(() => this.reload(), this.reloadSpeed);
            setTimeout(() => {
                this.point = this.point.add(this.vector.multiply(this.recoil));
            }, this.recoilResetTime);
            this.point = this.point.subtract(this.vector.multiply(this.recoil));
            return new Shell(this.point.add(this.vector.multiply(this.halfWidth)), this.angle, this);
        }
        return null;
    }

    reload() {
        this.canFire = true;
    }
}
