import { Point } from "./point";
import { deg2Rad } from "@gamestdio/mathf/lib";
import { Body, Bodies, World } from "matter-js";
import { nosync } from "colyseus";
import { Global } from "./global";
import { Constants } from "../../../imports/constants";
import { ISerializable } from "./serializable";

export class Sprite implements ISerializable {
    point: Point;
    angle: number;
    destroyed: boolean = false;
    width: number;
    height: number;

    @nosync
    body: Body;

    constructor(
        point = new Point(0, 0),
        angle = 0,
        width = Constants.SPRITE.DEFUALT_WIDTH,
        height = Constants.SPRITE.DEFUALT_HEIGHT,
        body = Bodies.rectangle(400, 200, 80, 80),
    ) {
        this.point = point;
        this.angle = angle;

        this.width = width;
        this.height = height;

        this.body = body;
        World.add(Global.engine.world, this.body);
    }

    get halfWidth() {
        return this.width / 2;
    }

    get halfHeight() {
        return this.height / 2;
    }

    get vector() {
        const x = Math.cos(this.angle * deg2Rad);
        const y = Math.sin(this.angle * deg2Rad);
        return new Point(x, y);
    }

    destroy() {
        this.destroyed = true;
    }

    update() {
        this.point.x = this.body.position.x;
        this.point.y = this.body.position.y;
        this.angle = this.body.angle;
    }

    toJSON() {
        return {
            x: this.body.position.x,
            y: this.body.position.y,
            angle: this.body.angle,
        };
    }
}
