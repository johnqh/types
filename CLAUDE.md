# Claude AI Assistant Configuration

## Project Overview

This is `@johnqh/types`, a TypeScript types library for the 0xmail.box ecosystem. It provides shared type definitions, interfaces, enums, and utility functions used across multiple projects in the 0xmail.box Web3 email platform.

## Key Architecture

- **Framework Agnostic**: Pure TypeScript with no external dependencies
- **Tree Shakeable**: Optimized for modern bundlers
- **Zero Runtime Dependencies**: Types and pure utility functions only
- **Modular Structure**: Organized by domain (business, blockchain, infrastructure, etc.)

## Project Structure

```
src/
├── types/                    # Type definitions organized by domain
│   ├── api/                 # API request/response types
│   ├── blockchain/          # Web3 and blockchain-related types
│   ├── business/            # Core business logic types (email, user, etc.)
│   ├── config/              # Configuration and environment types
│   └── infrastructure/      # Infrastructure types (analytics, navigation, etc.)
├── utils/                   # Pure utility functions
│   ├── blockchain/          # Blockchain utility functions
│   ├── logging/             # Logging utilities
│   ├── url/                 # URL manipulation utilities
│   └── validation/          # Validation utilities
├── wildduck-requests.ts     # WildDuck email server API types
└── index.ts                 # Main export file
```

## Essential Commands

### Development Commands
```bash
# Build the project (required before publishing)
npm run build

# Watch mode for development
npm run dev

# Run all tests
npm test

# Type checking
npm run typecheck

# Linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check

# Clean build artifacts
npm run clean

# Full verification (build + test + lint)
npm run build && npm test && npm run lint
```

## Testing Strategy

- **Framework**: Vitest for fast unit testing
- **Coverage**: Comprehensive test coverage for all utilities and type guards
- **Structure**: Tests mirror source structure in `test/` directory
- **Focus**: Type guards, validation functions, and utility functions

## Code Style and Standards

- **TypeScript**: Strict mode enabled
- **ESLint**: Flat config format (ESLint v9+)
- **Prettier**: Code formatting
- **Naming**: PascalCase for types/interfaces, camelCase for functions
- **Exports**: Barrel exports from index.ts files

## Domain Knowledge

### 0xmail.box Context
- Web3-native email platform
- Blockchain-based messaging
- Wallet-centric user management
- Integration with WildDuck email server
- Multi-chain support (Ethereum, Polygon, etc.)

### Key Types to Know
- `Email`: Core email message type
- `User`/`WalletUserData`: User account types
- `Message`/`MessageRecipient`: Blockchain message types
- `AuthStatus`: User authentication states
- `NetworkConfig`: Blockchain network configuration

## Development Guidelines

### Adding New Types
1. Place in appropriate domain directory under `src/types/`
2. Export from domain's `index.ts`
3. Add to main `src/index.ts` if commonly used
4. Write comprehensive JSDoc comments
5. Add unit tests for type guards/validators

### Adding Utilities
1. Place in appropriate utility directory under `src/utils/`
2. Keep functions pure (no side effects)
3. Add comprehensive tests
4. Export from utility's `index.ts`
5. Document with JSDoc

### Testing New Code
```bash
# Run tests in watch mode during development
npm test

# Run specific test file
npm test -- path/to/test.file.ts
```

## AI Assistant Specific Notes

### When Working on This Project:
1. **Always run tests after changes**: `npm test`
2. **Verify build passes**: `npm run build`
3. **Check linting**: `npm run lint`
4. **Maintain zero dependencies**: Don't add runtime dependencies
5. **Keep utilities pure**: No side effects in utility functions
6. **Follow naming conventions**: Established patterns for consistency

### Common Tasks:
- Adding new type definitions for API responses
- Creating type guards and validation utilities
- Updating WildDuck API types
- Adding blockchain-related types for new chains
- Creating utility functions for common operations

### Important Files:
- `src/index.ts`: Main export file - update when adding commonly used types
- `src/types/index.ts`: Central type exports
- `src/utils/index.ts`: Central utility exports
- `package.json`: Dependencies and scripts
- `eslint.config.js`: ESLint configuration (flat config format)

### Build Process:
1. TypeScript compilation (`tsc`)
2. Outputs to `dist/` directory
3. Generates `.d.ts` files for type definitions
4. No bundling required (consumed as source)

## Recent Changes
- Updated all dependencies to latest stable versions
- Migrated ESLint to v9 flat config format
- All tests passing (240 tests)
- Zero security vulnerabilities
- Build and lint processes working correctly