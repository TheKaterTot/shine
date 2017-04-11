const $ = require('jquery')
const PIXI = require('pixi.js')
const Player = require('./player')

let renderer = new PIXI.Application(800, 600, { backgroundColor: '0xD3D3D3' });
let container = new PIXI.Container();

renderer.stage.addChild(container);

var player = new Player();

container.addChild(player);

renderer.ticker.add(function(deltaTime) {
  player.tick(deltaTime);
});

document.querySelector('#game-screen').appendChild(renderer.view);
