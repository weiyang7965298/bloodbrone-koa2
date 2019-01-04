const wsServer = require('ws').Server

const verifyClient = require('./verifyClient')

let ws = null

module.exports = {
  init: (server) => {
    ws  = new wsServer({server, verifyClient: verifyClient})
  },
  send: (name, v) => {
    if (!ws) return
    ws.clients.forEach(e => {
      e.send(JSON.stringify({name, v}))
    })
  }
}