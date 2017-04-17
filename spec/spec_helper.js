const server = require('../server');
const mongoose = require('../models/base');
const User = require('../models/user')

before(function(done) {
  this.server = server.listen(8888, done);
});

afterEach(function(done) {
  User.remove({}, done)
})

after(function(done) {
  this.server.close(done);
});
