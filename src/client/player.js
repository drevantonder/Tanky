///<reference path="phaser.d.ts" />
import Phaser from 'phaser'
import Tank from './tank'

export default class Player extends Phaser.GameObjects.GameObject {
  constructor(scene, id, state){
    super(scene, 'player')

    this.state = state
    this.id = id
    this.name = state.name

    this.tank = new Tank(scene, state.tank)
  }

  update(time, delta){
    this.state = this.scene.registry.get('room').state.players[this.id]
    
    this.name = this.state.name

    this.tank.state = this.state.tank
    this.tank.update(time, delta)
  }
}
