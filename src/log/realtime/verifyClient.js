module.exports = info =>{
  // todo
  // 给访问实时日志的人加入访问限制
  // 可以验证创建连接时候的路径，携带 token...
  return info.req.url.indexOf('/adminpath/log')===0
}