import * as Phaser from "phaser";
import { Sprite } from "../imports/sprite";
import { lerp, lerpAngle } from "@gamestdio/mathf/lib";
import { Asset } from "./asset";
import { Assets } from "./assets";

export abstract class NetworkedSprite extends Phaser.GameObjects.Sprite {
    static INTERPOLATION_CONSTANT = 0.2;

    abstract assetName: string;
    abstract state: Sprite;

    asset = Assets.assets[this.assetName];

    constructor(scene: Phaser.Scene, state, texture: string) {
        super(scene, state.point.x, state.point.y, texture);

        this.angle = state.angle;
    }

    update(time = 0, delta = 0) {
        this.x = lerp(this.x, this.state.point.x, NetworkedSprite.INTERPOLATION_CONSTANT);
        this.y = lerp(this.y, this.state.point.y, NetworkedSprite.INTERPOLATION_CONSTANT);
        this.angle = lerpAngle(
                this.angle,
                this.state.angle + this.asset.textureAngleDifference,
                NetworkedSprite.INTERPOLATION_CONSTANT);
    }
}
