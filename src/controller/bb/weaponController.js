const Router = require('koa-router')
const router = new Router()

const service = require('../../service/weaponService')
const valid = require('../../valid')

router.post('/bb/weapon', async(ctx, next) => {
  let e = {
    name: ctx.params.name,
    phy: ctx.params.phy || 0,
    bld: ctx.params.bld || 0,
  }
  valid.string('weapon.name', e.name).is().lengthIn(1, 20)
  valid.number('weapon.phy', e.phy).is().in(500)
  valid.number('weapon.bld', e.bld).is().in(500)
  e = await service.save(e) 
  ctx.ok(e._id)
})

router.delete('/bb/weapon/:_id', async(ctx, next) => {
  let e = {
    _id: ctx.params._id,
  }
  await service.delete(e)
  ctx.ok()
})

router.put('/bb/weapon/:_id', async(ctx, next) => {  
  let e = {
    _id: ctx.params._id,
    name: ctx.params.name,
    phy: ctx.params.phy,
    bld: ctx.params.bld,
  }
  if (e.name) valid.string('weapon.name', e.name).is().lengthIn(1, 20)
  if (e.phy) valid.number('weapon.phy', e.phy).is().in(500)
  if (e.bld) valid.number('weapon.bld', e.bld).is().in(500)
  await service.update(e)
  ctx.ok()
})
module.exports = router