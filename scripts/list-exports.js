#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function extractExports(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const exports = new Set();

  // Match export declarations
  const patterns = [
    /export\s+(?:const|let|var)\s+(\w+)/g,
    /export\s+function\s+(\w+)/g,
    /export\s+class\s+(\w+)/g,
    /export\s+interface\s+(\w+)/g,
    /export\s+type\s+(\w+)/g,
    /export\s+enum\s+(\w+)/g,
    /export\s+\{\s*([^}]+)\s*\}/g,
  ];

  patterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      if (pattern === /export\s+\{\s*([^}]+)\s*\}/g) {
        // Handle export { A, B, C }
        const items = match[1].split(',').map(item => {
          const parts = item.trim().split(/\s+as\s+/);
          return parts[parts.length - 1];
        });
        items.forEach(item => exports.add(item));
      } else {
        exports.add(match[1]);
      }
    }
  });

  return Array.from(exports).sort();
}

function processFile(filePath) {
  const exports = extractExports(filePath);
  const relativePath = path.relative(process.cwd(), filePath);

  if (exports.length > 0) {
    console.log(`\n// ${relativePath}`);
    console.log(`export {`);
    exports.forEach((exp, index) => {
      const comma = index < exports.length - 1 ? ',' : '';
      console.log(`  ${exp}${comma}`);
    });
    console.log(`} from './${path.basename(filePath, '.ts')}';`);
  }
}

// Process the file passed as argument
const filePath = process.argv[2];
if (filePath) {
  processFile(filePath);
} else {
  console.error('Please provide a file path');
  process.exit(1);
}