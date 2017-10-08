'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Metro = new Schema({
  kisi: Number,
  name: {
    type: String,
    default: 'Alsancak'
  }
  //photoURL: String
});

module.exports = mongoose.model('Metros', Metro);
