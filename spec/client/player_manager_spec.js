const expect = require('expect');
const PlayerManager = require('../../client/managers/player_manager');

describe('PlayerManager', function() {
  describe('#addPlayer', function() {
    it('adds a player to the collection', function() {
      let playerManager = new PlayerManager();
      let id = 1;
      let data = {x: 1, y: 2, shiny: 4};
      playerManager.addPlayer(id, data);
      let player = playerManager.players[id];
      expect(player.x).toEqual(1);
      expect(player.y).toEqual(2);
      expect(player.sprite.shiny).toEqual(4);
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
      let player = playerManager.players[id];
      expect(player.x).toEqual(2);
      expect(player.y).toEqual(3);
      expect(player.sprite.shiny).toEqual(0);
    })
  })

  describe('#removePlayer', function() {
    it('removes a player from the collection', function() {
      let playerManager = new PlayerManager();
      let id = 1;
      let data = {x: 1, y: 2, shiny: 4};
      playerManager.addPlayer(id, data);
      playerManager.removePlayer(id);
      expect(playerManager.players[id]).toNotExist();
    })
  })
})
