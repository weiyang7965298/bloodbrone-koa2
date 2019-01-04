class bizError extends Error {
  constructor(message) {
    super(message)
    this.name = 'BIZ'
  }
}

module.exports = bizError