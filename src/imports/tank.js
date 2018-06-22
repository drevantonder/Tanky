const State = require('./state')

module.exports = class Tank extends State {
  constructor(data = { x: 0, y: 0 }){
    super(data)
    this.x = data.x
    this.y = data.y
  }

  get data(){
    return Object.assign({
      x: this.x,
      y: this.y
    }, super.data)
  }
}
