const PIXI = require('pixi.js');
const ArcadeKeys = require('arcade_keys');
const generateID = require('../shared/id_generator');

let arcadeKeys = ArcadeKeys(null, [
  ArcadeKeys.keys.up,
  ArcadeKeys.keys.down,
  ArcadeKeys.keys.left,
  ArcadeKeys.keys.right
]);

class PlayerSprite extends PIXI.Sprite {

  constructor() {
    super(PIXI.Texture.fromImage('/images/player_0.png'));
    this.shiny = 0;
  }

  changeTexture() {
    this.texture = PIXI.Texture.fromImage(`/images/player_${this.shiny}.png`);
  }

  set shine(value) {
    this.shiny = value;
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

  set shine(value) {
    this.shiny = (value * 0.25);
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

class PlayerName extends PIXI.Text {
  constructor() {
    let style = new PIXI.TextStyle({
      fontSize: 16,
      fontFamily: 'monospace'
    })
    super('You', style);

  }
}

class Player extends PIXI.Sprite {
  constructor(x, y, shiny = 0) {
    super(PIXI.Texture.fromImage('/images/background.png'));
    this.sprite = new PlayerSprite();
    this.graphic = new PlayerGraphic();
    this.playerName = new PlayerName();
    this.sprite.shine = shiny;
    this.graphic.shine = shiny;
    this.addChild(this.graphic);
    this.addChild(this.sprite);
    this.addChild(this.playerName);
    this.speed = 1.5;
    this.x = x;
    this.y = y;
    this.playerName.x = (this.width / 2.0) - (this.playerName.width / 2.0);
    this.playerName.y = -20.0;
    this.id = generateID();
    process.nextTick(() => {
      this.emit('create', this);
    })
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
    if (dx !== 0 || dy !== 0) {
      this.emit('move', this, dx, dy);
      this.emit('change', this);
    }
  }

  get data() {
    return {
      x: this.x,
      y: this.y,
      shiny: this.sprite.shiny
    }
  }

  getShiny() {
    this.sprite.getShiny();
    this.graphic.getShiny();
    this.shineTimer();
    this.emit('change', this);
  }

  loseShine() {
    this.sprite.loseShine();
    this.graphic.loseShine();
    this.emit('change', this);
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
