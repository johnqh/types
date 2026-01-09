# Claude AI Assistant Configuration

## Project Overview

This is `@sudobility/types` v1.8.29, a comprehensive TypeScript types library for Web3 email applications. It provides shared type definitions, interfaces, enums, and utility functions used across multiple Web3 email platform projects.

## Key Architecture

- **Framework Agnostic**: Pure TypeScript with zero external runtime dependencies
- **Tree Shakeable**: Optimized for modern bundlers with barrel exports
- **Dual Module Support**: ESM + CommonJS builds for maximum compatibility
- **AI-Optimized**: Enhanced documentation and patterns for AI-assisted development
- **Type-Safe**: Strict TypeScript configuration with comprehensive coverage
- **Modular Structure**: Domain-organized architecture (business, blockchain, infrastructure, etc.)

## Project Structure

```
src/
├── types/                    # Type definitions organized by domain
│   ├── api/                 # API request/response types
│   │   ├── index.ts         # Barrel exports for API types
│   │   ├── indexer-guards.ts # Type guards for API responses
│   │   └── indexer-responses.ts # Complete API response definitions
│   ├── blockchain/          # Web3 and blockchain-related types
│   │   ├── common.ts        # Multi-chain messaging types
│   │   ├── index.ts         # Blockchain type exports
│   │   └── validation.ts    # Blockchain validation utilities
│   ├── business/            # Core business logic types
│   │   ├── email.ts         # Email and user types
│   │   ├── enums.ts         # Business logic enums
│   │   ├── mailbox.ts       # Mailbox and folder types
│   │   └── wallet-status.ts # Wallet connection state
│   ├── common.ts            # Shared utility types (Optional<T>, Result<T>)
│   ├── config/              # Configuration and environment types
│   └── infrastructure/      # Infrastructure abstractions
│       ├── analytics.ts     # Analytics service interface
│       ├── api.ts           # Database entity interfaces
│       ├── navigation.ts    # UI navigation abstractions
│       └── network.ts       # Network client interface
├── utils/                   # Pure utility functions
│   ├── auth/                # Authentication utilities
│   ├── blockchain/          # Blockchain utilities
│   │   ├── address.ts       # Address validation and parsing
│   │   ├── event-helpers.ts # Multi-chain event utilities
│   │   └── network-config.ts # Network configuration
│   ├── constants/           # Shared constants
│   │   └── status-values.ts # Shared enum values
│   ├── formatting/          # Formatting utilities
│   ├── logging/             # Logging utilities
│   ├── url/                 # URL utilities
│   └── validation/          # Validation utilities
│       ├── type-validation.ts # Generic type validation
│       └── web3-username-validator.ts # Web3 address validation
├── wildduck-requests.ts     # WildDuck email server API types
└── index.ts                 # Main export file
```

## Package Manager

**This project uses Bun as the package manager.** Always use `bun` commands instead of `npm`:

```bash
# Install dependencies
bun install

# Run any script
bun run <script-name>
```

## Essential Commands

### Development Commands
```bash
# Build the project (dual ESM/CJS output)
bun run build

# Watch mode for development
bun run dev

# Run all 219 tests
bun test

# Type checking
bun run typecheck

# Linting (ESLint v9)
bun run lint

# Fix linting issues
bun run lint:fix

# Format code (Prettier)
bun run format

# Check formatting
bun run format:check

# Clean build artifacts
bun run clean

# Full verification (build + test + lint + typecheck)
bun run verify

# AI development tools
bun run ai:analyze        # Analyze type structure
bun run ai:validate       # Validate exports
bun run ai:docs          # Generate AI documentation
```

## Testing Strategy

- **Framework**: Vitest for fast unit testing
- **Coverage**: 219 comprehensive tests covering all utilities and type guards
- **Structure**: Tests mirror source structure in `test/` directory
- **Focus**: Type guards, validation functions, utility functions, and API contracts

## Code Style and Standards

- **TypeScript**: Strict mode with `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes`
- **ESLint**: Flat config format (ESLint v9+) with TypeScript rules
- **Prettier**: Code formatting with consistent style
- **Naming**: PascalCase for types/interfaces, camelCase for functions
- **Exports**: Barrel exports from index.ts files for tree-shaking

## Domain Knowledge

### Web3 Email Platform Context
- **Web3-native email platform**: Blockchain-based messaging system
- **Multi-chain support**: Ethereum, Polygon, Arbitrum, Optimism, Base, Solana
- **Wallet-centric**: User management tied to crypto wallet addresses
- **WildDuck integration**: Email server backend integration
- **Decentralized identity**: ENS and SNS name support

### Key Types to Know

#### Core Business Types
- `Email`: Core email message interface with Web3 extensions
- `User`/`WalletUserData`: User account types with wallet integration
- `MailBox`, `Folder`: Email organization structures
- `AuthStatus`, `ConnectionState`: Authentication and connection states

#### Blockchain Types
- `Message`/`PreparedMessage`: Multi-chain messaging interfaces
- `MessageRecipient`: Universal address type (EVM/Solana)
- `TransactionResult`, `TransactionStatus`: Transaction handling
- `NetworkConfig`, `DeploymentAddresses`: Network configuration

#### Utility Types
- `Optional<T>`: Null/undefined safe typing (`T | undefined | null`)
- `Result<T, E>`: Error handling pattern for operations
- `ValidationResult<T>`: Validation result pattern
- `PaginatedResponse<T>`: API pagination wrapper

#### Infrastructure Types
- `ApiResponse<T>`: Unified API response structure
- `AnalyticsService`: Analytics abstraction interface
- `NetworkClient`: HTTP client abstraction
- `UINavigationService`: Navigation abstraction

