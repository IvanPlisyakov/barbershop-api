const mongoose = require('mongoose');
// const validator = require('validator');

const subscribeSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  master: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Subscribe', subscribeSchema);
