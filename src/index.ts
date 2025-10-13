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

// For backwards compatibility and easier imports, also export
// the most commonly used types directly
export type {
  // Configuration types
  AppConfig,
  FirebaseConfig,
  EnvironmentVariables,

  // Blockchain types
  ChainConfig,
  Message,
  MessageRecipient,
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

  // Indexer API Response types (all types)
  IndexerNameServiceAccount,
  IndexerWalletAccount,
  IndexerEmailAccountsResult,
  IndexerEmailAccountsResponse,
  IndexerRewardData,
  IndexerRewardHistoryData,
  IndexerRewardsResponse,
  IndexerAddressValidationData,
  IndexerAddressValidationResponse,
  IndexerDelegateData,
  IndexerDelegatedToResponse,
  IndexerDelegatedFromData,
  IndexerDelegatedFromResponse,
  IndexerNonceData,
  IndexerNonceResponse,
  IndexerEntitlementInfo,
  IndexerEntitlementData,
  IndexerEntitlementResponse,
  IndexerSignInMessageData,
  IndexerSignInMessageResponse,
  IndexerPointsData,
  IndexerPointsResponse,
  IndexerLeaderboardData,
  IndexerLeaderboardResponse,
  IndexerSiteStatsData,
  IndexerSiteStatsResponse,
  IndexerReferralCodeData,
  IndexerReferralCodeResponse,
  IndexerReferralConsumptionData,
  IndexerReferralStatsData,
  IndexerReferralStatsResponse,
  IndexerAuthenticationStatusData,
  IndexerAuthenticationStatusResponse,
  IndexerChainBlockInfo,
  IndexerBlockStatusData,
  IndexerBlockStatusResponse,
  IndexerNameServiceData,
  IndexerNameServiceResponse,
  IndexerNameResolutionData,
  IndexerNameResolutionResponse,
  IndexerErrorResponse,
  IndexerApiResponse,

  // KYC verification types (commonly used)
  KYCApplication,
  VerificationResult,
  UserConsent,
  InitiateKYCRequest,
  InitiateKYCResponse,
  GetKYCStatusResponse,
  VerifyUserRequest,
  VerifyUserResponse,
  KYCVerificationLevel,
  KYCApplicationStatus,
} from './types';

// Export async utilities
export {
  safeAsync,
  withLoadingState,
  safeParallel,
  withTimeout,
  withCache,
  clearExpiredCache,
  debounceAsync,
  type AsyncResult,
} from './utils';

// Export the most commonly used enums
export {
  // Business enums
  AuthStatus,
  Chain,
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
