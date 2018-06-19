///<reference path="phaser.d.ts" />
import Phaser from "phaser";

const ROTATE_SPEED = 2;

export default class Tank extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture){
        super(scene, x, y, texture)

        scene.add.existing(this);
    }

    rotateRight(){
      this.angle += ROTATE_SPEED;
    }

    rotateLeft(){
      this.angle -= ROTATE_SPEED;
    }
}
