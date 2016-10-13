let express = require('express')
let router = express.Router()
let mongoose = require('mongoose')
let Answers = require('../models/answer.js')
let Questions = require('../models/question.js')
let Users = require('../models/user.js')

router.get('/', function(req,res,next){
  res.send('test')
})

router.post('/register', function(req,res,next){
  let newUser = new Users({username: req.body.username, password:req.body.password}).save(function(err,result){
    if(err){
      console.log(err)
    }
    res.json(result)
  })
})

router.post('/login', function(req,res,next){
  Users.findOne({username: req.body.username, password: req.body.password}, function(err,result){
    if(result == null){
      res.json({message: "Credential is Wrong"})
    } else {
      req.session.login = true
      req.session.username = result.username
      res.json(req.session)
    }
  })
})

router.get('/questions', function(req,res,next){
  Questions.find({}).populate('answer_list.answer').exec(function(err,result){
    console.log('something')
    if(err){
      console.log(err)
    }
    res.json(result)
  })
})

router.get('/questions/:q_id', function(req,res,next){
  Questions.find({_id: req.params.q_id}).populate('answer_list.answer').exec(function(err,result){
    console.log('something')
    if(err){
      console.log(err)
    }
    res.json(result)
  })
})

router.post('/questions/:q_id/upvote', function(req,res,next){
  console.log(req.session.username)
  Questions.findOne({"vote.user": req.session.username, _id: req.params.q_id}, function(err1,result1){
    console.log("result find",result1)
    if(result1 == null){
      console.log("masuk null")
      Questions.update({_id: req.params.q_id}, {$push: {vote:{"user": req.session.username, "vote": "up"}}},function(err2,result2){
        if(err2){
          console.log(err2)
        }
        res.json({message:"successful"})
      })
    } else {
      console.log("masuk if there is something")
      for(let i in result1.vote){
        if(result1.vote[i].user == req.session.username && result1.vote[i].vote == "down"){
          console.log("masuk mengganti status")
          Questions.update({"vote.user":req.session.username,_id:req.params.q_id},{ $set:{"vote.$.vote": "up"}}, function(err3,result3){
            if(err3){
              console.log(err3)
            }
             return res.json({message: "successful",data:result3})
          })
        }
      }
    }
  })
})

router.post('/questions/:q_id/downvote', function(req,res,next){
  console.log(req.session.username)
  Questions.findOne({"vote.user": req.session.username, _id: req.params.q_id}, function(err1,result1){
    console.log("result find",result1)
    if(result1 == null){
      console.log("masuk null")
      Questions.update({_id: req.params.q_id}, {$push: {vote:{"user": req.session.username, "vote": "up"}}},function(err2,result2){
        if(err2){
          console.log(err2)
        }
        res.json({message:"successful"})
      })
    } else {
      console.log("masuk if there is something")
      for(let i in result1.vote){
        if(result1.vote[i].user == req.session.username && result1.vote[i].vote == "up"){
          console.log("masuk mengganti status")
          Questions.update({"vote.user":req.session.username,_id:req.params.q_id},{ $set:{"vote.$.vote": "down"}}, function(err3,result3){
            if(err3){
              console.log(err3)
            }
             return res.json({message: "successful",data:result3})
          })
        }
      }
    }
  })
})

router.post('/questions', function(req,res,next){
  let newQuestion = new Questions({title: req.body.title, content: req.body.content}).save(function(err,result){
    if(err){
      console.log(err)
    }
    res.json(result)
  })
})

router.post('/answers/:q_id', function(req,res,next){
  Users.findOne({username: req.session.username}, function(err1,result1){
    let newAnswer = new Answers({username:req.session.username, title: req.body.title, content: req.body.content}).save(function(err2,result2){
      if(err2){
        console.log(err2)
      }
      Questions.update({_id: req.params.q_id}, {$push:{answer_list:{answer:result2._id}}}, function(err3, result3){
        if(err3){
          console.log(err3)
        }
        res.json({message: "berhasil", data: result3})
      })
    })
  })
})


module.exports = router
