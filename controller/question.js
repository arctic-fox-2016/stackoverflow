var  question =  require('../model/blogs')

function insert_question(req,res) {
  new question.question({
            title     : req.body.title,
            body      : req.body.body,
            date      : req.body.date,
            comments  : [],
            upvotes   : [],
            downvotes : []
      })
      .save(function (err) {
        if(err) {
          console.log(err);
        } else {
                  res.json({success:'ok', message: `${req.body.title} been saved`})
        }
      })
}
function insert_answer(req,res) {
  question.question.findByIdAndUpdate(
            req.params.question_id,
            { $push : { comments :{text: req.body.text, user: req.params.user_id, upvotes:[],downvotes:[]}}},
            {safe: true, upsert:true},
            function (err,model) {
              if(err) console.log(err);
            })
}
function update_answer(req,res) {
  question.question.findById(
            req.params.question_id,
            function (err,result) {
              if(err) {
                console.log(err)
              } else{
                result.comments[req.params.answer_num].text = req.body.text
                result.markModified('brackets.rounds')
                result.save()
                res.json(result)
              }
            })
}
function delete_answer(req,res) {
  question.question.findById(
            req.params.answer_num,
            function (err,result) {
              if(err) {
                console.log(err)
              } else{
                result.comments.splice(req.params.answer_num,1)
                result.markModified('brackets.rounds')
                result.save()
                res.json(result)
              }
            })
}
function questin_upvotes(req,res) {
  question.question.findByIdAndUpdate(
            req.params.question_id,
            { $push : { upvotes :{user: req.params.user_id}}},
            {safe: true, upsert:true},
            function (err,model) {
              if(err) {
                console.log(err)
              } else{
                res.json(model)
              }
            })
}
function question_downvotes(req,res) {
  question.question.findByIdAndUpdate(
            req.params.question_id,
            { $push : { downvotes :{user: req.params.user_id}}},
            {safe: true, upsert:true},
            function (err,model) {
              if(err) console.log(err);
            })
}
function answer_upvotes(req,res) {
  question.question.findByIdAndUpdate(
            req.params.question_id,
            { $push : { 'comments.upvotes' :{user: req.params.user_id}}},
            {safe: true, upsert:true},
            function (err,model) {
              if(err) console.log(err);
            })
}
function answer_downvotes(req,res) {
  question.question.findByIdAndUpdate(
            req.params.question_id,
            { $push : { 'comments.downvotes' :{user: req.params.user_id}}},
            {safe: true, upsert:true},
            function (err,model) {
              if(err) console.log(err);
            })
}



function update_question(req,res) {
  question.question.update({_id:req.params.question_id},{
          user      : req.body.question_id,
          title     : req.body.title,
          body      : req.body.body,
          date      : req.body.date
      }, function (err) {
        if(err) {
          console.log(err)
        } else{
                  res.json({success:'ok', message: `${req.params.title} been updated`})
        }
      })
}
function delete_question(req,res) {
  question.question.update({_id:req.params.question_id}, function (err) {
    if(err) {
      console.log(err)
    } else {
      res.json({success:'ok', message: `${req.params.question_id} been deleted`})
    }
      })
}

function find_question(req,res,callback) {
  question.question.find({_id:req.params.question_id},function (err,result) {
      if(err){
        console.log(err)
      } else {
        res.json(result)
      }
  })
}

function find_all_question(req,res,callback) {
  question.question.find({},function (err,result) {
      if(err){
        console.log(err)
      } else {
        res.json(result)
      }
  })
}
module.exports = {
  insert_question : insert_question,
  insert_answer : insert_answer,
  update_answer : update_answer,
  update_question: update_question,
  delete_question: delete_question,
  delete_answer: delete_answer,
  find_question : find_question,
  find_all_question: find_all_question,
  questin_upvotes: questin_upvotes,
  question_downvotes: question_downvotes,
  answer_upvotes: answer_upvotes,
  answer_downvotes: answer_downvotes
}
