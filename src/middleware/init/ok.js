module.exports = async (ctx, next) => {
  ctx.ok = data => {
    ctx.body = {code: 'SUCCESS', data: data}
  }
  await next()
}