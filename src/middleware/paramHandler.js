module.exports = async (ctx, next) => {
  if (ctx.request.body && ctx.request.body.constructor === String) {
    let list = ctx.request.body.split('&')
    ctx.request.body = {}
    list.forEach(e => {
      ctx.request.body[e.split('=')[0]] = e.split('=')[1]
    })
  }
  ctx.params = {...ctx.query, ...ctx.request.body, ...ctx.params}
  await next()
}