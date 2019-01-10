const model = require('../model/user')
const failError = require('../error/failError')

module.exports = {
  save: async(e) => {
    let exists = await model.findOne({username: e.username}, '-__v')    
    if (exists) {
      throw new failError('data exists')
    }
    e = new model(e)
    await e.save()
    return e
  },
  delete: async(e) => {
    await model.deleteOne({_id: new model(e).id})
  },
  update: async(e) => {    
    let exists = await model.findOne({_id: e._id}, '-__v')
    let next = new model({...exists, ...e})    
    await next.updateOne(next)
  },
  findById: async(e) => {
    return await model.findOne({_id: e._id}, '-__v') || model.null
  },
  count: async(filter) => {
    return await model.countDocuments({username: {$regex: `${filter.name}.*`}})
  },
  find: async(filter) => {    
    let result = await model.find({username: {$regex: `${filter.name}.*`}}, '-__v').skip(filter.start).limit(filter.limit).sort('name')
    return result
  },

  findByUsernameAndPassword: async(e) => {    
    let result = await model.findOne({username: e.username, password: e.password}, '-__v')
    return result
  }
}