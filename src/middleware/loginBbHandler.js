const blacklist = require('../store/bbBalckList')
module.exports = async (ctx, next) => {
  let auth = ctx.request.header.authorization
  if (ctx.url.match(/^\/bb/)) {
    if (!ctx.url.includes('/bb/login')) {
      ctx.params.loginUser = require('../jwt/bb').verify(auth)       
      if (blacklist.check(auth)) throw new (require('../error/unauthError'))('')
      if (!ctx.params.loginUser) throw new (require('../error/unauthError'))('')
    }
  }
  await next()
}