import io from 'socket.io-client'
var socket = io()

import Game from './game'

export default class Client{
  constructor(){
    this.game = new Game()

    this.createEventHandlers()
  }

  createEventHandlers(){
    socket.on('new-player', (data) => {
      console.log(data)
      this.game.newPlayer(data)
    })
  }
}




