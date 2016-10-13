let Answers = require('../models/answer.js')
let Questions = require('../models/question.js')
let Users = require('../models/user.js')
let chai = require('chai')
let expect = chai.expect
let chaiHttp = require('chai-http')
let app = require('../index.js')
let mongoose = require('mongoose')

chai.use(chaiHttp)

describe('Register and Login', function(){
  it('after register, it should save the username and password to database', function(done){
    chai.request(app).post('/api/register').send({username: "testing", password: "password"}).end(function(err){
      Users.findOne({username: "testing"},function(err, result){
        expect(result.username).to.be.equal('testing')
        expect(result.password).to.be.equal('password')
        done()
      })
    })
  })

  it('should be able to login using that username and password', function(done){
    chai.request(app).post('/api/login').send({username: "testing", password: "password"}).end(function(err,result){
      expect(result.body.login).to.be.equal(true)
      done()
    })
  })
})

describe('Questions',function(){
  it('after posting new question, should save the question to the database', function(done){
    chai.request(app).post('/api/questions').send({title: "pertanyaan test", content: "mau bertanya"}).end(function(err){
      Questions.findOne({title: "pertanyaan test"}, function(err, result){
        expect(result.title).to.be.equal("pertanyaan test")
        expect(result.content).to.be.equal("mau bertanya")
        done()
      })
    })
  })

  it('should respond with all questions', function(done){
    chai.request(app).get('/api/questions').end(function(err, result){
      expect(result.body[0]).to.include.keys("title")
      expect(result.body[0]).to.include.keys("content")
      done()
    })
  })

  it('should respond with a question from the id requested', function(done){
    Questions.findOne({title: "pertanyaan test"}, function(err1, result1){
      chai.request(app).get(`/api/questions/${result1._id}`).end(function(err2,result2){
        expect(result2.title).to.be.equal("pertanyaan test")
        expect(result2.content).to.be.equal("mau bertanya")
        done()
      })
    })
  })

  it('should update the question in the database after updated', function(done){
    Questions.findOne({title: "pertanyaan test"}, function(err1,result1){
      chai.request(app).put(`/api/questions/${result1._id}`).send({title:"ganti pertanyaan", content: "ganti content"}).end(function(err2,result2){
        expect(result2.title).to.be.equal("ganti pertanyaan")
        expect(result2.content).to.be.equal("ganti content")
        done()
      })
    })
  })
})
