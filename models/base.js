const mongoose = require('mongoose');

let client = mongoose.connect('mongodb://localhost/shine_development');

module.exports = client;
