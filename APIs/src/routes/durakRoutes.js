'use strict';
let express = require('express');
// let jwt = require('jsonwebtoken');
module.exports = app => {
  let apiRoutes = express.Router();

  let durakController = require('../controllers/durakController');

  apiRoutes.post('/durak', durakController.addDurak);
  apiRoutes.get('/durak', durakController.getDuraks);

  app.use('/api', apiRoutes);
};
