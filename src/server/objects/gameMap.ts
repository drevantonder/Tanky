import { Tile } from "./tile";
import { Point } from "./point";
import { clamp } from "@gamestdio/mathf/lib";
import { Bodies, World } from "matter-js";
import { Global } from "./global";
import { Constants } from "../../imports/constants";

export class GameMap {
    width: number;
    height: number;
    tiles = {};

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;

        this.generate();

        this.createBounds();
    }

    createBounds() {
        World.add(Global.engine.world,
            Bodies.rectangle(0, this.heightInPixels / 2, 20, this.heightInPixels, { isStatic: true }),
        );
        World.add(Global.engine.world,
            Bodies.rectangle(this.widthInPixels / 2, 0, this.widthInPixels, 20, { isStatic: true }),
        );
        World.add(Global.engine.world,
            Bodies.rectangle(this.widthInPixels, this.heightInPixels / 2, 20, this.heightInPixels, { isStatic: true }),
        );
        World.add(Global.engine.world,
            Bodies.rectangle(this.widthInPixels / 2, this.heightInPixels, this.widthInPixels, 20, { isStatic: true }),
        );
    }

    get widthInPixels() {
        return this.width * Constants.TILE.TILE_SIZE;
    }

    get heightInPixels() {
        return this.height * Constants.TILE.TILE_SIZE;
    }

    lockInMap(point: Point) {
        return new Point(clamp(point.x, 0, this.widthInPixels), clamp(point.y, 0, this.heightInPixels));
    }

    generate() {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                this.createTile(new Point(x * Constants.TILE.TILE_SIZE, y * Constants.TILE.TILE_SIZE));
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
