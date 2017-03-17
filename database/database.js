var mongoose = require('mongoose');
var config = require('../config/config');

// connect to mongoose
mongoose.Promise = global.Promise;
mongoose.connect(config.db);
module.exports = mongoose;
