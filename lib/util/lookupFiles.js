'use strict';

const glob = require("glob");

function lookupFiles(files) {
  if (!files) {
    return;
  }

  let result = [];
  files.forEach((value) => {
    const paths = glob.sync(value, { nocase: true, cache: true });
    if (paths.length > 0) {
      result = result.concat(paths);
    }
  });

  return result.filter((path, index, arr) => {
    return arr.indexOf(path) === index;
  });
}

module.exports = lookupFiles;
