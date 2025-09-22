#!/usr/bin/env node

/**
 * Type Analysis Script for AI Assistants
 *
 * Generates a comprehensive report of all types, interfaces, and enums
 * in the project to help AI understand the codebase structure.
 */

const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../../src');
const outputFile = path.join(__dirname, '../type-analysis.md');

function analyzeTypeScript(content, filePath) {
  const analysis = {
    interfaces: [],
    types: [],
    enums: [],
    functions: [],
    exports: []
  };

  // Extract interfaces
  const interfaceRegex = /export\s+interface\s+(\w+)/g;
  let match;
  while ((match = interfaceRegex.exec(content)) !== null) {
    analysis.interfaces.push({
      name: match[1],
      file: filePath
    });
  }

  // Extract type aliases
  const typeRegex = /export\s+type\s+(\w+)/g;
  while ((match = typeRegex.exec(content)) !== null) {
    analysis.types.push({
      name: match[1],
      file: filePath
    });
  }

  // Extract enums
  const enumRegex = /export\s+enum\s+(\w+)/g;
  while ((match = enumRegex.exec(content)) !== null) {
    analysis.enums.push({
      name: match[1],
      file: filePath
    });
  }

  // Extract exported functions
  const functionRegex = /export\s+(?:const|function)\s+(\w+)/g;
  while ((match = functionRegex.exec(content)) !== null) {
    analysis.functions.push({
      name: match[1],
      file: filePath
    });
  }

  return analysis;
}

function scanDirectory(dir, results = { interfaces: [], types: [], enums: [], functions: [] }) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      scanDirectory(filePath, results);
    } else if (file.endsWith('.ts') && !file.endsWith('.test.ts')) {
      const content = fs.readFileSync(filePath, 'utf8');
      const relativePath = path.relative(srcDir, filePath);
      const analysis = analyzeTypeScript(content, relativePath);

      results.interfaces.push(...analysis.interfaces);
      results.types.push(...analysis.types);
      results.enums.push(...analysis.enums);
      results.functions.push(...analysis.functions);
    }
  }

  return results;
}

function generateReport(analysis) {
  const report = [
    '# Type Analysis Report',
    '',
    `Generated on: ${new Date().toISOString()}`,
    '',
    '## Summary',
    '',
    `- **Interfaces**: ${analysis.interfaces.length}`,
    `- **Type Aliases**: ${analysis.types.length}`,
    `- **Enums**: ${analysis.enums.length}`,
    `- **Functions**: ${analysis.functions.length}`,
    '',
    '## Interfaces',
    ''
  ];

  // Group by domain
  const interfacesByDomain = {};
  analysis.interfaces.forEach(item => {
    const domain = item.file.split('/')[1] || 'root';
    if (!interfacesByDomain[domain]) {
      interfacesByDomain[domain] = [];
    }
    interfacesByDomain[domain].push(item);
  });

  Object.keys(interfacesByDomain).sort().forEach(domain => {
    report.push(`### ${domain}`);
    report.push('');
    interfacesByDomain[domain].forEach(item => {
      report.push(`- \`${item.name}\` - \`${item.file}\``);
    });
    report.push('');
  });

  // Add enums section
  report.push('## Enums');
  report.push('');

  const enumsByDomain = {};
  analysis.enums.forEach(item => {
    const domain = item.file.split('/')[1] || 'root';
    if (!enumsByDomain[domain]) {
      enumsByDomain[domain] = [];
    }
    enumsByDomain[domain].push(item);
  });

  Object.keys(enumsByDomain).sort().forEach(domain => {
    report.push(`### ${domain}`);
    report.push('');
    enumsByDomain[domain].forEach(item => {
      report.push(`- \`${item.name}\` - \`${item.file}\``);
    });
    report.push('');
  });

  // Add utility functions section
  report.push('## Utility Functions');
  report.push('');

  const functionsByDomain = {};
  analysis.functions.forEach(item => {
    const domain = item.file.split('/')[1] || 'root';
    if (!functionsByDomain[domain]) {
      functionsByDomain[domain] = [];
    }
    functionsByDomain[domain].push(item);
  });

  Object.keys(functionsByDomain).sort().forEach(domain => {
    report.push(`### ${domain}`);
    report.push('');
    functionsByDomain[domain].forEach(item => {
      report.push(`- \`${item.name}\` - \`${item.file}\``);
    });
    report.push('');
  });

  return report.join('\n');
}

// Generate the analysis
console.log('Analyzing TypeScript files...');
const analysis = scanDirectory(srcDir);
const report = generateReport(analysis);

// Write the report
fs.writeFileSync(outputFile, report);
console.log(`Analysis complete. Report saved to: ${outputFile}`);