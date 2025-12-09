const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function walk(dir) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (file.endsWith('.js')) {
            let outPath = fullPath.replace('.js', '.deob.js');
            execSync(`jsnice -o ${outPath} ${fullPath}`);
            console.log(`Deobfuscated: ${fullPath} -> ${outPath}`);
        }
    });
}

walk(path.join(__dirname, 'assets', 'scripts'));