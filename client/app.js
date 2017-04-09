const $ = require('jquery')

$(function() {
  let $canvas = $('canvas#game-screen');
  let context = $canvas[0].getContext('2d');
  context.fillStyle = '#000000';
  context.fillRect(0, 0, $canvas.attr('width'), $canvas.attr('height'));
});
