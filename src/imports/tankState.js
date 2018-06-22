const State = require('./state')

module.exports = class TankState extends State {
  constructor(data = { x: 0, y: 0, angle: 90 }){
    super(data)
  }

  get data(){
    return Object.assign({
      x: this.x,
      y: this.y,
      angle: this.angle
    }, super.data)
  }

  setData(data){
    this.x = data.x
    this.y = data.y
    this.angle = data.angle
    super.setData(data)
  }
}
