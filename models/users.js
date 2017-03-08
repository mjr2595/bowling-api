var mongoose = require('../database/database.js');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  _id: Number,
  name: String,
  score: Number,
  frames: String
});

var User = mongoose.model('User', userSchema);
module.exports = User;
