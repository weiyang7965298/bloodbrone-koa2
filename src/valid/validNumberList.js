const paramError = require('../error/paramError')
class validNumberList {
  constructor(name, ...v) {
    this.name = name
    this.v = v
  }
  are() {
    return this
  }
  notSame() {    
    if (this.v.length !== new Set(this.v).size) throw new paramError(`${this.name}: ${this.v}, must not all same`)    
  }
}
module.exports = validNumberList