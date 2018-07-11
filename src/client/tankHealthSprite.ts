import { TankSprite } from "./tankSprite";
import { lerp } from "@gamestdio/mathf/lib";

export class TankHealthSprite extends Phaser.GameObjects.Text {
    tank: TankSprite;
    constructor(scene: Phaser.Scene, tank: TankSprite) {
        super(scene, tank.x, tank.y, String(tank.state.health), {});

        this.tank = tank;

        this.setDepth(3);

        this.scene.add.existing(this);
    }

    update() {
        this.setText(this.tank.state.health);

        this.x = this.tank.x;
        this.y = this.tank.y;
    }
}
