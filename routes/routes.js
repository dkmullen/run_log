/*jshint esversion: 6 */
// This file routes incoming requests to the controllers in run_controller.js
const RunController = require('../controllers/run_controller'),
  UserController = require('../controllers/user_controller');

// Receive app as the argument from app.js
module.exports = (app) => {
  app.post('/runs', RunController.createrun);
  app.get('/runs', RunController.getall);

  app.post('/users', UserController.createuser);
  app.post('/users', UserController.gettoken);
  app.use('/', UserController.checktoken);
};
