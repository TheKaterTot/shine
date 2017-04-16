const nock = require('nock');
const expect = require('expect');
const quoteService = require('../../../services/quote_service')

describe('quote service', function() {
  it('returns quote objects', function(done) {
    nock('https://favqs.com')
      .get('/api/quotes/')
      .query({filter: 'dreadpiratekaty', type: 'user'})
      .reply(200, {quotes: [1, 2, 3, 4]});

    quoteService(function(error, quotes) {
      expect(quotes).toEqual([1, 2, 3, 4]);
      done();
    });
  })

  after(function() {
    nock.cleanAll();
  })
})
