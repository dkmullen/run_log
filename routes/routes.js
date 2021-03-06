/*jshint esversion: 6 */
// This file routes incoming requests to the controllers in run_controller.js
const RunController = require('../controllers/run_controller'),
  UserController = require('../controllers/user_controller'),
  {authenticate} = require('./../authenticate');

// Receive app as the argument from app.js
module.exports = (app) => {
  app.post('/users', UserController.createuser);
  app.post('/users/login', UserController.login);
  app.get('/users/me', authenticate, UserController.getme);
  app.delete('/users/me/token', authenticate, UserController.logout);
  app.post('/runs', authenticate, RunController.createrun);
  app.get('/runs', authenticate, RunController.getall);

  app.get('/', (req, res) => {
    res.render('runlog.html');
  });

  app.get('/signin', (req, res) => {
    res.render('signin.html');
  });

  app.get('/signup', (req, res) => {
    res.render('signup.html');
  });

  app.get('/runlist', (req, res) => {
    res.render('runlist.html');
  });
};
