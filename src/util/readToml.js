
module.exports = (pathFromProjectRoot) => {
  let result = require('toml').parse(
    require('fs').readFileSync(
      require('path').join(__dirname, '../../', pathFromProjectRoot),
      'utf-8'
    )
  )
  return result
}