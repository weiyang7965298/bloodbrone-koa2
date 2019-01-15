const Router = require('koa-router')
const router = new Router()

const weaponController = require('../controller/bb/weaponController')
router.use('', weaponController.routes(), weaponController.allowedMethods())
const userController = require('../controller/bb/accountController')
router.use('', userController.routes(), userController.allowedMethods())

module.exports = router