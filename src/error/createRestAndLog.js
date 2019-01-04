const log = require('../log')
module.exports = async (err) => {
  let result = {}
  switch (err.name) {
  case 'PARAM': 
  case 'FAIL':
  case 'UNAUTH':
    result = process.env.NODE_ENV === 'prod' ? {code: err.name} : {code: err.name, message: err.message}
    log.w(`${err.name}---${err.message}`, err.stack.split('\n').filter(e => e.includes('/projectname/src')).join('\n')) // todo filter的作用是只保留项目错误
    break
  case 'BIZ':
    result = {code: err.message}
    log.i(err.name + err.message)
    break
  default:
    result = process.env.NODE_ENV === 'prod' ? {code: 'UNKNOWN'} : {code: err.name, message: err.message} 
    log.e(err.name, err.stack)
  }
  return result
}