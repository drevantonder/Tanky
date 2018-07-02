import { Point } from "./point";
import { Tank } from "./tank";
import { Sprite } from "./sprite";

export class Shell extends Sprite {
    static DEFAULT_SPEED = 15;
    static DEFAULT_DAMAGE = 20;
    static DEFUALT_RANGE = 1000; // how many pixels the shell will fly
    static DEFUALT_WIDTH = 8;
    static DEFUALT_HEIGHT = 14;

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
        damage = Shell.DEFAULT_DAMAGE,
        speed = Shell.DEFAULT_SPEED,
        range = Shell.DEFUALT_RANGE,
        width = Shell.DEFUALT_WIDTH,
        height = Shell.DEFUALT_HEIGHT) {

        super(point, angle, width, height);
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
    }
}
