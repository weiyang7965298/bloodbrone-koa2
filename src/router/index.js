const Router = require('koa-router')
const router = new Router()

const everyoneRouter = require('./everyone')
const bbRouter = require('./admin')
router.use('', everyoneRouter.routes(), everyoneRouter.allowedMethods())
router.use('', bbRouter.routes(), bbRouter.allowedMethods())


module.exports = router