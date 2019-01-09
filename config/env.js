process.env.NODE_ENV = 'dev'

module.exports = require('../src/util/readToml')(`/config/${process.env.NODE_ENV}.toml`)