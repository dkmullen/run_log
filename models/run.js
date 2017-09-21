/*jshint esversion: 6 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const runSchema = new Schema({
  date: { type: Date, required: true },
  distance: { type: Number, required: true },
  hours: { type: Number },
  minutes: { type: Number },
  seconds: { type: Number },
  paceMinutes: { type: Number },
  paceSeconds: { type: Number },
  comments: { type: String }
});

// Make the model, call it 'run', pass in the schema
const Run = mongoose.model('run', runSchema);
module.exports = Run;
