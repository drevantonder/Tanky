///<reference path="phaser.d.ts" />

import { EventEmitter } from 'events'

export default class PlayerController extends EventEmitter {
  constructor(tank, scene){
    super()
    this.tank = tank
    this.scene = scene

    this.controls = this.scene.input.keyboard.createCursorKeys()
  }

  update(){
    if(this.controls.left.isDown) {
      this.tank.rotateLeft()
    }

    if(this.controls.right.isDown) {
      this.tank.rotateRight()
    }

    if(this.controls.down.isDown) {
      this.tank.forward()
    }

    if(this.controls.up.isDown) {
      this.tank.backward()
    }
  }
}
