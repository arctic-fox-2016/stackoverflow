let express = require('express')
let app = express()
let routes = require('./routes/index.js')
let bodyParser = require('body-parser')
let session = require('express-session')

app.use(session({secret:'secret-key'}))
app.use(bodyParser())
app.set('view-engine', 'ejs')
app.use('/', routes)

app.use(express.static(__dirname + '/public'))

app.listen(8080,function(){
  console.log('listening on 8080')
})
