# @sudobility/types

Comprehensive TypeScript type definitions and utilities for Web3 email applications. Zero runtime dependencies, dual module support (ESM + CommonJS).

## Installation

```bash
bun install @sudobility/types
```

No peer dependencies required.

## Usage

### Core Utility Types

```typescript
import { Optional, Result, ValidationResult, BaseResponse, PaginatedResponse } from '@sudobility/types';

const maybeUser: Optional<User> = null;  // T | undefined | null

function doWork(): Result<Data> {
  if (ok) return { success: true, data: result };
  return { success: false, error: { type: 'ValidationError', message: '...' } };
}
```

### Blockchain Types

```typescript
import { isEvmAddress, isSolanaAddress, formatWalletAddress, ChainType } from '@sudobility/types';

isEvmAddress('0x742d35Cc6634C0532925a3b8D2C36B7f12345678');  // true
isSolanaAddress('9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM');  // true
formatWalletAddress('0x742d35Cc6634C0532925a3b8D2C36B7f12345678');  // "0x742d...5678"
```

### Enums

Key enums: `AuthStatus`, `Chain` (60+ chains), `ChainType`, `ConnectionState`, `Theme`, `EmailAction`, `RequestStatus`, `WalletType`, `EntityType`, `EntityRole`, and more.

### Import Paths

```typescript
import { ... } from '@sudobility/types';        // Full library
import { ... } from '@sudobility/types/api';     // Indexer response types
import { ... } from '@sudobility/types/enums';   // Business enums only
```

## Development

```bash
bun install
bun run build          # Build dual ESM + CJS output
bun run dev            # Watch mode
bun test               # Run tests (Vitest)
bun run typecheck      # TypeScript check
bun run lint           # ESLint (flat config)
bun run format         # Prettier
bun run verify         # Full pipeline: typecheck + lint + test + build
```

## Key Exports

- **Types**: `Optional<T>`, `Result<T,E>`, `ValidationResult<T>`, `BaseResponse<T>`, `PaginatedResponse<T>`, `UnifiedError`
- **Enums**: `AuthStatus`, `Chain`, `ChainType`, `ConnectionState`, `Theme`, `EmailAction`, `WalletType`, `EntityType`, `EntityRole`, and more
- **Validators**: `isEvmAddress`, `isSolanaAddress`, `isENSName`, `isSNSName`, `Web3UsernameValidator`, `validateAddress`, `validateAmount`, type guards
- **Formatters**: `formatWalletAddress`, `formatUSDC`, `formatEmailDate`, `formatRelativeTime`, `formatBytes`, `truncate`, `capitalize`, and more
- **Async Helpers**: `safeAsync`, `withLoadingState`, `safeParallel`, `withTimeout`, `withCache`, `debounceAsync`
- **Infrastructure**: `NetworkClient`, `AnalyticsService`, `UINavigationService`

## License

BUSL-1.1
