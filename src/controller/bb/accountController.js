const Router = require('koa-router')
const router = new Router()

const jwt = require('jsonwebtoken')
const randtoken = require('rand-token')

const service = require('../../service/userService')
const valid = require('../../valid')

const bizError = require('../../error/bizError')

const refreshTokenMap = require('../../store/refreshTokenMap')
const blacklist = require('../../store/bbBalckList')

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

router.post('/bb/login', async(ctx, next) => {
  let e = {
    username: ctx.params.username,
    password: ctx.params.password,
  }
  valid.string('user.username', e.username).is().lengthIn(1, 50)
  valid.string('user.password', e.password).is().lengthIn(1, 50)
  let exists = await service.findByUsernameAndPassword(e)
  if (exists.isNull) throw new bizError('USERNAME_PASSWORD_INCORRECT')
  let token = jwt.sign({_id: exists._id, date: new Date().getTime()}, 'bb', {expiresIn: '1h'})
  let refreshToken = randtoken.uid(256)
  refreshTokenMap.save(refreshToken, exists._id)
  ctx.ok({token, refreshToken})
})

router.post('/bb/token/refresh', async(ctx, next) => {
  let refreshToken = ctx.params.refreshToken
  valid.string('refreshToken', refreshToken).is().lengthIs(256)
  let _id = refreshTokenMap.get(refreshToken)
  if (!_id) {
    ctx.ok()
    return
  }
  let token = jwt.sign({_id: _id}, 'bb', {expiresIn: '1h'})
  refreshToken = randtoken.uid(256)
  refreshTokenMap.save(refreshToken, _id)
  blacklist.save(ctx.request.header.authorization, ctx.params.loginUser.exp)
  ctx.ok({token, refreshToken})
})

router.post('/bb/logout', async(ctx, next) => {
  refreshTokenMap.remove(ctx.params.refreshToken)
  if (!ctx.params.loginUser) {    
    ctx.ok()
    return
  }
  blacklist.save(ctx.request.header.authorization, ctx.params.loginUser.exp)
  ctx.ok()
})
module.exports = router