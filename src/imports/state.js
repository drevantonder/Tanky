const EventEmitter = require('events')
const utils = require('./utils')

module.exports = class State extends EventEmitter {
  constructor(data = {}){
    super()
    this.setData(data)
  }

  get data(){
    return {
      uid: this.uid
    }
  }

  setData(data){
    this.uid = data.uid ? data.uid : utils.getUID()
    this.emit('update', this)
  }
}
