# types - AI Development Guide

## Overview

`@sudobility/types` is a comprehensive, zero-runtime-dependency TypeScript types and utilities library for Web3 email applications. It provides shared type definitions, interfaces, enums, validators, formatters, and pure utility functions used across multiple packages in the 0xmail platform. The library outputs both ESM and CommonJS builds for maximum compatibility.

- **Package**: `@sudobility/types`
- **Version**: 1.9.51
- **License**: BUSL-1.1
- **Package Manager**: Bun

## Project Structure

```
src/
├── index.ts                          # Main barrel export file (all public API)
├── types/
│   ├── common.ts                     # Core utility types: Optional<T>, Result<T>, ValidationResult<T>, BaseResponse<T>, PaginatedResponse<T>
│   ├── business/
│   │   ├── enums.ts                  # All business enums: AuthStatus, Chain, ChainType, ConnectionState, Theme, EmailAction, etc.
│   │   └── wallet-status.ts          # WalletStatus interface + type guards (isWalletConnected, isWalletVerified)
│   ├── blockchain/
│   │   ├── common.ts                 # Multi-chain messaging: Message, PreparedMessage, MessageType, TransactionStatus, FeeStructure, PROTOCOL_CONSTANTS, type guards
│   │   └── validation.ts            # Blockchain validators: validateAddress, validateAmount, validateDomain, validateMessage
│   ├── config/
│   │   ├── app-config.ts             # AppConfig, FirebaseConfig interfaces
│   │   └── environment.ts            # EnvProvider, EnvironmentVariables, StorageType enum
│   ├── consumables/
│   │   └── index.ts                  # Consumable credits: purchase/use request/response types
│   ├── entity/
│   │   ├── entity.ts                 # Entity/organization system: Entity, EntityType, EntityRole, InvitationStatus enums
│   │   ├── permissions.ts            # Role-based access control: EntityPermissions, OWNER/MANAGER/MEMBER_PERMISSIONS, hasPermission()
│   │   ├── requests.ts              # API request types: CreateEntityRequest, InviteMemberRequest, etc.
│   │   └── responses.ts            # API response types: EntityResponse, SlugAvailabilityResponse, etc.
│   ├── infrastructure/
│   │   ├── analytics.ts              # AnalyticsService interface, AnalyticsEvent enum, AnalyticsEventBuilder class
│   │   ├── api.ts                    # Database entities: MailEntity, DelegationEntity, StatisticsEntity, ContractType, ProcessedEventName enums
│   │   ├── firebase-user.ts          # UserInfoResponse interface
│   │   ├── navigation.ts             # Cross-platform navigation: UINavigationService, UINavigationHook, UILocationHook
│   │   ├── network.ts                # HTTP client abstraction: NetworkClient, NetworkError, NetworkResponse
│   │   └── wallet.ts                 # WalletType enum (MetaMask, Phantom, Coinbase, WalletConnect, Injected)
│   └── subscription/
│       └── rate-limits.ts            # Rate limiting: RateLimits, RateLimitTier, RateLimitPeriodType, history types
├── utils/
│   ├── async-helpers.ts              # safeAsync, withLoadingState, safeParallel, withTimeout, withCache, debounceAsync
│   ├── auth/
│   │   ├── auth.ts                   # generateAuthMessage, isAuthExpired, generateNonce, isValidNonce
│   │   └── admin-emails.ts           # parseAdminEmails, isAdminEmail, createAdminChecker
│   ├── blockchain/
│   │   ├── address.ts                # Address utilities: AddressType enum, isENSName, isSNSName, formatWalletAddress, parseEmailAddress
│   │   └── event-helpers.ts          # Multi-chain ID generation: createMultiChainId, normalizeAddress, formatBigInt, isTestNet
│   ├── constants/
│   │   ├── application.ts            # App-wide constants: API_TIMEOUT, STORAGE_KEYS, ERROR_MESSAGES, ROUTES, NETWORK_IDS, Z_INDEX, etc.
│   │   └── status-values.ts          # STATUS_VALUES constant object (success, pending, failed, error)
│   ├── formatting/
│   │   ├── currency.ts               # formatUSDC, parseUSDC, USDC_DECIMALS, CLAIM_PERIOD_DAYS
│   │   ├── date.ts                   # formatEmailDate, formatRelativeTime, parseDate, addDays, addHours
│   │   └── string.ts                 # truncate, capitalize, toTitleCase, toKebabCase, toCamelCase, escapeHtml, formatBytes, pluralize, etc.
│   ├── logging/
│   │   └── logger.ts                 # Logger class with contextual loggers: logger, authLogger, apiLogger, contractLogger, ensLogger
│   ├── url/
│   │   └── url-params.ts             # Cross-platform URLSearchParams: createURLSearchParams, createSearchParams, parseSearchParams
│   └── validation/
│       ├── type-validation.ts         # Runtime type checkers: isString, isNumber, isObject, isEmail, isUrl, createValidator, createAssertion, parseJson
│       └── web3-username-validator.ts # Web3UsernameValidator class: validate EVM, Solana, ENS, SNS addresses
```

