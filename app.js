/*jshint esversion: 6 */

let express = require('express'),
 path = require('path'),
 favicon = require('serve-favicon'),
 logger = require('morgan'),
 bodyParser = require('body-parser'),
 mongoose = require('mongoose'), //dkm-------->
 hbs = require('hbs'),

 config = require('./config'), //dkm-------->
 routes = require('./routes/routes'), //dkm---------->
 run = require('./models/run'); //dkm---------->

let app = express();

app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

mongoose.connect(config.mongoUrl, { useMongoClient: true }); //dkm---------->
mongoose.Promise = global.Promise; //dkm---------->
app.set('secret', config.secret); //dkm---------->

app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// The line below is what tells app to look in the dir called 'public' for
// the files to serve - ie '/' = public/index.html, '/runs' = public/runs.html, etc.
app.use(express.static(path.join(__dirname, 'public')));
app.use('/routes', routes); //dkm---------->

routes(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
});

module.exports = app;
