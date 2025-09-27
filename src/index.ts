/**
 * @johnqh/types - Common TypeScript types for 0xmail.box projects
 *
 * This package contains all shared TypeScript definitions used across
 * the 0xmail.box ecosystem including business logic types, blockchain
 * types, configuration interfaces, infrastructure types, and utility functions.
 *
 * @version 1.0.0
 * @license MIT
 */

// Re-export all types from the types module
export * from './types';

// Re-export all utilities
export * from './utils';

// Re-export WildDuck API request types
export * from './wildduck-requests';

// For backwards compatibility and easier imports, also export
// the most commonly used types directly
export type {
  // Email domain types
  Email,
  User,
  EmailAddress,
  WalletUserData,
  MailBox,

  // Configuration types
  AppConfig,
  FirebaseConfig,
  EnvironmentVariables,

  // Blockchain types
  Message,
  MessageRecipient,
  NetworkConfig,
  TransactionResult,

  // Infrastructure types
  AnalyticsEventProperties,
  AnalyticsService,
  NetworkClient,
  NetworkResponse,
  UINavigationService,

  // Mailbox response types
  BaseTransactionResponse,
  TransactionReceipt,
  MessageSendResponse,
  PreparedMessageSendResponse,
  ClaimableInfo,
  ClaimRevenueResponse,
  ClaimableAmountResponse,
  DomainRegistrationResponse,
  MailboxDelegationResponse,
  DelegationRejectionResponse,
  FeeInfo,
  FeeUpdateResponse,
  PauseInfo,
  PauseResponse,
  EmergencyDistributionResponse,
  EVMTransactionResponse,
  SolanaTransactionResponse,
  UnifiedClientResponse,
  BatchOperationResponse,
  MessageHistoryResponse,
  DelegationStatusResponse,
  ContractError,

  // API Response types (commonly used)
  ValidationResponse,
  EmailAccountsResponse,
  WalletEmailAccounts,
  WalletAddresses,
  EmailAddressesResult,
  DelegationResponse,
  DelegatorsResponse,
  SignatureVerificationResponse,
  NonceResponse,
  EntitlementResponse,
  PointsResponse,
  SimpleMessageResponse,
  LeaderboardResponse,
  SiteStatsResponse,
  SolanaWebhookResponse,
  SolanaSetupResponse,
  SolanaStatusResponse,
  SolanaTestTransactionResponse,
} from './types';

// Export the most commonly used enums
export {
  // Business enums
  AuthStatus,
  Theme,
  FontSize,
  EmailComposeType,
  MobileView,
  RequestStatus,
  NotificationType,

  // Blockchain enums
  MessageType,
  TransactionStatus,

  // Infrastructure enums
  AnalyticsEvent,
  ChainType,
  WalletType,
  StorageType,
} from './types';
