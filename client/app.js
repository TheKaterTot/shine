const $ = require('jquery');
const PIXI = require('pixi.js');
const Player = require('./player');
const Npc = require('./npc');
const Bump = require('bump.js');

let renderer = new PIXI.Application(800, 600, { backgroundColor: '0xD3D3D3' });
let container = new PIXI.Container();
let bump = new Bump(PIXI);

renderer.stage.addChild(container);

let player = new Player(25, 175);
let npc = new Npc(400, 300);

container.addChild(player);
container.addChild(npc);

renderer.ticker.add(function(deltaTime) {
  player.tick(deltaTime);
  bump.hit(player, npc, true);
});

document.querySelector('#game-screen').appendChild(renderer.view);
