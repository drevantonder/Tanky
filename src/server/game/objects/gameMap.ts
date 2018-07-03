import { Tile } from "./tile";
import { clamp } from "@gamestdio/mathf/lib";
import { Bodies, World, Vector } from "matter-js";
import { Global } from "./global";
import { Constants } from "../../../imports/constants";
import { ISerializable } from "./serializable";
import { EntityMap2 } from "./EntityMap2";

export interface IGameMapState {
    width: number;
    height: number;
    widthInPixels: number;
    heightInPixels: number;
    tiles: {};
}

export class GameMap implements ISerializable {
    width: number;
    height: number;
    tiles = new EntityMap2<Tile>();

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

    generate() {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                this.createTile(Vector.create(x * Constants.TILE.TILE_SIZE, y * Constants.TILE.TILE_SIZE));
            }
        }
    }

    createTile(position: Vector) {
        this.tiles.set(position.toString(), new Tile(position));
    }

    isInside(position: Vector) {
        if (position.x > this.widthInPixels) {
            return false;
        }

        if (position.x < 0) {
            return false;
        }

        if (position.y > this.heightInPixels) {
            return false;
        }

        if (position.y < 0) {
            return false;
        }

        return true;
    }

    toJSON(): IGameMapState {
        return {
            width: this.width,
            height: this.height,
            widthInPixels: this.widthInPixels,
            heightInPixels: this.heightInPixels,
            tiles: this.tiles.toJSON(),
        };
    }
}
