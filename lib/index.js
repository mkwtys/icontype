'use strict';
const backtick = require('backtick');
const generator = require('./generator');

const DEFAULT_OPTIONS = {
  className: 'icontype',
  fontName: 'icontype',
  fontPath: '../fonts',
  outDir: './',
  startUnicode: 0xEA01,
  types: ['eot', 'woff', 'woff2', 'ttf', 'svg'],
  glyphs: []
};

function icontype(files, options) {
  return generator(files, Object.assign({}, DEFAULT_OPTIONS, options))
    .then((data) => {
      if (!options.template) {
        return;
      }

      return backtick(options.template, options.templateDest, Object.assign({}, DEFAULT_OPTIONS, options, data));
    });
}

module.exports = icontype;
