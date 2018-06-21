const utils = require('../imports/utils')

module.exports = class Tank {
  constructor(){
    this.uid = utils.getUID
    this.x = 0
    this.y = 0
  }

  get data(){
    return {
      uid: this.uid,
      x: this.x,
      y: this.y
    }
  }
}
