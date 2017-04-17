require('../../spec_helper');
const User = require('../../../models/user');
const expect = require('expect');

describe('User', function() {
  it('can be persisted', function(done) {
    let user = new User({username: 'Tater', auth_token: '1'});
    user.save(function(err, user) {
      expect(err).toEqual(null);
      expect(user._id).toExist();
      done();
    });
  })

  it('returns an error if name is taken', function(done) {
    let user = new User({username: 'Tater', auth_token: '1'});
    let userTwo = new User({username: 'Tater', auth_token: '4'});
    user.save(function(err, user) {
      userTwo.save(function(err, user) {
        expect(err).toExist();
        done();
      })
    })

  })

  describe('.findOrCreateByProfile', function () {
    it('finds a user', function(done) {
      let muffin = new User({username: 'Muffin', auth_token: '54'});
      let profile = {username: 'Muffin'};
      let token = '9';
      muffin.save(function(err, user) {
        User.findOrCreateByProfile(profile, token, function(err, user) {
          expect(user._id).toEqual(muffin._id);
          done();
        })
      })
    })

    it('makes a user', function(done) {
      let profile = {username: 'Muffin'};
      let token = '9';
      User.findOrCreateByProfile(profile, token, function(err, user) {
        expect(user.username).toEqual(profile.username);
        expect(user.auth_token).toEqual(token);
        done();
      })
    })
  })
})
