'use strict';
const generator = require('./generator');

const DEFAULT_OPTIONS = {
  fontName: 'icontype',
  types: ['eot', 'woff', 'woff2', 'ttf', 'svg'],
  startCodepoint: 0xEA01
};

function icontype(files, options) {
  generator(files, Object.assign({}, DEFAULT_OPTIONS, options));
}

module.exports = icontype;
