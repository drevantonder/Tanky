const GameObject = require('./gameObject')

const utils = require('./utils')

module.exports = class Tank extends GameObject {
  constructor(){
    super()
    this.uid = utils.getUID()
  }

  get data(){
    return {
      uid: this.uid,
      smile: true
    }
  }
}
