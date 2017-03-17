// dependencies
var usersModel = require('../models/users');


/*
simulates a roll or throw
request param is user's name, request body is current roll (as number val)
updates score
response returns either 200 (OK) or error
*/

exports.play = function(req, res, next){
  var userName = req.params.name;
  var currRoll = req.body.currentRoll;

  usersModel.findOne({name: userName}, function(err, user){
    if (err) {
      res.status(400).json({status: err});
      return;
    }
    if (!user) {
      res.status(400).json({status: '!! User NOT found !! -- Please create new user'});
      return;
    }

    // update current roll, roll array, and score
    user.currentRoll = currRoll;
    user.rolls.push(currRoll);
    user.score = updateScore();

    // print data to console
    console.log("Name: " + userName);
    console.log("Rolls: " + user.rolls);
    console.log("Current Score: " + user.score);

    user.save(function(err, data){
      if (err) {
        res.status(400).json({status: '!! Roll NOT saved !!'});
        return;
      }
      res.status(200).json({status: 'Roll saved', rolls: user.rolls});
    });

    // helper functions for calulating current score
    function updateScore() {
      var score = 0;
      var frameIndex = 0;

      function frameSum() {
        var ret = 0;
        if (user.rolls[frameIndex] !== undefined && user.rolls[frameIndex + 1] !== undefined) {
          ret = user.rolls[frameIndex] + user.rolls[frameIndex + 1];
        }
        return ret;
      }
      function sparePoints() {
        var ret = 0;
        if (user.rolls[frameIndex + 2] !== undefined) {
          ret = user.rolls[frameIndex + 2]
        }
        return ret;
      }
      function strikePoints() {
        var ret = 0;
        if (user.rolls[frameIndex + 1] !== undefined && user.rolls[frameIndex + 2] !== undefined) {
          ret = user.rolls[frameIndex + 1] + user.rolls[frameIndex + 2];
        }
        return ret;
      }
      function isStrike() {
        if (user.rolls[frameIndex] === undefined) {
          return false;
        } else {
          return user.rolls[frameIndex] === 10;
        }
      }
      function isSpare() {
        if (user.rolls[frameIndex] === undefined || user.rolls[frameIndex + 1] === undefined) {
          return false;
        } else {
          return user.rolls[frameIndex] + user.rolls[frameIndex + 1] === 10;
        }
      }
      for (var frame = 0; frame < 10; frame++) {
        if (isStrike()) {
          score += 10 + strikePoints();
          frameIndex++;
        } else if (isSpare()) {
          score += 10 + sparePoints();
          frameIndex += 2;
        } else {
          score += frameSum();
          frameIndex += 2;
        }
      }
      return score;
    }
  });
}


/*
gets user's current score
request param is user's name
response returns current score and either 200 (OK) or error
*/

exports.score = function(req, res, next){
  var userName = req.params.name;
  usersModel.findOne({name: userName}, function(err, user){
    if (err) {
      res.status(400).json({status: err});
      return;
    }
    if (!user) {
      res.status(400).json({status: 'User NOT found'});
      return;
    }
    res.status(200).json({score: user.score, name: user.name});
  });
}
