// Enums and utilities
export type {
  EmailFolder
} from './enums';

export {
  AppAnalyticsEvent,
  AuthStatus,
  ChainType,
  ConnectionState,
  ConnectionType,
  Currency,
  EmailAction,
  EmailAddressType,
  EmailComposeType,
  EmailFolderUtils,
  EmailSortCriteria,
  EmailValidationState,
  ErrorType,
  FeatureFlag,
  FontSize,
  MailboxType,
  MediumView,
  MobileView,
  NetworkStatus,
  NotificationType,
  PlatformType,
  RequestStatus,
  SortOrder,
  StandardEmailFolder,
  SubscriptionAction,
  Theme
} from './enums';

// Email types
export type {
  Email,
  EmailAddress,
  Folder,
  User,
  WalletUserData
} from './email';

// Mailbox types
export type {
  DefaultFolder,
  MailBox
} from './mailbox';

// Wallet status utilities
export type {
  WalletStatus
} from './wallet-status';

export {
  WalletConnectionState,
  getWalletConnectionState,
  isWalletConnected,
  isWalletVerified
} from './wallet-status';
