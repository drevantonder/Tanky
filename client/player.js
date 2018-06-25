///<reference path="phaser.d.ts" />
import Phaser from 'phaser'
import Tank from './tank'

export default class Player extends Phaser.GameObjects.GameObject {
  constructor(scene, id, value){
    super(scene, 'player')

    this.id = id
    this.name = value.name

    //this.tank = new Tank(scene, value.tank)
  }
}
