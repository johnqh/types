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

// ============================================================================
// TYPES - Common
// ============================================================================

export type {
  Optional,
  WalletData,
  FolderBase,
  MessageBase,
  BaseResponse,
  PaginationOptions,
  PaginationInfo,
  PaginatedResponse,
  UnifiedError,
  Result,
  ValidationResult,
} from './types/common';

// ============================================================================
// TYPES - Business
// ============================================================================

// Enums
export {
  AuthStatus,
  Chain,
  ChainType,
  ConnectionState,
  ConnectionType,
  Currency,
  EmailAction,
  EmailAddressType,
  EmailComposeType,
  EmailSortCriteria,
  EmailValidationState,
  ErrorType,
  FeatureFlag,
  FontSize,
  InfoType,
  MediumView,
  MobileView,
  NotificationType,
  PlatformType,
  RequestStatus,
  SortOrder,
  SubscriptionAction,
  Theme,
} from './types/business/enums';

// Wallet status
export type { WalletStatus } from './types/business/wallet-status';
export {
  getWalletConnectionState,
  isWalletConnected,
  isWalletVerified,
} from './types/business/wallet-status';

// ============================================================================
// TYPES - Blockchain
// ============================================================================

export type {
  ChainConfig,
  ClaimableRevenue,
  ClientConfig,
  DeploymentAddresses,
  FeeStructure,
  Message,
  MessageFilter,
  MessageRecipient,
  OperationError,
  PreparedMessage,
  RpcConfig,
  SendMessageOptions,
  TransactionResult,
} from './types/blockchain/common';

export {
  MessageType,
  PROTOCOL_CONSTANTS,
  TransactionStatus,
  isEvmAddress,
  isEvmRecipient,
  isSolanaAddress,
  isSolanaRecipient,
} from './types/blockchain/common';

export {
  validateAddress,
  validateAmount,
  validateDomain,
  validateMessage,
} from './types/blockchain/validation';

// ============================================================================
// TYPES - Config
// ============================================================================

export type {
  EnvProvider,
  EnvironmentVariables,
} from './types/config/environment';
export { StorageType } from './types/config/environment';

export type { AppConfig, FirebaseConfig } from './types/config/app-config';

// ============================================================================
// TYPES - Infrastructure
// ============================================================================

// Analytics
export type {
  AnalyticsConfig,
  AnalyticsEventProperties,
  AnalyticsService,
  EmailAnalyticsService,
} from './types/infrastructure/analytics';
export {
  AnalyticsEvent,
  AnalyticsEventBuilder,
} from './types/infrastructure/analytics';

// API
export type {
  ApiResponse,
  ChainMetadata,
  ChainStatisticsEntity,
  DelegationEntity,
  EventLogEntity,
  GraphQLResult,
  MailEntity,
  MultiChainId,
  PreparedMailEntity,
  SignatureProtectedRequest,
  StatisticsEntity,
  SupportedChainId,
  UserChainId,
  UserStatisticsEntity,
} from './types/infrastructure/api';
export {
  ContractType,
  ProcessedEventName,
} from './types/infrastructure/api';

// Network
export type {
  NetworkClient,
  NetworkRequestOptions,
  NetworkResponse,
} from './types/infrastructure/network';
export { NetworkError } from './types/infrastructure/network';

// Navigation
export type {
  UILocationHook,
  UINavigationConfig,
  UINavigationHook,
  UINavigationOptions,
  UINavigationService,
  UINavigationState,
} from './types/infrastructure/navigation';

// Wallet
export { WalletType } from './types/infrastructure/wallet';

// Firebase User
export type { UserInfoResponse } from './types/infrastructure/firebase-user';

// ============================================================================
// TYPES - Subscription (Rate Limits)
// ============================================================================

export type {
  RateLimits,
  RateLimitTier,
  RateLimitResets,
  RateLimitsConfigData,
  RateLimitUsage,
  RateLimitsConfigResponse,
  RateLimitHistoryEntry,
  RateLimitHistoryData,
  RateLimitHistoryResponse,
} from './types/subscription/rate-limits';
export { RateLimitPeriodType } from './types/subscription/rate-limits';

// ============================================================================
// TYPES - Entity
// ============================================================================

// Core entity types
export {
  EntityType,
  EntityRole,
  InvitationStatus,
} from './types/entity/entity';

export type {
  Entity,
  EntityWithRole,
  EntityMember,
  EntityInvitation,
} from './types/entity/entity';

// Permissions
export type { EntityPermissions } from './types/entity/permissions';
export {
  OWNER_PERMISSIONS,
  MANAGER_PERMISSIONS,
  MEMBER_PERMISSIONS,
  getPermissionsForRole,
  hasPermission,
} from './types/entity/permissions';

