let mongoose = require('mongoose')
let Schema = mongoose.Schema

let usersSchema = new Schema({
  username: String,
  password: String
})

let Users = mongoose.model('users', usersSchema)

module.exports = Users
