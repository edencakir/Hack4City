// let fs = require('fs');
let mongoose = require('mongoose');
// let formidable = require('formidable');
// var path = require('path');
let Duraks = mongoose.model('Duraks');

exports.getDuraks = (req, res) => {
  Duraks.find({ name: 'Alsancak' }, (err, docs) => {
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

exports.addDurak = (req, res) => {
  console.log('Adding durak', req);
  Duraks.find({ name: 'Alsancak' }, (err, docs) => {
    if (docs.length === 0) {
      let durak = new Duraks({ name: 'Alsancak', kisi: 1 });
      durak.save((err, doc) => {
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
      Duraks.update(
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
