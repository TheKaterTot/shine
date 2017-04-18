const Npc = require('../npc');

class NpcManager {
  constructor() {
    this.npcs = [];
  }

  generateNpc(x, y, image) {
    let npc = new Npc(x, y, image);
    this.npcs.push(npc);
  }

  generateNpcs(data) {
    data.forEach((attributes) => {
      this.generateNpc(attributes.x, attributes.y, attributes.image_path)
    })
  }
}

module.exports = NpcManager;
