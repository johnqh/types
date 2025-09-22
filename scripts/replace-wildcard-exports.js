#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function extractExports(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const exports = [];

    // Match export declarations - preserving order
    const patterns = [
      { regex: /export\s+(?:const|let|var)\s+(\w+)/g, type: 'const' },
      { regex: /export\s+function\s+(\w+)/g, type: 'function' },
      { regex: /export\s+class\s+(\w+)/g, type: 'class' },
      { regex: /export\s+interface\s+(\w+)/g, type: 'interface' },
      { regex: /export\s+type\s+(\w+)(?:\s*=|\s*<)/g, type: 'type' },
      { regex: /export\s+enum\s+(\w+)/g, type: 'enum' },
    ];

    patterns.forEach(({ regex }) => {
      let match;
      const content = fs.readFileSync(filePath, 'utf8');
      while ((match = regex.exec(content)) !== null) {
        if (!exports.includes(match[1])) {
          exports.push(match[1]);
        }
      }
    });

    // Also check for re-exports
    const reExportRegex = /export\s+\{\s*([^}]+)\s*\}\s+from/g;
    let match;
    while ((match = reExportRegex.exec(content)) !== null) {
      const items = match[1].split(',').map(item => {
        const parts = item.trim().split(/\s+as\s+/);
        return parts[parts.length - 1];
      });
      items.forEach(item => {
        if (!exports.includes(item)) {
          exports.push(item);
        }
      });
    }

    return exports.sort();
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err.message);
    return [];
  }
}

function processIndexFile(indexPath) {
  const content = fs.readFileSync(indexPath, 'utf8');
  const dir = path.dirname(indexPath);

  // Find all export * from statements
  const wildcardExports = [];
  const regex = /export\s+\*\s+from\s+['"](\.\/[^'"]+)['"]/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    wildcardExports.push(match[1]);
  }

  if (wildcardExports.length === 0) {
    console.log(`No wildcard exports in ${indexPath}`);
    return;
  }

  const exportGroups = [];

  wildcardExports.forEach(importPath => {
    const fileName = path.basename(importPath);
    const filePath = path.join(dir, fileName + '.ts');

    if (fs.existsSync(filePath)) {
      const exports = extractExports(filePath);

      if (exports.length > 0) {
        exportGroups.push({
          from: importPath,
          exports: exports,
          fileName: fileName
        });
      }
    } else {
      // It might be an index file in a subdirectory
      const subIndexPath = path.join(dir, fileName, 'index.ts');
      if (fs.existsSync(subIndexPath)) {
        // For now, keep these as wildcard exports
        exportGroups.push({
          from: importPath,
          exports: null,
          fileName: fileName
        });
      }
    }
  });

  // Generate new content
  let newContent = '';

  exportGroups.forEach((group, index) => {
    if (group.exports === null) {
      // Keep as wildcard for subdirectory index files (for now)
      newContent += `export * from '${group.from}';\n`;
    } else {
      // Add comment
      const comment = getCommentForFile(group.fileName);
      if (comment) {
        newContent += `// ${comment}\n`;
      }

      newContent += `export {\n`;
      group.exports.forEach((exp, i) => {
        const comma = i < group.exports.length - 1 ? ',' : '';
        newContent += `  ${exp}${comma}\n`;
      });
      newContent += `} from '${group.from}';\n`;
    }

    if (index < exportGroups.length - 1) {
      newContent += '\n';
    }
  });

  return newContent;
}

function getCommentForFile(fileName) {
  const comments = {
    'enums': 'Enums and utilities',
    'email': 'Email types',
    'mailbox': 'Mailbox types',
    'wallet-status': 'Wallet status utilities',
    'analytics': 'Analytics types',
    'api': 'API types',
    'navigation': 'Navigation types',
    'network': 'Network types',
    'wallet': 'Wallet types',
    'common': 'Common blockchain types',
    'validation': 'Validation types',
    'environment': 'Environment configuration',
    'app-config': 'Application configuration',
    'indexer-responses': 'Indexer response types',
    'indexer-guards': 'Indexer type guards',
    'mailbox-responses': 'Mailbox response types',
    'address': 'Address utilities',
    'event-helpers': 'Event helper utilities',
    'network-config': 'Network configuration utilities',
    'logger': 'Logging utilities',
    'address-validator': 'Address validation',
    'type-validation': 'Type validation',
    'currency': 'Currency formatting',
    'date': 'Date formatting',
    'string': 'String formatting',
    'url-params': 'URL parameter utilities',
    'application': 'Application constants',
    'auth': 'Authentication utilities'
  };

  return comments[fileName] || null;
}

// Process file passed as argument
const filePath = process.argv[2];
if (filePath) {
  if (filePath === '--all') {
    // Process all index files
    const indexFiles = [
      'src/types/business/index.ts',
      'src/types/infrastructure/index.ts',
      'src/types/config/index.ts',
      'src/types/api/index.ts',
      'src/types/blockchain/index.ts',
      'src/utils/blockchain/index.ts',
      'src/utils/validation/index.ts',
      'src/utils/formatting/index.ts',
      'src/utils/logging/index.ts',
      'src/utils/url/index.ts',
      'src/utils/constants/index.ts',
      'src/utils/auth/index.ts'
    ];

    indexFiles.forEach(file => {
      if (fs.existsSync(file)) {
        console.log(`\nProcessing ${file}...`);
        const newContent = processIndexFile(file);
        if (newContent) {
          fs.writeFileSync(file, newContent);
          console.log(`Updated ${file}`);
        }
      }
    });
  } else {
    const newContent = processIndexFile(filePath);
    if (newContent) {
      console.log(newContent);
    }
  }
} else {
  console.error('Usage: node replace-wildcard-exports.js <index-file-path>');
  console.error('   or: node replace-wildcard-exports.js --all');
  process.exit(1);
}