## Key Exports

### Core Utility Types (`types/common.ts`)

| Type | Description |
|------|-------------|
| `Optional<T>` | `T \| undefined \| null` -- use instead of manual nullable unions |
| `Result<T, E>` | Discriminated union: `{ success: true; data: T } \| { success: false; error: E }` |
| `ValidationResult<T>` | `{ isValid: true; data: T } \| { isValid: false; error: string }` |
| `BaseResponse<T>` | `{ success, data?, error?, timestamp }` -- base for all API responses |
| `PaginatedResponse<T>` | Extends BaseResponse with `pagination: PaginationInfo` |
| `UnifiedError` | Typed error with `type`, `message`, `details`, `suggestedAction` |

### Enums (`types/business/enums.ts` and others)

| Enum | Values | Source |
|------|--------|--------|
| `AuthStatus` | CONNECTED, DISCONNECTED, VERIFIED | business/enums |
| `Chain` | ETH_MAINNET, POLYGON_MAINNET, BASE_MAINNET, SOLANA_MAINNET, ... (60+ chains) | business/enums |
| `ChainType` | EVM, SOLANA | business/enums |
| `ConnectionState` | UNKNOWN, DISCONNECTED, CONNECTING, CONNECTED, RECONNECTING, VERIFIED, LIMITED, ERROR | business/enums |
| `Theme` | LIGHT, DARK, SYSTEM | business/enums |
| `EmailAction` | OPEN, REPLY, FORWARD, DELETE, STAR, UNSTAR, MARK_READ, MARK_UNREAD | business/enums |
| `RequestStatus` | IDLE, LOADING, SUCCESS, ERROR | business/enums |
| `MessageType` | STANDARD, PRIORITY, PREPARED_STANDARD, PREPARED_PRIORITY | blockchain/common |
| `TransactionStatus` | SUCCESS, FAILED, PENDING | blockchain/common |
| `EntityType` | PERSONAL, ORGANIZATION | entity/entity |
| `EntityRole` | OWNER, MANAGER, MEMBER | entity/entity |
| `WalletType` | METAMASK, PHANTOM, COINBASE, WALLETCONNECT, INJECTED | infrastructure/wallet |
| `ContractType` | Mailer, MailService | infrastructure/api |
| `ProcessedEventName` | MailSent, PreparedMailSent, DelegationSet, ... (12 events) | infrastructure/api |
| `AnalyticsEvent` | USER_LOGIN, EMAIL_SENT, PAGE_VIEW, ... (20+ events) | infrastructure/analytics |
| `AddressType` | EVMAddress, SolanaAddress, ENSName, SNSName | utils/blockchain/address |
| `StorageType` | LOCAL_STORAGE, SESSION_STORAGE, ASYNC_STORAGE, MEMORY | config/environment |
| `RateLimitPeriodType` | HOUR, DAY, MONTH | subscription/rate-limits |

### Validators