// Requests
export type {
  CreateEntityRequest,
  UpdateEntityRequest,
  UpdateMemberRoleRequest,
  InviteMemberRequest,
  AcceptInvitationRequest,
  DeclineInvitationRequest,
} from './types/entity/requests';

// Responses
export type {
  EntityResponse,
  EntityWithRoleListResponse,
  EntityWithRoleResponse,
  EntityMemberResponse,
  EntityMemberListResponse,
  EntityInvitationResponse,
  EntityInvitationListResponse,
  SlugAvailabilityData,
  SlugAvailabilityResponse,
} from './types/entity/responses';

// ============================================================================
// UTILS - Validation
// ============================================================================

export type { AddressValidationResult } from './utils/validation/web3-username-validator';
export { Web3UsernameValidator } from './utils/validation/web3-username-validator';

export type { ValidationResult as TypeValidationResult } from './utils/validation/type-validation';
export {
  createAssertion,
  createValidator,
  hasRequiredProperties,
  isApiResponse,
  isArray,
  isBoolean,
  isEmail,
  isErrorResponse,
  isNullish,
  isNumber,
  isObject,
  isString,
  isSuccessResponse,
  isUrl,
  isValidDate,
  optional,
  parseJson,
  validateArray,
} from './utils/validation/type-validation';

// ============================================================================
// UTILS - Blockchain
// ============================================================================

export type { ParsedEmailAddress } from './utils/blockchain/address';
export {
  AddressType,
  formatWalletAddress,
  getAddressType,
  getChainDisplayName,
  isENSName,
  isSNSName,
  isValidSignature,
  isValidWalletAddress,
  parseEmailAddress,
} from './utils/blockchain/address';

export type {
  MultiChainIdGenerator,
  UserChainIdGenerator,
} from './utils/blockchain/event-helpers';
export {
  createChainStatsId,
  createDelegationId,
  createMultiChainId,
  createUserMultiChainId,
  formatBigInt,
  isTestNet,
  isZeroAddress,
  normalizeAddress,
  validateEventArgs,
} from './utils/blockchain/event-helpers';

// ============================================================================
// UTILS - Auth
// ============================================================================

export {
  canAccessProtectedFeatures,
  extractNonceFromMessage,
  generateAuthMessage,
  generateNonce,
  getAuthStatusText,
  isAuthExpired,
  isAuthStatusConnected,
  isValidNonce,
} from './utils/auth/auth';

export {
  parseAdminEmails,
  isAdminEmail,
  createAdminChecker,
} from './utils/auth/admin-emails';

// ============================================================================
// UTILS - Formatting
// ============================================================================

// Currency
export {
  CLAIM_PERIOD_DAYS,
  USDC_DECIMALS,
  formatUSDC,
  parseUSDC,
} from './utils/formatting/currency';

// Date
export {
  addDays,
  addHours,
  formatEmailDate,
  formatRelativeTime,
  formatTimestamp,
  isDateInRange,
  parseDate,
} from './utils/formatting/date';

// String
export {
  capitalize,
  escapeHtml,
  formatBytes,
  formatNumber,
  getInitials,
  isBlank,
  isNotBlank,
  normalizeWhitespace,
  pluralize,
  randomString,
  stripHtml,
  toCamelCase,
  toKebabCase,
  toSnakeCase,
  toTitleCase,
  truncate,
} from './utils/formatting/string';

// ============================================================================
// UTILS - Constants
// ============================================================================

export {
  API_TIMEOUT,
  API_RETRY_ATTEMPTS,
  API_RETRY_DELAY,
  AUTH_STATUS,
  CHAIN_TYPE,
  STORAGE_KEYS,
  EMAIL_CONFIG,
  SUBSCRIPTION_TIERS,
  TIME_FORMAT,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  ROUTES,
  CONTACT_INFO,
  WALLET_NAMES,
  NETWORK_IDS,
  ANIMATION,
  Z_INDEX,
} from './utils/constants/application';

export { STATUS_VALUES } from './utils/constants/status-values';
export type { StatusValue } from './utils/constants/status-values';

// ============================================================================
// UTILS - Logging
// ============================================================================

export {
  LogLevel,
  type LogEntry,
  logger,
  authLogger,
  apiLogger,
  contractLogger,
  ensLogger,
  storageLogger,
} from './utils/logging/logger';

// ============================================================================
// UTILS - URL
// ============================================================================

export {
  createURLSearchParams,
  createSearchParams,
  searchParamsToString,
  parseSearchParams,
  type URLSearchParamsLike,
} from './utils/url/url-params';

// ============================================================================
// UTILS - Async Helpers
// ============================================================================

export {
  safeAsync,
  withLoadingState,
  safeParallel,
  withTimeout,
  withCache,
  clearExpiredCache,
  debounceAsync,
  type AsyncResult,
} from './utils/async-helpers';
