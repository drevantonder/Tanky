const uuidV4 = require('uuid/v4')

module.exports = {
  getUID(){
    return uuidV4()
  }
}
