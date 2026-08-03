const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles) {
  let files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.tsx')) {
        arrayOfFiles.push(path.join(__dirname, '..', dirPath, "/", file));
      }
    }
  });
  return arrayOfFiles;
}

const files = [
    ...getAllFiles('src/pages'),
    ...getAllFiles('src/components')
];

for (const file of files) {
    let content = fs.readFileSync(file, 'utf-8');
    let original = content;
    
    content = content.replace(/await\s+closeModal/g, 'closeModal');
    
    if (content !== original) {
        fs.writeFileSync(file, content);
        console.log('Fixed await closeModal in', file);
    }
}
