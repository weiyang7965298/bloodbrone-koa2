const model = require('../model/xxx')
const failError = require('../error/failError')

module.exports = {
  save: async(e) => {
    let exists = await model.findOne({name: e.name}, '-__v')
    if (exists) {
      throw new failError('data exists')
    }
    e = new model(e)
    await e.save()
    return e
  },
  update: async(e) => {
    let exists = await model.findOne({_id: e._id}, '-__v')
    if (!exists) {
      throw new failError('data not exists')
    }
    exists.name = e.name || exists.name
    await exists.updateOne(exists)
    return true
  }
}