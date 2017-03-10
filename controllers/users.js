// dependencies
var usersModel = require('../models/users');

/*
adds a new user
request is given id and name
sets score to 0
response returns either 200 (OK) or error
*/
exports.addUser = function(req, res, next){
  var user = {}
  user._id = req.body.id;
  user.name = req.body.name;
  user.score = 0;
  var users = new usersModel(user);
  users.save(function(err, data){
    if (err) {
      res.status(400).json({status: '!! User NOT saved !!', error: err})
      return;
    }
    res.status(200).json({status: 'User saved'})
  });
}

/*
deletes a user
request is given id
removes user if found
response returns either 200 (OK) or error
*/
exports.deleteUser = function(req, res, next){
  var id = req.body.id;
  usersModel.find({_id: id}).remove(function(err, data){
    if (err) {
      res.status(400).json({status: '!! User NOT deleted !!', error: err});
      return;
    }
    res.status(200).json({status: 'User deleted'});
  });
}
