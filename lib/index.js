'use strict';
const generator = require('./generator');

const DEFAULT_OPTIONS = {
  writeFiles: true,
  fontName: 'iconfont',
  css: false,
  html: false,
  types: ['eot', 'woff', 'woff2', 'ttf', 'svg'],
  order: ['eot', 'woff', 'woff2', 'ttf', 'svg'],
  startCodepoint: 0xF101,
  normalize: true
};

function icontype(files, options) {
  generator(files, Object.assign({}, DEFAULT_OPTIONS, options));
}

module.exports = icontype;
