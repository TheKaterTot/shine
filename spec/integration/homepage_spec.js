require('../spec_helper');
const Browser = require('zombie');

Browser.localhost('localhost', 8888);

describe('homepage', function() {
  const browser = new Browser();

  before(function(done) {
    browser.visit('/', done);
  });

  it('displays the canvas', function() {
    browser.assert.success();
    browser.assert.element('canvas#game-screen');
  })
})
