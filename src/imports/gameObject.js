module.exports = class GameObject {
  get data(){
    return {}
  }

  getData(){
    if (super.getData) {
      return Object.assign(this.data, super.getData())
    } else {
      return this.data
    }
  }

  toJSON() {
    return JSON.stringify(this.getData())
  }

  static fromJSON(json){
    var data = JSON.parse(json)
    return new this(data)
  }
}
