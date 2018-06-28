import { Point } from "./point";
import { Tank } from "./tank";
import { Sprite } from "./sprite";

export class Shell extends Sprite {
    static DEFAULT_SPEED = 20;
    static DEFAULT_DAMAGE = 20;
    point: Point;
    tank: Tank;
    damage: number;
    speed: number;
    uuid: string;

    constructor(
        point = new Point(0, 0),
        angle: number,
        tank: Tank,
        damage = Shell.DEFAULT_DAMAGE,
        speed = Shell.DEFAULT_SPEED) {

        super(point, angle);
        this.tank = tank;
        this.damage = damage;
        this.speed = speed;
    }

    update() {
        this.point.add(this.vector.multiply(this.speed));
    }
}
