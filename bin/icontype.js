#! /usr/bin/env node
'use strict';

const minimist = require("minimist");
const pkg = require("../package.json");
const icontype = require("../lib");
const lookupFiles = require("../lib/util/lookupFiles");

const argv = minimist(process.argv.slice(2), {
  boolean: [
    "help",
    "version"
  ],
  alias: {
    "h": "help",
    "v": "version"
  },
  default: {
    "help": false,
    "version": false
  }
});

function main() {
  icontype(lookupFiles(argv._));
}

function showHelp() {
  console.log(`
${pkg.description}

Usage
  ${Object.keys(pkg.bin)[0]} [input files] [options]

Options
  -h, --help       show help
  -v, --version    print version
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
