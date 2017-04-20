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
    this.outlineColors = [0xECECEC, 0xD2D7D3, 0xDADFE1, 0xBDC3C7, 0xBFBFBF];
    this.colorIndex = 0;
    this.draw();
    this.threshold = 25;
    this.currentTime = 0;
  }

  draw() {
    this.beginFill(this.outlineColors[this.colorIndex], this.shiny);
    this.drawRoundedRect(-3, -3, 36, 36, 10);
    this.endFill();
  }

  updateGraphic(deltaTime) {
    this.currentTime += deltaTime

    if (this.currentTime > this.threshold) {
      this.colorIndex = (this.colorIndex+1) % this.outlineColors.length;
      this.currentTime = 0;
    }

    this.reset();
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
  }

  loseShine() {
    if (this.shiny === 0) {
      return;
    }

    this.shiny -= 0.25;
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

    this.graphic.updateGraphic(deltaTime);

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
