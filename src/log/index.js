const log4js = require('log4js')
const realtime = require('./realtime')

log4js.configure({
  appenders: {
    console: { type: 'console'},
    error: {
      type: 'file',
      filename: __dirname + '/../../../logs/error.log',
      maxLogSize: 104800,
      backups: 100,
    },
    info: {
      type: 'dateFile',
      filename: __dirname + '/../../../logs/info/',
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      maxLogSize: 104800,
      backups: 100,
    }
  },
  categories: {
    error: { appenders: ['error', process.env.NODE_ENV !== 'prod' ? 'console' : ''], level: 'error'},
    info: { appenders: ['info', process.env.NODE_ENV !== 'prod' ? 'console' : ''], level: 'info'},
    default: { appenders: ['console'], level: 'debug'},
  },
  replaceConsole: true,
})

module.exports = {
  c: (name, v) => {
    log4js.getLogger(JSON.stringify(name)).debug(format(v))
    realtime.send(name, v)
  },
  d: (name, v) => {
    log4js.getLogger(JSON.stringify(name)).debug(format(v))
    realtime.send(name, v)
  },
  i: (name, v) => {
    log4js.getLogger(JSON.stringify(name)).info(format(v))
    realtime.send(name, v)
  },
  w: (name, v) => {
    log4js.getLogger(JSON.stringify(name)).warn(format(v))
    realtime.send(name, v)
  },
  e: (name, v) => {
    log4js.getLogger(JSON.stringify(name)).error(format(v))
    realtime.send(name, v)
  },
}
function format(v) {
  v = typeof v === 'object' ? JSON.stringify(v) : v
  v = v ? '\n' + v : ''
  return v
}