const server = require('../server')

before(function(done) {
  this.server = server.listen(8888, done);
});

after(function(done) {
  this.server.close(done);
});
