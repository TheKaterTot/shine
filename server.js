require('dotenv').config();
require('./strategies/twitter_strategy');
const express = require('express');
const _ = require('lodash');
const getQuotes = require('./services/quote_service');
const passport = require('passport');
const session = require('express-session');

const app = express();

app.set('view engine', 'pug');

app.use(express.static('public'));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: 'auto' }
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', function (req, res) {
  res.render('index', {user: req.user});
});

app.get('/login',
  passport.authenticate('twitter'),
  function(req, res) {
    res.redirect('/');
  });

app.get('/logout',
  function(req, res) {
    req.session.destroy();
    req.logout();
    res.redirect('/');
  });

app.get('/oauth/twitter/callback',
  passport.authenticate('twitter', {
    failureRedirect: '/login',
    successRedirect: '/'
  }));

app.get('/api/quote', function (req, res) {
  getQuotes(function (error, quotes) {
    let quote = _.chain(quotes).sample().pick(['author', 'body'])
    res.json(quote);
  });
});

module.exports = app;
