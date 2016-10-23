var express = require('express');
var router = express.Router();
var question = require('../controller/question')
var user = require('../controller/user')

/* GET users listing. */

//question
router.get('/question', question.find_all_question)
router.get('/question/:question_id', question.find_question)
router.put('/question/:question_id', question.update_question)
router.post('/question/:question_id/upvotes/:user_id', question.questin_upvotes)
router.post('/question/:question_id/downvotes/:user_id', question.question_downvotes)
router.post('/question', question.insert_question)
router.delete('/question/:question_id', question.delete_question)

//answer
router.post('/question/:question_id/answer/:user_id', question.insert_answer)
router.post('/question/:question_id/answer/:user_id/upvotes', question.answer_upvotes)
router.post('/question/:question_id/answer/:user_id/downvotes', question.answer_downvotes)
router.post('/question/:question_id/answer/:user_id/update/:answer_num', question.update_answer)
router.delete('/question/:question_id/answer/:answer_num', question.delete_answer)

//user
router.get('/user', user.find_all_user)
router.get('/user/:user_id', user.find_user)
router.put('/user/:user_id', user.update_user)
router.post('/user', user.insert_user)
router.delete('/user/:user_id', user.delete_user)

module.exports = router;
