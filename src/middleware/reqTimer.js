module.exports = async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  ctx.log.i(`${ctx.method} ${ctx.url} - ${ms}ms`)
}