'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Durak = new Schema({
  kisi: Number,
  name: {
    type: String,
    default: 'Alsancak'
  }
  //photoURL: String
});

module.exports = mongoose.model('Duraks', Durak);
