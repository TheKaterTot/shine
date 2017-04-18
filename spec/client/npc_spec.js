const Npc = require('../../client/npc');
const Player = require('../../client/player');
const expect = require('expect');
const moment = require('moment');

describe('isEligibleForInteraction', function() {
  it('returns true if player is eligible', function() {
    let npc = new Npc(200, 200, 'images/no.png');
    let player = new Player(300, 300, 'images/no.png');
    expect(npc.isEligibleForInteraction(player)).toBe(true);
  })

  it('returns false if player is not eligible', function() {
    let npc = new Npc(200, 200, 'images/no.png');
    let player = new Player(300, 300, 'images/no.png');
    npc.isEligibleForInteraction(player);
    expect(npc.isEligibleForInteraction(player, { date: moment().add(3, 'seconds')})).toBe(false);
  })

  it('returns true if a player is expired', function() {
    let npc = new Npc(200, 200, 'images/no.png');
    let player = new Player(300, 300, 'images/no.png');
    npc.isEligibleForInteraction(player);
    expect(npc.isEligibleForInteraction(player, { date: moment().add(40, 'seconds')})).toBe(true);
  })

})
