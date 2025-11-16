# AI Development Guide for @johnqh/types

## Quick Start for AI Assistants

This project is a TypeScript types library. When working on it:

1. **Always understand the domain first** - This is Web3 email infrastructure
2. **Maintain zero runtime dependencies** - Types and pure functions only
3. **Test everything** - Every utility function should have comprehensive tests
4. **Follow the existing patterns** - Consistent naming and structure

## Common AI Tasks and Patterns

### Adding New Types

**Pattern for API Response Types:**
```typescript
// In src/types/api/
export interface NewApiResponse {
  success: boolean;
  data: NewApiData;
  error?: string;
}

export interface NewApiData {
  // Specific fields
}

// Add type guard
export const isNewApiResponse = (obj: any): obj is NewApiResponse => {
  return obj && typeof obj.success === 'boolean';
};
```

**Pattern for Business Logic Types:**
```typescript
// In src/types/business/
export interface NewBusinessEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  // Entity-specific fields
}

export enum NewBusinessStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending'
}
```

### Adding Utility Functions

**Pattern for Validation Utilities:**
```typescript
// In src/utils/validation/
export const validateNewEntity = (entity: unknown): entity is NewBusinessEntity => {
  return (
    typeof entity === 'object' &&
    entity !== null &&
    'id' in entity &&
    typeof (entity as any).id === 'string'
  );
};

export const isValidNewEntityId = (id: string): boolean => {
  return id.length > 0 && id.length <= 100;
};
```

**Pattern for Formatting Utilities:**
```typescript
// In src/utils/formatting/
export const formatNewEntity = (entity: NewBusinessEntity): string => {
  // Pure function - no side effects
  return `${entity.id} (${entity.status})`;
};
```

### Testing Patterns

**Test Structure:**
```typescript
// In test/corresponding/path/
import { describe, it, expect } from 'vitest';
import { validateNewEntity, NewBusinessEntity } from '../../../src/...';

describe('New Entity Validation', () => {
  describe('validateNewEntity', () => {
    it('should validate correct entity', () => {
      const validEntity: NewBusinessEntity = {
        id: 'test-id',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      expect(validateNewEntity(validEntity)).toBe(true);
    });

    it('should reject invalid entity', () => {
      expect(validateNewEntity(null)).toBe(false);
      expect(validateNewEntity({})).toBe(false);
      expect(validateNewEntity({ id: 123 })).toBe(false);
    });
  });
});
```

## Project-Specific Patterns

### WildDuck API Types
- All WildDuck API types go in `src/wildduck-requests.ts`
- Follow the existing pattern: `interface NameRequest extends BaseRequest`
- Add JSDoc with API endpoint information

### Blockchain Types
- Chain-specific types in `src/types/blockchain/`
- Always include network/chain identifier
- Use enums for standardized values (chain IDs, token types, etc.)

### Business Logic Types
- Core email/user types in `src/types/business/`
- Use strict typing - avoid `any` or overly broad unions
- Include status enums for state management

## File Organization Rules

### Directory Structure:
```
src/
├── types/                    # Type definitions only
│   ├── api/                 # External API interfaces
│   ├── blockchain/          # Web3/blockchain specific
│   ├── business/            # Domain business logic
│   ├── config/              # Configuration interfaces
│   └── infrastructure/      # Infrastructure concerns
├── utils/                   # Pure utility functions
│   ├── blockchain/          # Blockchain utilities
│   ├── logging/             # Logging helpers
│   ├── url/                 # URL manipulation
│   └── validation/          # Type guards and validators
└── wildduck-requests.ts     # WildDuck email server API
```

### Export Strategy:
1. Each directory has an `index.ts` that exports all public items
2. Main `src/index.ts` re-exports commonly used items
3. Domain-specific imports available: `@johnqh/types/business`
4. Full imports available: `@johnqh/types`

## Code Quality Standards

### TypeScript Configuration:
- Strict mode enabled
- No implicit any
- Exact optional property types
- Strict null checks

### ESLint Rules:
- Flat config format (ESLint v9)
- TypeScript-specific rules enabled
- No unused variables (except those prefixed with `_`)
- Consistent naming conventions

### Testing Requirements:
- All utility functions must have tests
- All type guards must have tests
- Edge cases must be covered
- Tests should be deterministic and fast

## Domain Knowledge Required

### Web3 Email Platform:
- Web3-native email platform
- Blockchain-based messaging between wallet addresses
- Integration with traditional email infrastructure
- Multi-chain support (Ethereum, Polygon, etc.)
- WildDuck backend for email storage/retrieval

### Key Concepts:
- **Wallet-centric users**: Users identified by blockchain addresses
- **Cross-chain messaging**: Messages can be sent across different blockchains
- **Hybrid architecture**: Web3 frontend + traditional email backend
- **Zero-knowledge privacy**: Some messages encrypted client-side

## Common Gotchas for AI Assistants

1. **Don't add runtime dependencies** - This is a types-only package
2. **Don't create side effects** - All utilities must be pure functions
3. **Don't skip tests** - Every function needs comprehensive test coverage
4. **Don't break exports** - Always update index.ts files when adding types
5. **Don't ignore linting** - Fix all ESLint errors before completing tasks
6. **Don't assume contexts** - Always check existing patterns before creating new ones

## Debugging Tips

### Build Issues:
```bash
# Clean and rebuild
npm run clean && npm run build

# Check TypeScript errors in detail
npx tsc --noEmit
```

### Test Issues:
```bash
# Run specific test
npm test -- --run path/to/test.ts

# Debug test with verbose output
npm test -- --reporter=verbose
```

### Linting Issues:
```bash
# Auto-fix what's possible
npm run lint:fix

# Check specific files
npx eslint src/path/to/file.ts
```

Remember: This project is foundational infrastructure. Changes here affect multiple downstream projects, so maintain high quality standards and thorough testing.