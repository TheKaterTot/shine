const injectBrowser = require('testium/mocha')

describe('homepage', function() {

  before(injectBrowser());

  it('displays the canvas', function() {
    this.browser.navigateTo('/');
    this.browser.assert.httpStatus(200);
    this.browser.assert.elementExists('canvas#game-screen');
  });
});
