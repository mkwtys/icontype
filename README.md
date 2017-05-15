[![Build Status](https://travis-ci.org/mkwtys/icontype.svg?branch=master)](https://travis-ci.org/mkwtys/icontype)
[![codecov](https://codecov.io/gh/mkwtys/icontype/branch/master/graph/badge.svg)](https://codecov.io/gh/mkwtys/icontype)

# icontype

[![Greenkeeper badge](https://badges.greenkeeper.io/mkwtys/icontype.svg)](https://greenkeeper.io/)

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
```

#### Example:

```sh
icontype <svg files>
```

## License

MIT © [mkwtys](https://github.com/mkwtys)

> octicons svg used in test.
>
> [octicons](https://github.com/primer/octicons/)  
> _SVG License:_ [SIL OFL 1.1](http://scripts.sil.org/OFL)  
> Applies to all SVG files
