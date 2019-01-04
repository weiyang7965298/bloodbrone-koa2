class failError extends Error {
  constructor(message) {
    super(message)
    this.name = 'FAIL'
  }
}

module.exports = failError