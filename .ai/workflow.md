# AI-Assisted Development Workflow

## Quick Start Commands

### For New AI Sessions
```bash
# Get full project analysis
npm run ai:docs

# Verify everything is working
npm run verify
```

### During Development
```bash
# Watch mode for rapid iteration
npm run dev

# Test in watch mode
npm run test:watch

# Quick verification
npm run typecheck && npm run lint
```

### Before Completing Tasks
```bash
# Full verification pipeline
npm run verify

# Generate fresh documentation
npm run ai:docs
```

## Recommended Development Flow

### 1. Understanding Phase
```bash
# Read the project context
cat CLAUDE.md
cat .ai/context.md
cat .ai/development-guide.md

# Analyze current types
npm run ai:analyze
cat .ai/type-analysis.md
```

### 2. Planning Phase
- Use TodoWrite tool to break down complex tasks
- Check existing patterns in similar code
- Identify which domain the changes belong to

### 3. Implementation Phase
```bash
# Start watch mode
npm run dev &
npm run test:watch &

# Make changes iteratively
# Tests should pass continuously
```

### 4. Validation Phase
```bash
# Run full verification
npm run verify

# Check export structure
npm run ai:validate-exports

# Verify no new issues introduced
npm run ai:docs
```

## AI Assistant Best Practices

### Code Quality Checks
- ✅ All tests passing
- ✅ No TypeScript errors
- ✅ No ESLint errors
- ✅ Clean build output
- ✅ Export structure validated

### Documentation Updates
- ✅ JSDoc comments for new public APIs
- ✅ Update type analysis if major changes
- ✅ Update README if new features added
- ✅ Update CLAUDE.md if workflow changes

### Testing Requirements
- ✅ Unit tests for all utility functions
- ✅ Type guards tested with edge cases
- ✅ Integration tests for cross-domain types
- ✅ Performance tests for large objects

## Common Task Patterns

### Adding New Types
1. Create type in appropriate domain directory
2. Add to domain's index.ts
3. Add to main index.ts if commonly used
4. Write tests if type has validators/guards
5. Run `npm run verify`

### Adding Utility Functions
1. Create function in appropriate utils directory
2. Ensure function is pure (no side effects)
3. Add comprehensive tests
4. Export from utils index.ts
5. Document with JSDoc
6. Run `npm run verify`

### Updating Dependencies
1. Check for security vulnerabilities
2. Update package.json
3. Run `npm install`
4. Run `npm run verify`
5. Test with downstream projects if possible

### Refactoring Types
1. Identify all usage with search tools
2. Create migration plan for breaking changes
3. Update types incrementally
4. Ensure all tests pass
5. Update documentation
6. Run `npm run ai:docs` to refresh analysis

## Debugging Common Issues

### TypeScript Errors
```bash
# Detailed error output
npx tsc --noEmit --pretty

# Check specific file
npx tsc --noEmit src/path/to/file.ts
```

### Test Failures
```bash
# Run specific test
npm test -- path/to/test.ts

# Debug with verbose output
npm test -- --reporter=verbose

# Run with coverage
npm run test:coverage
```

### ESLint Issues
```bash
# Auto-fix what's possible
npm run lint:fix

# Check specific file
npx eslint src/path/to/file.ts --fix
```

### Build Issues
```bash
# Clean rebuild
npm run clean && npm run build

# Check output directory
ls -la dist/
```

## Performance Optimization

### Bundle Size
- Keep utilities tree-shakeable
- Avoid circular dependencies
- Use type-only imports when possible

### Development Speed
- Use watch mode during development
- Run tests in parallel with type checking
- Use incremental builds

### Type Checking
- Keep types simple and composable
- Avoid deeply nested conditional types
- Use branded types for domain validation

## Integration Testing

### With Downstream Projects
```bash
# Build and pack locally
npm run build
npm pack

# Install in test project
cd ../test-project
npm install ../types/johnqh-types-1.2.3.tgz
```

### Version Compatibility
- Test with multiple TypeScript versions
- Verify with different bundlers
- Check tree-shaking effectiveness

## Release Process

### Pre-release Checks
```bash
# Full verification
npm run verify

# Generate fresh docs
npm run ai:docs

# Version bump (if needed)
npm version patch|minor|major
```

### Publishing
```bash
# Automated through prepublishOnly
npm publish
```

Remember: This is foundational infrastructure. Every change should be high quality and well-tested!