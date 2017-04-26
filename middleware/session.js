const session = require('express-session');
const RedisStore = require('connect-redis')(session);

module.exports = session({
  secret: process.env.SESSION_SECRET,
  store: new RedisStore({url: process.env.REDIS_URL}),
  resave: false,
  saveUninitialized: false,
  cookie: { secure: 'auto' }
});
