require('dotenv').config();

const express = require('express');
const connectDB = require('./config/database');
const configExpress = require('./config/express');
const routes = require('./routes');

const app = express();

connectDB()
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((error) => {
    console.log('Error connecting to DB', error);
  });
configExpress(app);
routes(app);

module.exports = app;
