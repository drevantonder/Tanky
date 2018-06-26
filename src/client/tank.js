import Phaser from 'phaser'
import { lerp } from '@gamestdio/mathf'

const TEXTURE_ANGLE_DIFFERENCE_DEGREES = -90
const INTERPOLATION_PROGRESS = 0.1

export default class Tank extends Phaser.GameObjects.Sprite {
  constructor(scene, state){
    super(scene, state.point.x, state.point.y, 'tank')

    this.state = state
    this.angle = state.angle + TEXTURE_ANGLE_DIFFERENCE_DEGREES

    scene.add.existing(this)
  }

  update(time, delta){
    this.x = lerp(this.x, this.state.point.x, INTERPOLATION_PROGRESS)
    this.y = lerp(this.y, this.state.point.y, INTERPOLATION_PROGRESS)
    this.angle = this.state.angle + TEXTURE_ANGLE_DIFFERENCE_DEGREES
  }
}
