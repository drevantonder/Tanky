import { Tile } from "./tile";
import { Point } from "./point";

export class GameMap {
    width: number;
    height: number;
    tiles = {};

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;

        this.generate();
    }

    get widthInPixels() {
        return this.width * Tile.TILE_SIZE;
    }

    get heightInPixels() {
        return this.height * Tile.TILE_SIZE;
    }

    lockInMap(point: Point) {
        let x = point.x;
        if (point.x > this.widthInPixels) {
            x = this.widthInPixels;
        }

        if (point.x < 0) {
            x = 0;
        }

        let y = point.y;
        if (point.y > this.heightInPixels) {
            y = this.heightInPixels;
        }

        if (point.y < 0) {
            y = 0;
        }

        return new Point(x, y);
    }

    generate() {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                this.createTile(new Point(x * Tile.TILE_SIZE, y * Tile.TILE_SIZE));
            }
        }
    }

    createTile(point: Point) {
        this.tiles[point.toString()] = new Tile(point);
    }
}
