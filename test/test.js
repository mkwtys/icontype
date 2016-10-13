'use strict';
const assert = require('power-assert');
const del = require('del');
const fs = require('fs');
const glob = require('glob-all');
const icontype = require('../lib/');
const template = require('../lib/template');

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

  it('template', function() {
    template('./template/icontype.css.js', {
      className: 'className',
      fontName: 'fontName',
      fontPath: '../fonts/',
      glyphs: [
        {
          name: 'glyph-name',
          codepoint: 0xEA01
        }
      ]
    }, (err, value) => {
      const expected = `@font-face {
  font-family: 'fontName';
  src: url('../fonts/fontName.eot');
  src: url('../fonts/fontName.eot?#iefix') format('eot'),
    url('../fonts/fontName.woff2') format('woff2'),
    url('../fonts/fontName.woff') format('woff'),
    url('../fonts/fontName.ttf') format('truetype'),
    url('../fonts/fontName.svg#fontName') format('svg');
}

.className-glyph-name {
  content: '\\EA01';
}

`;
      assert(value === expected);
    });
  });
});
