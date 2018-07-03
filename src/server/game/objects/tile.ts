import { Point } from "./point";
import { ISerializable } from "./serializable";

export class Tile implements ISerializable {
    point: Point;
    constructor(point: Point) {
        this.point = point;
    }

    toJSON() {
        return {
            x: this.point.x,
            y: this.point.y,
        };
    }
}
