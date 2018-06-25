///<reference path="phaser.d.ts" />
import Phaser from 'phaser'

import Tank from './tank'
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
      this.createPlayer(playerID)
    }

    console.log(this.room.state)

    this.room.listen('players/:id', (change) => this.changePlayer(change))

    this.room.listen('players/' + this.room.sessionId, (change) => this.assignPlayer(change.value))

    if(this.room.state.players[this.room.sessionId])
      this.assignPlayer(this.room.state.players[this.room.sessionId])
    
  }

  update(){
    if(this.playerController){
      this.playerController.update()
    }

    for (let playerID in this.players){
      this.players[playerID].update()
    }
  }

  assignPlayer(player){
    console.log('player: ', player)

    let tank = this.players[this.room.sessionId].tank
    this.playerController = new PlayerController(this.registry.get('room'), this)
    this.cameras.main.startFollow(tank)
  }

  changePlayer(change){
    console.log('Player Change: ', change)
    if (change.operation === 'add') {
      this.createPlayer(change.path.id)
    } else if (change.operation === 'replace') {
      console.log('hello')
    } else if (change.operation === 'remove') {
      this.removePlayer(change.path.id)
    }
  }

  removePlayer(id){
    console.log('Removing Player: ', id)
    delete this.players[ id ] 
  }

  createPlayer(id){
    console.log('Creating Player: ', id)
    this.players[ id ] = new Player(this, id, this.room.state.players[id])
  }
}
 