## Development Guidelines

### Adding New Types
1. Place in appropriate domain directory under `src/types/`
2. Export from domain's `index.ts`
3. Add to main `src/index.ts` if commonly used
4. Write comprehensive JSDoc comments with examples
5. Add unit tests for type guards/validators
6. Update TYPE_CHANGES.md documentation

### Adding Utilities
1. Place in appropriate utility directory under `src/utils/`
2. Keep functions pure (no side effects)
3. Add comprehensive tests with edge cases
4. Export from utility's `index.ts`
5. Document with JSDoc including usage examples

### Type Safety Best Practices
1. Use `Optional<T>` instead of manual `| null | undefined`
2. Prefer `unknown` over `any` for type safety
3. Use `Result<T, E>` pattern for error-prone operations
4. Implement type guards for runtime validation
5. Leverage utility types for consistent patterns

### Testing New Code
```bash
# Run tests in watch mode during development
bun run test:watch

# Run specific test file
bun test -- path/to/test.file.ts

# Generate coverage report
bun run test:coverage
```

## AI Assistant Specific Notes

### When Working on This Project:
1. **Always run verification after changes**: `bun run verify`
2. **Maintain zero dependencies**: Don't add runtime dependencies
3. **Keep utilities pure**: No side effects in utility functions
4. **Follow naming conventions**: Established patterns for consistency
5. **Update documentation**: Keep TYPE_CHANGES.md current
6. **Test comprehensively**: All new utilities need tests

### Common Tasks:
- **Adding API response types**: Use consistent `ApiResponse<T>` pattern
- **Creating type guards**: Follow existing validation patterns
- **Updating blockchain types**: Consider multi-chain compatibility
- **Adding utility functions**: Ensure pure functions with comprehensive tests
- **Consolidating duplicates**: Use established utility types like `Optional<T>`

### Important Files:
- `src/index.ts`: Main export file - update for commonly used types
- `src/types/common.ts`: Core utility types - home of `Optional<T>`, `Result<T>`
- `src/types/business/enums.ts`: Business logic enums with shared constants
- `TYPE_CHANGES.md`: Comprehensive change documentation
- `package.json`: Dependencies and scripts (maintain zero runtime deps)

### Build Process:
1. **Dual output**: TypeScript compilation to both ESM and CJS
2. **Type definitions**: Generates `.d.ts` files for full TypeScript support
3. **Tree-shaking**: Optimized exports for modern bundlers
4. **Verification**: Comprehensive quality pipeline

### Quality Standards:
- **267 tests passing**: Complete test coverage maintained
- **Zero lint errors**: ESLint v9 with strict TypeScript rules
- **Perfect formatting**: Prettier integration
- **Type safety**: Strict TypeScript with comprehensive checking
- **Documentation**: JSDoc comments on all public APIs

## Recent Changes (v1.8.29)

### Type System Improvements
- **Enum Conversion**: Converted 11 string literal types to enums for better type safety
  - KYC types: `KYCVerificationLevel`, `KYCApplicationStatus`, `SumsubReviewStatus`, `SumsubReviewAnswer`, `ApplicantType`, `ReviewRejectType`
  - Mailer types: `ConfirmationStatus`, `ClaimType`, `FeeType`
  - Infrastructure types: `ContractType`, `ProcessedEventName`
  - WildDuck types: `MailboxSpecialUse`
- **Enhanced Type Safety**: Runtime validation capabilities with enums
- **Better IDE Support**: Improved autocomplete and IntelliSense
- **Iterability**: Can now iterate over enum values

### Dependency Updates
- Updated all devDependencies to latest stable versions (no breaking changes)
- `@eslint/js`: 9.36.0 → 9.38.0
- `@types/node`: 24.5.2 → 24.9.1
- `@typescript-eslint/*`: 8.44.0 → 8.46.2
- `eslint`: 9.36.0 → 9.38.0
- Fixed vite security vulnerability

### Documentation
- **AI-Optimized README**: Comprehensive examples and usage patterns
- **Enhanced JSDoc**: Complete documentation coverage with examples
- **Development Guides**: Improved contributor documentation
- **Version Consistency**: Updated all documentation to reflect current version

## Migration Guidance

### For Type Consumers
```typescript
// Recommended patterns
import { Optional, Result, ValidationResult } from '@sudobility/types';
import { ChainType, AuthStatus } from '@sudobility/types';
import { isEvmAddress, formatWalletAddress } from '@sudobility/types';

// Use Optional<T> for nullable values
const user: Optional<User> = getUser(); // instead of User | null | undefined

// Use Result<T> for error-prone operations
const result: Result<User> = validateUser(data); // instead of throwing

// Use proper type guards
if (isEvmAddress(address)) {
  // TypeScript knows address is EVM format
}
```

### For Library Maintainers
1. **Backward Compatibility**: All changes maintain compatibility via type aliases
2. **Deprecation Timeline**: Gradual migration with clear documentation
3. **Version Strategy**: Semantic versioning with comprehensive change logs

## Future Considerations

### Planned Improvements
1. **Enhanced Analytics Types**: More comprehensive event tracking
2. **Advanced Validation**: Schema-based validation utilities
3. **Better Error Types**: More specific error categorization
4. **Performance Optimization**: Further tree-shaking improvements
5. **Documentation**: Interactive type explorer

### Monitoring
- Track usage of deprecated patterns
- Monitor for type safety regressions
- Evaluate bundle size impact
- Collect developer feedback

---

*This configuration optimizes @sudobility/types for AI-assisted development while maintaining enterprise-grade quality standards.*