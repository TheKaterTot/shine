const server = require('./server');
const port = process.env.PORT || 5000

server.listen(port, function () {
  console.info(`Now listening on port ${port} ...`);
});
