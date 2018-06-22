const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const path = require('path')

const app = express()
const server = new http.Server(app)
const io = socketio(server)

const clientPath = path.join(process.cwd(), 'dist/')

const Game = require('../imports/gameState')

app.use(express.static(clientPath))

module.exports = class Server {
  constructor(){
    this.game = new Game()

    this.start()
  }

  start () {
    app.get('/', (req, res) => {
      res.sendFile('index.html')
    })
    io.on('connection', (socket) => {
      console.log('a user connected')
      socket.on('disconnect', () => {
        console.log('user disconnected')
      })

      socket.on('update:tank', (data) => {
        let player = this.game.players.filter((player) => player.tank.uid == data.uid)[0]
        if(player) {
          console.error('updated player')
          player.tank.setData(data)
          io.emit('update:tank', player.tank)
        } else {
          console.error('player does not exist')
        }
      })

      let newPlayer = this.game.newPlayer()

      io.emit('update:game', this.game.data)
      socket.emit('assign-player', newPlayer.data)    
    })
    server.listen(3000, () => {
      console.log('listening on *:3000')
    })
  }
}
