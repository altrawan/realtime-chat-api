const fs = require('fs');

const deleteFile = (filePath) =>
  new Promise((resolve, reject) => {
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) reject(new Error('Error delete file'));
        resolve();
      });
    }
  });

module.exports = deleteFile;
