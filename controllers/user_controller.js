/*jshint esversion: 6 */

const express = require('express'),
  bcrypt = require('bcryptjs'),
  _ = require('lodash');

const config = require('../config'),
  User = require('../models/user');

module.exports = {
  // app.post('/users') to create a new user
  createuser(req, res) {
    let userProperties = _.pick(req.body, ['name', 'email', 'password']);
    let user = new User(userProperties);

    user.save().then(() => {
      res.send(user);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
  },

  // app.get('/users/me') to check my own id (ie, in Postman)
  getme(req, res) {
    res.send(req.user);
  },

  // app.post('/users/login') // to sign in when already registered
  login (req, res) {
    console.log('starting');
    let body = _.pick(req.body, ['email', 'password']);
    console.log(body);

    User.findByCredentials(body.email, body.password).then((user) => {
      user.generateAuthToken().then((token) => {
        res.header('x-auth', token).send(user);
        console.log(user);
      });
    }).catch((e) => {
      res.status(400).send();
    });
  },

  logout(req, res) {
    req.user.removeToken(req.token).then(() => {
      res.status(200).send();
    }, () => {
      res.status(400).send();
    });
  }
};
