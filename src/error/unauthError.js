class unauthError extends Error {
  constructor(message) {
    super(message)
    this.name = 'UNAUTH'
  }
}

module.exports = unauthError