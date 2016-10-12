'use strict';
const fs = require('fs');

function template(file, value, callback) {
  fs.readFile(file, 'utf-8', (err, content) => {
    if (err) {
      return callback(new Error(err));
    }

    const keys = Object.keys(value);
    const values = keys.map((key) => { return value[key]; });
    return callback(null, new (Function.prototype.bind.apply(Function, [null].concat(keys, ['return `' + content + '`;'])))().apply(undefined, values));
  });
}

module.exports = template;
