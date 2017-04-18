const $ = require('jquery');
const PIXI = require('pixi.js');
const Player = require('./player');
const NpcManager = require('./managers/npc_manager');
const Bump = require('bump.js');
const Rmodal = require('./rmodal');

class Game {
  constructor() {
    this.app = new PIXI.Application(800, 600, { backgroundColor: '0xD3D3D3' });
    this.container = new PIXI.Container();
    this.map = { width: 2000, height: 2000 };
    this.texture = PIXI.Texture.fromImage('/images/grass2.png');
    this.tilingSprite = new PIXI.extras.TilingSprite(
      this.texture,
      this.map.width,
      this.map.height
    )
    this.tilingSprite.zOrder = -1;
    this.bump = new Bump(PIXI);
    this.player = new Player(25, 175);
    this.npcManager = new NpcManager();
    this.npcManager.generateNpcs(require('./config/npcs'));
    this.app.stage.addChild(this.tilingSprite);
    this.app.stage.addChild(this.container);
    this.container.addChild(this.player);
    this.npcManager.npcs.forEach((npc) => { this.container.addChild(npc); })

    this.app.ticker.add((deltaTime) => {
      this.player.tick(deltaTime);
    });

    document.querySelector('#game-screen').appendChild(this.app.view);

    this.player.on('change', this.moveCamera.bind(this));

    this.rmodal = new Rmodal($('#modal')[0], { afterClose: () => {
      this.player.getShiny();
    }});

    $('.modal-footer .btn').on('click', () => {
      this.rmodal.close();
    })
  }

  moveCamera(player, dx, dy) {
    function interact(collision, npc) {
      if(npc.isEligibleForInteraction(this.player)) {
        $.getJSON('/api/quote', (quote) => {
          let $div = $('<div />');
          let $body = $('<p />').text(quote.body);
          let $author = $('<p />').text(`-- ${quote.author}`).addClass('author');
          $('.modal-body').html($div.append($body).append($author));
          this.rmodal.open();
        })
      }
    }

    if (this.bump.hit(this.player, this.npcManager.npcs, true, true, true, interact.bind(this))) {
      return;
    }

    if (this.outOfBounds(player)) {
      return;
    }

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

  outOfBounds(player) {
    let boundaries = {
      x: 0,
      y: 0,
      width: this.map.width,
      height: this.map.height
    }

    return this.bump.contain(player, boundaries);
  }

}

new Game();
