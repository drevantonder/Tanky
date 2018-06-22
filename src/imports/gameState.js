const State = require('./state')
const PlayerState = require('./playerState')

module.exports = class GameState extends State {
  constructor(data = { players: [] }){
    super(data)
  }

  newPlayer(){
    let newPlayer = new PlayerState()
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
          this.players.push(new PlayerState(playerData))
        }
      }
    } else {
      this.players = []
      data.players.forEach(player => this.players.push(new PlayerState(player)))
    }
    super.setData(data)
  }
}
