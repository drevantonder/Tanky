import { Tile } from "./tile";
import { Point } from "./point";
import { clamp } from "@gamestdio/mathf/lib";

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
        return new Point(clamp(point.x, 0, this.widthInPixels), clamp(point.y, 0, this.heightInPixels));
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

    isInside(point: Point) {
        if (point.x > this.widthInPixels) {
            return false;
        }

        if (point.x < 0) {
            return false;
        }

        if (point.y > this.heightInPixels) {
            return false;
        }

        if (point.y < 0) {
            return false;
        }

        return true;
    }
}
