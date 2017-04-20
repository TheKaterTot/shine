class PlayerManager {
  constructor() {
    this.players = {};
  }

  addPlayer(id, data) {
    this.players[id] = data
  }

  removePlayer(id) {
    delete this.players[id];
  }

  updatePlayer(id, data) {
    this.players[id] = data;
  }
}

module.exports = PlayerManager;
