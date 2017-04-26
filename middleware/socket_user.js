const _ = require('lodash');
const User = require('../models/user');

module.exports = function(socket, callback) {
  let id = _.get(socket.request.session, 'passport.user');
  if (id) {
    User.findOne({_id: id}, function(err, user) {
      if (err) {
        return callback(err)
      }
      socket.user = user;
      callback();
    });
  } else {
    callback();
  }
}
