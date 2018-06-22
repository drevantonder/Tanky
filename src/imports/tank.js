const State = require('./state')

module.exports = class Tank extends State {
  constructor(data = { x: 0, y: 0 }){
    super(data)
  }

  get data(){
    return Object.assign({
      x: this.x,
      y: this.y
    }, super.data)
  }

  setData(data){
    this.x = data.x
    this.y = data.y
    super.setData(data)
  }
}
