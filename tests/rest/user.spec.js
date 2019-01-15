const {expect} = require('chai')
const fetch = require('../../src/fetch')
const config = require('../../config/env')
const host = `http://localhost:${config.server.port}`
const db = require('../../src/db')
const operator = require('../data/operator')

const wait = require('../../src/util/wait')

describe('user controller', () => {
  let token
  let refreshToken
  it('save, delete', async() => {    
    let rest = await fetch(`${host}/bb/user`, {method: 'post', body: 'username=aaa&password=aaaaaa', headers: {authorization: token}})
    expect(rest.code).to.be.deep.equal('SUCCESS')
    let _id = rest.data    
    rest = await fetch(`${host}/bb/user/${_id}`, {method: 'delete', headers: {authorization: token}})
    expect(rest.code).to.be.deep.equal('SUCCESS')
  })
  
  it('list', async() => {
    let rest = await fetch(`${host}/bb/user`, {headers: {authorization: token}})
    expect(rest.code).to.be.deep.equal('SUCCESS')
    expect(rest.data.length).to.be.deep.equal(1)
  })

  it('findById, update', async() => {
    let rest = await fetch(`${host}/bb/user`, {headers: {authorization: token}})
    let _id = rest.data[0]._id
    let username = rest.data[0].username

    rest = await fetch(`${host}/bb/user/${_id}`, {headers: {authorization: token}})
    expect(rest.code).to.be.deep.equal('SUCCESS')
    expect(rest.data.username).to.be.deep.equal(username)
    rest = await fetch(`${host}/bb/user/${_id}`, {method: 'put', body: 'username=aaa', headers: {authorization: token}})
    expect(rest.code).to.be.deep.equal('SUCCESS')

    rest = await fetch(`${host}/bb/user/${_id}`, {headers: {authorization: token}})
    expect(rest.data.username).to.be.deep.equal('aaa')

    await fetch(`${host}/bb/user/${_id}`, {method: 'put', body: `username=${username}`, headers: {authorization: token}})
  })

  it('findById: not exists', async() => {
    let rest = await fetch(`${host}/bb/user/537eed02ed345b2e039652d5`, {headers: {authorization: token}})
    expect(rest.code).to.be.deep.equal('SUCCESS')
    expect(rest.data.name).to.be.not.ok
  })

  it('login', async() => {
    let rest = await fetch(`${host}/bb/login`, {method: 'post', body: 'username=admin&password=111111'})
    expect(rest.code).to.be.deep.equal('SUCCESS')
    expect(rest.data.token).to.be.ok
    expect(rest.data.refreshToken).to.be.ok
    
  })
  it('refresh token', async() => {
    let rest = await fetch(`${host}/bb/token/refresh`, {method: 'post', body: `refreshToken=${refreshToken}`, headers: {authorization: token}})
    expect(rest.code).to.be.deep.equal('SUCCESS')
    expect(rest.data.token).to.be.deep.not.equal(token)
    expect(rest.data.refreshToken).to.be.deep.not.equal(refreshToken)
    let unauthRest = await fetch(`${host}/bb/user/537eed02ed345b2e039652d5`, {headers: {authorization: token}})
    expect(unauthRest.code).to.be.deep.equal('UNAUTH')
    token = `Bearer ${rest.data.token}`
  })
  it('logout', async() => {
    let rest = await fetch(`${host}/bb/logout`, {method: 'post', headers: {authorization: token}})
    expect(rest.code).to.be.deep.equal('SUCCESS')    
    let unauthRest = await fetch(`${host}/bb/user/537eed02ed345b2e039652d5`, {headers: {authorization: token}})
    expect(unauthRest.code).to.be.deep.equal('UNAUTH')    
    rest = await fetch(`${host}/bb/login`, {method: 'post', body: 'username=admin&password=111111'})
    token = `Bearer ${rest.data.token}`   
    refreshToken = rest.data.refreshToken 
  })

  it('save FAIL: username exists', async() => {
    let rest = await fetch(`${host}/bb/user`, {method: 'post', body: 'username=admin&password=aaaaaa', headers: {authorization: token}})
    expect(rest.code).to.be.deep.equal('FAIL')
  })
  it('save FAIL: username too long', async() => {
    let rest = await fetch(`${host}/bb/user`, {method: 'post', body: 'username=chikagea23s1df23a1s32df1sad5fv1sa856v1sa38e13f51a5seg13ad5s1g352sad153&password=aaaaaa', headers: {authorization: token}})
    expect(rest.code).to.be.deep.equal('PARAM')
  })
  it('update FAIL: username too long', async() => {
    let rest = await fetch(`${host}/bb/user`, {headers: {authorization: token}})
    let _id = rest.data[0]._id
    rest = await fetch(`${host}/bb/user/${_id}`, {method: 'put', body: 'username=chikagea23s1df23a1s32df1sad5fv1sa856v1sa38e13f51a5seg13ad5s1g352sad153', headers: {authorization: token}})
    expect(rest.code).to.be.deep.equal('PARAM')
  })
  it('login FAIL: username password incorrect', async() => {
    let rest = await fetch(`${host}/bb/login`, {method: 'post', body: 'username=admin&password=222222'})
    expect(rest.code).to.be.deep.equal('USERNAME_PASSWORD_INCORRECT')    
  })
  before(async() => {
    await db.drop()
    operator.saveUser()
    await wait(50) // 不然有可能数据还没插进去
    let rest = await fetch(`${host}/bb/login`, {method: 'post', body: 'username=admin&password=111111'})    
    token = `Bearer ${rest.data.token}`   
    refreshToken = rest.data.refreshToken 
  })
  after(async() => {
    await db.drop()
  })
})