const Router = require('koa-router')
const router = new Router()

const xController = require('./controller/xController')
router.use('', xController.routes(), xController.allowedMethods())

module.exports = router