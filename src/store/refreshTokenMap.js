/**
 * 后期可替换为redis，memcached
 */
let map = {}
module.exports = {
  save: (token, id) => {
    map[token] = id
  },
  remove: (token) => {
    delete map[token]
  },
  get: (token) => {
    return map[token]
  }
}