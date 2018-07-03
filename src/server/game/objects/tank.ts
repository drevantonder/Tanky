import { Shell } from "./shell";
import { Sprite } from "./sprite";
import { Global } from "./global";
import { Body, Vector, Bodies } from "matter-js";
import { Constants } from "../../../imports/constants";

export class Tank extends Sprite {

    canFire: boolean;
    movementSpeed: number;
    rotateSpeed: number;
    reloadSpeed: number;
    recoil: number;
    recoilResetTime: number;

    constructor(
        position = Vector.create(300, 300),
        movementSpeed = Constants.TANK.DEFUALT_MOVEMENT_SPEED,
        rotateSpeed = Constants.TANK.DEFUALT_ROTATE_SPEED,
        reloadSpeed = Constants.TANK.DEFUALT_RELOAD_SPEED,
        width = Constants.TANK.DEFUALT_WIDTH,
        height = Constants.TANK.DEFUALT_HEIGHT,
        recoil = Constants.TANK.DEFUALT_RECOIL,
        recoilResetTime = Constants.TANK.DEFULT_RECOIL_RESET_TIME) {

        super(Bodies.rectangle(position.x, position.y, width, height));

        this.canFire = true;
        this.movementSpeed = movementSpeed;
        this.rotateSpeed = rotateSpeed;
        this.reloadSpeed = reloadSpeed;
        this.recoil = recoil;
        this.recoilResetTime = recoilResetTime;

        this.body.frictionAir = 0.5;
        Body.setMass(this.body, 5000);
    }

    rotateRight() {
        Body.rotate(this.body, this.rotateSpeed);
    }

    rotateLeft() {
        Body.rotate(this.body, -this.rotateSpeed);
    }

    forward() {
        const velocity = Vector.mult(this.vector, this.movementSpeed);
        Body.setVelocity(this.body, Vector.create(velocity.x, velocity.y));
        // this.point = this.point.add(this.vector.multiply(this.movementSpeed));
    }

    reverse() {
        const velocity = Vector.mult(this.vector, -this.movementSpeed);
        Body.setVelocity(this.body, Vector.create(velocity.x, velocity.y));
    }

    fire() {
        if (this.canFire) {
            this.canFire = false;

            Global.clock.setTimeout(() => this.reload(), this.reloadSpeed);
            Global.clock.setTimeout(() => {
                // this.point = this.point.add(Vector.mult(this.vector, this.recoil));
            }, this.recoilResetTime);

            // this.point = this.point.subtract(Vector.mult(this.vector, this.recoil));
            return new Shell(
                Vector.add(this.body.position, Vector.mult(this.vector, 20)),
                this.body.angle,
                this,
            );
        }
        return null;
    }

    reload() {
        this.canFire = true;
    }
}
