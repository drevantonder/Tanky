///<reference path="phaser.d.ts" />
import Phaser from 'phaser'

const ROTATE_SPEED = 4
const MOVE_SPEED = 10

const TEXTURE_ANGLE_DIFFERENCE_DEGREES = -90
const TEXTURE_ANGLE_DIFFERENCE_RADIANS = TEXTURE_ANGLE_DIFFERENCE_DEGREES * Math.PI / 180

export default class Tank extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture){
    super(scene, x, y, texture)

    scene.add.existing(this)
  }

  rotateRight(){
    this.angle += ROTATE_SPEED
  }

  rotateLeft(){
    this.angle -= ROTATE_SPEED
  }

  forward(){
    let rotation = this.rotation + TEXTURE_ANGLE_DIFFERENCE_RADIANS
    this.x += Math.cos(rotation) * MOVE_SPEED
    this.y += Math.sin(rotation) * MOVE_SPEED
  }

  backward(){
    let rotation = this.rotation + TEXTURE_ANGLE_DIFFERENCE_RADIANS
    this.x -= Math.cos(rotation) * MOVE_SPEED
    this.y -= Math.sin(rotation) * MOVE_SPEED
  }
}