| Function | Location | Purpose |
|----------|----------|---------|
| `isEvmAddress(addr)` | blockchain/common | Regex check for `0x` + 40 hex chars |
| `isSolanaAddress(addr)` | blockchain/common | Base58 + length 32-44 check |
| `isENSName(addr)` | utils/blockchain/address | `.eth` or `.box` name validation |
| `isSNSName(addr)` | utils/blockchain/address | Solana name service (`.sol`, `.bonk`, etc.) |
| `isValidWalletAddress(addr, chainType)` | utils/blockchain/address | Chain-aware address validation |
| `Web3UsernameValidator.validate(addr)` | utils/validation | Comprehensive address detection returning `AddressValidationResult` |
| `validateAddress(addr, chainType)` | blockchain/validation | Throws on invalid address |
| `validateAmount(amount)` | blockchain/validation | Validates and converts to bigint |
| `validateDomain(domain)` | blockchain/validation | Domain format validation |
| `validateMessage(subject, body)` | blockchain/validation | Subject/body length validation |
| `isString`, `isNumber`, `isObject`, `isArray`, `isBoolean`, `isNullish` | utils/validation/type-validation | Runtime type guards |
| `isEmail`, `isUrl`, `isValidDate` | utils/validation/type-validation | Pattern validators |
| `isApiResponse`, `isSuccessResponse`, `isErrorResponse` | utils/validation/type-validation | API response guards |
| `createValidator(fn, name)` | utils/validation/type-validation | Factory for creating `ValidationResult`-returning validators |
| `createAssertion(fn, name)` | utils/validation/type-validation | Factory for creating assertion functions |
| `parseJson(str, validator?)` | utils/validation/type-validation | Safe JSON parse returning `ValidationResult` |

### Formatters

| Function | Location | Purpose |
|----------|----------|---------|
| `formatWalletAddress(addr)` | utils/blockchain/address | Truncates to `0x1234...5678` |
| `formatUSDC(amount)` | utils/formatting/currency | Converts smallest units to `"1.00"` display |
| `parseUSDC(str)` | utils/formatting/currency | Converts `"1.00"` to smallest units |
| `formatEmailDate(date)` | utils/formatting/date | Smart relative date (Today: time, Yesterday, day name, etc.) |
| `formatRelativeTime(date)` | utils/formatting/date | `"2 hours ago"`, `"3 days ago"` |
| `formatTimestamp(ts)` | utils/formatting/date | Timestamp to ISO string |
| `formatBigInt(value, decimals)` | utils/blockchain/event-helpers | BigInt to decimal string |
| `formatBytes(bytes)` | utils/formatting/string | `"1.5 MB"` display |
| `formatNumber(num)` | utils/formatting/string | Thousands separator formatting |
| `truncate`, `capitalize`, `toTitleCase`, `toKebabCase`, `toCamelCase`, `toSnakeCase` | utils/formatting/string | String transformations |
| `escapeHtml`, `stripHtml` | utils/formatting/string | HTML sanitization |
| `pluralize(count, singular, plural?)` | utils/formatting/string | Word pluralization |

### Async Helpers (`utils/async-helpers.ts`)

| Function | Purpose |
|----------|---------|
| `safeAsync(operation, context?)` | Returns `AsyncResult<T>` instead of throwing |
| `withLoadingState(op, setLoading, setError)` | Manages loading/error state for UI |
| `safeParallel(operations, context?)` | Parallel execution with error handling |
| `withTimeout(op, timeoutMs)` | Adds timeout to any async operation |
| `withCache(key, op, ttlMs?)` | In-memory cache with TTL (default 5 min) |
| `debounceAsync(fn, delay, key)` | Debounces async function calls |

## Development Commands

```bash
# Install dependencies
bun install

# Build (dual ESM + CJS output)
bun run build

# Watch mode development
bun run dev

# Run tests (Vitest)
bun test

# Type checking only
bun run typecheck

# Lint (ESLint v9 flat config)
bun run lint
bun run lint:fix

# Format (Prettier)
bun run format
bun run format:check

# Clean build artifacts
bun run clean

# Full verification pipeline (typecheck + lint + test + build)
bun run verify
```

