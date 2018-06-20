import io from 'socket.io-client'
var socket = io()

socket.on('hello', (data) => {
    console.log(data)
})

import Game from './game'

new Game()
