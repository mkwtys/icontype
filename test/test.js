'use strict';
const assert = require('power-assert');
const fs = require('fs');
const glob = require('glob-all');
const icontype = require('../lib/');

describe('generator', function() {
  const CLASS_NAME = 'className';
  const DEST = './test/dist/';
  const FONT_NAME = 'fontName';
  const FONT_PATH = '../fonts/';
  const START_UNICODE = 0xEA01;
  const TEMPLATE = './template/icontype.css';
  const TYPES = ['eot', 'woff', 'woff2', 'ttf', 'svg'];

  const OPTIONS = {
    fontName: FONT_NAME,
    outDir: DEST,
    startUnicode: START_UNICODE,
    types: TYPES,
    className: CLASS_NAME,
    fontPath: FONT_PATH,
    template: TEMPLATE,
    templateDest: DEST,
    normalize: true,
    height: 500,
    centerHorizontally: true,
    log: () => {}
  };

  it('generate all fonts', function() {
    return icontype(glob.sync('./test/svg/*'), OPTIONS)
      .then(() => {
        TYPES.forEach((type) => {
          const filename = FONT_NAME + '.' + type;
          const filepath = DEST + filename;
          assert(fs.statSync(filepath).isFile());
        });
      });
  });

  it('generate template file', function() {
    return icontype(glob.sync('./test/svg/*'), OPTIONS)
      .then(() => {
        const actual = fs.readFileSync('./test/dist/icontype.css', 'utf8');
        const expected = fs.readFileSync('./test/expected/icontype.css', 'utf8');
        assert(actual === expected);
      });
  });
});
