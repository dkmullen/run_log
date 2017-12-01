/*jshint esversion: 6 */
// This file routes incoming requests to the controllers in run_controller.js
const RunController = require('../controllers/run_controller'),
  UserController = require('../controllers/user_controller'),
  {authenticate} = require('./../authenticate');

// Receive app as the argument from app.js
module.exports = (app) => {
  app.post('/users', UserController.createuser);
  app.get('/users/me', authenticate, UserController.getme);
  app.post('/users/login', UserController.login);
  app.delete('/users/me/token', authenticate, UserController.logout);
  // app.use('/', UserController.checktoken);
  app.post('/runs', authenticate, RunController.createrun);
  app.get('/runs', authenticate, RunController.getall);
};
