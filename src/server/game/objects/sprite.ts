import { Body, Bodies, World, Vector } from "matter-js";
import { Global } from "./global";
import { ISerializable } from "./serializable";

interface ISpriteConfig {
    body?: Body;
    mass?: number;
    angle?: number;
}

export class Sprite implements ISerializable {
    destroyed: boolean = false;
    body: Body;

    constructor(
        config: ISpriteConfig,
    ) {
        const defaults = {
            body: Bodies.rectangle(400, 200, 80, 80),
            mass: 1,
            angle: 0,
        };

        config = Object.assign(defaults, config);

        this.body = config.body;
        World.add(Global.engine.world, this.body);
        Body.setMass(this.body, config.mass);
        Body.setAngle(this.body, config.angle);
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
