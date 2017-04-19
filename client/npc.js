const PIXI = require('pixi.js');
const moment = require('moment');
const TWEEN = require('tween.js');

class Npc extends PIXI.Sprite {

  constructor(x, y, image) {
    super(PIXI.Texture.fromImage(image));
    this.x = x;
    this.y = y;
    this.currentHits = {};
    this.tween = this.createTween(x, y);
  }

  stop() {
    this.tween.stop();
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

  createTween(x, y) {
    let self = this;

    function onUpdate() {
      self.x = this.x;
      self.y = this.y;
    }

    let position = {x: x, y: y};
    let newPosition = {x: x + 200, y: y + 50}
    let travelTime = 4000;
    let tween = new TWEEN.Tween(position).to(newPosition, travelTime);

    tween.onUpdate(onUpdate);
    tween.repeat(Infinity);
    tween.yoyo(true);
    tween.delay(x * 10);
    tween.easing(TWEEN.Easing.Cubic.In);
    tween.start();
    return tween;
  }
}

module.exports = Npc;
