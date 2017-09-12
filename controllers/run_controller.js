/*jshint esversion: 6 */

const express = require('express'),
  app = express(),
  config = require('../config'),
  Run = require('../models/run');

//app.set('secretKey', config.secret);

module.exports = {
  // Create a new record
  createrun(req, res, next) {
    const newRun = req.body; // const = entire request body sent in
    console.log(newRun);
    Run.create(newRun) // create a new run record out of the const
      .then(run => res.send(run))
      .catch(next);
  }
};
