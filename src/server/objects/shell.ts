import { Point } from "./point";
import { Tank } from "./tank";
import { Sprite } from "./sprite";
import { Constants } from "../../imports/constants";
import { Bodies } from "matter-js";

export class Shell extends Sprite {
    point: Point;
    tank: Tank;
    damage: number;
    speed: number;
    uuid: string;
    range: number;
    distanceTraveled: number;

    constructor(
        point = new Point(0, 0),
        angle: number,
        tank: Tank,
        damage = Constants.SHELL.DEFAULT_DAMAGE,
        speed = Constants.SHELL.DEFAULT_SPEED,
        range = Constants.SHELL.DEFUALT_RANGE,
        width = Constants.SHELL.DEFUALT_WIDTH,
        height = Constants.SHELL.DEFUALT_HEIGHT) {

        super(point, angle, width, height, Bodies.rectangle(point.x, point.y, width, height));
        this.tank = tank;
        this.damage = damage;
        this.speed = speed;
        this.range = range;
        this.distanceTraveled = 0;
    }

    update() {
        this.point = this.point.add(this.vector.multiply(this.speed));
        this.distanceTraveled += this.speed;
        if (this.distanceTraveled >= this.range) {
            this.destroy();
        }

        super.update();
    }
}
