const paramError = require('../error/paramError')
class validString {
  constructor(name, v) {
    this.name = name
    this.v = v
  }
  is() {
    return this.isNotEmpty()
  }
  isNotEmpty() {
    if (!this.v) throw new paramError(`${this.name}: ${this.v}, can not be empty`)
    return this
  }
  lengthIn(a, b) {
    if (b) {
      let min = Math.min(a, b)
      let max = Math.max(a, b)
      if (this.v.length < min || this.v.length > max) throw new paramError(`${this.name}: ${this.v}, length must > ${min} && < ${max}`)
    } else {
      if (this.v.length > a)  throw new paramError(`${this.name}: ${this.v}, length must < ${a}`)
    }
    return this
  }
  lengthIs(a) {
    if (this.v.length !== a) throw new paramError(`${this.name}: ${this.v}, length must = ${a}`)
    return this
  }
  mongoId() {
    if (this.v.length < 15 || this.v.length > 30) throw new paramError(`${this.name}: ${this.v}, must be mongodb id`)
    return this
  }
  of(list) {
    if (!list.includes(this.v)) throw new paramError(`${this.name}: ${this.v}, must one of ${list}`)
    return this
  }
}

module.exports = validString