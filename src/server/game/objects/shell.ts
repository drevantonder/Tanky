import { Tank } from "./tank";
import { Sprite } from "./sprite";
import { Bodies, Vector, Body } from "matter-js";
import { Constants } from "../../../imports/constants";
import { Game } from "../game";

export class Shell extends Sprite {
    tank: Tank;
    damage: number;
    speed: number;
    uuid: string;
    range: number;
    distanceTraveled: number;

    constructor(
        game: Game,
        position: Vector,
        angle: number,
        tank: Tank,
        damage = Constants.SHELL.DEFAULT_DAMAGE,
        speed = Constants.SHELL.DEFAULT_SPEED,
        range = Constants.SHELL.DEFAULT_RANGE,
        width = Constants.SHELL.DEFAULT_WIDTH,
        height = Constants.SHELL.DEFAULT_HEIGHT) {

        super(
            game,
            Bodies.rectangle(position.x, position.y, width, height, {
                mass: Constants.SHELL.DEFAULT_MASS,
                angle,
            }),
        );

        this.tank = tank;
        this.damage = damage;
        this.speed = speed;
        this.range = range;
        this.distanceTraveled = 0;

        Body.applyForce(this.body,
            this.body.position,
            Vector.mult(this.vector, this.speed));
    }

    update() {
        this.distanceTraveled += this.speed;
        if (this.distanceTraveled >= this.range) {
            this.destroy();
        }

        super.update();
    }

    checkCollision(event) {
        this.destroy();
    }
}
