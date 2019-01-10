const {expect} = require('chai')
const fetch = require('../../src/fetch')
const config = require('../../config/env')
const host = `http://localhost:${config.server.port}`
const db = require('../../src/db')
const operator = require('../data/operator')

describe('user controller', () => {
  it('save, delete', async() => {
    let rest = await fetch(`${host}/bb/user`, {method: 'post', body: 'username=aaa&password=aaaaaa'})
    expect(rest.code).to.be.deep.equal('SUCCESS')
    let _id = rest.data    
    rest = await fetch(`${host}/bb/user/${_id}`, {method: 'delete', })
    expect(rest.code).to.be.deep.equal('SUCCESS')
  })
  
  it('list', async() => {
    let rest = await fetch(`${host}/bb/user`)    
    expect(rest.code).to.be.deep.equal('SUCCESS')
    expect(rest.data.length).to.be.deep.equal(1)
  })

  it('findById, update', async() => {
    let rest = await fetch(`${host}/bb/user`)
    let _id = rest.data[0]._id
    let username = rest.data[0].username

    rest = await fetch(`${host}/bb/user/${_id}`)
    expect(rest.code).to.be.deep.equal('SUCCESS')
    expect(rest.data.username).to.be.deep.equal(username)
    rest = await fetch(`${host}/bb/user/${_id}`, {method: 'put', body: 'username=aaa'})
    expect(rest.code).to.be.deep.equal('SUCCESS')

    rest = await fetch(`${host}/bb/user/${_id}`)
    expect(rest.data.username).to.be.deep.equal('aaa')

    await fetch(`${host}/bb/user/${_id}`, {method: 'put', body: `username=${username}`})
  })

  it('findById: not exists', async() => {
    let rest = await fetch(`${host}/bb/user/537eed02ed345b2e039652d5`)    
    expect(rest.code).to.be.deep.equal('SUCCESS')
    expect(rest.data.name).to.be.not.ok
  })

  it('login', async() => {
    let rest = await fetch(`${host}/login`, {method: 'post', body: 'username=admin&password=aaaaaa'})
    expect(rest.code).to.be.deep.equal('SUCCESS')
    expect(rest.data).to.be.ok
    // token 长度
  })
  // it('logout', async() => {
  //   let rest = await fetch(`${host}/logout`, {method: 'post', headers: {Authorization: 'Bearer aaaaa'}})
  //   expect(rest.code).to.be.deep.equal('SUCCESS')

  // })

  it('save FAIL: username exists', async() => {
    let rest = await fetch(`${host}/bb/user`, {method: 'post', body: 'username=admin&password=aaaaaa'})
    expect(rest.code).to.be.deep.equal('FAIL')
  })
  it('save FAIL: username too long', async() => {
    let rest = await fetch(`${host}/bb/user`, {method: 'post', body: 'username=chikagea23s1df23a1s32df1sad5fv1sa856v1sa38e13f51a5seg13ad5s1g352sad153&password=aaaaaa'})
    expect(rest.code).to.be.deep.equal('PARAM')
  })
  it('update FAIL: username too long', async() => {
    let rest = await fetch(`${host}/bb/user`)
    let _id = rest.data[0]._id
    rest = await fetch(`${host}/bb/user/${_id}`, {method: 'put', body: 'username=chikagea23s1df23a1s32df1sad5fv1sa856v1sa38e13f51a5seg13ad5s1g352sad153'})
    expect(rest.code).to.be.deep.equal('PARAM')
  })

  before(async() => {
    await db.drop()
    operator.saveUser()
  })
  after(async() => {
    await db.drop()
  })
})