/*jshint esversion: 6 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Changed these to strings to get leading zeros to show up in db
const runSchema = new Schema({
  date: { type: String, required: true },
  distance: { type: Number, required: true },
  hours: { type: Number },
  minutes: { type: String },
  seconds: { type: String },
  paceMinutes: { type: String },
  paceSeconds: { type: String },
  comments: { type: String }
});

// Make the model, call it 'run', pass in the schema
const Run = mongoose.model('run', runSchema);
module.exports = Run;
