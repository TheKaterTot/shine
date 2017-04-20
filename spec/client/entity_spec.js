const generateID = require('../../shared/id_generator');
const expect = require('expect');
const _ = require('lodash');

describe('generateID', function() {
  it('returns incrementing ids', function(done) {
    let num = generateID();
    expect(_.isNumber(num)).toBe(true);
    expect(generateID()).toEqual(num + 1);
    done();
  })
})
