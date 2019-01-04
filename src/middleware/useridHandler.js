module.exports = async (ctx, next) => {
  // todo
  // 根据需求获取登录者id，可以 header 中获取，也可以解析 token 来获取...
  delete ctx.params.userid
  ctx.params.userid = ctx.header.userid
  await next()
}