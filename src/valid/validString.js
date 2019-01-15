const paramError = require('../error/paramError')

class validString {
  constructor(name, v) {
    this.name = name
    this.v = v
    this.showV = this.v.length > 50 ? `${this.v.substring(0, 10)}...${this.v.substring(this.v.length-20, this.v.length)}` : this.v
  }
  is() {
    return this.isNotEmpty()
  }
  isNotEmpty() {
    if (!this.v) throw new paramError(`${this.name}: ${this.showV}, can not be empty`)
    return this
  }
  lengthIn(a, b) {
    if (b) {
      let min = Math.min(a, b)
      let max = Math.max(a, b)
      if (this.v.length < min || this.v.length > max) throw new paramError(`${this.name}: ${this.showV}, length must > ${min} && < ${max}`)
    } else {
      if (this.v.length > a)  throw new paramError(`${this.name}: ${this.showV}, length must < ${a}`)
    }
    return this
  }
  lengthIs(a) {
    if (this.v.length !== a) throw new paramError(`${this.name}: ${this.showV}, length must = ${a}`)
    return this
  }
  mongoId() {
    if ((this.v.length === 24 || this.v.length === 12) && isNaN(parseInt(this.v,16))!== true) throw new paramError(`${this.name}: ${this.showV}, must be mongodb id`)
    return this
  }
  of(list) {
    if (!list.includes(this.v)) throw new paramError(`${this.name}: ${this.showV}, must one of ${list}`)
    return this
  }
}

module.exports = validString