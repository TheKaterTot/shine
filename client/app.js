const $ = require('jquery');
const PIXI = require('pixi.js');
const Player = require('./player');
const Npc = require('./npc');
const Bump = require('bump.js');

class Game {
  constructor() {
    this.app = new PIXI.Application(800, 600, { backgroundColor: '0xD3D3D3' });
    this.container = new PIXI.Container();
    this.bump = new Bump(PIXI);
    this.player = new Player(25, 175);
    this.npc = new Npc(400, 300);
    this.app.stage.addChild(this.container);
    this.container.addChild(this.player);
    this.container.addChild(this.npc);
    this.map = { width: 2000, height: 2000 };

    this.app.ticker.add((deltaTime) => {
      this.player.tick(deltaTime);
      this.bump.hit(this.player, this.npc, true);
    });

    document.querySelector('#game-screen').appendChild(this.app.view);

    this.player.on('change', this.moveCamera.bind(this));
  }

  moveCamera(player, dx, dy) {
    let changeX = 0;
    let changeY = 0;
    let halfWidth = this.app.renderer.width / 2.0;
    let halfHeight = this.app.renderer.height / 2.0;

    if (player.x > halfWidth && player.x < this.map.width - halfWidth) {
      changeX = dx;
    }
    if (player.y > halfHeight && player.y < this.map.height - halfHeight) {
      changeY = dy;
    }

    this.app.stage.pivot.x += changeX;
    this.app.stage.pivot.y += changeY;
  }

}

new Game();
