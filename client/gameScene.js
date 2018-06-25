///<reference path="phaser.d.ts" />
import Phaser from 'phaser'

import Tank from './tank'
import PlayerController from './playerController'
import Player from './player'

export default class GameScene extends Phaser.Scene {
  constructor(){
    super('main')

    this.players = []
    this.tanks = []
  }

  preload() {
    this.load.image('tank', 'assets/tank_red.png')  
    this.load.image('grass', 'assets/tileGrass1.png')  // TODO: remove this as this is just a marker
  }

  create() {
    this.add.image(300, 300, 'grass') // TODO: remove this as this is just a marker

    this.setState(this.registry.values.state)
    //this.registry.get('state').on('update', (game) => this.updateGame(game))

    let player = this.registry.values.player
    let tank = new Tank(this, player.tank)
    this.playerController = new PlayerController(tank, this)
    this.cameras.main.startFollow(tank)
  }

  update(){
    if(this.playerController){
      this.playerController.update()
    }
  }

  setState(gameState){
    gameState.players.forEach((playerState) => this.createPlayer(playerState))
  }

  createPlayer(playerState){
    this.players.push(new Player(this, playerState))
  }
}
 

