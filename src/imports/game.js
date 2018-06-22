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
    this.players = []
    data.players.forEach(player => this.players.push(new Player(player)))
  }
}
