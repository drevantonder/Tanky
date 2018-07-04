import { ISerializable } from "./serializable";
import { Vector } from "matter-js";

export class Tile implements ISerializable {
    position: Vector;
    constructor(position: Vector) {
        this.position = position;
    }

    toJSON() {
        return {
            x: this.position.x,
            y: this.position.y,
        };
    }
}
