const State = require('./state')
const TankState = require('./tankState')

module.exports = class PlayerState extends State {
  constructor(data = {tank: new TankState()}){
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
      this.tank = new TankState(data.tank)
    super.setData(data)
  }
}
