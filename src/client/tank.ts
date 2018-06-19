///<reference path="phaser.d.ts" />
import Phaser from "phaser";

import {CursorKeys} from "./cursorKeys";

export default class Tank extends Phaser.GameObjects.Sprite {
    controls: CursorKeys

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string){
        super(scene, x, y, texture)

        scene.add.existing(this);

        this.controls = this.scene.input.keyboard.createCursorKeys();
    }

    update(time?: number, delta?: number){
        if(this.controls.left && this.controls.left.isDown) {
            this.x -= 20;
        }

        if(this.controls.right && this.controls.right.isDown) {
            this.x += 20;
        }

        if(this.controls.down && this.controls.down.isDown) {
            this.y += 20;
        }

        if(this.controls.up && this.controls.up.isDown) {
            this.y -= 20;
        }
    }
}
