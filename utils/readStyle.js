const fs = require('fs');

module.exports = path => new Promise((resolve, reject) => {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});
