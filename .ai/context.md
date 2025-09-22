# Project Context for AI Assistants

## What This Project Is

`@johnqh/types` is the foundational TypeScript types library for the 0xmail.box ecosystem. It serves as the single source of truth for type definitions shared across multiple applications and services.

## Current State

- **Version**: 1.2.3
- **Dependencies**: Zero runtime dependencies (dev dependencies only)
- **Test Coverage**: 240 tests, all passing
- **Build Status**: Clean builds with TypeScript 5.x
- **Code Quality**: ESLint v9 with strict TypeScript rules

## Recent Updates (Latest Session)

- ✅ Updated all dependencies to latest stable versions
- ✅ Migrated ESLint to v9 flat config format
- ✅ Added comprehensive AI development documentation
- ✅ Zero security vulnerabilities
- ✅ All tests passing

## Architecture Philosophy

### Design Principles
1. **Zero Dependencies**: No runtime dependencies to avoid version conflicts
2. **Framework Agnostic**: Works with React, Vue, vanilla JS, Node.js, etc.
3. **Tree Shakeable**: Import only what you need
4. **Type Safe**: Strict TypeScript with comprehensive type guards
5. **Pure Functions**: All utilities are side-effect free

### Code Organization
- **Domain-Driven**: Types organized by business domain
- **Barrel Exports**: Clean import paths via index.ts files
- **Separation of Concerns**: Types vs utilities clearly separated
- **Consistent Naming**: PascalCase types, camelCase functions

## Key Business Domains

### Email & Messaging
- Traditional email integration via WildDuck
- Blockchain-based messaging
- Cross-chain message routing
- Email folder management
- Message composition and threading

### User Management
- Wallet-based authentication
- Multi-chain user profiles
- Permission and role management
- User preferences and settings

### Blockchain Integration
- Multi-chain support (Ethereum, Polygon, etc.)
- Transaction management
- Smart contract interactions
- Event listening and processing
- Network configuration

### Infrastructure
- Analytics and telemetry
- Navigation and routing
- Storage abstractions
- Logging and monitoring
- Configuration management

## Technology Stack Integration

### Frontend Applications
- React/Next.js web applications
- React Native mobile applications
- Browser extensions
- Desktop applications (Electron)

### Backend Services
- Node.js APIs
- WildDuck email server
- Blockchain indexers
- Background job processors

### DevOps and Tooling
- Build systems (Webpack, Vite, etc.)
- Testing frameworks (Vitest, Jest)
- CI/CD pipelines
- Type checking and linting

## Common Integration Patterns

### Type Guards for Runtime Validation
```typescript
import { isValidEmail, EmailAddress } from '@johnqh/types';

// Runtime validation of untrusted data
const userInput: unknown = await api.getData();
if (isValidEmail(userInput)) {
  // TypeScript knows userInput is EmailAddress
  processEmail(userInput);
}
```

### Configuration Types
```typescript
import { AppConfig, NetworkConfig } from '@johnqh/types';

// Strongly typed configuration
const config: AppConfig = {
  networks: networkConfigs,
  features: featureFlags
};
```

### API Response Handling
```typescript
import { WildDuckResponse, isWildDuckSuccess } from '@johnqh/types';

const response = await emailApi.getMessages();
if (isWildDuckSuccess(response)) {
  // Handle successful response
  displayMessages(response.results);
} else {
  // Handle error response
  showError(response.error);
}
```

## Performance Considerations

### Bundle Size
- Types are compile-time only (zero runtime cost)
- Utilities are tree-shakeable
- No external dependencies to increase bundle size

### Development Experience
- Fast type checking with incremental compilation
- Comprehensive IntelliSense support
- Runtime validation where needed
- Clear error messages

## Quality Assurance

### Testing Strategy
- **Unit Tests**: All utility functions tested
- **Type Tests**: Type guards validated with edge cases
- **Integration Tests**: Cross-domain type compatibility
- **Performance Tests**: Large object validation benchmarks

### Code Quality
- **Static Analysis**: ESLint with TypeScript rules
- **Type Safety**: Strict TypeScript configuration
- **Code Formatting**: Prettier for consistent style
- **Documentation**: JSDoc for all public APIs

## Future Considerations

### Scalability
- Designed to handle growing number of types
- Modular structure supports team collaboration
- Version management for breaking changes

### Extensibility
- Easy addition of new domains
- Plugin-style utility organization
- Backward compatibility maintenance

### Maintenance
- Automated dependency updates
- Continuous integration testing
- Regular security audits
- Documentation updates

## AI Assistant Guidelines

When working on this project, remember:

1. **Impact**: Changes affect multiple downstream projects
2. **Quality**: Maintain high standards for foundational code
3. **Testing**: Comprehensive test coverage is non-negotiable
4. **Documentation**: Keep documentation current and helpful
5. **Breaking Changes**: Avoid when possible, version bump when necessary
6. **Performance**: Consider bundle size and runtime performance
7. **Developer Experience**: Make it easy and pleasant to use these types