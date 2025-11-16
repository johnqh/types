# AI-Friendly Type Guide for @sudobility/types

**Version**: 1.8.29
**Last Updated**: 2025-10-24

This guide provides comprehensive information about the most commonly used types in this library, optimized for AI-assisted development.

## Quick Reference by Use Case

### 🔐 User Authentication & Management
```typescript
import {
  User,
  WalletUserData,
  AuthStatus,
  ChainType,
  ConnectionState
} from '@sudobility/types';

// User with wallet
const user: WalletUserData = {
  walletAddress: '0x742d35Cc6634C0532925a3b8D2C36B7f12345678',
  chainType: ChainType.EVM,
  emails: [],
  folders: [],
  authStatus: AuthStatus.AUTHENTICATED
};

// Check connection state
if (user.connectionState === ConnectionState.CONNECTED) {
  // User wallet is connected
}
```

### 📧 Email Operations
```typescript
import {
  Email,
  MailBox,
  Folder,
  WildduckMessage,
  WildduckMessageAddress
} from '@sudobility/types';

// Email message
const email: Email = {
  id: 'msg_123',
  from: 'sender@example.com',
  to: 'recipient@example.com',
  subject: 'Hello Web3',
  body: 'Message content',
  timestamp: Date.now(),
  read: false
};

// WildDuck message format
const wildduckMsg: WildduckMessage = {
  id: '12345',
  mailbox: 'inbox',
  thread: 'thread_abc',
  to: [{ address: 'user@example.com', name: 'User' }],
  subject: 'Test',
  date: '2025-10-24T12:00:00Z',
  intro: 'Email preview...',
  seen: false,
  deleted: false,
  flagged: false,
  draft: false,
  answered: false,
  size: 1024,
  ha: false, // hasAttachments
  attachments: false
};
```

### ⛓️ Blockchain Operations
```typescript
import {
  Message,
  MessageRecipient,
  TransactionResult,
  TransactionStatus,
  MessageType,
  ChainType
} from '@sudobility/types';

// Send blockchain message
const message: Message = {
  recipient: '0x...',
  subject: 'Web3 Email',
  body: 'Blockchain message',
  chainType: ChainType.EVM,
  isPriority: false
};

// Handle transaction result
const txResult: TransactionResult = {
  success: true,
  transactionHash: '0xabc123...',
  status: TransactionStatus.CONFIRMED,
  blockNumber: 12345678,
  gasUsed: BigInt(21000)
};
```

### 🔍 Type-Safe Validation
```typescript
import {
  Optional,
  Result,
  ValidationResult,
  isValidEmail,
  isEvmAddress
} from '@sudobility/types';

// Optional type for nullable values
const maybeUser: Optional<User> = fetchUser();
if (maybeUser) {
  // TypeScript knows maybeUser is User here
}

// Result type for operations that can fail
const result: Result<User, Error> = {
  success: true,
  data: user
};

// Validation with type guards
if (isEvmAddress(address)) {
  // TypeScript knows address is a valid EVM address
  sendTransaction(address);
}
```

### 📊 API Responses (Indexer)
```typescript
import {
  IndexerEmailAccountsResponse,
  IndexerRewardsResponse,
  IndexerPointsResponse,
  IndexerApiResponse
} from '@sudobility/types';

// Handle email accounts API
const accountsResponse: IndexerEmailAccountsResponse = await api.getAccounts();
if (accountsResponse.success && accountsResponse.data) {
  accountsResponse.data.accounts.forEach(account => {
    console.log(account.walletAddress, account.emailAddress);
  });
}

// Handle rewards API
const rewardsResponse: IndexerRewardsResponse = await api.getRewards(address);
if (rewardsResponse.success && rewardsResponse.data) {
  console.log('Claimable:', rewardsResponse.data.claimableAmount);
}
```

### 🎯 KYC Verification
```typescript
import {
  KYCVerificationLevel,
  KYCApplicationStatus,
  SumsubReviewStatus,
  SumsubReviewAnswer,
  KYCApplication,
  InitiateKYCRequest
} from '@sudobility/types';

// Initiate KYC
const kycRequest: InitiateKYCRequest = {
  walletAddress: '0x...',
  chainType: ChainType.EVM,
  verificationLevel: KYCVerificationLevel.Basic
};

// Check KYC application status
const application: KYCApplication = await getKYCStatus();
switch (application.status) {
  case KYCApplicationStatus.Pending:
    // User needs to start verification
    break;
  case KYCApplicationStatus.InProgress:
    // User is uploading documents
    break;
  case KYCApplicationStatus.Completed:
    // Verification complete
    break;
}

// Handle Sumsub review results
if (verificationResult.status === SumsubReviewAnswer.Green) {
  // Verification approved
}
```

