// Enums and utilities
export type { EmailFolder } from './enums';

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
  EmailFolderUtils,
  EmailSortCriteria,
  EmailValidationState,
  ErrorType,
  FeatureFlag,
  FontSize,
  InfoType,
  MailboxSpecialUse,
  MediumView,
  MobileView,
  NotificationType,
  PlatformType,
  RequestStatus,
  SortOrder,
  SubscriptionAction,
  Theme,
} from './enums';


// Wallet status utilities
export type { WalletStatus } from './wallet-status';

export {
  getWalletConnectionState,
  isWalletConnected,
  isWalletVerified,
} from './wallet-status';
