const PIXI = require('pixi.js')
const ArcadeKeys = require('arcade_keys')

let arcadeKeys = ArcadeKeys();

class Player extends PIXI.Sprite {

  constructor(x, y) {
    super(PIXI.Texture.fromImage('/images/Player.png'));
    this.x = x;
    this.y = y;
    this.speed = 1.0;
  }

  tick(deltaTime) {
    if (arcadeKeys.isPressed(ArcadeKeys.keys.up)) {
      this.y -= this.speed * deltaTime;
    }
    else if (arcadeKeys.isPressed(ArcadeKeys.keys.down)) {
      this.y += this.speed * deltaTime;
    }
    else if (arcadeKeys.isPressed(ArcadeKeys.keys.left)) {
      this.x -= this.speed * deltaTime;
    }
    else if (arcadeKeys.isPressed(ArcadeKeys.keys.right)) {
      this.x += this.speed * deltaTime;
    }
  }
}

module.exports = Player;
