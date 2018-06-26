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
