import * as Phaser from "phaser";
import { lerp, lerpAngle } from "@gamestdio/mathf/lib";
import { Assets } from "./assets";
import { Asset } from "./asset";

export abstract class NetworkedSprite extends Phaser.GameObjects.Sprite {
    static INTERPOLATION_CONSTANT = 0.2;
    state: any;
    asset: Asset;

    constructor(scene: Phaser.Scene, state, texture: string) {
        super(scene, state.point.x, state.point.y, texture);

        this.asset = Assets.assets.get(texture);
        this.state = state;
        this.angle = this.state.angle + this.asset.textureAngleDifference;
        this.x = this.state.point.x;
        this.y = this.state.point.y;

        scene.add.existing(this);
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
