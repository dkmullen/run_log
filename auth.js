/*jshint esversion: 6 */

const passport = require('passport'),
  passportJWT = require('passport-jwt'),
  user = require('./models/user.js'),
  cfg = require('./config.js'),
  ExtractJwt = passportJWT.ExtractJwt,
  Strategy = passportJWT.Strategy,
  params = {
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports = function() {
  var strategy = new Strategy(params, function(payload, done) {
    var user = users[payload.id] || null;
    if (user) {
      return done(null, {
        id: user.id
      });
    } else {
      return done(new Error("User not found"), null);
    }
  });
  passport.use(strategy);
  return {
    initialize: function() {
      return passport.initialize();
    },
    authenticate: function() {
      return passport.authenticate("jwt", cfg.jwtSession);
    }
  };
};
