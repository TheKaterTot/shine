require('dotenv').config();
require('./strategies/twitter_strategy');

const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const _ = require('lodash');
const getQuotes = require('./services/quote_service');
const getPhotos = require('./services/photo_service');
const passport = require('passport');
const session = require('./middleware/session');
const socketSession = require('./middleware/socket_session');
const socketUser = require('./middleware/socket_user')
const generateID = require('./shared/id_generator');
const PlayerManager = require('./lib/player_manager');

const app = express();

let server = http.createServer(app);
let io = socketio(server);
let playerManager = new PlayerManager();

io.use(socketSession);

io.use(socketUser);

io.on('connection', function(socket) {
  console.info('Connected')
  let id = generateID();
  _.forIn(playerManager.players, function(player, id) {
    socket.emit('player:create', id, player);
  })

  socket.on('player:change', function(data) {
    data.username = _.get(socket, 'user.username');
    playerManager.updatePlayer(id, data);
    socket.broadcast.emit('player:update', id, data);
  })
  socket.on('player:create', function(data) {
    data.username = _.get(socket, 'user.username');
    playerManager.addPlayer(id, data);
    socket.broadcast.emit('player:create', id, data);
  })
  socket.on('disconnect', function() {
    playerManager.removePlayer(id);
    io.emit('player:disconnect', id);
  })
  socket.on('message:new', function(message) {
    let data = {};
    data.username = _.get(socket, 'user.username');
    data.message = message;
    io.emit('message:new', data);
  })
});

app.set('view engine', 'pug');

app.use(express.static('public'));

app.use(session);

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
