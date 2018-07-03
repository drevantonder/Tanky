import * as Phaser from "phaser";
import { lerp, lerpAngle } from "@gamestdio/mathf/lib";
import { Assets } from "./assets";
import { Asset } from "./asset";

export abstract class NetworkedSprite extends Phaser.GameObjects.Sprite {
    static INTERPOLATION_CONSTANT = 0.2;
    state: any;
    asset: Asset;

    stateGetter: () => any;

    constructor(scene: Phaser.Scene, state, texture: string) {
        super(scene, state.x, state.y, texture);

        this.asset = Assets.assets.get(texture);
        this.state = state;
        this.angle = this.state.angle + this.asset.textureAngleDifference;
        this.x = this.state.x;
        this.y = this.state.y;

        this.scene.add.existing(this);
    }

    update(time = 0, delta = 0) {
        this.state = this.stateGetter();

        this.x = lerp(this.x, this.state.x, NetworkedSprite.INTERPOLATION_CONSTANT);
        this.y = lerp(this.y, this.state.y, NetworkedSprite.INTERPOLATION_CONSTANT);
        this.angle = lerpAngle(
                this.angle,
                this.state.angle + this.asset.textureAngleDifference,
                NetworkedSprite.INTERPOLATION_CONSTANT);
    }
}
