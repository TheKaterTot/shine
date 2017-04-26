const OtherPlayer = require('../other_player');

class PlayerManager {
  constructor() {
    this.players = {};
  }

  addPlayer(id, data) {
    this.players[id] = new OtherPlayer(data.x, data.y, data.shiny, data.username);
    return this.players[id];
  }

  removePlayer(id) {
    delete this.players[id];
  }

  updatePlayer(id, data) {
    this.players[id].x = data.x;
    this.players[id].y = data.y;
    this.players[id].shiny = data.shiny;
  }
}

module.exports = PlayerManager;
