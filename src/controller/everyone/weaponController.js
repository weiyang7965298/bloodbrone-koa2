const Router = require('koa-router')
const router = new Router()

const service = require('../../service/weaponService')

router.get('/weapon/:_id', async(ctx, next) => {
  let e = {
    _id: ctx.params._id
  }
  let weapon = await service.findById(e)
  ctx.ok(weapon)
})
router.get('/weapon/count', async(ctx, next) => {
  let filter = {
    name: ctx.params.name || '',
  }
  let count = await service.count(filter)
  ctx.ok(count)
})
router.get('/weapon', async(ctx, next) => {
  let filter = {
    name: ctx.params.name || '',
    start: parseInt(ctx.params.start) || 0,
    limit: parseInt(ctx.params.limit) || 10
  }
  let list = await service.find(filter)
  ctx.ok(list)
})

module.exports = router