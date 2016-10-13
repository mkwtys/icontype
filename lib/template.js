'use strict';
const fs = require('fs');
const path = require('path');

function template(templates, value) {
  let files = templates;

  if (!Array.isArray(templates)) {
    files = [templates];
  }

  const promises = files.map((file) => {
    return new Promise((resolve, reject) => {
      fs.readFile(file, 'utf-8', (err, content) => {
        if (err) {
          reject(err);
        }

        const keys = Object.keys(value);
        const values = keys.map((key) => { return value[key]; });
        const output = new (Function.prototype.bind.apply(Function, [null].concat(keys, ['return `' + content + '`;'])))().apply(undefined, values);
        const file = path.basename(value.template).split(/(?=\.[^.]+$)/)[0];
        const filePath = path.resolve(value.templateDest, file);
        fs.writeFileSync(filePath, output);
        resolve(output);
      });
    });
  });

  return Promise.all(promises);
}

module.exports = template;
