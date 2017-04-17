const PIXI = require('pixi.js');
const moment = require('moment');

class Npc extends PIXI.Sprite {

  constructor(x, y) {
    super(PIXI.Texture.fromImage('/images/Npc clone.png'));
    this.x = x;
    this.y = y;
    this.speed = 1.0;
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

module.exports = Npc;
