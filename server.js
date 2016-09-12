var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


var app = express();
var port = process.env.PORT || 3000;

// Connect to mongodb
var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  //For LocalDB
  mongoose.connect('mongodb://localhost/nodeAPI-DB', options);
};
connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('connected', function () {console.log("connection done")});
mongoose.connection.on('disconnected', connect);

//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Bootstrap Routes
require('./config/routes')(app);

app.listen(port, function () {
	console.log('Example app listening on port 3000 ...');
});

app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  //  res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin');

  if ('GET' == req.method) {
    res.header('Cache-Control', 'no-cache');
  }
  next();
});

