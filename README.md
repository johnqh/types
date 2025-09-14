# @johnqh/types

Common TypeScript types, interfaces, and enums for 0xmail.box projects.

## Overview

This package contains all shared TypeScript definitions used across the 0xmail.box ecosystem. It includes:

- Core types and interfaces
- Enums and constants
- Pure utility functions (no dependencies)
- Business logic types
- API response types
- Blockchain-related types

## Features

- 📦 **Zero Dependencies**: Pure TypeScript with no external dependencies
- 🎯 **Framework Agnostic**: Not tied to React or any UI framework
- 🔧 **Tree Shakeable**: Optimized for modern bundlers
- 📝 **Fully Typed**: Complete TypeScript support
- 🚀 **Lightweight**: Minimal runtime footprint

## Installation

```bash
npm install @johnqh/types
```

## Usage

```typescript
import { Email, User, AuthStatus } from '@johnqh/types';
import { formatWalletAddress, validateEmail } from '@johnqh/types/utils';

// Use types
const user: User = {
  id: '123',
  walletAddress: '0x...',
  status: AuthStatus.VERIFIED
};

// Use utilities
const formatted = formatWalletAddress(user.walletAddress);
```

## Structure

- `/types` - Type definitions, interfaces, and enums
- `/utils` - Pure utility functions

## Development

```bash
# Build the project
npm run build

# Watch mode
npm run dev

# Run tests
npm test

# Lint
npm run lint
```

## License

MIT