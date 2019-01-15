const createRestAndLog = require('../error/createRestAndLog')
module.exports = async (ctx, next) => {
  try {
    await next()    
  } catch(err) {        
    let rest = createRestAndLog(err)    
    ctx.body = rest
  }
}