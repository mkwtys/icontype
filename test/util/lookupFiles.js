const assert = require('power-assert');
const lookupFiles = require('../../lib/util/lookupFiles');
const path = require('path');

const pwd = process.env.PWD;
const LICENSE = path.join(pwd, 'LICENSE');
const PACKAGE = path.join(pwd, 'package.json');
const README = path.join(pwd, 'README.md');

function fixtureTest(title, actual, expected) {
  it(title, function() {
    assert.deepEqual(actual, expected);
  });
}

describe('util/lookupFiles', function() {
  context('no args', function() {
    it('return undefined', function() {
      assert(lookupFiles() === undefined);
    });
  });

  context('empty', function() {
    it('return empty array', function() {
      const actual = lookupFiles([]);
      const expected = [];
      assert.deepEqual(actual, expected);
    });
  });

  context('one path', function() {
    it('return same input path', function() {
      const actual = lookupFiles([ README ]);
      const expected = [ README ];
      assert.deepEqual(actual, expected);
    });
  });

  context('many paths', function() {
    it('return same input paths', function() {
      const actual = lookupFiles([ LICENSE, PACKAGE, README ]);
      const expected = [ LICENSE, PACKAGE, README ];
      assert.deepEqual(actual, expected);
    });
  });

  context('same paths', function() {
    it('return no duplicate paths', function() {
      const actual = lookupFiles([ README, README ]);
      const expected = [ README ];
      assert.deepEqual(actual, expected);
    });
  });
});
