var  user =  require('../model/blogs')

function insert_user(req,res) {
  new user.user({
          first_name  : req.body.first_name,
          last_name   : req.body.last_name,
          phone       : req.body.phone,
          email       : req.body.email,
          address     : req.body.address
      })
      .save(function (err) {
        if(err) {
          console.log(err);
        } else {
          console.log(req.body.first_name)
                  res.json({success:'ok', message: `${req.body.first_name} been saved`})
        }
      })
}

function update_user(req,res) {
  user.user.update({_id:req.params.user_id},{
          first_name  : req.body.first_name,
          last_name   : req.body.last_name,
          phone       : req.body.phone,
          email       : req.body.email,
          address     : req.body.address
      }, function (err) {
        if(err) {
          console.log(err)
        } else{
                  res.json({success:'ok', message: `${req.params.user_id} been updated`})
        }
      })
}
function delete_user(req,res) {
  user.user.update({_id:req.params.user_id}, function (err) {
    if(err) {
      console.log(err)
    } else {
      res.json({success:'ok', message: `${req.params.user_id} been deleted`})
    }
      })
}

function find_user(req,res) {
  user.user.find({_id:req.params.user_id},function (err,result) {
      if(err){
        console.log(err)
      } else {
        res.json(result)
      }
  })
}

function find_all_user(req,res) {
  user.user.find({},function (err,result) {
      if(err){
        console.log(err)
      } else {
        res.json(result)
      }
  })
}
module.exports = {
  insert_user : insert_user,
  update_user: update_user,
  delete_user: delete_user,
  find_user : find_user,
  find_all_user: find_all_user
}
