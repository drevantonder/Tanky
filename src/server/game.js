const Player = require('./player')

module.exports = class Game {
  constructor(){
    this.players = []
  }

  newPlayer(){
    let newPlayer = new Player()
    this.players.push(newPlayer)
    return newPlayer
  }
}
