const Tank = require('./tank')
const GameObject = require('./gameObject')

const utils = require('./utils')

module.exports = class Player extends GameObject {
  constructor(){
    super()
    this.tank = new Tank()
    this.uid = utils.getUID()
  }

  get data(){
    return {
      uid: this.uid,
      tank: this.tank.data
    }
  }
}
