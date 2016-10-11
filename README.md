[![Build Status](https://travis-ci.org/mkwtys/icontype.svg?branch=master)](https://travis-ci.org/mkwtys/icontype)
[![codecov](https://codecov.io/gh/mkwtys/icontype/branch/master/graph/badge.svg)](https://codecov.io/gh/mkwtys/icontype)

# icontype

iconfont generator

## Installation

```sh
$ npm install icontype
```

## Usage

### in CLI

```sh
$ icontype --help
iconfont generator

Usage
  icontype <svg files> [options]

Options
  -f, --fontname         font family name [icontype]
  -h, --help             show help
  -o, --out-dir          output directory
  -s, --start-unicode    start unicode codepoint [0xEA01]
  -v, --version          print version
```

#### Example:

```sh
icontype <svg files>
```

## License

MIT © [mkwtys](https://github.com/mkwtys)


> [octicons](https://github.com/primer/octicons/) svg used in test.  
> https://github.com/primer/octicons/#license
>
> _SVG License:_ [SIL OFL 1.1](http://scripts.sil.org/OFL)  
> Applies to all SVG files
