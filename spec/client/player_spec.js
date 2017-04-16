const Player = require('../../client/player');
const expect = require('expect');
const _ = require('lodash');

describe('player id', function() {
  it('generates a player with an id', function(done) {
    let player = new Player(200, 200);
    let playerTwo = new Player(300, 300);
    expect(_.isNumber(player.id)).toBe(true);
    expect(_.isNumber(playerTwo.id)).toBe(true);
    done();
  })
})
