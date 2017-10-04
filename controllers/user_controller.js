/*jshint esversion: 6 */

const express = require('express'),
  app = express(),
  config = require('../config'),
  bcrypt = require('bcrypt-nodejs'),
  Run = require('../models/user');

module.exports = {
  createuser(req, res, next) {
    const userProperties = req.body;
    User.findOne({ email: userProperties.email})
      .then((user) => {
        if(user) {
          res.json({ success: false, message: 'That email is already registered.'});
        } else {
          User.create({
            name: userProperties.name,
            email: userProperties.email,
            password: bcrypt.hashSync(userProperties.password, bcrypt.genSaltSync(10))
          }, (err, user) => {
            if (err) {
              console.log(err);
              res.status(400).json(err);
            } else {
              console.log('User created');
            }
          })
          .then(user => res.send(user));
        }
      })
      .catch(next);
  },

  gettoken(req, res, next) {
    if (req.body.email && req.body.password) {
      var email = req.body.email;
      var password = req.body.password;
      var user = users.find(function(u) {
        return u.email === email && u.password === password;
      });
      if (user) {
        var payload = {
            id: user.id
        };
        var token = jwt.encode(payload, cfg.jwtSecret);
        res.json({
          token: token
        });
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(401);
    }
  },

  checktoken(req, res, next) {

  }
};
