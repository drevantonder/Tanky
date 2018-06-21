const Player = require('./player')
const GameObject = require('./gameObject')

module.exports = class Game extends GameObject {
  constructor(){
    super()
    this.players = []    
  }

  newPlayer(data){
    let newPlayer
    if(data){
      newPlayer = Player.fromJSON(data)
    } else {
      newPlayer = new Player()
    }
    
    this.players.push(newPlayer)
    return newPlayer
  }

  getData(){
    let players = []
    for (let i = 0; i < this.players.length; i++) {
      players.push(this.players[i].toJSON())
    }

    return {
      players: players
    }
  }
}
