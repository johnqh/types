#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function analyzeExports(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const types = [];
  const values = [];

  // Patterns for different export types
  const patterns = [
    // Interfaces are always types
    { regex: /export\s+interface\s+(\w+)/g, category: 'type' },

    // Type aliases are always types
    { regex: /export\s+type\s+(\w+)(?:\s*=|\s*<)/g, category: 'type' },

    // Enums are values (they exist at runtime)
    { regex: /export\s+enum\s+(\w+)/g, category: 'value' },

    // Constants/variables are values
    { regex: /export\s+(?:const|let|var)\s+(\w+)/g, category: 'value' },

    // Functions are values
    { regex: /export\s+function\s+(\w+)/g, category: 'value' },

    // Classes are values
    { regex: /export\s+class\s+(\w+)/g, category: 'value' },
  ];

  patterns.forEach(({ regex, category }) => {
    let match;
    const contentCopy = content; // Reset regex state
    regex.lastIndex = 0;

    while ((match = regex.exec(contentCopy)) !== null) {
      const exportName = match[1];

      if (category === 'type') {
        if (!types.includes(exportName)) {
          types.push(exportName);
        }
      } else {
        if (!values.includes(exportName)) {
          values.push(exportName);
        }
      }
    }
  });

  // Handle explicit export blocks like "export { A, B, type C }"
  const exportBlockRegex = /export\s*\{\s*([^}]+)\s*\}/g;
  let match;
  while ((match = exportBlockRegex.exec(content)) !== null) {
    const exports = match[1].split(',').map(item => item.trim());

    exports.forEach(exportItem => {
      // Check if it's explicitly marked as type
      if (exportItem.startsWith('type ')) {
        const typeName = exportItem.replace('type ', '').trim();
        if (!types.includes(typeName)) {
          types.push(typeName);
        }
      } else {
        // For ambiguous cases, we need to look at the declaration
        const exportName = exportItem.trim();

        // Check if this export is declared as interface or type in the same file
        const isInterface = new RegExp(`interface\\s+${exportName}\\b`).test(content);
        const isTypeAlias = new RegExp(`type\\s+${exportName}\\s*[=<]`).test(content);

        if (isInterface || isTypeAlias) {
          if (!types.includes(exportName)) {
            types.push(exportName);
          }
        } else {
          if (!values.includes(exportName)) {
            values.push(exportName);
          }
        }
      }
    });
  }

  return {
    types: types.sort(),
    values: values.sort()
  };
}

function generateIndexContent(exports, fromPath, comment) {
  let content = '';

  if (comment) {
    content += `// ${comment}\n`;
  }

  // Generate type exports
  if (exports.types.length > 0) {
    content += `export type {\n`;
    exports.types.forEach((typeName, index) => {
      const comma = index < exports.types.length - 1 ? ',' : '';
      content += `  ${typeName}${comma}\n`;
    });
    content += `} from '${fromPath}';\n`;
  }

  // Generate value exports
  if (exports.values.length > 0) {
    if (exports.types.length > 0) {
      content += '\n';
    }
    content += `export {\n`;
    exports.values.forEach((valueName, index) => {
      const comma = index < exports.values.length - 1 ? ',' : '';
      content += `  ${valueName}${comma}\n`;
    });
    content += `} from '${fromPath}';\n`;
  }

  return content;
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

function processIndexFile(indexPath) {
  const content = fs.readFileSync(indexPath, 'utf8');
  const dir = path.dirname(indexPath);

  // Find all export statements that need to be converted
  const wildcardExports = [];
  const exportRegex = /export\s+(?:\*|\{[^}]*\})\s+from\s+['"](\.\/[^'"]+)['"]/g;
  let match;

  while ((match = exportRegex.exec(content)) !== null) {
    wildcardExports.push(match[1]);
  }

  if (wildcardExports.length === 0) {
    console.log(`No exports to process in ${indexPath}`);
    return null;
  }

  let newContent = '';

  wildcardExports.forEach((importPath, index) => {
    const fileName = path.basename(importPath);
    const filePath = path.join(dir, fileName + '.ts');

    if (fs.existsSync(filePath)) {
      const exports = analyzeExports(filePath);
      const comment = getCommentForFile(fileName);

      const exportContent = generateIndexContent(exports, importPath, comment);
      newContent += exportContent;

      if (index < wildcardExports.length - 1) {
        newContent += '\n';
      }
    } else {
      console.log(`Warning: File not found: ${filePath}`);
    }
  });

  return newContent;
}

// Main execution
const filePath = process.argv[2];

if (filePath === '--all') {
  // Process all problematic index files
  const indexFiles = [
    'src/types/api/index.ts',
    'src/types/blockchain/index.ts',
    'src/types/business/index.ts',
    'src/types/config/index.ts',
    'src/types/infrastructure/index.ts',
    'src/utils/blockchain/index.ts',
    'src/utils/validation/index.ts',
    'src/utils/formatting/index.ts',
    'src/utils/auth/index.ts'
  ];

  indexFiles.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`\nProcessing ${file}...`);
      const newContent = processIndexFile(file);
      if (newContent) {
        fs.writeFileSync(file, newContent);
        console.log(`✅ Updated ${file}`);
      }
    }
  });

} else if (filePath) {
  const newContent = processIndexFile(filePath);
  if (newContent) {
    console.log(newContent);
  }
} else {
  console.log('Usage: node generate-typed-exports.js <index-file-path>');
  console.log('   or: node generate-typed-exports.js --all');
}