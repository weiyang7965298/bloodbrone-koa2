const Router = require('koa-router')
const router = new Router()

// const jwt = require('jsonwebtoken')
// const randtoken = require('rand-token')

// const service = require('../../service/userService')
// const valid = require('../../valid')

// const bizError = require('../../error/bizError')

// const blacklist = require('../../store/userBalckList')

// // 这个还没弄
// let refreshTokenMap = {}
// router.post('/login', async(ctx, next) => {
//   let e = {
//     username: ctx.params.username,
//     password: ctx.params.password,
//   }
//   valid.string('user.username', e.username).is().lengthIn(1, 50)
//   valid.string('user.password', e.password).is().lengthIn(1, 50)
//   let exists = await service.findByUsernameAndPassword(e)
//   if (exists.isNull) throw new bizError('USERNAME_PASSWORD_INCORRECT')
//   let token = jwt.sign({_id: exists._id, date: new Date().getTime()}, 'player', {expiresIn: '1h'})
//   let refreshToken = randtoken.uid(256)
//   refreshTokenMap[refreshToken] = exists._id  
//   ctx.ok({token, refreshToken})
// })

// router.post('/token/refresh', async(ctx, next) => {
//   let refreshToken = ctx.params.refreshToken
//   valid.string('refreshToken', refreshToken).is().lengthIs(256)
//   let _id = refreshTokenMap[refreshToken]
//   if (!_id) {
//     ctx.ok()
//     return
//   }
//   let token = jwt.sign({_id: _id}, 'player', {expiresIn: '1h'})
//   refreshToken = randtoken.uid(256)
//   refreshTokenMap[refreshToken] = _id
//   blacklist.save(ctx.request.header.authorization, ctx.params.loginUser.exp)
//   ctx.ok({token, refreshToken})
// })

// router.post('/logout', async(ctx, next) => {
//   delete refreshTokenMap[ctx.params.refreshToken]
//   if (!ctx.params.loginUser) {    
//     ctx.ok()
//     return
//   }
//   blacklist.save(ctx.request.header.authorization, ctx.params.loginUser.exp)
//   ctx.ok()
// })

module.exports = router