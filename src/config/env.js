process.env.NODE_ENV = 'dev'

module.exports = require('toml').parse(
  require('fs').readFileSync(
    require('path').join(__dirname, `./${process.env.NODE_ENV}.toml`),
    'utf-8'
  )
)