'use strict';
let express = require('express');
// let jwt = require('jsonwebtoken');
module.exports = app => {
  let apiRoutes = express.Router();

  let izbanController = require('../controllers/izbanController');

  apiRoutes.post('/izban', izbanController.addIzban);
  apiRoutes.get('/izban', izbanController.getIzbans);

  app.use('/api', apiRoutes);
};
