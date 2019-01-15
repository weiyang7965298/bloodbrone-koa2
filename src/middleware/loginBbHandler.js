const blacklist = require('../store/bbBalckList')
module.exports = async (ctx, next) => {
  let auth = ctx.request.header.authorization
  if (ctx.url.match(/^\/bb/)) {
    if (!ctx.url.includes('/bb/login')) {
      try {
        let token = auth.indexOf('Bearer')===0 ? auth.substring('Bearer '.length) : auth
        let decoded = await require('jsonwebtoken').verify(token, 'bb')
        ctx.params.loginUser = decoded
      } catch(err) {
      }
      if (blacklist.check(auth)) throw new (require('../error/unauthError'))('')
      if (!ctx.params.loginUser) throw new (require('../error/unauthError'))('')
    }
  }
  await next()
}