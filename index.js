
// dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var userController = require('./controllers/users');
var gameController = require('./controllers/game');
var config = require('./config/config');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

// Routes
app.post('/addUser', userController.addUser);
app.delete('/deleteUser/:name', userController.deleteUser);
app.post('/play/:name', gameController.play);
app.get('/score/:name', gameController.score);
app.listen(config.port||3000);

console.log('listening on port 3000...');
module.exports = app;
