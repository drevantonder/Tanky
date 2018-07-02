import * as Phaser from "phaser";

export abstract class NetworkedGameObject extends Phaser.GameObjects.GameObject {
    state: any;
    stateGetter: () => any;

    constructor(scene: Phaser.Scene, state, type: string) {
        super(scene, type);
        this.state = state;
        this.scene.add.existing(this);
    }

    update() {
        this.state = this.stateGetter();
    }
}
