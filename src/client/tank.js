///<reference path="phaser.d.ts" />
import Phaser from "phaser";

export default class Tank extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture){
        super(scene, x, y, texture)

        scene.add.existing(this);
    }
}
