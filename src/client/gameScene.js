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
    this.load.image('tiles', 'assets/terrainTiles_default.png')
  }

  create() {
    this.room = this.registry.get('room')

    this.createMap()

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
    this.playerController = new PlayerController(tank, this.registry.get('room'), this)
    this.cameras.main.startFollow(tank, true, 0.1, 0.1)
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

  createMap(){
    let mapWidth = this.room.state.map.width
    let mapHeight = this.room.state.map.height

    // Creating a blank tilemap with the specified dimensions
    var map = this.make.tilemap({ tileWidth: 64, tileHeight: 64, width: mapWidth, height: mapHeight})

    let tiles = map.addTilesetImage('tiles')

    var layer = map.createBlankDynamicLayer('layer1', tiles)
    layer.setScale(1)

    

    layer.fill(0, 0, 0, map.width, map.height)

    layer = map.convertLayerToStatic(layer)
    layer.setScale(1)

    
  }
}
 

