const express = require('express');
const morgan = require('morgan');
const morganBody = require('morgan-body');
const bodyParser = require('body-parser');
const cors = require('cors');

function configExpress(app) {
  app.use(cors());
  app.use(morgan('dev'));
  morganBody(app);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static('public'));
}

module.exports = configExpress;
