const Tank = require('./tank')
const GameObject = require('./gameObject')

module.exports = class Player extends GameObject {
  constructor(){
    super()
    this.tank = new Tank()
  }

  getData(){
    return {
      tank: this.tank.toJSON()
    }
  }
}
