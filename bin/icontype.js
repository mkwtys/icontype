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
    'class-name',
    'font-name',
    'font-path',
    'out-dir',
    'template-dest',
    'template',
    'normalize',
    'height'
  ],
  alias: {
    c: 'class-name',
    f: 'font-name',
    h: 'help',
    o: 'out-dir',
    p: 'font-path',
    s: 'start-unicode',
    v: 'version'
  },
  default: {
    'class-name': 'icontype',
    'font-name': 'icontype',
    'font-path': './',
    help: false,
    'out-dir': './',
    'start-unicode': 0xEA01,
    version: false
  }
});

function main() {
  icontype(glob.sync(argv._), {
    className: argv.c,
    fontName: argv.f,
    fontPath: argv.p,
    outDir: argv.o,
    startUnicode: argv.s,
    template: argv.template,
    templateDest: argv['template-dest']
  });
}

function showHelp() {
  console.log(`
${pkg.description}

Usage
  ${Object.keys(pkg.bin)[0]} <svg files> [options]

Options
  -c, --class-name       base class name for css      [default: icontype]
  -f, --font-name        font family name             [default: icontype]
  -p, --font-path        font path for css
      --height           height option for 'svgicons2svgfont'
  -h, --help             show help
      --normalize        normalize option for 'svgicons2svgfont'
  -o, --out-dir          output directory
  -s, --start-unicode    start unicode codepoint      [default: 0xEA01]
      --template         template source (glob)
      --template-dest    template output directory
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
