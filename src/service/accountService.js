const securityUtil = require('../util/securityUtil')
const model = require('../model/user')
const failError = require('../error/failError')
const bizError = require('../error/bizError')

module.exports = {
  save: async(e) => {
    let exists = await model.findOne({username: e.username}, '-__v')    
    if (exists) {
      throw new failError('data exists')
    }
    e.password = securityUtil.digest(e.password)
    e.createAt = Date.now()
    e.updateAt = Date.now()
    e = new model(e)    
    await e.save()
    return e
  },
  delete: async(e) => {
    await model.deleteOne({_id: new model(e).id})
  },
  update: async(e) => {    
    let exists = await model.findOne({_id: e._id}, '-__v')    
    e.updateAt = Date.now()
    let next = new model({...exists, ...e})
    await next.updateOne(next)
  },
  findById: async(e) => {
    return await model.findOne({_id: e._id}, '-__v -password') || model.null
  },
  count: async(filter) => {
    return await model.countDocuments({username: {$regex: `${filter.name}.*`}})
  },
  find: async(filter) => {    
    let result = await model.find({username: {$regex: `${filter.name}.*`}}, '-__v -password').skip(filter.start).limit(filter.limit).sort('name')
    return result
  },

  login: async(e) => {  
    e.password = securityUtil.digest(e.password)      
    let result = await model.findOne({username: e.username, password: e.password}, '-__v -password')    
    if (!result || result.type !== 'player') throw new bizError('USERNAME_PASSWORD_INCORRECT')
    return result
  },
  loginByAdmin: async(e) => {  
    e.password = securityUtil.digest(e.password)      
    let result = await model.findOne({username: e.username, password: e.password}, '-__v -password')
    if (!result || result.type !== 'admin') throw new bizError('USERNAME_PASSWORD_INCORRECT')
    return result
  }
}