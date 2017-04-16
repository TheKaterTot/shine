const PIXI = require('pixi.js');
const ArcadeKeys = require('arcade_keys');
const generateID = require('./entity')

let arcadeKeys = ArcadeKeys();

class Player extends PIXI.Sprite {

  constructor(x, y) {
    super(PIXI.Texture.fromImage('/images/Player.png'));
    this.x = x;
    this.y = y;
    this.speed = 1.0;
    this.id = generateID();
  }

  tick(deltaTime) {
    let dy = 0;
    let dx = 0;

    if (arcadeKeys.isPressed(ArcadeKeys.keys.up)) {
      this.y -= this.speed * deltaTime;
      dy -= this.speed * deltaTime;
    }
    else if (arcadeKeys.isPressed(ArcadeKeys.keys.down)) {
      this.y += this.speed * deltaTime;
      dy += this.speed * deltaTime;
    }
    else if (arcadeKeys.isPressed(ArcadeKeys.keys.left)) {
      this.x -= this.speed * deltaTime;
      dx -= this.speed * deltaTime;
    }
    else if (arcadeKeys.isPressed(ArcadeKeys.keys.right)) {
      this.x += this.speed * deltaTime;
      dx += this.speed * deltaTime;
    }
    this.emit('change', this, dx, dy);
  }
}

module.exports = Player;
