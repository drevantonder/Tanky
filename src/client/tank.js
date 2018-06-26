///<reference path="phaser.d.ts" />
import Phaser from 'phaser'
import { lerp } from '@gamestdio/mathf'

const TEXTURE_ANGLE_DIFFERENCE_DEGREES = -90
const INTERPOLATION_PROGRESS = 0.3

export default class Tank extends Phaser.GameObjects.Sprite {
  constructor(scene, state){
    super(scene, state.x, state.y, 'tank')

    this.state = state
    this.angle = state.angle + TEXTURE_ANGLE_DIFFERENCE_DEGREES

    scene.add.existing(this)
  }

  update(time, delta){
    this.x = lerp(this.x, this.state.x, INTERPOLATION_PROGRESS)
    this.y = lerp(this.y, this.state.y, INTERPOLATION_PROGRESS)
    this.angle = this.state.angle + TEXTURE_ANGLE_DIFFERENCE_DEGREES
  }
}