## Architecture / Patterns

### Optional Pattern

The `Optional<T>` type is used pervasively throughout the codebase instead of manual `T | null | undefined`. All optional interface properties use this type:

```typescript
import { Optional } from '@sudobility/types';

interface Example {
  required: string;
  optional?: Optional<string>;  // consistent nullable pattern
}
```

### Result Pattern

Operations that can fail use `Result<T, E>` instead of throwing exceptions:

```typescript
import { Result, UnifiedError } from '@sudobility/types';

function doWork(): Result<Data> {
  if (ok) return { success: true, data: result };
  return { success: false, error: { type: 'ValidationError', message: '...' } };
}
```

### Type Organization

Types are organized by domain under `src/types/`:
- **business/** -- Application-level enums and wallet status
- **blockchain/** -- Multi-chain messaging, transactions, fee structures
- **config/** -- App configuration and environment abstractions
- **consumables/** -- Credit/consumable purchase system types
- **entity/** -- Organization/workspace system with RBAC
- **infrastructure/** -- Platform-agnostic service interfaces (analytics, network, navigation)
- **subscription/** -- Rate limiting types

Utilities under `src/utils/` are pure functions with no side effects (except logger).

### Barrel Exports

Everything is re-exported through `src/index.ts`. The package also provides sub-path exports:
- `@sudobility/types` -- full library
- `@sudobility/types/api` -- indexer response types only
- `@sudobility/types/enums` -- business enums only

### Dual Module Output

The build produces both ESM (`dist/index.js`) and CommonJS (`dist/index.cjs`) via two tsconfig files:
- `tsconfig.esm.json` -- ESNext module output
- `tsconfig.cjs.json` -- CommonJS module output (files renamed to `.cjs`)

## Common Tasks

### Adding a New Type

1. Create or edit the appropriate file under `src/types/<domain>/`
2. Export the type from the domain file
3. Add the export to `src/index.ts` (use `export type { ... }` for pure types, `export { ... }` for enums/values)
4. Add JSDoc comments with `@example` blocks
5. Run `bun run verify` to confirm everything builds and passes

### Adding a New Enum

1. Add to the appropriate domain file (e.g., `src/types/business/enums.ts` for business enums)
2. Export with `export { EnumName }` (not `export type`) in `src/index.ts` so runtime values are available
3. If the enum values overlap with STATUS_VALUES, reference them in comments for consistency

### Adding a New Validator

1. Place in `src/utils/validation/` or the relevant domain utility directory
2. Keep functions pure -- accept input, return boolean or `ValidationResult<T>`
3. Export from `src/index.ts`
4. Add tests in `test/utils/validation/` mirroring the source path
5. Use existing patterns: `createValidator()` for wrapping type guards, `createAssertion()` for throwing variants

### Adding a New Formatter

1. Place in the appropriate `src/utils/formatting/` file (string.ts, date.ts, currency.ts)
2. Keep functions pure with no side effects
3. Export from `src/index.ts`
4. Add tests covering edge cases (empty strings, zero values, invalid dates)

### Adding Entity/RBAC Types

The entity system in `src/types/entity/` follows a strict pattern:
- Enums and core interfaces in `entity.ts`
- Permission constants and helpers in `permissions.ts`
- API request shapes in `requests.ts`
- API response shapes in `responses.ts` (all extend `BaseResponse<T>`)

## Peer / Key Dependencies

This package has **zero runtime dependencies**. All dependencies are dev-only:

| Dependency | Purpose |
|------------|---------|
| `typescript` ^5.9.3 | TypeScript compiler |
| `vitest` ^4.0.4 | Test framework |
| `eslint` ^9.38.0 | Linting (flat config format) |
| `@typescript-eslint/*` ^8.46.2 | TypeScript ESLint rules |
| `prettier` ^3.6.2 | Code formatting |
| `rimraf` ^6.0.1 | Clean build artifacts |
| `globals` ^16.4.0 | ESLint globals |
| `@types/node` ^24.9.1 | Node.js type definitions |

Consumers import this package as a dependency. No peer dependencies are required.
