import io from 'socket.io-client'
var socket = io()

import GameState from '../imports/gameState'
import PhaserGame from './PhaserGame'

export default class Client{
  constructor(){
    this.gameState = new GameState()
    this.phaserGame = new PhaserGame(this.gameState)

    this.createSocketEventHandlers()
  }

  createSocketEventHandlers(){
    socket.on('assign-player', (data) => this.assignPlayer(data))
    socket.on('update:game', (data) => this.updateGame(data))
    socket.on('update:tank', (data) => this.updateTank(data))
  }

  assignPlayer(data){
    this.player = this.gameState.players.filter((player) => player.uid == data.uid)[0]
    this.phaserGame.assignPlayer(this.player)

    this.player.tank.on('update', (tank) => {
      socket.emit('update:tank', tank.data)
    })
  }

  updateGame(data){
    this.gameState.setData(data)
    console.log(this.gameState)
  }

  updateTank(data){
    let player = this.gameState.players.filter((player) => player.tank.uid == data.uid)[0]
    if (player && player != this.player) {
      player.tank.setData(data)
    }
  }
}




