'use strict';

let express = require('express'),
  bodyParser = require('body-parser'),
  errorHandler = require('expressjs-backend').errorHandler,
  jwtHelper = require('./jwtHelper')
  ;

let server = express();
server.use(bodyParser.json());
server.use('/api/', jwtHelper.ejwt);

server.use('/', require('../src/routes/login-route'));

server.use(errorHandler);

module.exports = server;
