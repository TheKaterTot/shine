const PIXI = require('pixi.js')
const ArcadeKeys = require('arcade_keys')

let arcadeKeys = ArcadeKeys();

class Player extends PIXI.Graphics {

  constructor() {
    super();
    this.lineStyle(2, 0x0000FF, 1);
    this.beginFill(0x0000FF, 1);
    this.drawRect(25, 175, 30, 30);
    this.speed = 1.0;
  }

  tick(deltaTime) {
    if (arcadeKeys.isPressed(ArcadeKeys.keys.up)) {
      this.position.y -= this.speed * deltaTime;
    }
    else if (arcadeKeys.isPressed(ArcadeKeys.keys.down)) {
      this.position.y += this.speed * deltaTime;
    }
    else if (arcadeKeys.isPressed(ArcadeKeys.keys.left)) {
      this.position.x -= this.speed * deltaTime;
    }
    else if (arcadeKeys.isPressed(ArcadeKeys.keys.right)) {
      this.position.x += this.speed * deltaTime;
    }
  }
}

module.exports = Player;
