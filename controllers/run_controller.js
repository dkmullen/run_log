/*jshint esversion: 6 */

const express = require('express'),
  config = require('../config'),
  Run = require('../models/run');

module.exports = {
  createrun(req, res) {
    let run = new Run({
      date: req.body.date,
      distance: req.body.distance,
      hours: req.body.hours,
      minutes: req.body.minutes,
      seconds: req.body.seconds,
      paceminutes: req.body.paceminutes,
      paceseconds: req.body.paceseconds,
      comments: req.body.comments,
      _creator: req.user._id
    });
    console.log(run);

    run.save().then((doc) => {
      res.send(doc);
    }, (e) => {
      res.status(400).send(e);
    });
  },

  getall(req, res) {
    Run.find({
      _creator: req.user._id
    }).then((runs) => {
      res.send({runs});
    }, (e) => {
      res.status(400).send(e);
    });
  }
};
