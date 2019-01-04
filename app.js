const app = new require('koa')()

app.use(require('koa-body')({multipart: true}))
app.use(require('koa2-cors')())
app.use(require('./src/middleware/init/log'))
app.use(require('./src/middleware/init/ok'))
if (process.env.NODE_ENV !== 'prod') app.use(require('./src/middleware/reqTimer'))
app.use(require('./src/middleware/errorHandler'))
app.use(require('./src/middleware/paramHandler'))
app.use(require('./src/middleware/useridHandler'))
app.use(require('./src/router').routes()).use(require('./src/router').allowedMethods())

const config = require('./src/config/env')
const server = app.listen(config.server.port)

require('./src/log/realtime').init(app.listen(config.server.log.port))

const mongoose = require('mongoose')
let test = true
mongoose.connect(config.db.host, {useNewUrlParser: true})