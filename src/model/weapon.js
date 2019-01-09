const mongoose = require('mongoose')
const model = mongoose.model('weapon', {name: String, phy: Number, bld: Number})
model.null = {isNull: true}
module.exports = model