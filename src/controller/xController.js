const Router = require('koa-router')
const router = new Router()

const service = require('../service/xService')
const valid = require('../valid')

const fetch = require('../fetch')
const config = require('../config/env')

router.post('/xxx', async(ctx, next) => {
  let e = {
    userid: ctx.params.userid,
    name: ctx.params.name,
    age: ctx.params.age,
  }
  valid.string('xxx.userid', e.userid).is().mongoId()
  valid.number('xxx.age', e.age).is().in(100)
  valid.string('xxx.name', e.name).is().lengthIn(1, 20)
  e = await service.save(e)
  ctx.ok(e._id)
})

router.put('/xxx', async(ctx, next) => {
  let e = {
    _id: ctx.params._id,
    name: ctx.params.name,
  }
  if (!e.name) {
    let rest = await fetch(`${config.site.other1}/api/user/${e._id}`, {headers: {apikey: config.site.other1.apikey}})
    e.name = rest.data.name
  }
  let success = await service.update(e)
  ctx.ok(success)
})

module.exports = router