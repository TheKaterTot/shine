require('dotenv').config()
const express = require('express');
const _ = require('lodash');
const getQuotes = require('./services/quote_service');

const app = express();

app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/api/quote', function (req, res) {
  getQuotes(function (error, quotes) {
    let quote = _.chain(quotes).sample().pick(['author', 'body'])
    res.json(quote);
  });
});

module.exports = app;
