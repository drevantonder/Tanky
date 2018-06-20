module.exports = class GameObject {
  getData(){
    return {}
  }

  toJSON() {
    return JSON.stringify(this.getData())
  }

  fromJSON(json){
    var data = JSON.parse(json)
    return new this.constructor(...data)
  }
}
