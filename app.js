/*jshint esversion: 6 */

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose'); //dkm-------->

var config = require('./config'); //dkm-------->
var index = require('./routes/index');
var users = require('./routes/users');
var routes = require('./routes/routes'); //dkm---------->
var run = require('./models/run'); //dkm---------->
//var auth = require('./auth.js')(); //dkm---------->

var app = express();

mongoose.connect(config.mongoUrl, { useMongoClient: true }); //dkm---------->
mongoose.Promise = global.Promise; //dkm---------->
app.set('secret', config.secret); //dkm---------->

// view engine setup
// app.set('views', path.join(__dirname, 'views'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// The line below is what tells app to look in the dir called 'public' for
// the files to serve - ie '/' = public/index.html, '/runs' = public/runs.html, etc.
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', index);
// app.use('/users', users);
app.use('/routes', routes); //dkm---------->

routes(app);

// app.use('/', auth.authenticate(), function(req, res) {
//     res.json(users[req.user.id]); //dkm---------->
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // res.status(err.status || 500);
  // res.render('error');
});

module.exports = app;
