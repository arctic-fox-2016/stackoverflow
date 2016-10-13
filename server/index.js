let express = require('express')
let app = express()
let routes = require('./routes/index.js')
let session = require('express-session')
let mongoose = require('mongoose')
let bodyParser = require('body-parser')
let cors = require('cors')
// mongoose.connect('localhost:27017/stack')
mongoose.connect('localhost:27017/testing-for-stack4')

app.use(cors())
app.use(bodyParser())
app.use(session({secret:'secret-key'}))
app.use('/api', routes)


app.listen(3000, function(){
  console.log('listening in 3000')
})

module.exports = app
