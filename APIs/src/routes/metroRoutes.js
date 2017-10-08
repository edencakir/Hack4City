'use strict';
let express = require('express');
// let jwt = require('jsonwebtoken');
module.exports = app => {
  let apiRoutes = express.Router();

  let metroController = require('../controllers/metroController');

  apiRoutes.post('/metro', metroController.addMetro);
  apiRoutes.get('/metro', metroController.getMetros);

  app.use('/api', apiRoutes);
};
