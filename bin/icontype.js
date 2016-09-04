#! /usr/bin/env node
'use strict';
const icontype = require('../lib');
const glob = require('glob-all');
const minimist = require('minimist');
const pkg = require('../package.json');

const argv = minimist(process.argv.slice(2), {
  boolean: [
    'help',
    'version'
  ],
  number: [
    'start-unicode'
  ],
  string: [
    'fontname',
    'out-dir'
  ],
  alias: {
    f: 'fontname',
    h: 'help',
    o: 'out-dir',
    s: 'start-unicode',
    v: 'version'
  },
  default: {
    fontname: 'icontype',
    help: false,
    'out-dir': './',
    'start-unicode': 0xEA01,
    version: false
  }
});

function main() {
  icontype(glob.sync(argv._), {
    fontName: argv.f,
    outDir: argv.o,
    startUnicode: argv.s
  });
}

function showHelp() {
  console.log(`
${pkg.description}

Usage
  ${Object.keys(pkg.bin)[0]} <svg files> [options]

Options
  -f, --fontname         font family name [icontype]
  -h, --help             show help
  -o, --out-dir          output directory
  -s, --start-unicode    start unicode codepoint [0xEA01]
  -v, --version          print version
`
  );
}

function showVersion() {
  console.log(pkg.version);
}

if (argv.help) {
  showHelp();
}

if (argv.version) {
  showVersion();
}

if (argv._.length > 0) {
  main();
}
