# @johnqh/types

[![npm version](https://badge.fury.io/js/@johnqh%2Ftypes.svg)](https://badge.fury.io/js/@johnqh%2Ftypes)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Comprehensive TypeScript type definitions and utilities for the 0xmail.box Web3 email ecosystem.**

## 🚀 Overview

This package provides a complete type-safe foundation for 0xmail.box applications, featuring:

- **267 comprehensive tests** ensuring type reliability
- **Zero runtime dependencies** for optimal performance
- **Dual module support** (ESM + CommonJS)
- **Complete TypeScript coverage** with strict type checking
- **AI-friendly documentation** for enhanced development experience

## 📦 Features

### Core Type System
- **Business Logic Types**: Email, User, WalletData, MailBox interfaces
- **Blockchain Types**: Multi-chain support (Ethereum, Solana, Polygon, etc.)
- **API Types**: Complete request/response type definitions
- **Infrastructure Types**: Analytics, navigation, network client abstractions
- **Utility Types**: `Optional<T>`, `Result<T, E>`, `ValidationResult<T>`

### Utilities & Helpers
- **Address Validation**: EVM, Solana, ENS, SNS address validation
- **Blockchain Utilities**: Network configuration, chain detection, event helpers
- **Formatting**: Date, currency, string formatting utilities
- **Validation**: Type guards, schema validation, Web3 username validation
- **URL Management**: Type-safe URL parameter handling

### Development Features
- **Tree Shakeable**: Import only what you need
- **Framework Agnostic**: Works with React, Vue, Node.js, React Native
- **Zero Config**: Ready to use out of the box
- **Type-Safe**: Complete IntelliSense support

## 🛠 Installation

```bash
npm install @johnqh/types
```

## 📖 Usage Examples

### Basic Types
```typescript
import {
  Email,
  User,
  WalletUserData,
  AuthStatus,
  ChainType,
  Optional
} from '@johnqh/types';

// Email handling
const email: Email = {
  from: 'sender@0xmail.box',
  to: 'recipient@0xmail.box',
  subject: 'Web3 Email',
  body: 'Hello from the blockchain!',
  id: 'msg_123',
  timestamp: Date.now(),
  read: false
};

// User management with optional fields
const user: WalletUserData = {
  walletAddress: '0x742d35Cc6634C0532925a3b8D2C36B7f12345678',
  chainType: ChainType.EVM,
  emails: [email],
  folders: []
};

// Optional type usage
const maybeUser: Optional<User> = null; // T | undefined | null
```

### Blockchain Integration
```typescript
import {
  Message,
  TransactionResult,
  MessageType,
  isEvmAddress,
  isSolanaAddress
} from '@johnqh/types';

// Multi-chain message
const message: Message = {
  from: '0x742d35Cc6634C0532925a3b8D2C36B7f12345678',
  to: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM',
  subject: 'Cross-chain message',
  body: 'EVM to Solana communication',
  timestamp: Date.now(),
  txHash: '0x123abc...',
  messageType: MessageType.PRIORITY
};

// Address validation
const evmValid = isEvmAddress('0x742d35Cc6634C0532925a3b8D2C36B7f12345678'); // true
const solanaValid = isSolanaAddress('9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM'); // true
```

### API Integration
```typescript
import {
  ApiResponse,
  ValidationResult,
  IndexerApiResponse,
  Result
} from '@johnqh/types';

// Type-safe API responses
const apiResponse: ApiResponse<User> = {
  success: true,
  data: user,
  timestamp: new Date().toISOString()
};

// Result pattern for error handling
const validateUser = (data: unknown): Result<User> => {
  // Validation logic...
  return { success: true, data: user as User };
};
```

### Utilities
```typescript
import {
  formatWalletAddress,
  parseEmailAddress,
  createMultiChainId,
  Web3UsernameValidator
} from '@johnqh/types';

// Address formatting
const formatted = formatWalletAddress('0x742d35Cc6634C0532925a3b8D2C36B7f12345678');
// Result: "0x742d...5678"

// Email parsing
const parsed = parseEmailAddress('user@domain.eth');
// Result: { address: 'user', domain: 'domain.eth', type: AddressType.ENSName }

// Multi-chain ID generation
const id = createMultiChainId(1, '0x123...', 0);
// Result: "1-0x123...-0"

// Web3 username validation
const validation = Web3UsernameValidator.validate('vitalik.eth');
// Result: { name: 'vitalik.eth', address: null, chainType: ChainType.EVM }
```

## 🏗 Project Structure

```
src/
├── types/                    # Type definitions by domain
│   ├── api/                 # API request/response types
│   ├── blockchain/          # Web3 and blockchain types
│   ├── business/            # Core business logic types
│   ├── common.ts            # Shared utility types (Optional<T>, Result<T>)
│   ├── config/              # Configuration types
│   └── infrastructure/      # Infrastructure abstractions
├── utils/                   # Pure utility functions
│   ├── auth/                # Authentication utilities
│   ├── blockchain/          # Blockchain utilities
│   ├── constants/           # Shared constants
│   ├── formatting/          # Formatting utilities
│   ├── logging/             # Logging utilities
│   ├── url/                 # URL utilities
│   └── validation/          # Validation utilities
├── wildduck-requests.ts     # WildDuck email server types
└── index.ts                 # Main exports
```

## 🧪 Development

### Available Scripts
```bash
# Development
npm run build          # Build both ESM and CommonJS
npm run dev            # Watch mode development
npm test               # Run all 267 tests
npm run test:watch     # Watch mode testing
npm run test:coverage  # Generate coverage report

# Quality Assurance
npm run lint           # ESLint checking
npm run lint:fix       # Fix linting issues
npm run format         # Format with Prettier
npm run typecheck      # TypeScript type checking
npm run verify         # Complete verification pipeline

# AI Development Tools
npm run ai:analyze     # Analyze type structure
npm run ai:validate    # Validate exports
npm run ai:docs        # Generate AI documentation
```

### Quality Standards
- **100% TypeScript**: Strict mode enabled with comprehensive coverage
- **267 Tests**: Complete test suite with Vitest
- **Zero Lint Errors**: ESLint v9 with flat config
- **Perfect Formatting**: Prettier integration
- **Dual Module Support**: ESM + CommonJS builds

## 🤖 AI Development Optimization

This project is optimized for AI-assisted development with:

### Enhanced Documentation
- **Comprehensive JSDoc comments** on all public APIs
- **Usage examples** for common patterns
- **Type relationships** clearly documented
- **Change logs** with migration guides

### AI-Friendly Patterns
- **Consistent naming conventions** across all types
- **Semantic type organization** by domain
- **Clear export patterns** with barrel exports
- **Utility type composition** for complex scenarios

### Development Support
- **CLAUDE.md** with project-specific instructions
- **TYPE_CHANGES.md** documenting all type evolution
- **AI analysis scripts** for type validation
- **Comprehensive test coverage** for validation

## 📚 Key Type Categories

### Core Business Types
- `Email`, `User`, `WalletUserData` - Core application entities
- `MailBox`, `Folder` - Email organization structures
- `AuthStatus`, `ConnectionState` - Authentication states

### Blockchain Types
- `Message`, `PreparedMessage` - Multi-chain messaging
- `TransactionResult`, `TransactionStatus` - Transaction handling
- `NetworkConfig`, `DeploymentAddresses` - Network configuration

### Utility Types
- `Optional<T>` - Null/undefined safe typing
- `Result<T, E>` - Error handling patterns
- `ValidationResult<T>` - Validation patterns
- `PaginatedResponse<T>` - API pagination

### Infrastructure Types
- `AnalyticsService` - Analytics abstraction
- `NetworkClient` - HTTP client interface
- `UINavigationService` - Navigation abstraction

## 🔧 Configuration

### TypeScript Config
The package is built with strict TypeScript settings:
```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  }
}
```

### Import Patterns
```typescript
// Main exports
import { Email, User, Optional } from '@johnqh/types';

// Specific modules (tree-shakeable)
import { ChainType } from '@johnqh/types/enums';
import { ValidationResponse } from '@johnqh/types/api';

// Utilities
import { formatWalletAddress } from '@johnqh/types/utils';
```

## 🔄 Recent Updates (v1.6.2)

- ✅ **Optional<T> Consistency**: Standardized optional type usage
- ✅ **Enhanced Type Safety**: Replaced `any` with `unknown` throughout
- ✅ **Improved Documentation**: Comprehensive JSDoc coverage
- ✅ **Better AI Support**: Enhanced for AI-assisted development
- ✅ **Performance**: Zero runtime dependencies maintained

## 🤝 Contributing

This project follows strict quality standards:

1. **All types must have JSDoc documentation**
2. **Comprehensive tests required for utilities**
3. **Zero external runtime dependencies**
4. **Backward compatibility maintained**
5. **AI-friendly code patterns**

## 📄 License

MIT © 0xmail.box

---

**Built with ❤️ for the Web3 email revolution**

*This package powers the type-safe foundation of 0xmail.box, the first Web3-native email platform.*