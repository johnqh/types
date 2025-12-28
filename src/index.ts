/**
 * @johnqh/types - Common TypeScript types for Web3 email projects
 *
 * This package contains all shared TypeScript definitions used across
 * Web3 email applications including business logic types, blockchain
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
  InfoType,

  // Blockchain enums
  MessageType,
  TransactionStatus,

  // Infrastructure enums
  AnalyticsEvent,
  ChainType,
  WalletType,
  StorageType,
  ContractType,
  ProcessedEventName,
} from './types';
