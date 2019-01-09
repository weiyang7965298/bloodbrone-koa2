const config = require('../../config/env')
const mongoose = require('mongoose')

module.exports = {
  drop: async () => {
    await mongoose.connect(config.db.host, {useNewUrlParser: true})
    mongoose.connection.db.dropDatabase()
  }
}
