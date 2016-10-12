// title:String,
// content:String,
// type:String,
// upvote:Number,
// downvote:Number,
// answer:Number,
// parentId:String,
// userName:String

var Contents = require('../models/contents')

module.exports = {
  insert: insert,
  display: display,
  update:update,
  hapus:hapus,
  detail:detail,

  insertPost:insertPost,
  deletePost:deletePost
}

function insert(req,res,next){
    var items = new Contents({
      title:req.body.title,
      content:req.body.content,
      upvote:0,
      downvote:0,
      answer:0,
      parentId:'',
      userName:''
    })
    items.save()
    res.json(items)
}

function update(req,res,next){
  Contents.findOne({
    _id:req.params.id
  },(err,items) => {
      items.title = req.body.title
      items.content = req.body.content
      items.upvote = req.body.upvote
      items.downvote = req.body.downvote
      items.answer = req.body.answer
      items.parentId = req.body.parentId
      items.userName = req.body.userName

      items.save((err)=> {
        if(err) throw err
        res.json(items)
      })
  })
}

function hapus(req,res,next){
  Contents.findOne({
    _id:req.params.id
  },(err,items) => {
      if(err)throw err

      items.remove((err)=> {
        if(err) throw err
        res.json(items)
      })
  })
}

function display(req,res,next){
    Contents.find({},(err,result) => {
          res.json(result)
    })
}

function detail(req,res,next){
    Contents.findOne({
      _id:req.params.id
    },(err,result) => {
          res.json(result)
    })
}



// non API
function deletePost(req,res,next){
  Contents.findOne({
    _id:req.params.id
  },(err,items) => {
      if(err)throw err

      items.remove((err)=> {
        if(err) throw err
        //res.json(items)
        res.redirect('/');
      })
  })
}
function insertPost(req,res,next){
    var items = new Contents({
      title:req.body.title,
      content:req.body.content,
      upvote:0,
      downvote:0,
      answer:0,
      parentId:'',
      userName:''
    })
    items.save()
    //res.json(items)
    res.redirect('/');
}
