/*jshint esversion: 6 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  pasword: { type: String, required: true },
  admin: { type: Boolean, default: false }
});

// Make the model, call it 'run', pass in the schema
module.exports = mongoose.model('User', UserSchema);