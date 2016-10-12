  const Model  = require('../models/datas')

  module.exports = {
  showQuestions : showQuestions,
  showQuestion  : showQuestion,
  showAdd       : showAdd,
  processAdd    : processAdd,
  showEdit      : showEdit,
  processEdit   : processEdit,
  deleteQuestion: deleteQuestion
  }

    //delete question
    function deleteQuestion(req,res) {
      Model.Question.remove({ slug: req.params.slug}, (err) => {
        //set flash Question
        //redirect to questions page
        req.flash('success', 'Question is deleted!')
        res.redirect('/questions')
      })
    }

    //edit question
    function showEdit(req,res) {
      Model.Question.findOne({ slug: req.params.slug }, (err, question) => {
        res.render('pages/edit',{
          question: question,
          errors: req.flash('errors')
        })
      })
    }

    function processEdit(req,res) {
      //validate information
      req.checkBody('title', 'Title is required').notEmpty()
      req.checkBody('content', 'Content is required').notEmpty()
      req.checkBody('email', 'Email address is required').notEmpty()

      //if there are errors, redirect and save errors to flash
      const errors = req.validationErrors()
      if(errors){
        req.flash('errors',errors.map(err => err.msg))
        return res.redirect(`/questions/${req.params.slug}/edit`)
      }

      //finding a current question
      Model.Question.findOne({slug: req.params.slug}, (err,question) => {
        //update the question
        question.title   = req.body.title
        question.content  = req.body.content
        question.email  = req.body.email

        question.save((err) => {
          if(err)
            throw err;

          req.flash('success', 'Successfully updated question')
          res.redirect(`/questions/${question.slug}`)
        })
      })
    }

    //add question
    function showAdd(req,res){
      res.render('pages/add', {
        errors: req.flash('errors')
      })
    }

    function processAdd(req,res){
      //validate information
      req.checkBody('title', 'Title is required').notEmpty()
      req.checkBody('content', 'Content is required').notEmpty()
      req.checkBody('email', 'Email address is required').notEmpty()

      //if there's errors, redirect and save errors to flash
      const errors = req.validationErrors()
      if(errors){
          req.flash('errors',errors.map(err => err.msg))
          return res.redirect('/questions/add')
      }

      //create a new question
      var question = new Model.Question({
        title : req.body.title,
        content : req.body.content,
        email : req.body.email
      })

      question.save((err) => {
        if(err)
          throw err

        //set successful flash message
        req.flash('success','Successfully created question!')

        //redirect to url, not ejs file!
        res.redirect(`/questions/${question.slug}`)
      })
    }

    //show all questions
    function showQuestions(req,res) {
      //get all questions
      Model.Question.find({}, (err, questions) => {
         if (err) {
           res.status(404)
           res.send('Questions not found!')
         }

        //return a view with question
        res.render('pages/datas', {
          questions : questions,
          success : req.flash('success')
        })
      })
    }
  
    //show single question
    function showQuestion (req,res) {
      //get a single question
      Model.Question.findOne({ slug : req.params.slug}, (err,question)=>{
        if(err){
          res.status(404)
          res.send('Question not found!')
        }

        res.render('pages/single', {
          question : question,
          success : req.flash('success')
        })
      })
    }
  