///<reference path="phaser.d.ts" />
import Phaser from 'phaser'

import Tank from './tank'
import PlayerController from './playerController'
import Player from './player'

export default class GameScene extends Phaser.Scene {
  constructor(){
    super('main')

    this.players = {}
    this.tanks = {}
  }

  preload() {
    this.load.image('tank', 'assets/tank_red.png')  
    this.load.image('grass', 'assets/tileGrass1.png')  // TODO: remove this as this is just a marker
  }

  create() {
    this.add.image(300, 300, 'grass') // TODO: remove this as this is just a marker

    this.room = this.registry.get('room')

    for (let playerID in this.room.state.players){
      console.log(this.room.state.players[playerID])
      this.createPlayer(playerID, this.room.state.players[playerID])
    }

    console.log(this.room.state)

    for (let playerID in this.room.state.tanks){
      console.log(this.room.state.tanks[playerID])
    }

    this.room.listen('players/:id', (change) => this.changePlayer(change))
    this.room.listen('tanks/:id', (change) => console.log(change))

    this.room.listen('players/' + this.room.sessionId, (change) => this.assignPlayer(change.value))

    if(this.room.state.players[this.room.sessionId])
      this.assignPlayer(this.room.state.players[this.room.sessionId])
    
  }

  update(){
    if(this.playerController){
      this.playerController.update()
    }
  }

  assignPlayer(player){
    console.log('player: ', player)

    let tank = new Tank(this, player.tank)
    this.playerController = new PlayerController(this.registry.get('room'), this)
    this.cameras.main.startFollow(tank)
  }

  changePlayer(change){
    console.log(change)
    if (change.operation === 'add') {
      this.createPlayer(change.path.id, change.value)
    } else if (change.operation === 'replace') {
      console.log('hello')
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
 

