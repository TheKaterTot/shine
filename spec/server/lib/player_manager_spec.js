const expect = require('expect');
const PlayerManager = require('../../../lib/player_manager');

describe('PlayerManager', function() {
  describe('#addPlayer', function() {
    it('adds a player to the collection', function() {
      let playerManager = new PlayerManager();
      let id = 1;
      let data = {x: 1, y: 2, shiny: 4};
      playerManager.addPlayer(id, data);
      expect(playerManager.players).toEqual({1: {x: 1, y: 2, shiny: 4}});
    })
  })

  describe('#updatePlayer', function() {
    it('updates a player already in the collection', function() {
      let playerManager = new PlayerManager();
      let id = 1;
      let data = {x: 1, y: 2, shiny: 4};
      playerManager.addPlayer(id, data);
      let newData = {x: 2, y: 3, shiny: 0};
      playerManager.updatePlayer(id, newData);
      expect(playerManager.players).toEqual({1: {x: 2, y: 3, shiny: 0}});
    })
  })

  describe('#removePlayer', function() {
    it('removes a player from the collection', function() {
      let playerManager = new PlayerManager();
      let id = 1;
      let data = {x: 1, y: 2, shiny: 4};
      playerManager.addPlayer(id, data);
      playerManager.removePlayer(id);
      expect(playerManager.players).toEqual({});
    })
  })
})
