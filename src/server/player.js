const Tank = require('./tank')

const utils = require('../imports/utils')

module.exports = class Player {
  constructor(){
    this.tank = new Tank()
    this.uid = utils.getUID
  }

  get data(){
    return {
      uid: this.uid,
      tank: this.tank.data
    }
  }
}
