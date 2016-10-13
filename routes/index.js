var express = require('express');
var router = express.Router();
var Content = require('../models/contents')
const contentsController = require('../controllers/contents')
const usersController = require('../controllers/users')
const answersController = require('../controllers/answers')
var users = require('../models/users')
var contents = require('../models/contents')
var answers = require('../models/answers')

/* GET home page. */
router.get('/', function(req, res, next) {
  Content.find(function(err,result){
    res.render('login',{content:result});
  })
});

/*
================== Contents API ==================
*/
router.post('/API/content', contentsController.insert)
router.get('/API/content', contentsController.display)
router.put('/API/content/:id', contentsController.update)
router.delete('/API/content/:id', contentsController.hapus)
router.get('/API/content/:id', contentsController.detail)
/*
================== User API ==================
*/
router.post('/API/user', usersController.insert)
router.get('/API/user', usersController.display)
router.put('/API/user/:id', usersController.update)
router.delete('/API/user/:id', usersController.hapus)
router.get('/API/user/:id', usersController.detail)



/*
================= DRIVER Content =============================
*/
router.post('/content', contentsController.insertPost)
router.post('/content/delete/:id/:username', contentsController.deletePost)
router.post('/content/detail/:id/:username', contentsController.detailPost)

router.post('/answer/:contentId/:username', answersController.post)
router.post('/thumbsup/:contentId/:username', contentsController.thumbsup)


router.post('/regis/users', usersController.insertUser)
router.post('/login', function(req, res, next) {
  var username  = req.body.username,
      password  = req.body.password
      users.findOne({
        username:username,
        password:password
      },(err,items) => {
        console.log(items);
        contents.find({},(err,items2)=> {
            console.log(items2);
            res.render('index',{profile:items,content:items2});
        })

      })
});

router.post('/loginback/:username', function(req, res, next) {
  var username  = req.params.username
      users.findOne({
        username:username
      },(err,items) => {
        console.log(items);
        contents.find({},(err,items2)=> {
            console.log(items2);
            res.render('index',{profile:items,content:items2});
        })

      })
});


module.exports = router;
