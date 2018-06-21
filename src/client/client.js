import io from 'socket.io-client'
var socket = io()

import Game from './game'

export default class Client{
  constructor(){
    this.game = new Game()

    this.createEventHandlers()
  }

  createEventHandlers(){
    socket.on('assign-player', (data) => {
      this.game.player = data
      console.log('assign: ' + this.game.player)
    })

    socket.on('new-player', (data) => {
      this.game.newPlayer(data)
      console.log('new: ' + data)
    })
  }
}




