const mongoose = require('mongoose')
const model = mongoose.model('weapon', {name: String, phy: Number, bld: Number, createAt: Date})
model.null = {isNull: true}
module.exports = model
//12312312312