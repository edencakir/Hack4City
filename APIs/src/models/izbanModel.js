'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Izban = new Schema({
  kisi: Number,
  name: {
    type: String,
    default: 'Alsancak'
  }
  //photoURL: String
});

module.exports = mongoose.model('Izbans', Izban);
