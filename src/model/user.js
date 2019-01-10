const mongoose = require('mongoose')
const model = mongoose.model('user', {username: String, password: String})
model.null = {isNull: true}
module.exports = model