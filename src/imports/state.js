const EventEmitter = require('events')
const utils = require('./utils')

module.exports = class State extends EventEmitter {
  constructor(data = { uid: utils.getUID() }){
    super()
    this.setData(data)
  }

  get data(){
    return {
      uid: this.uid
    }
  }

  setData(data){
    this.uid = data.uid
  }
}
