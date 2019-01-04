const log = require('../../log')
module.exports = async (ctx, next) => {
  ctx.log = log
  await next()
}