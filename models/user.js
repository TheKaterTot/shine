const mongoose = require('./base');
const Schema = require('mongoose').Schema;

let UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  auth_token: {
    type: String,
    required: true
  }
})

UserSchema.statics.findOrCreateByProfile = function(profile, token, cb) {
  this.findOne({username: profile.username}, (err, user) => {
    if(err) {
      return cb(err);
    }
    if (user) {
      return cb(null, user);
    }
    let newUser = new (this)({username: profile.username, auth_token: token});
    newUser.save(cb);
  })
}

module.exports = mongoose.model('users', UserSchema);
