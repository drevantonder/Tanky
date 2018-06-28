import * as Phaser from "phaser";

export abstract class NetworkedGameObject extends Phaser.GameObjects.GameObject {
    state: any;

    constructor(scene: Phaser.Scene, state, type: string) {
        super(scene, type);
        this.state = state;
        scene.add.existing(this);
    }
}
