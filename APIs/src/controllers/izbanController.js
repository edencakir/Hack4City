// let fs = require('fs');
let mongoose = require('mongoose');
// let formidable = require('formidable');
// var path = require('path');
let Izbans = mongoose.model('Izbans');

exports.getIzbans = (req, res) => {
  Izbans.find({ name: 'Alsancak' }, (err, docs) => {
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

exports.addIzban = (req, res) => {
  console.log('Adding izban', req);
  Izbans.find({ name: 'Alsancak' }, (err, docs) => {
    if (docs.length === 0) {
      let izban = new Izbans({ name: 'Alsancak', kisi: 1 });
      izban.save((err, doc) => {
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
      Izbans.update(
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
