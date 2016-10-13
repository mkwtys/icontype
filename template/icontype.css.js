@font-face {
  font-family: '${fontName}';
  src: url('${fontPath}${fontName}.eot');
  src: url('${fontPath}${fontName}.eot?#iefix') format('eot'),
    url('${fontPath}${fontName}.woff2') format('woff2'),
    url('${fontPath}${fontName}.woff') format('woff'),
    url('${fontPath}${fontName}.ttf') format('truetype'),
    url('${fontPath}${fontName}.svg#${fontName}') format('svg');
}

${glyphs.map((glyph) => {
  return `.${className}-${glyph.name}:before`
}).join(',\n')}
{
  font-family: '${fontName}';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  font-style: normal;
  font-variant: normal;
  font-weight: normal;
  text-decoration: none;
  text-transform: none;
}

${glyphs.map((glyph) => {
  return `.${className}-${glyph.name}:before {
  content: '\\${glyph.code.toString(16).toUpperCase()}';
}
`;
}).join('')}
