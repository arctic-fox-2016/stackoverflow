let express = require('express')
let router = express.Router()
let http = require('http')

router.get('/', function(req,res,next){
  res.render('../client/views/homepage.ejs')
})

router.get('/dashboard', function(req,res,next){
  if(req.session.username){
    http.get({
      host: "localhost",
      port: "3000",
      path: "/api/questions"
    }, function(response){
      let hasil = ""
      response.on('data', function(d){
        hasil +=d
      })
      response.on('end', function(){
        let hasilJSON = JSON.parse(hasil)
        console.log(hasilJSON)
        res.render('../client/views/dashboard.ejs',{username: req.session.username, question: hasilJSON})
      })
    })
  } else {
    res.redirect('/')
  }
})

router.post('/request/register', function(req,res,next){
  let postData = JSON.stringify({username:req.body.username, password:req.body.password})
  let request =
  http.request({
    method: 'POST',
    host:'localhost',
    port:"3000",
    path:"/api/register",
    headers: {
   'Content-Type': 'application/json',
   'Content-Length': Buffer.byteLength(postData)
    }
  }, function(response){
    let hasil = ""
    response.on('data', function(d){
      hasil+=d
    })
    response.on('end', function(){
      let hasilJSON = JSON.parse(hasil)
      res.json(hasilJSON)
    })
  })
  request.write(postData)
  request.end()
})

router.post('/request/login', function(req,res,next){
  let postData = JSON.stringify({username:req.body.username, password:req.body.password})
  let request =
  http.request({
    method: 'POST',
    host:'localhost',
    port:"3000",
    path:"/api/login",
    headers: {
   'Content-Type': 'application/json',
   'Content-Length': Buffer.byteLength(postData)
    }
  }, function(response){
    let hasil = ""
    response.on('data', function(d){
      hasil+=d
    })
    response.on('end', function(){
      let hasilJSON = JSON.parse(hasil)
      req.session.username = hasilJSON.username
      res.json(hasilJSON)
    })
  })
  request.write(postData)
  request.end()
})

router.post('/request/question', function(req,res,next){
  console.log("masuk request question")
  let postData = JSON.stringify({username: req.session.username, title: req.body.title, content: req.body.content})
  console.log("postData", postData)
  let request = http.request({
    method:'POST',
    host:'localhost',
    port:"3000",
    path:"/api/questions",
    headers: {
   'Content-Type': 'application/json',
   'Content-Length': Buffer.byteLength(postData)
    }
  }, function(response){
    let hasil = ""
    response.on('data', function(d){
      hasil+=d
    })
    response.on('end', function(){
      console.log("masuk end")
      let hasilJSON=JSON.parse(hasil)
      res.redirect('/dashboard')
    })
  })
  request.write(postData)
  request.end()
})

router.post('/request/answer/:q_id', function(req,res,next){
  console.log("masuk request question")
  let postData = JSON.stringify({username: req.session.username, title: req.body.title, content: req.body.content})
  console.log("postData", postData)
  let request = http.request({
    method:'POST',
    host:'localhost',
    port:"3000",
    path:`/api/answers/${req.params.q_id}`,
    headers: {
   'Content-Type': 'application/json',
   'Content-Length': Buffer.byteLength(postData)
    }
  }, function(response){
    let hasil = ""
    response.on('data', function(d){
      hasil+=d
    })
    response.on('end', function(){
      console.log("masuk end")
      let hasilJSON=JSON.parse(hasil)
      res.redirect('/dashboard')
    })
  })
  request.write(postData)
  request.end()
})

router.post('/request/logout', function(req,res,next){
  req.session.destroy()
})

module.exports = router
