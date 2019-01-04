const paramError = require('../error/paramError')
class validNumber {
  constructor(name, v) {
    this.name = name
    this.v = v
  }
  is() {
    return this
  }
  positive() {
    if (this.v <= 0) throw new paramError(`${this.name}: ${this.v}, must > 0`)
    return this
  }
  in(a, b) {
    if (b) {
      let min = Math.min(a, b)
      let max = Math.max(a, b)
      if (this.v < min || this.v > max) throw new paramError(`${this.name}: ${this.v}, must > ${min} && < ${max}`)
    } else {
      if (this.v > a) throw new paramError(`${this.name}: ${this.v}, must < ${a}`)
    }
    return this
  }
}
module.exports = validNumber