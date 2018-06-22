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
    if (this.tank)
      this.tank.setData(data.tank)
    else
      this.tank = new Tank(data.tank)
    super.setData(data)
  }
}
