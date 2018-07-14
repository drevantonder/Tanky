import { TankSprite } from "./tankSprite";
import { lerp } from "@gamestdio/mathf/lib";
import { Constants } from "../imports/constants";

export class TankHealthSprite extends Phaser.GameObjects.Text {
    tank: TankSprite;
    constructor(scene: Phaser.Scene, tank: TankSprite) {
        super(scene, tank.x, tank.y, String(tank.state.health), {});

        this.tank = tank;

        this.setDepth(3);

        this.scene.add.existing(this);

        this.setFont(Constants.Font);
    }

    update() {
        this.setText(this.tank.state.health);

        this.x = this.tank.x;
        this.y = this.tank.y;
    }
}
