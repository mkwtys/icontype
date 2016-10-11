'use strict';
const assert = require('power-assert');
const del = require('del');
const fs = require('fs');
const glob = require('glob-all');
const icontype = require('../lib/');

describe('generator', function() {
  const DEST = './test/dist/';
  const FONT_NAME = 'fontName';
  const TYPES = ['eot', 'woff', 'woff2', 'ttf', 'svg'];

  afterEach(function() {
    del(DEST + '*');
  });

  it('generates all fonts', function() {
    const OPTIONS = {
      fontName: FONT_NAME,
      outDir: DEST,
      startUnicode: 0xEA01,
      types: TYPES,
      log: () => {}
    };

    return icontype(glob.sync('./test/svg/*'), OPTIONS).then(function() {
      TYPES.forEach(function(type) {
        const filename = FONT_NAME + '.' + type;
        const filepath = DEST + filename;
        assert(fs.statSync(filepath).isFile());
      });
    });
  });
});
