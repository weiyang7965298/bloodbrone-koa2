const mongoose = require('mongoose')
const model = mongoose.model('xxx', {name: String, age: Number})

module.exports = model