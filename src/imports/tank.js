const GameObject = require('./gameObject')

const utils = require('./utils')

module.exports = class Tank extends GameObject {
  constructor(data = undefined){
    super()
    this.uid = utils.readData(data, 'uid', utils.getUID)
    this.smile = utils.readData(data, 'smile', () => false)
    this.x = utils.readData(data, 'x', () => 0)
    this.y = utils.readData(data, 'y', () => 0)
  }

  get data(){
    return {
      uid: this.uid,
      x: this.x,
      y: this.y
    }
  }
}
