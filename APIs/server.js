'use strict';
let express = require('express');
let app = express();
var cors = require('cors');
let port = 8080;
let mongoose = require('mongoose');
let morgan = require('morgan');
// let jwt = require('jsonwebtoken');
let config = require('./config');
let bodyParser = require('body-parser');

require('./src/models/durakModel');

mongoose.Promise = global.Promise;
mongoose.connect(config.database);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

require('./src/routes/durakRoutes')(app);

app.listen(port);

console.log('Carrots server is running on port: ', port);
