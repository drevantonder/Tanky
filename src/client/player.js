///<reference path="phaser.d.ts" />
import Phaser from 'phaser'
import Tank from './tank'

export default class Player extends Phaser.GameObjects.GameObject {
  constructor(scene, state){
    super(scene, 'player')

    this.state = state

    this.tank = new Tank(scene, state.tank)

    this.state.on('update', () => {
      // TODO: Players Name
    })
  }



}
