const fs = require('fs');
const path = require('path');

function convertFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (!content.includes('cc.Class')) return;

    // 简单替换 cc.Class 结构为装饰器结构
    content = content.replace(/cc\.Class\(\s*{([\s\S]*?)extends:\s*cc\.Component,([\s\S]*?)properties:\s*{([\s\S]*?)}([\s\S]*?)}\s*\)/, (match, p1, p2, props, rest) => {
        let className = path.basename(filePath, '.js');
        let propLines = props.split('\n').map(line => {
            if (line.trim()) {
                return '    @property\n    ' + line.trim();
            }
            return '';
        }).join('\n');
        return `
import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('${className}')
export class ${className} extends Component {
${propLines}

${rest.replace(/(\w+)\s*\((.*?)\)\s*{([\s\S]*?)}/g, (m, fn, args, body) => {
    return `    ${fn}(${args}) {\n${body}\n    }`;
})}
}
        `;
    });

    // 保存为 .ts 文件
    let tsPath = filePath.replace(/\.js$/, '.ts');
    fs.writeFileSync(tsPath, content, 'utf8');
    console.log(`Converted: ${filePath} -> ${tsPath}`);
}

function walk(dir) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (file.endsWith('.js')) {
            convertFile(fullPath);
        }
    });
}

// 扫描 assets/scripts 目录
walk(path.join(__dirname, 'assets', 'scripts'));