import * as Phaser from "phaser";
import { lerp, lerpUnclamped, clamp, rad2Deg, deg2Rad, lerpAngle} from "@gamestdio/mathf/lib";
import { Assets } from "./assets";
import { Asset } from "./asset";
import { lerpRadians } from "../imports/utils";

export abstract class NetworkedSprite extends Phaser.GameObjects.Sprite {
    static INTERPOLATION_CONSTANT = 0.2;
    state: any;
    asset: Asset;

    stateGetter: () => any;

    constructor(scene: Phaser.Scene, state, texture: string) {
        super(scene, state.x, state.y, texture);

        this.asset = Assets.assets.get(texture);
        this.state = state;
        this.rotation = this.state.angle;
        this.x = this.state.x;
        this.y = this.state.y;

        this.scene.add.existing(this);
    }

    update(time = 0, delta = 0) {
        this.state = this.stateGetter();

        this.x = lerp(this.x, this.state.x, NetworkedSprite.INTERPOLATION_CONSTANT);
        this.y = lerp(this.y, this.state.y, NetworkedSprite.INTERPOLATION_CONSTANT);
        console.log(this.rotation, this.state.angle);
        this.rotation = lerpRadians(
                this.rotation * rad2Deg,
                this.state.angle * rad2Deg,
                NetworkedSprite.INTERPOLATION_CONSTANT) * deg2Rad;
    }
}
