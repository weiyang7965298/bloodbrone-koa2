const blacklist = require('../store/userBalckList')
module.exports = async (ctx, next) => {
  let auth = ctx.request.header.authorization
  if (!ctx.url.match(/^\/bb/)) {
    try {      
      let token = auth.indexOf('Bearer')===0 ? auth.substring('Bearer '.length) : auth      
      let decoded = await require('jsonwebtoken').verify(token, 'player')
      ctx.params.loginUser = decoded      
    } catch(err) {
    }
    if (ctx.url.match(/\/player\/me/) || ctx.url.match(/\/account\/me/)) {      
      if (blacklist.check(auth)) throw new (require('../error/unauthError'))('')
      if (!ctx.params.loginUser) throw new (require('../error/unauthError'))('')
    }
  }
  await next()
}