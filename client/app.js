const $ = require('jquery');
const _ = require('lodash');
const PIXI = require('pixi.js');
const Player = require('./player');
const NpcManager = require('./managers/npc_manager');
const TreeManager = require('./managers/tree_manager');
const PlayerManager = require('./managers/player_manager');
const Bump = require('bump.js');
const Rmodal = require('./rmodal');
const TWEEN = require('tween.js');

class Game {
  constructor() {
    let client = require('socket.io-client')();
    this.app = new PIXI.Application(800, 600, { backgroundColor: '0xD3D3D3' });
    this.container = new PIXI.Container();
    this.map = { width: 2000, height: 2000 };
    this.texture = PIXI.Texture.fromImage('/images/grass2.png');
    this.tilingSprite = new PIXI.extras.TilingSprite(
      this.texture,
      this.map.width,
      this.map.height
    )
    this.bump = new Bump(PIXI);
    this.player = new Player(25, 175);
    this.npcManager = new NpcManager();
    this.npcManager.generateNpcs(require('./config/npcs'));
    this.treeManager = new TreeManager();
    this.treeManager.generateTrees(require('./config/trees'));
    this.app.stage.addChild(this.tilingSprite);
    this.app.stage.addChild(this.container);
    this.container.addChild(this.player);
    this.npcManager.npcs.forEach((npc) => {
      this.container.addChild(npc);
    })
    this.treeManager.trees.forEach((tree) => {
      this.container.addChild(tree);
    })
    this.app.ticker.add((deltaTime) => {
      this.player.tick(deltaTime);
      TWEEN.update();
      _.forIn(this.playerManager.players, (player, id) => {
        player.tick(deltaTime);
      });
    });

    this.playerManager = new PlayerManager();

    document.querySelector('#game-screen').appendChild(this.app.view);

    client.on('player:update', (id, data) => {
      this.playerManager.updatePlayer(id, data);
    });

    client.on('player:create', (id, data) => {
      let otherPlayer = this.playerManager.addPlayer(id, data);

      this.container.addChild(otherPlayer);
    });

    client.on('player:disconnect', (id) => {
      let player = this.playerManager.players[id];
      this.container.removeChild(player);
      this.playerManager.removePlayer(id);
    })

    this.player.on('move', this.moveCamera.bind(this));

    this.player.on('change', function(player) {
      client.emit('player:change', player.data);
    });

    this.player.on('create', function(player) {
      client.emit('player:create', player.data);
    });

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
        npc.stop();

        setTimeout(function () {
          npc.tween.start();
        }, 10000)

        $.getJSON('/api/quote', (quote) => {
          let $div = $('<div />');
          let $divTwo = $('<div />');
          let $body = $('<p />').text(quote.body);
          let $author = $('<p />').text(`-- ${quote.author}`).addClass('author');
          let $headerText = $('<p />').text('Sometimes I feel gray, too. But you know...')
          $('.modal-header').html($divTwo.append($headerText));
          $('.modal-body').html($div.append($body).append($author));
          this.rmodal.open();

          client.emit('quote', quote, function (message) {
            //window.alert(message)
          })
        })
      }
    }

    function interactNature(collision, tree) {
      if (tree.isEligibleForInteraction(this.player)) {
        $.getJSON('/api/photo', (photo) => {
          let $div = $('<div />');
          let $divTwo = $('<div />');
          let $headerText = $('<p />').text(`It's a lovely day for walk in the trees...`)
          let $url = $('<img />').attr('src', `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`).addClass('photo');
          $('.modal-header').html($divTwo.append($headerText));
          $('.modal-body').html($div.append($url));
          this.rmodal.open();
        })
      }
    }

    if (this.bump.hit(this.player, this.npcManager.npcs, true, true, true, interact.bind(this))) {
      return;
    }

    if (this.bump.hit(this.player, this.treeManager.trees, true, true, true, interactNature.bind(this)))

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

PIXI.loader
  .add('/images/player_0.png')
  .add('/images/player_1.png')
  .add('/images/player_2.png')
  .add('/images/player_3.png')
  .add('/images/player_4.png')
  .add('/images/npc_circle.png')
  .add('/images/grass2.png')
  .add('/images/background.png').load(function () {
    rmodal = new Rmodal($('#new-modal')[0], { afterClose: () => {
      new Game();
    }});
    rmodal.open();
    $('#new-modal .modal-footer .btn').on('click', () => {
      rmodal.close();
    })
  });
