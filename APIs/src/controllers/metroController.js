// let fs = require('fs');
let mongoose = require('mongoose');
// let formidable = require('formidable');
// var path = require('path');
let Metros = mongoose.model('Metros');

exports.getMetros = (req, res) => {
  Metros.find({ name: 'Alsancak' }, (err, docs) => {
    if (!err) {
      res.json({
        result: 'success',
        response: {
          message: 'Durak fetch success',
          data: docs
        }
      });
    } else {
      res.json({
        result: 'error',
        response: { message: err.message }
      });
    }
  });
};

exports.addMetro = (req, res) => {
  console.log('Adding durak', req);
  Metros.find({ name: 'Alsancak' }, (err, docs) => {
    if (docs.length === 0) {
      let metro = new Metros({ name: 'Alsancak', kisi: 1 });
      metro.save((err, doc) => {
        if (!err) {
          res.json({
            result: 'success',
            response: {
              message: 'Initial durak created, user set to 1.'
            }
          });
        }
      });
    } else {
      Metros.update(
        { name: 'Alsancak' }, // TODO: replace with req.body.name later.
        {
          $inc: {
            kisi: 1
          }
        },
        err => {
          if (!err) {
            res.json({
              result: 'success',
              response: {
                message:
                  'User with name' +
                  req.body.name +
                  ' successfully added to the durak'
              }
            });
          } else {
            res.json({
              result: 'error',
              response: { message: err.message }
            });
          }
        }
      );
    }
  });
};