### 💰 Transaction & Fee Management
```typescript
import {
  ConfirmationStatus,
  ClaimType,
  FeeType,
  TransactionReceipt,
  ClaimRevenueResponse,
  FeeUpdateResponse
} from '@sudobility/types';

// Check transaction confirmation
const receipt: TransactionReceipt = await getReceipt(txHash);
if (receipt.confirmationStatus === ConfirmationStatus.Finalized) {
  // Transaction is final and irreversible
}

// Claim revenue
const claimResponse: ClaimRevenueResponse = await claimRevenue();
if (claimResponse.success) {
  console.log('Claim type:', claimResponse.claimType);
  if (claimResponse.claimType === ClaimType.Recipient) {
    // Recipient claimed their share
  }
}

// Handle fee updates
const feeUpdate: FeeUpdateResponse = await updateFee();
if (feeUpdate.feeType === FeeType.Send) {
  console.log(`Send fee: ${feeUpdate.oldFee} → ${feeUpdate.newFee}`);
}
```

### 🏗️ Infrastructure & Analytics
```typescript
import {
  ContractType,
  ProcessedEventName,
  AnalyticsEvent,
  AnalyticsEventProperties,
  NetworkClient,
  NetworkResponse
} from '@sudobility/types';

// Track events by contract
if (event.contractType === ContractType.Mailer) {
  switch (event.eventName) {
    case ProcessedEventName.MailSent:
      // Handle mail sent event
      break;
    case ProcessedEventName.DelegationSet:
      // Handle delegation event
      break;
  }
}

// Analytics tracking
const analytics: AnalyticsEventProperties = {
  eventName: AnalyticsEvent.EMAIL_SENT,
  userId: user.id,
  chainType: ChainType.EVM,
  timestamp: Date.now()
};

// Network client
const response: NetworkResponse<Data> = await networkClient.get('/api/data');
if (response.success && response.data) {
  // Handle successful response
}
```

### 📁 Mailbox & Folder Management
```typescript
import {
  MailboxSpecialUse,
  WildduckMailbox,
  Folder
} from '@sudobility/types';

// Standard mailbox folders
const inboxPath = MailboxSpecialUse.Inbox; // '\\Inbox'
const sentPath = MailboxSpecialUse.Sent;   // '\\Sent'
const trashPath = MailboxSpecialUse.Trash; // '\\Trash'

// Create mailbox structure
const mailbox: WildduckMailbox = {
  id: 'mailbox_123',
  name: 'Inbox',
  path: inboxPath,
  specialUse: inboxPath,
  modifyIndex: 0,
  subscribed: true,
  hidden: false
};
```

## Common Patterns

### Pattern 1: Safe API Response Handling
```typescript
import type { IndexerApiResponse } from '@sudobility/types';

async function fetchData<T>(endpoint: string): Promise<T | null> {
  const response: IndexerApiResponse<T> = await api.get(endpoint);

  if (response.success && response.data) {
    return response.data;
  }

  console.error('API Error:', response.error);
  return null;
}
```

### Pattern 2: Multi-Chain Address Validation
```typescript
import { ChainType, isEvmAddress, isSolanaAddress } from '@sudobility/types';

function validateAddress(address: string, chainType: ChainType): boolean {
  switch (chainType) {
    case ChainType.EVM:
      return isEvmAddress(address);
    case ChainType.SOLANA:
      return isSolanaAddress(address);
    default:
      return false;
  }
}
```

### Pattern 3: Enum Value Iteration
```typescript
import { KYCVerificationLevel, FeeType } from '@sudobility/types';

// Get all KYC levels
const allLevels = Object.values(KYCVerificationLevel);
// ['basic', 'enhanced', 'accredited']

// Get all fee types
const allFeeTypes = Object.values(FeeType);
// ['send', 'delegation', 'registration']

// Check if value is valid enum member
function isValidFeeType(value: string): value is FeeType {
  return Object.values(FeeType).includes(value as FeeType);
}
```

### Pattern 4: Optional Type Usage
```typescript
import type { Optional } from '@sudobility/types';

// Instead of: User | null | undefined
function getUser(id: string): Optional<User> {
  // Can return User, null, or undefined
  return users.find(u => u.id === id) ?? null;
}

// Usage with null coalescing
const user = getUser('123');
const name = user?.name ?? 'Anonymous';
```

### Pattern 5: Result Type for Error Handling
```typescript
import type { Result } from '@sudobility/types';

async function validateAndSave(data: unknown): Promise<Result<User, Error>> {
  try {
    const user = await validateUser(data);
    await saveUser(user);
    return { success: true, data: user };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error : new Error('Unknown error')
    };
  }
}

// Usage
const result = await validateAndSave(inputData);
if (result.success) {
  console.log('Saved:', result.data);
} else {
  console.error('Error:', result.error);
}
```

## Type Guard Best Practices

