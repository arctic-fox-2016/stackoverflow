var express = require('express');
var router = express.Router();
var Content = require('../models/contents')
const contentsController = require('../controllers/contents')
const usersController = require('../controllers/users')
var model = require('../models/users')

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

router.post('/content', contentsController.insertPost)
router.post('/content/delete/:id', contentsController.deletePost)


router.post('/API/user', usersController.insert)
router.get('/API/user', usersController.display)
router.put('/API/user/:id', usersController.update)
router.delete('/API/user/:id', usersController.hapus)
router.get('/API/user/:id', usersController.detail)

router.post('/regis/users', usersController.insertUser)
router.post('/login', function(req, res, next) {
  var username  = req.body.username,
      password  = req.body.password
      console.log('username : '+username);
      console.log('password : '+password);
  model.findOne({
      where: {
        username:username,
        password:password
      }
    })
      .then(function(result){
        console.log(result);
        console.log(result.username);
        res.render('index',{namadepan:result.username});
      })

});

module.exports = router;
