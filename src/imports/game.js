const State = require('./state')
const Player = require('./player')

module.exports = class Game extends State {
  constructor(data = { players: [] }){
    super(data)
  }

  newPlayer(){
    let newPlayer = new Player()
    this.players.push(newPlayer)
    return newPlayer
  }

  get data(){
    let players = []
    this.players.forEach((player) => players.push(player))
    return Object.assign({
      players
    }, super.data)
  }

  setData(data){
    if(this.players) {
      for (let index = 0; index < data.players.length; index++) {
        const playerData = data.players[index]
        const player = this.players[index]
        if (player)
          player.setData(playerData)
        else {
          this.players.push(new Player(playerData))
        }
      }
    } else {
      this.players = []
      data.players.forEach(player => this.players.push(new Player(player)))
    }
    super.setData(data)
  }
}
