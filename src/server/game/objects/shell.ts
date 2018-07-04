import { Tank } from "./tank";
import { Sprite } from "./sprite";
import { Bodies, Vector, Body } from "matter-js";
import { Constants } from "../../../imports/constants";

export class Shell extends Sprite {
    tank: Tank;
    damage: number;
    speed: number;
    uuid: string;
    range: number;
    distanceTraveled: number;

    constructor(
        position: Vector,
        angle: number,
        tank: Tank,
        damage = Constants.SHELL.DEFAULT_DAMAGE,
        speed = Constants.SHELL.DEFAULT_SPEED,
        range = Constants.SHELL.DEFAULT_RANGE,
        width = Constants.SHELL.DEFAULT_WIDTH,
        height = Constants.SHELL.DEFAULT_HEIGHT) {

        super({
            body: Bodies.rectangle(position.x, position.y, width, height),
            mass: Constants.SHELL.DEFAULT_MASS,
        });

        this.tank = tank;
        this.damage = damage;
        this.speed = speed;
        this.range = range;
        this.distanceTraveled = 0;
    }

    update() {
        // this.point = this.point.add(Vector.mult(this.vector, this.speed));
        this.distanceTraveled += this.speed;
        if (this.distanceTraveled >= this.range) {
            this.destroy();
        }

        super.update();
    }
}
