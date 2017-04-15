const axios = require('axios');

function getQuotes(cb) {
  axios.get('https://favqs.com/api/quotes/?filter=dreadpiratekaty&type=user', {
    headers: {'Authorization': `Token token="${process.env.QUOTE_KEY}"`}
  }).then(function (response) {
    cb(null, response.data.quotes);
  }).catch(function (err) {
    cb(err);
  });
}

module.exports = getQuotes
