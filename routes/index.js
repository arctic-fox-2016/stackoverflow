var express = require('express');
var router = express.Router();
var Content = require('../models/contents')
const contentsController = require('../controllers/contents')

/* GET home page. */
router.get('/', function(req, res, next) {
  Content.find(function(err,result){
    res.render('index',{content:result});
  })
});

/*
================== Contents API ==================
*/
router.post('/content', contentsController.insert)
router.get('/content', contentsController.display)
router.put('/content/:id', contentsController.update)
router.post('/content/delete/:id', contentsController.hapus)
router.get('/content/:id', contentsController.detail)

module.exports = router;
