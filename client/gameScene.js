///<reference path="phaser.d.ts" />
import Phaser from 'phaser'

import PlayerController from './playerController'
import Player from './player'

export default class GameScene extends Phaser.Scene {
  constructor(){
    super('main')

    this.players = {}
  }

  preload() {
    this.load.image('tank', 'assets/tank_red.png')  
    this.load.image('grass', 'assets/tileGrass1.png')  // TODO: remove this as this is just a marker
  }

  create() {

    this.add.image(300, 300, 'grass') // TODO: remove this as this is just a marker

    this.room = this.registry.get('room')

    for (let playerID in this.room.state.players){
      this.createPlayer(playerID, this.room.state.players[playerID])
    }

    this.room.listen('players/:id', (change) => this.changePlayer(change))

    if(this.room.state.players[this.room.sessionId])
      this.assignPlayer()
  }

  update(time, delta){
    if(this.playerController){
      this.playerController.update(time, delta)
    }

    for (let playerID in this.players){
      this.players[playerID].update(time, delta)
    }
  }

  assignPlayer(){
    let tank = this.players[this.room.sessionId].tank
    this.playerController = new PlayerController(this.registry.get('room'), this)
    this.cameras.main.startFollow(tank)
  }

  changePlayer(change){
    if (change.operation === 'add') {
      this.createPlayer(change.path.id, change.value)
    } else if (change.operation === 'remove') {
      this.removePlayer(change.path.id)
    }
  }

  removePlayer(id){
    delete this.players[ id ] 
  }

  createPlayer(id, value){
    this.players[ id ] = new Player(this, id, value)
  }
}
 

