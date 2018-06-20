import io from 'socket.io-client'
var socket = io()

import Player from '../imports/player'

socket.on('new-player', (data) => {
  console.log(new Player(data))
})

import Game from './game'

new Game()
