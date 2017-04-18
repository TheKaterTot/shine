const Npc = require('../npc');

class NpcManager {
  constructor() {
    this.npcs = [];
  }

  generateNpc(x, y) {
    let image = '/images/Npc clone.png';
    let npc = new Npc(x, y, image);
    this.npcs.push(npc);
  }
}

module.exports = NpcManager;
