const fs = require('fs');
const path = require('path');

async function saveStringToFile(filePath, jsonString) {
  const writeStream = fs.createWriteStream(filePath, { autoClose: false });
  await new Promise(resolve => {
    writeStream.write(jsonString, () => {
      writeStream.close();
      resolve();
    });
  })
  return filePath;
}
async function readFile(filePath) {
  return fs.promises.readFile(filePath);
}
module.exports = {
  saveStringToFile: saveStringToFile,
  readFile: readFile,
}