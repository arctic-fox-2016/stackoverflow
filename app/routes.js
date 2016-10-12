//create new express router
const express = require('express'),
  router = express.Router()
  mainController = require('./controllers/main.controller')
  dataController = require('./controllers/data.controller')

//export router
module.exports = router
//
//define routes

//main routes
router.get('/', mainController.showHome)

//show all questions
router.get('/questions', dataController.showQuestions)

//create question
router.get('/questions/add', dataController.showAdd)
router.post('/questions/add', dataController.processAdd)

//edit question
router.get('/questions/:slug/edit', dataController.showEdit)
router.post('/questions/:slug', dataController.processEdit)

//delete question
router.get('/questions/:slug/delete', dataController.deleteQuestion)

//show single question
router.get('/questions/:slug', dataController.showQuestion)