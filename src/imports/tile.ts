import { Point } from "./point";

export class Tile {
    static TILE_SIZE = 64;

    point: Point;
    constructor(point: Point) {
        this.point = point;
    }
}
