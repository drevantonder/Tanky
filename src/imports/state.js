const EventEmitter = require('events')
const utils = require('./utils')

module.exports = class State extends EventEmitter {
  constructor(data = {}){
    super()
    this.uid = data.uid ? data.uid : utils.getUID()
  }

  get data(){
    return {
      uid: this.uid
    }
  }

  setData(data){
    for(var key in this.data){
      this[key] = data[key]
    }
  }
}
