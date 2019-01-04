const fetch = require('node-fetch')
const fetchError = require('./fetchError')

module.exports = async(url, options) => {
  try {
    let response = await fetch(url, options)
    return response.ok ? response.json() : fetchError.createRest(response.status, response.statusText)
  } catch(err) {
    return fetchError.createRest(null, err)
  }
}