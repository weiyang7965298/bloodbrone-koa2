const Router = require('koa-router')
const router = new Router()

const service = require('../../service/userService')
const valid = require('../../valid')

router.post('/login', async(ctx, next) => {
  let e = {
    username: ctx.params.username,
    password: ctx.params.password,
  }
  valid.string('user.username', e.username).is().lengthIn(1, 50)
  valid.string('user.password', e.password).is().lengthIn(1, 50)
  let exists = await service.findByUsernameAndPassword(e)
  let token = 
  ctx.ok(exists)
})
router.post('/logout', async(ctx, next) => {
  let e = {
    userid: ctx.params.userid
  }
  // e = await service.logout(e) 
  ctx.ok(e._id)
})
module.exports = router