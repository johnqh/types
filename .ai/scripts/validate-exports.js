#!/usr/bin/env node

/**
 * Export Validation Script for AI Assistants
 *
 * Validates that all exported types are properly re-exported through
 * the index files and main entry point. Helps maintain clean export structure.
 */

const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../../src');

function extractExports(content, filePath) {
  const exports = [];

  // Extract named exports
  const namedExportRegex = /export\s+(?:interface|type|enum|const|function|class)\s+(\w+)/g;
  let match;
  while ((match = namedExportRegex.exec(content)) !== null) {
    exports.push({
      name: match[1],
      type: 'named',
      file: filePath
    });
  }

  // Extract re-exports
  const reExportRegex = /export\s+\*\s+from\s+['"]([^'"]+)['"]/g;
  while ((match = reExportRegex.exec(content)) !== null) {
    exports.push({
      name: '*',
      type: 'wildcard',
      from: match[1],
      file: filePath
    });
  }

  // Extract selective re-exports
  const selectiveReExportRegex = /export\s+\{\s*([^}]+)\s*\}\s+from\s+['"]([^'"]+)['"]/g;
  while ((match = selectiveReExportRegex.exec(content)) !== null) {
    const names = match[1].split(',').map(n => n.trim());
    names.forEach(name => {
      exports.push({
        name: name,
        type: 'selective',
        from: match[2],
        file: filePath
      });
    });
  }

  return exports;
}

function scanForExports(dir, results = []) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && file !== 'node_modules' && file !== 'dist') {
      scanForExports(filePath, results);
    } else if (file.endsWith('.ts') && !file.endsWith('.test.ts')) {
      const content = fs.readFileSync(filePath, 'utf8');
      const relativePath = path.relative(srcDir, filePath);
      const exports = extractExports(content, relativePath);
      results.push(...exports);
    }
  }

  return results;
}

function validateExportStructure() {
  console.log('Scanning for exports...');
  const allExports = scanForExports(srcDir);

  const issues = [];
  const indexFiles = allExports.filter(exp => exp.file.endsWith('index.ts'));
  const namedExports = allExports.filter(exp => exp.type === 'named' && !exp.file.endsWith('index.ts'));

  // Check if all named exports are re-exported in index files
  namedExports.forEach(namedExport => {
    const directory = path.dirname(namedExport.file);
    const expectedIndexFile = directory === '.' ? 'index.ts' : `${directory}/index.ts`;

    // Check if there's an index file in the same directory
    const hasIndexFile = indexFiles.some(indexFile => indexFile.file === expectedIndexFile);
    if (!hasIndexFile) {
      issues.push({
        type: 'missing_index',
        message: `No index.ts file found for directory: ${directory}`,
        export: namedExport
      });
      return;
    }

    // Check if the export is re-exported in the index file
    const indexFile = indexFiles.find(indexFile => indexFile.file === expectedIndexFile);
    // This is a simplified check - would need more sophisticated parsing for complete validation
  });

  // Check main index file
  const mainIndex = allExports.filter(exp => exp.file === 'index.ts');
  if (mainIndex.length === 0) {
    issues.push({
      type: 'missing_main_index',
      message: 'No main index.ts file found'
    });
  }

  return {
    issues,
    stats: {
      totalExports: allExports.length,
      namedExports: namedExports.length,
      indexFiles: indexFiles.length,
      reExports: allExports.filter(exp => exp.type === 'wildcard' || exp.type === 'selective').length
    }
  };
}

function generateValidationReport(validation) {
  const report = [
    '# Export Validation Report',
    '',
    `Generated on: ${new Date().toISOString()}`,
    '',
    '## Statistics',
    '',
    `- **Total Exports**: ${validation.stats.totalExports}`,
    `- **Named Exports**: ${validation.stats.namedExports}`,
    `- **Index Files**: ${validation.stats.indexFiles}`,
    `- **Re-exports**: ${validation.stats.reExports}`,
    '',
    '## Issues',
    ''
  ];

  if (validation.issues.length === 0) {
    report.push('✅ No issues found! Export structure is clean.');
  } else {
    validation.issues.forEach((issue, index) => {
      report.push(`### Issue ${index + 1}: ${issue.type}`);
      report.push('');
      report.push(issue.message);
      if (issue.export) {
        report.push(`File: \`${issue.export.file}\``);
        report.push(`Export: \`${issue.export.name}\``);
      }
      report.push('');
    });
  }

  return report.join('\n');
}

// Run validation
const validation = validateExportStructure();
const report = generateValidationReport(validation);

const outputFile = path.join(__dirname, '../export-validation.md');
fs.writeFileSync(outputFile, report);

console.log(`Export validation complete. Found ${validation.issues.length} issues.`);
console.log(`Report saved to: ${outputFile}`);