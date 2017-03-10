// dependencies
var usersModel = require('../models/users');

exports.play = function(req, res, next){
  var user_id = req.body.id;
  var curr_score = req.body.score;
  var pattern = /^(x|\/|[0-9])*$/

  if (!pattern.test(curr_score)) {
    res.status(400).json({status: '!! Invalid Score !!'});
    return;
  }
  usersModel.findOne({_id:user_id}, function(err, user){
    if (err) {
      res.status(400).json({status: err});
      return;
    }
    if (!user) {
      res.status(400).json({status: '!! User NOT found !!'});
      return;
    }
    //not first frame, so add to current score
    if (user.frames) {
      user.frames += curr_score;
    } else {
      // is first frame
      user.frames = curr_score;
    }
    user.frames = curr_score;
    // calculate running score
    user.score = getRunningScore(user.frames);

    user.save(function(err, data){
      if (err) {
        res.status(400).json({status: '!! User NOT saved !!'});
        return;
      }
      res.status(200).json({status: 'User saved', score: user.score});
    });

  });
}

exports.score = function(req, res, next){
  var user_id = req.params.userId;
  usersModel.findOne({_id:user_id}, function(err, user){
    if (err) {
      res.status(400).json({status: err});
      return;
    }
    if (!user) {
      res.status(400).json({status: 'User NOT found'});
      return;
    }
    res.status(200).json({score: user.score, user_name: user.name});
  });
}

// Helper functions

function getRunningScore(throws_string) {
  // easier to work with as an array
  var throws_arr = throws_string.split('');
  var frame = [];
  var running_score = 0;
  var throw_count = 0;
  var i = 0;
  for (var frame_count = 0; frame_count < 10; frame_count++) {
    throw_count++;
    // check for strike
    if (throws_arr[i] == 'x' && throw_count == 1) {
      frame[frame_count] = getNextTwoThrows(throws_arr, i, throw_count);
      throw_count = 0;
      i++;
    // check for spare
    } else if (throws_arr[i] == '/' && throw_count == 2) {
      frame[frame_count] = getNextThrow(throws_arr, i, throw_count);
      throw_count = 0;
      i++;
    } else {
      if (throw_count == 1 && throws_arr[i+1] && throws_arr[i+1] == '/') {
        frame[frame_count] = getNextThrow(throws_arr, i+1, throw_count);
        throw_count = 0;
        i += 2;
      } else if (throw_count == 1 && throws_arr[i+1] && throws_arr[i+1] != '/') {
        frame[frame_count] = parseInt(throws_arr[i]) + parseInt(throws_arr[i+1]);
        throw_count = 0;
        i += 2;
      } else if (!throws_arr[i+1]) {
        frame[frame_count] = parseInt(throws_arr[i]);
        i++;
      }
    }
    if (!isNaN(frame[frame_count])) {
      running_score += frame[frame_count];
    }
  }
  return running_score;
}

function getNextThrow(throws_arr, i, throw_count) {
  if (!throws_arr[i+1]) {
    // no more throws
    return 0;
  } else if (throws_arr[i+1] == 'x') {
    // next is strike, so return 10
    return 10;
  } else {
    // default case
    return parseInt(throws_arr[i+1]);
  }
}

function getNextTwoThrows(throws_arr, i, throw_count) {
  if (!throws_arr[i+1]) {
    return 0;
  } else if (!throws_arr[i+2]) {
    if (throws_arr[i+1] == 'x') {
      return 10;
    } else {
      return parseInt(throws_arr[i+1]);
    }
  } else if (throws_arr[i+1] == 'x' && throws_arr[i+2] == 'x') {
    return 20;
  } else if (throws_arr[i+1] == 'x' && throws_arr[i+2] != 'x') {
    return 10 + parseInt(throws_arr[i+2]);
  } else if (throws_arr[i+2] == '/') {
    return 10;
  } else {
    return parseInt(throws_arr[i+1]) + parseInt(throws_arr[i+2]);
  }
}
