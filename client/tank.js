///<reference path="phaser.d.ts" />
import Phaser from 'phaser'

const TEXTURE_ANGLE_DIFFERENCE_DEGREES = -90 

export default class Tank extends Phaser.GameObjects.Sprite {
  constructor(scene, state){
    super(scene, state.x, state.y, 'tank')

    this.state = state
    this.angle = state.angle + TEXTURE_ANGLE_DIFFERENCE_DEGREES

    scene.add.existing(this)
  }

  update(){
    this.x = this.state.x
    this.y = this.state.y
    this.angle = this.state.angle + TEXTURE_ANGLE_DIFFERENCE_DEGREES
  }
}