```typescript
import {
  isWildduckMessage,
  isWildduckSuccess,
  isEvmAddress,
  isSolanaAddress
} from '@sudobility/types';

// Always use type guards for unknown data
const data: unknown = await api.fetchData();

if (isWildduckMessage(data)) {
  // TypeScript knows data is WildduckMessage
  console.log(data.subject, data.from);
}

// Combine type guards for complex validation
function isValidMessageAddress(addr: unknown, chainType: ChainType): boolean {
  if (typeof addr !== 'string') return false;

  switch (chainType) {
    case ChainType.EVM:
      return isEvmAddress(addr);
    case ChainType.SOLANA:
      return isSolanaAddress(addr);
    default:
      return false;
  }
}
```

## Utility Functions Reference

### Address Utilities
- `isEvmAddress(address: string): boolean` - Validate EVM address
- `isSolanaAddress(address: string): boolean` - Validate Solana address
- `formatWalletAddress(address: string): string` - Format for display

### Validation Utilities
- `isValidEmail(email: string): boolean` - Email validation
- `isValidWeb3Username(username: string): boolean` - Web3 username validation

### Formatting Utilities
- `formatCurrency(amount: number | bigint): string` - Currency formatting
- `formatDate(timestamp: number): string` - Date formatting

## Key Enums Reference

### Business Enums
- `AuthStatus`: UNAUTHENTICATED, AUTHENTICATING, AUTHENTICATED, AUTH_FAILED
- `Chain`: ETHEREUM, POLYGON, ARBITRUM, OPTIMISM, BASE, SOLANA
- `ChainType`: EVM, SOLANA
- `Theme`: LIGHT, DARK, SYSTEM
- `RequestStatus`: IDLE, LOADING, SUCCESS, ERROR

### Transaction Enums
- `TransactionStatus`: PENDING, CONFIRMED, FAILED, CANCELLED
- `MessageType`: STANDARD, PRIORITY, PREPARED
- `ConfirmationStatus`: PROCESSED, CONFIRMED, FINALIZED

### KYC Enums
- `KYCVerificationLevel`: BASIC, ENHANCED, ACCREDITED
- `KYCApplicationStatus`: PENDING, INITIATED, IN_PROGRESS, SUBMITTED, COMPLETED, REJECTED
- `SumsubReviewStatus`: INIT, PENDING, PRECHECKED, COMPLETED
- `SumsubReviewAnswer`: GREEN, RED, YELLOW

### Mailer Enums
- `ClaimType`: RECIPIENT, OWNER, EXPIRED
- `FeeType`: SEND, DELEGATION, REGISTRATION

### Infrastructure Enums
- `ContractType`: MAILER, MAIL_SERVICE
- `ProcessedEventName`: MAIL_SENT, PREPARED_MAIL_SENT, DELEGATION_SET, etc.
- `AnalyticsEvent`: EMAIL_SENT, EMAIL_RECEIVED, USER_REGISTERED, etc.
- `WalletType`: METAMASK, PHANTOM, WALLET_CONNECT, COINBASE

### Mailbox Enums
- `MailboxSpecialUse`: INBOX ('\\Inbox'), SENT ('\\Sent'), TRASH ('\\Trash'), DRAFTS ('\\Drafts'), JUNK ('\\Junk')

## Tips for AI Assistants

1. **Always use enums instead of string literals** for known values
2. **Use Optional<T>** instead of `T | null | undefined`
3. **Use Result<T, E>** for operations that can fail
4. **Always validate unknown data** with type guards before using
5. **Import types explicitly** with `import type` when only using as types
6. **Use specific response types** from the indexer API for type safety
7. **Leverage enum iteration** with `Object.values()` when needed
8. **Check `.success` property** on all API responses before accessing data

## Common Mistakes to Avoid

❌ **Don't use string literals**
```typescript
// Bad
if (status === 'AUTHENTICATED') { }

// Good
if (status === AuthStatus.AUTHENTICATED) { }
```

❌ **Don't use manual union types for nullable**
```typescript
// Bad
function getUser(): User | null | undefined { }

// Good
function getUser(): Optional<User> { }
```

❌ **Don't skip type validation**
```typescript
// Bad
const message = data as WildduckMessage;

// Good
if (isWildduckMessage(data)) {
  const message = data; // TypeScript infers type
}
```

❌ **Don't assume API success**
```typescript
// Bad
const accounts = response.data.accounts;

// Good
if (response.success && response.data) {
  const accounts = response.data.accounts;
}
```

## Additional Resources

- **Full Documentation**: See [CLAUDE.md](../CLAUDE.md) for complete project context
- **Development Guide**: See [development-guide.md](./development-guide.md) for contributing
- **Type Analysis**: Run `npm run ai:analyze` for detailed type structure
- **Export Validation**: Run `npm run ai:validate` to verify exports

---

*Generated for AI-assisted development - Last updated with v1.8.29*
