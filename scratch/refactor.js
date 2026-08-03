const fs = require('fs');
const path = require('path');

function processContextFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');

    // 1. Change void to Promise<void> for CRUD methods in interfaces
    content = content.replace(/:\s*void\b/g, ': Promise<void>');

    // 2. Add async to methods in the object literal
    content = content.replace(/^(\s{4})([a-zA-Z0-9_]+)\(.*?\) \{/gm, (match, p1, p2) => {
        // Exclude some common non-async things if needed, but in this object all are fine to be async
        return `${p1}async ${match.trim()}`;
    });
    // Remove duplicate async if it occurs
    content = content.replace(/async\s+async\s+/g, 'async ');

    // 3. await API calls
    content = content.replace(/contentApi\./g, 'await contentApi.');
    content = content.replace(/adminApi\./g, 'await adminApi.');
    content = content.replace(/postingApi\./g, 'await postingApi.');
    content = content.replace(/applicationApi\./g, 'await applicationApi.');
    content = content.replace(/companyApi\./g, 'await companyApi.');
    // Remove duplicate awaits
    content = content.replace(/await\s+await\s+/g, 'await ');

    // 4. replace .catch(console.error) with throw err
    content = content.replace(/\.catch\(console\.error\)/g, '.catch(err => { console.error(err); throw err; })');

    // 5. replace other catch blocks to throw
    content = content.replace(/showToast\(msg\);\s*\n\s*}\)/g, 'showToast(msg);\n          throw err;\n        })');
    content = content.replace(/showToast\((err\.response.*?)\);\s*\n\s*}\)/g, 'showToast($1);\n          throw err;\n        })');

    fs.writeFileSync(filePath, content);
    console.log('Processed', filePath);
}

processContextFile('src/context/AdminDataContext.tsx');
processContextFile('src/context/RecruiterDataContext.tsx');

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

function processModalFiles() {
    const files = [
        ...getAllFiles('src/pages/admin'),
        ...getAllFiles('src/pages/recruiter'),
        ...getAllFiles('src/components/modals'),
        ...getAllFiles('src/pages/student/profile')
    ];

    for (const file of files) {
        let content = fs.readFileSync(file, 'utf-8');
        let original = content;

        // Find all SimpleFormModal elements
        // This is a naive regex but it usually works for JSX if they are well formed
        const forms = content.match(/<SimpleFormModal[\s\S]*?\/>/g);
        if (forms) {
            for (let form of forms) {
                let newForm = form.replace(/onSubmit=\{\(?(v|values|val|data|fields)\)?\s*=>\s*\{/g, 'onSubmit={async ($1) => {');
                
                // Add await to context calls inside the form
                const callsToAwait = ['save', 'delete', 'approve', 'publish', 'close', 'generate', 'update', 'add', 'setAppStage', 'markJoined', 'rejectCand', 'revokeOffer'];
                for (const call of callsToAwait) {
                    newForm = newForm.replace(new RegExp(`([^a-zA-Z0-9_])(${call}[a-zA-Z0-9_]*\\()`, 'g'), '$1await $2');
                }
                newForm = newForm.replace(/await\s+await\s+/g, 'await ');
                
                content = content.replace(form, newForm);
            }
        }
        
        if (content !== original) {
            fs.writeFileSync(file, content);
            console.log('Processed modal', file);
        }
    }
}

processModalFiles();
console.log("Done");
