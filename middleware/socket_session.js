const session = require('./session');

module.exports = function(socket, callback) {
  session(socket.request, socket.request.res, callback);
}
