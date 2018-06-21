const uuidV4 = require('uuid/v4')

module.exports = {
  getUID(){
    return uuidV4()
  },

  readData(data, key, defaultFunction = () => {}){
    if(data){
      return data[key] ? data[key] : defaultFunction()
    } else {
      return defaultFunction()
    }
  }
}
