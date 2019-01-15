const crypto = require('crypto')
const salt = 'bb'
module.exports = {
  digest: (v) => {
    const hash = crypto.createHash('sha512')
    hash.update(v + salt)
    return hash.digest('hex')
 
  }
}