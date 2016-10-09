'use strict';
const generator = require('./generator');

const DEFAULT_OPTIONS = {
  fontName: 'icontype',
  outDir: './',
  startUnicode: 0xEA01,
  types: ['eot', 'woff', 'woff2', 'ttf', 'svg']
};

function icontype(files, options) {
  return generator(files, Object.assign({}, DEFAULT_OPTIONS, options));
}

module.exports = icontype;
