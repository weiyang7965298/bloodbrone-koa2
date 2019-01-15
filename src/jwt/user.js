const jwt = require('jsonwebtoken')
const key = 'player'
module.exports = {
  sign: (payload) => {
    payload.date = new Date().getTime() // 防止同用户1token一样
    return jwt.sign(payload, key, {expiresIn: '1h'})
  },
  verify: (auth) => {
    try {
      let token = auth.indexOf('Bearer')===0 ? auth.substring('Bearer '.length) : auth      
      return jwt.verify(token, key)
    } catch (err) {      
      return null
    }
  }
}