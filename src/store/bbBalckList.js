/**
 * 后期可替换为redis，memcached
 */
let list = []
module.exports = {
  save: (k, exp) => {
    k = `${k}`
    list.push({k, exp})
    list.sort((a, b) => b.exp - a.exp)    
  },
  check: (k) => {      
    k = `${k}`
    return list.find(e => k === e.k) ? true : false
  },
  clean: () => {
    let time = new Date().getTime()
    let i = list.findIndex(e => e.exp > time)
    list.length = i
  }
}