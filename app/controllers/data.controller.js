  const Model  = require('../models/datas')

  module.exports = {
  showQuestions : showQuestions,
  showQuestion  : showQuestion,
  seedQuestions : seedQuestions,
  showAdd       : showAdd,
  processAdd    : processAdd,
  showEdit      : showEdit,
  processEdit   : processEdit,
  deleteQuestion: deleteQuestion
  }

    //delete data
    function deleteQuestion(req,res) {
      Model.Question.remove({ slug: req.params.slug}, (err) => {
        //set flash Question
        //redirect to datas page
        req.flash('success', 'Question is deleted!')
        res.redirect('/datas')
      })
    }

    //edit data
    function showEdit(req,res) {
      Model.Question.findOne({ slug: req.params.slug }, (err, data) => {
        res.render('pages/edit',{
          data: data,
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
        return res.redirect(`/datas/${req.params.slug}/edit`)
      }

      //finding a current data
      Model.Question.findOne({slug: req.params.slug}, (err,data) => {
        //update the data
        data.title   = req.body.title
        data.content  = req.body.content
        data.email  = req.body.email

        data.save((err) => {
          if(err)
            throw err;

          //success flash message
          //redirect back to /data
          req.flash('success', 'Successfully updated data')
          res.redirect('/datas')
        })
      })
    }

    //add data
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
          return res.redirect('/datas/add')
      }

      //create a new data
      var data = new Model.Question({
        title : req.body.title,
        content : req.body.content,
        email : req.body.email
      })

      data.save((err) => {
        if(err)
          throw err

        //set successful flash message
        req.flash('success','Successfully created data!')

        //redirect to url, not ejs file!
        res.redirect(`/datas/${data.slug}`)
      })
    }

    //show all datas
    function showQuestions(req,res) {
      //get all datas
      Model.Question.find({}, (err, datas) => {
         if (err) {
           res.status(404)
           res.send('Questions not found!')
         }

        //return a view with data
        res.render('pages/datas', {
          datas : datas,
          success : req.flash('success')
        })
      })
    }
  
    //show single data
    function showQuestion (req,res) {
      //get a single data
      Model.Question.findOne({ slug : req.params.slug}, (err,data)=>{
        if(err){
          res.status(404)
          res.send('Question not found!')
        }

        res.render('pages/single', {
          data : data,
          success : req.flash('success')
        })
      })
    }
  