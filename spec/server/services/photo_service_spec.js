const nock = require('nock');
const expect = require('expect');
const photoService = require('../../../services/photo_service');

describe('photoService', function() {
  it('returns photos', function(done) {
    nock('https://api.flickr.com')
      .get('/services/rest/')
      .query({method: 'flickr.photos.search', tags: 'nature', format: 'json', nojsoncallback: 1, api_key: process.env.FLICKR_API_KEY})
      .reply(200, {photos: { photo: [1, 2, 3, 4] }});

    photoService(function(error, photos) {
      expect(photos).toEqual([1, 2, 3, 4]);
      done();
    });
  })

  after(function() {
    nock.cleanAll();
  })
})
