const model = require('../../../src/model/user')

module.exports = {
  save: () => {
    let data = require('toml').parse(
      require('fs').readFileSync(
        require('path').join(__dirname, './data.toml'),
        'utf-8'
      )
    )  
    data.list.forEach(async e => {
      await new model(e).save()
    })
  }
}