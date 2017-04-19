const PIXI = require('pixi.js');
const moment = require('moment');

class Tree extends PIXI.Sprite {
  constructor(x, y, image) {
    super(PIXI.Texture.fromImage(image));
    this.x = x;
    this.y = y;
    this.currentHits = {};
  }

  isEligibleForInteraction(player, options={}) {
    let date = options.date || moment();
    if(!this.currentHits[player.id]) {
      this.currentHits[player.id] = date;
      return true;
    }
    else {
      if(moment(date).subtract(5, 'seconds') >= this.currentHits[player.id]) {
        this.currentHits[player.id] = date;
        return true;
      }
      else {
        return false;
      }
    }
  }
}

module.exports = Tree;
