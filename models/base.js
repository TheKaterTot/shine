const mongoose = require('mongoose');

const databaseUrl = {
  test: 'mongodb://localhost/shine_test',
  development: 'mongodb://localhost/shine_development',
  production: process.env.MONGODB_URI
}[process.env.NODE_ENV || 'development']

let client = mongoose.connect(databaseUrl);
mongoose.Promise = require('bluebird');

module.exports = client;
