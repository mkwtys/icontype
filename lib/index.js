'use strict';
const generator = require('./generator');
const template = require('./template');

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

      return template(options.template, Object.assign({}, DEFAULT_OPTIONS, options, data));
    });
}

module.exports = icontype;
