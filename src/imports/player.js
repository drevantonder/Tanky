const Tank = require('./tank')
const GameObject = require('./gameObject')

const utils = require('./utils')

module.exports = class Player extends GameObject {
  constructor(data = undefined){
    super()
    this.tank = new Tank(utils.readData(data, 'tank'))
    this.uid = utils.readData(data, 'uid', utils.getUID)
  }

  get data(){
    return {
      uid: this.uid,
      tank: this.tank.data
    }
  }
}
