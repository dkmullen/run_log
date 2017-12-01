/*jshint esversion: 6 */

const mongoose = require('mongoose'),
  validator = require('validator'),
  jwt = require('jsonwebtoken'),
  _ = require('lodash'),
  bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, minlength: 1, trim: true, unique: true,
    validate: { validator: validator.isEmail, message: '{VALUE} is not a valid email'}},
  password: { type: String, required: true, minlength: 5 },
  admin: { type: Boolean, default: false },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

UserSchema.methods.toJSON = function () {
  let user = this,
    userObject = user.toObject();

  // pick off only properties for return, exclude sensitive ones like token
  return _.pick(userObject, ['_id', 'name', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
  let user = this,
    access = 'auth',
    token = jwt.sign({_id: user._id.toHexString(), access}, 'fakesecret').toString();

  user.tokens.push({access, token});

  return user.save().then(() => {
    return token;
  });
};

// For logging out
UserSchema.methods.removeToken = function (token) {
  let user = this;

  return user.update({
     $pull: { // Mongoose operator to pull items out of an array
      tokens: {token}
     }
   });
};

// For verifying user on a private route
UserSchema.statics.findByToken = function (token) {
  let User = this,
    decoded;

  try {
    decoded = jwt.verify(token, 'fakesecret');
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

// For signing in
UserSchema.statics.findByCredentials = function (email, password) {
  let User = this;

  return User.findOne({email}).then((user) => {
    if(!user) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if(res) {
        resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

// For encrypting or re-encrypting only when user saves a new  pw; IE, calls for
// bcrypt for new user or pw change, but not for other edits (to name, email, etc)
UserSchema.pre('save', function (next) {
  let user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });

  } else {
    next();
  }
});

// Make the model, call it 'User', pass in the schema
module.exports = mongoose.model('User', UserSchema);
