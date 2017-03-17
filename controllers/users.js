// dependencies
var usersModel = require('../models/users');


/*
adds a new user
request body is given name
sets score to 0
response returns either 200 (OK) or error
*/

exports.addUser = function(req, res, next){
  console.log(req.body);
  // initialize user and variables
  var user = {}; // new User();
  user.name = req.body.name;
  user.score = 0;
  user.rolls = [];
  user.currentRoll = 0;
  user.currentFrameNum = 0;
  console.log("Adding user: ");
  console.log(user);
  var users = new usersModel(user);
  users.save(function(err, data){
    if (err) {
      res.status(400).json({status: '!! User NOT saved !!', error: err})
      return;
    }
    console.log(data);
    res.status(200).json({status: 'User saved'})
  });
}


/*
deletes a user
request param is user's name
removes user if found
response returns either 200 (OK) or error
*/

exports.deleteUser = function(req, res, next){
  var userName = req.params.name;
  console.log(userName);
  usersModel.findOne({name: userName}).remove(function(err, data){
    console.log("DATA: " + data);
    if (err) {
      res.status(400).json({status: '!! User NOT deleted !!', error: err});
      return;
    }
    res.status(200).json({status: 'User deleted'});
  });
}
