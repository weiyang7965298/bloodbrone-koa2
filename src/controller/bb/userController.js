const Router = require('koa-router')
const router = new Router()

const service = require('../../service/userService')
const valid = require('../../valid')

router.post('/bb/user', async(ctx, next) => {
  let e = {
    username: ctx.params.username,
    password: ctx.params.password,
  }
  valid.string('user.username', e.username).is().lengthIn(1, 50)
  valid.string('user.password', e.password).is().lengthIn(1, 50)
  e = await service.save(e) 
  ctx.ok(e._id)
})

router.delete('/bb/user/:_id', async(ctx, next) => {
  let e = {
    _id: ctx.params._id,
  }
  await service.delete(e)
  ctx.ok()
})

router.put('/bb/user/:_id', async(ctx, next) => {  
  let e = {
    _id: ctx.params._id,
    username: ctx.params.username,
  }
  if (e.username) valid.string('user.username', e.username).is().lengthIn(1, 50)
  if (e.password) valid.string('user.password', e.password).is().lengthIn(1, 50)
  await service.update(e)
  ctx.ok()
})

router.get('/bb/user/:_id', async(ctx, next) => {
  let e = {
    _id: ctx.params._id
  }
  let user = await service.findById(e)
  ctx.ok(user)
})
router.get('/bb/user/count', async(ctx, next) => {
  let filter = {
    name: ctx.params.name || '',
  }
  let count = await service.count(filter)
  ctx.ok(count)
})
router.get('/bb/user', async(ctx, next) => {
  let filter = {
    name: ctx.params.name || '',
    start: parseInt(ctx.params.start) || 0,
    limit: parseInt(ctx.params.limit) || 10
  }
  let list = await service.find(filter)
  ctx.ok(list)
})
module.exports = router