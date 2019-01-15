const mongoose = require('mongoose')
const model = mongoose.model('user', {username: String, password: String, name: String, updateAt: Date, createAt: Date})
model.null = {isNull: true}
module.exports = model