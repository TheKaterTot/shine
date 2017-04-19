require('dotenv').config();
require('./strategies/twitter_strategy');

const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const _ = require('lodash');
const getQuotes = require('./services/quote_service');
const getPhotos = require('./services/photo_service');
const passport = require('passport');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const app = express();

let server = http.createServer(app);
let io = socketio(server);

io.on('connection', function(socket) {
  console.info('Connected')
  socket.on('quote', function (quote, callback) {
    console.dir(quote)
    callback('Thanks little buddy!')
  })
});

app.set('view engine', 'pug');

app.use(express.static('public'));

app.use(session({
  secret: process.env.SESSION_SECRET,
  store: new RedisStore({url: process.env.REDIS_URL}),
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

app.get('/api/photo', function (req, res) {
  getPhotos(function (error, photos) {
    let photo = _.chain(photos).sample().pick(['secret', 'id', 'farm', 'server']);
    res.json(photo);
  });
})

module.exports = server;
