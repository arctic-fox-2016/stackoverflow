let mongoose = require('mongoose')
let Schema = mongoose.Schema

let answersSchema = new Schema({
  username: String,
  title: String,
  content: String,
  vote:[{
    user: String,
    vote: String
  }]
})

let Answers = mongoose.model('answers', answersSchema)

module.exports = Answers
