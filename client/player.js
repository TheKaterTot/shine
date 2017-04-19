const PIXI = require('pixi.js');
const ArcadeKeys = require('arcade_keys');
const generateID = require('./entity');

let arcadeKeys = ArcadeKeys();

class PlayerSprite extends PIXI.Sprite {

  constructor() {
    super(PIXI.Texture.fromImage('/images/player_0.png'));
    this.shiny = 0;
  }

  changeTexture() {
    this.texture = PIXI.Texture.fromImage(`/images/player_${this.shiny}.png`);
  }

  getShiny() {
    if (this.shiny === 4) {
      return;
    }

    this.shiny++;
    this.changeTexture();
  }

  loseShine() {
    if (this.shiny === 0) {
      return;
    }

    this.shiny -= 1;
    this.changeTexture();
  }
}

class PlayerGraphic extends PIXI.Graphics {
  constructor() {
    super();
    this.shiny = 0.0;
    this.draw();
  }

  draw() {
    this.beginFill(0x19B5FE, this.shiny);
    this.drawRect(-2, -2, 34, 34);
    this.endFill();
  }

  reset() {
    this.clear();
    this.draw();
  }

  getShiny() {
    if (this.shiny === 1.0) {
      return;
    }
    this.shiny += 0.25;
    this.reset();
  }

  loseShine() {
    if (this.shiny === 0) {
      return;
    }

    this.shiny -= 0.25;
    this.reset();
  }
}

class Player extends PIXI.Sprite {
  constructor(x, y) {
    super(PIXI.Texture.fromImage('/images/background.png'));
    this.sprite = new PlayerSprite();
    this.graphic = new PlayerGraphic();
    this.addChild(this.graphic);
    this.addChild(this.sprite);
    this.speed = 1.5;
    this.x = x;
    this.y = y;
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

  getShiny() {
    this.sprite.getShiny();
    this.graphic.getShiny();
    this.shineTimer();
  }

  loseShine() {
    this.sprite.loseShine();
    this.graphic.loseShine();
  }

  shineTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      this.loseShine();
      this.shineTimer()
    }, 25000);
  }
}
module.exports = Player;
