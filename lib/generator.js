'use strict';

const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const svgicons2svgfont = require('svgicons2svgfont');
const svg2ttf = require('svg2ttf');
const ttf2woff = require('ttf2woff');
const ttf2woff2 = require('ttf2woff2');
const ttf2eot = require('ttf2eot');

const DEFAULT_OPTIONS = {
  writeFiles: true,
  fontName: 'iconfont',
  css: false,
  html: false,
  types: ['eot', 'woff', 'woff2', 'ttf', 'svg'],
  order: ['eot', 'woff', 'woff2', 'ttf', 'svg'],
  startCodepoint: 0xF101,
  normalize: true
}
let fontType = ['svg', 'ttf', 'woff', 'woff2', 'eot'];
const generatedFonts = {};
let currentCodepoint = DEFAULT_OPTIONS.startCodepoint;

function getNextCodepoint() {
  var res = currentCodepoint
  currentCodepoint++
  return res
}

function generateSvg(files, options) {
  return new Promise((resolve, reject) => {
    let font = new Buffer(0);
    const fontStream = svgicons2svgfont()
      .on('data', function(data) {
        font = Buffer.concat([font, data])
      })
      .on('end', function() {
        generatedFonts.svg = font.toString();
        resolve(generatedFonts.svg);
      })
      .on('error', function(error) {
        reject(error);
      });

    files.forEach((file) => {
      const glyph$ = fs.createReadStream(file);
      glyph$.metadata = {
        name: file,
        unicode: [String.fromCharCode(getNextCodepoint())]
      }
      fontStream.write(glyph$);
    });

    fontStream.end();
  });
}

function generateTtf(svgFont) {
  const srcFont = generatedFonts.ttf || svgFont;
  return Promise.resolve()
    .then(() => {
      let font = svg2ttf(srcFont, {});
      font = new Buffer(font.buffer);
      generatedFonts.ttf = font;
      return font;
    });
}

function generateWoff(ttfFont) {
  const srcFont = generatedFonts.ttf || ttfFont;
  return Promise.resolve()
    .then(() => {
      let font = ttf2woff(new Uint8Array(srcFont), {});
      font = new Buffer(font.buffer);
      generatedFonts.woff = font;
      return font;
    });
}

function generateWoff2(ttfFont) {
  const srcFont = generatedFonts.ttf || ttfFont;
  return Promise.resolve()
    .then(() => {
      let font = ttf2woff2(new Uint8Array(srcFont), {});
      font = new Buffer(font.buffer);
      generatedFonts.woff2 = font;
      return font;
    });
}

function generateEot(ttfFont) {
  const srcFont = generatedFonts.ttf || ttfFont;
  return Promise.resolve()
    .then(() => {
      let font = ttf2eot(new Uint8Array(srcFont), {});
      font = new Buffer(font.buffer);
      generatedFonts.eot = font;
      return font;
    });
}

function dest() {
  fontType.forEach((type) => {
    let dest = path.join(`./iconfont.${type}`);
    mkdirp.sync(path.dirname(dest));
    fs.writeFileSync(dest, generatedFonts[type]);
  });
}

function generator(files, options) {
  let mergeOptions = Object.assign({}, DEFAULT_OPTIONS, options);
  return generateSvg(files, mergeOptions)
    .then(generateTtf)
    .then(generateWoff)
    .then(generateWoff2)
    .then(generateEot)
    .then(dest);
}

module.exports = generator;
