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
  return `.${className}-${glyph.name} {
  content: '\\${glyph.codepoint.toString(16).toUpperCase()}';
}
`;
})}
