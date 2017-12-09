/*jshint esversion: 6 */

const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// Changed these to strings to get leading zeros to show up in db
const runSchema = new Schema({
  date: { type: String, required: true },
  distance: { type: Number, required: true },
  hours: { type: Number },
  minutes: { type: String },
  seconds: { type: String },
  paceminutes: { type: String },
  paceseconds: { type: String },
  comments: { type: String },
  // Next line ties runs to the user that created them
  _creator: { type: mongoose.Schema.Types.ObjectId, required: true }
});

// Make the model, call it 'run', pass in the schema
const Run = mongoose.model('run', runSchema);
module.exports = Run;
