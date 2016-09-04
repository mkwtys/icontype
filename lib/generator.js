'use strict';
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const svg2ttf = require('svg2ttf');
const svgicons2svgfont = require('svgicons2svgfont');
const ttf2eot = require('ttf2eot');
const ttf2woff = require('ttf2woff');
const ttf2woff2 = require('ttf2woff2');

const generatedFonts = {};
let currentCodepoint = null;

function getNextCodepoint(startCodepoint) {
  if (currentCodepoint === null) {
    currentCodepoint = startCodepoint;
  }
  var res = currentCodepoint;
  currentCodepoint++;
  return res;
}

function generateSvg(files, options) {
  return new Promise((resolve, reject) => {
    let font = new Buffer(0);
    const fontStream = svgicons2svgfont({
      fontName: options.fontName
    })
      .on('data', function(data) {
        font = Buffer.concat([font, data]);
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
        unicode: [String.fromCharCode(getNextCodepoint(options.startUnicode))]
      };
      fontStream.write(glyph$);
    });
    fontStream.end();
  });
}

function generateTtf(svgFont) {
  const srcFont = generatedFonts.svg || svgFont;
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

function dest(options) {
  options.types.forEach((type) => {
    let dest = path.join(`${options.outDir}/${options.fontName}.${type}`);
    mkdirp.sync(path.dirname(dest));
    fs.writeFileSync(dest, generatedFonts[type]);
  });
}

function generator(files, options) {
  return generateSvg(files, options)
    .then(generateTtf)
    .then(generateWoff)
    .then(generateWoff2)
    .then(generateEot)
    .then(() => {
      dest(options);
    });
}

module.exports = generator;
