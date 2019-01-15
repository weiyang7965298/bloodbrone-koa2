const Router = require('koa-router')
const router = new Router()

const jwt = require('jsonwebtoken')
const randtoken = require('rand-token')

const service = require('../../service/accountService')
const valid = require('../../valid')

const blacklist = require('../../store/userBalckList')
const refreshTokenMap = require('../../store/refreshTokenMap')

router.get('/account/me', async(ctx, next) => {
  let e = {
    _id: ctx.params.loginUser._id
  }
  let user = await service.findById(e)  
  ctx.ok(user)
})

router.post('/login', async(ctx, next) => {
  let e = {
    username: ctx.params.username,
    password: ctx.params.password,
  }
  valid.string('user.username', e.username).is().lengthIn(1, 50)
  valid.string('user.password', e.password).is().lengthIn(1, 50)
  let player = await service.login(e)
  let token = jwt.sign({_id: player._id, date: new Date().getTime()}, 'player', {expiresIn: '1h'})
  let refreshToken = randtoken.uid(256)
  refreshTokenMap.save(refreshToken, player._id)
  ctx.ok({token, refreshToken})
})

router.post('/token/refresh', async(ctx, next) => {
  let refreshToken = ctx.params.refreshToken
  valid.string('refreshToken', refreshToken).is().lengthIs(256)
  let _id = refreshTokenMap.get(refreshToken)
  if (!_id) {
    ctx.ok()
    return
  }
  let token = jwt.sign({_id: _id}, 'player', {expiresIn: '1h'})
  refreshToken = randtoken.uid(256)
  refreshTokenMap.save(refreshToken, _id)
  blacklist.save(ctx.request.header.authorization, ctx.params.loginUser.exp)
  ctx.ok({token, refreshToken})
})

router.post('/logout', async(ctx, next) => {
  refreshTokenMap.remove(ctx.params.refreshToken)
  if (!ctx.params.loginUser) {    
    ctx.ok()
    return
  }
  blacklist.save(ctx.request.header.authorization, ctx.params.loginUser.exp)
  ctx.ok()
})

module.exports = router