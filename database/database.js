var mongoose = require('mongoose');
var config = require('../config/config');

// connect to mongoose
mongoose.connect(config.db);
module.exports = mongoose;
