class paramError extends Error {
  constructor(message) {
    super(message)
    this.name = 'PARAM'
  }
}

module.exports = paramError