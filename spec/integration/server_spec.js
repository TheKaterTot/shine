require('../spec_helper');
const axios = require('axios');
const expect = require('expect');
const nock = require('nock');

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

  describe('quote endpoint', function() {
    it('returns a single quote with only author and body', function(done) {
      nock('https://favqs.com')
        .get('/api/quotes/')
        .query({filter: 'dreadpiratekaty', type: 'user'})
        .reply(200, {
          quotes: [{author: 'me', body: 'I say so', date: 'yesterday'}]
        });

      axios.get('http://localhost:8888/api/quote').then(function(res) {
        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toInclude('application/json');
        expect(res.data).toEqual({author: 'me', body: 'I say so'});
        done();
      }).catch(done);
    });

    after(function() {
      nock.cleanAll();
    })
  });
});
