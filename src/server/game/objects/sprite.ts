import { Body, Bodies, World, Vector } from "matter-js";
import { Global } from "./global";
import { Constants } from "../../../imports/constants";
import { ISerializable } from "./serializable";

export class Sprite implements ISerializable {
    destroyed: boolean = false;
    body: Body;

    constructor(
        body = Bodies.rectangle(400, 200, 80, 80),
    ) {
        this.body = body;
        World.add(Global.engine.world, this.body);
    }

    get vector() {
        const x = Math.cos(this.body.angle);
        const y = Math.sin(this.body.angle);
        return Vector.create(x, y);
    }

    destroy() {
        this.destroyed = true;
    }

    update() {
        return;
    }

    toJSON() {
        return {
            x: this.body.position.x,
            y: this.body.position.y,
            angle: this.body.angle,
        };
    }
}
