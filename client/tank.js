///<reference path="phaser.d.ts" />
import Phaser from 'phaser'

export default class Tank extends Phaser.GameObjects.Sprite {
  constructor(scene, value){
    super(scene, value.x, value.y, 'tank')

    this.angle = value.angle

    scene.add.existing(this)
  }
}
