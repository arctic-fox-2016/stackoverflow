let mongoose = require('mongoose')
let Schema = mongoose.Schema

let questionsSchema = new Schema({
  user: String,
  title: String,
  content: String,
  answer_list:[{
    answer:{
      type: Schema.Types.ObjectId,
      ref: 'answers'
    }
  }],
  vote:[{
    user: String,
    vote: String
  }]
})

let Questions = mongoose.model('questions', questionsSchema)

module.exports = Questions
