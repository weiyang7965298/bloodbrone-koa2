const Router = require('koa-router')
const router = new Router()

const bbWeaponController = require('../controller/bb/weaponController')
router.use('', bbWeaponController.routes(), bbWeaponController.allowedMethods())

const weaponController = require('../controller/everyone/weaponController')
router.use('', weaponController.routes(), weaponController.allowedMethods())

const bbUserController = require('../controller/bb/userController')
router.use('', bbUserController.routes(), bbUserController.allowedMethods())

module.exports = router