const {expect} = require('chai')
const fetch = require('../../src/fetch')
const config = require('../../config/env')
const host = `http://localhost:${config.server.port}`
const db = require('../../src/db')
const operator = require('../data/operator')

const wait = require('../../src/util/wait')

xdescribe('account controller', () => {
  let token
  let refreshToken
  it('me', async() => {
    let rest = await fetch(`${host}/account/me`, {headers: {authorization: token}})
    expect(rest.code).to.be.deep.equal('SUCCESS')
    expect(rest.data.username).to.be.deep.equal('aaa')
  })
  it('login', async() => {
    let rest = await fetch(`${host}/login`, {method: 'post', body: 'username=aaa&password=111111'})
    expect(rest.code).to.be.deep.equal('SUCCESS')
    expect(rest.data.token).to.be.ok
    expect(rest.data.refreshToken).to.be.ok
  })
  it('refresh token', async() => {
    let rest = await fetch(`${host}/token/refresh`, {method: 'post', body: `refreshToken=${refreshToken}`, headers: {authorization: token}})
    expect(rest.code).to.be.deep.equal('SUCCESS')
    expect(rest.data.token).to.be.deep.not.equal(token)
    expect(rest.data.refreshToken).to.be.deep.not.equal(refreshToken)
    let unauthRest = await fetch(`${host}/account/me`, {headers: {authorization: token}})
    expect(unauthRest.code).to.be.deep.equal('UNAUTH')
    token = `Bearer ${rest.data.token}`
  })
  it('logout', async() => {
    let rest = await fetch(`${host}/logout`, {method: 'post', headers: {authorization: token}})
    expect(rest.code).to.be.deep.equal('SUCCESS')    
    let unauthRest = await fetch(`${host}/account/me`, {headers: {authorization: token}})
    expect(unauthRest.code).to.be.deep.equal('UNAUTH')    
    rest = await fetch(`${host}/login`, {method: 'post', body: 'username=aaa&password=111111'})
    token = `Bearer ${rest.data.token}`   
    refreshToken = rest.data.refreshToken 
  })

  it('login FAIL: username password incorrect', async() => {
    let rest = await fetch(`${host}/login`, {method: 'post', body: 'username=aaa&password=222222'})
    expect(rest.code).to.be.deep.equal('USERNAME_PASSWORD_INCORRECT')    
  })
  before(async() => {
    await db.drop()
    // 多个测试似乎是同时运行的，数据会重复无法插入
    operator.saveAccount()
    await wait(50) // 不然有可能数据还没插进去
    let rest = await fetch(`${host}/login`, {method: 'post', body: 'username=aaa&password=111111'})    
    token = `Bearer ${rest.data.token}`   
    refreshToken = rest.data.refreshToken   
  })
  after(async() => {
    await db.drop()
  })
})