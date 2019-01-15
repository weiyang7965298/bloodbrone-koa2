const Router = require('koa-router')
const router = new Router()

const weaponController = require('../controller/everyone/weaponController')
router.use('', weaponController.routes(), weaponController.allowedMethods())

const userController = require('../controller/everyone/accountController')
router.use('', userController.routes(), userController.allowedMethods())

module.exports = router