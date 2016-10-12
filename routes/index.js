var express = require('express');
var router = express.Router();
var Content = require('../models/contents')
const contentsController = require('../controllers/contents')

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

module.exports = router;
