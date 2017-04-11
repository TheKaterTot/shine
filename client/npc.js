const PIXI = require('pixi.js')

class Npc extends PIXI.Sprite {

  constructor(x, y) {
    super(PIXI.Texture.fromImage('/images/Npc.png'));
    this.x = x;
    this.y = y;
    this.speed = 1.0;
  }
}

module.exports = Npc;
