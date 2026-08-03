const fs = require('fs');

function fixUseEffect(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    // We can just find the useEffect block and remove await
    const useEffectStart = content.indexOf('useEffect(() => {');
    const valueStart = content.indexOf('const value: ');
    
    if (useEffectStart !== -1 && valueStart !== -1) {
        let before = content.slice(0, useEffectStart);
        let block = content.slice(useEffectStart, valueStart);
        let after = content.slice(valueStart);
        
        block = block.replace(/await /g, '');
        
        fs.writeFileSync(filePath, before + block + after);
        console.log('Fixed useEffect in', filePath);
    }
}

fixUseEffect('src/context/AdminDataContext.tsx');
fixUseEffect('src/context/RecruiterDataContext.tsx');
