
// dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var userController = require('./controllers/users');
var gameController = require('./controllers/game');
var config = require('./config/config');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.post('/addUser',userController.addUser);
app.delete('/deleteUser',userController.deleteUser);
app.post('/play',gameController.play);
app.get('/score/:userId',gameController.score);
app.listen(config.port||3000);

console.log('listening on port 3000...');
module.exports = app;
