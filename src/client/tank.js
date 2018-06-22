///<reference path="phaser.d.ts" />
import Phaser from 'phaser'

const ROTATE_SPEED = 4
const MOVE_SPEED = 10

const TEXTURE_ANGLE_DIFFERENCE_DEGREES = -90
const TEXTURE_ANGLE_DIFFERENCE_RADIANS = TEXTURE_ANGLE_DIFFERENCE_DEGREES * Math.PI / 180

export default class Tank extends Phaser.GameObjects.Sprite {
  constructor(scene, tank){
    super(scene, tank.x, tank.y, 'tank')

    this.tank = tank
    this.angle = this.tank.angle

    scene.add.existing(this)

    this.tank.on('update', (tank) => {
      this.x = tank.x,
      this.y = tank.y,
      this.angle = tank.angle
    })
  }

  updateState(){
    this.tank.setData({
      x: this.x,
      y: this.y,
      angle: this.angle, 
      uid: this.tank.uid
    })
  }

  rotateRight(){
    this.angle += ROTATE_SPEED

    this.updateState()
  }

  rotateLeft(){
    this.angle -= ROTATE_SPEED

    this.updateState()
  }

  forward(){
    let rotation = this.rotation + TEXTURE_ANGLE_DIFFERENCE_RADIANS
    this.x += Math.cos(rotation) * MOVE_SPEED
    this.y += Math.sin(rotation) * MOVE_SPEED

    this.updateState()
  }

  backward(){
    let rotation = this.rotation + TEXTURE_ANGLE_DIFFERENCE_RADIANS
    this.x -= Math.cos(rotation) * MOVE_SPEED
    this.y -= Math.sin(rotation) * MOVE_SPEED

    this.updateState()
  }
}
