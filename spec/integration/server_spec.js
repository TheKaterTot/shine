require('../spec_helper');
const axios = require('axios');
const expect = require('expect');

describe('server', function() {
  describe('root route', function() {
    it('returns a successful html page', function(done) {
      axios.get('http://localhost:8888').then(function(res) {
        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toInclude('text/html');
        done();
      }).catch(done);
    });
  });
});
