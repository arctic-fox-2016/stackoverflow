var mg = require('mongoose'),
    conn = mg.connect('mongodb://localhost/blog-tdd')


var Schema = mg.Schema,
    ObjectId = Schema.Types.ObjectId;

var User = new Schema({
        first_name  : String,
        last_name   : String,
        phone       : String,
        email       : String,
        address     : String
    });
var Question = new Schema({
    user      : {type: ObjectId,ref: 'user'},
    title     : String,
    body      : String,
    date      : Date,
    upvotes   :[{user: {type: ObjectId,ref: 'user'},email:String}],
    downvotes :[{user: {type: ObjectId,ref: 'user'},email:String}],
    comments  : [{
                  text      : String,
                  upvotes   :[{user: {type: ObjectId,ref: 'user'},email:String}],
                  downvotes :[{user: {type: ObjectId,ref: 'user'},email:String}],
                  user      : {type: ObjectId,ref: 'user'}
    }]
});

module.exports = {
  user : mg.model('user', User),
  question : mg.model('question', Question)
}
