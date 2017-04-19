const axios = require('axios');

function getPhotos(cb) {
  axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&tags=nature&api_key=${process.env.FLICKR_API_KEY}&format=json&nojsoncallback=1`)
    .then(function (response) {
      cb(null, response.data.photos.photo);
    }).catch(function (err) {
      cb(err);
  });
}

module.exports = getPhotos
