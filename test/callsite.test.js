/* global describe:true, it:true, assert:true */

describe('makeErrorString', function() {
  it('should work', function() {
    assert.equal(makeErrorString('x', 'y'), 'x: y');
  });
  it('should accept undefined', function() {
    assert.equal(makeErrorString(undefined, 'y'), 'y');
    assert.equal(makeErrorString('x', undefined), 'x');
    assert.equal(makeErrorString(undefined, undefined), '');
  });
});
