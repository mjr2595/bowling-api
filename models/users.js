var mongoose = require('../database/database.js');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  score: Number,
  rolls: [Number],
  currentRoll: Number,
  currentFrameNum: Number
});

var User = mongoose.model('User', userSchema);
module.exports = User;
