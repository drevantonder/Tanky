const State = require('./state')
const Tank = require('./tank')

module.exports = class Player extends State {
  constructor(data = {tank: new Tank()}){
    super(data)
  }

  get data(){
    return Object.assign({
      tank: this.tank.data
    }, super.data)
  }

  setData(data){
    this.tank = data.tank
  }
}
