/**
 * Platform-agnostic enums for discrete states
 * These replace string literals throughout the application
 */

// Authentication states - aligned with @johnqh/di
export enum AuthStatus {
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
  VERIFIED = 'verified',
}

// Chain types (more specific than @johnqh/di version)
export enum ChainType {
  EVM = 'evm',
  SOLANA = 'solana',
}

// Supported blockchain networks
export enum Chain {
  // Ethereum
  ETH_MAINNET = 'eth-mainnet',
  ETH_SEPOLIA = 'eth-sepolia',
  ETH_GOERLI = 'eth-goerli',

  // Polygon
  POLYGON_MAINNET = 'polygon-mainnet',
  POLYGON_MUMBAI = 'polygon-mumbai',
  POLYGON_AMOY = 'polygon-amoy',

  // Optimism
  OPTIMISM_MAINNET = 'optimism-mainnet',
  OPTIMISM_SEPOLIA = 'optimism-sepolia',
  OPTIMISM_GOERLI = 'optimism-goerli',

  // Arbitrum
  ARBITRUM_MAINNET = 'arbitrum-mainnet',
  ARBITRUM_SEPOLIA = 'arbitrum-sepolia',
  ARBITRUM_GOERLI = 'arbitrum-goerli',

  // Base
  BASE_MAINNET = 'base-mainnet',
  BASE_SEPOLIA = 'base-sepolia',
  BASE_GOERLI = 'base-goerli',

  // Avalanche
  AVALANCHE_MAINNET = 'avalanche-mainnet',
  AVALANCHE_FUJI = 'avalanche-fuji',

  // BNB Chain (formerly Binance Smart Chain)
  BNB_MAINNET = 'bnb-mainnet',
  BNB_TESTNET = 'bnb-testnet',

  // Gnosis Chain (formerly xDai)
  GNOSIS_MAINNET = 'gnosis-mainnet',
  GNOSIS_CHIADO = 'gnosis-chiado',

  // Celo
  CELO_MAINNET = 'celo-mainnet',
  CELO_ALFAJORES = 'celo-alfajores',

  // zkSync
  ZKSYNC_MAINNET = 'zksync-mainnet',
  ZKSYNC_SEPOLIA = 'zksync-sepolia',

  // Linea
  LINEA_MAINNET = 'linea-mainnet',
  LINEA_SEPOLIA = 'linea-sepolia',

  // Scroll
  SCROLL_MAINNET = 'scroll-mainnet',
  SCROLL_SEPOLIA = 'scroll-sepolia',

  // Monad
  MONAD_MAINNET = 'monad-mainnet',
  MONAD_TESTNET = 'monad-testnet',

  // Story Protocol
  STORY_MAINNET = 'story-mainnet',
  STORY_TESTNET = 'story-testnet',

  // Plume Network
  PLUME_MAINNET = 'plume-mainnet',
  PLUME_TESTNET = 'plume-testnet',

  // Nexus
  NEXUS_MAINNET = 'nexus-mainnet',
  NEXUS_TESTNET = 'nexus-testnet',

  // Hyperliquid
  HYPERLIQUID_MAINNET = 'hyperliquid-mainnet',
  HYPERLIQUID_TESTNET = 'hyperliquid-testnet',

  // AI-focused chains
  // Bittensor (TAO) - Substrate-based, not EVM
  // Fetch.ai
  FETCH_MAINNET = 'fetch-mainnet',
  FETCH_TESTNET = 'fetch-testnet',

  // Akash Network - Cosmos-based, not EVM

  // Gensyn - AI compute chain
  GENSYN_MAINNET = 'gensyn-mainnet',
  GENSYN_TESTNET = 'gensyn-testnet',

  // Ritual - AI inference chain
  RITUAL_MAINNET = 'ritual-mainnet',
  RITUAL_TESTNET = 'ritual-testnet',

  // Solana
  SOLANA_MAINNET = 'solana-mainnet',
  SOLANA_DEVNET = 'solana-devnet',
  SOLANA_TESTNET = 'solana-testnet',

  // Local development
  EVM_LOCAL = 'evm-local',
  SOLANA_LOCAL = 'solana-local',
}

// Theme states
export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

// Font sizes
export enum FontSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

// Helper type that allows both standard mailbox types and custom folder names
export type EmailFolder = MailboxType | string;

// Utility functions for working with email folders
export const EmailFolderUtils = {
  /**
   * Check if a folder name is one of the standard mailbox types
   */
  isStandardFolder(folder: string): folder is MailboxType {
    return Object.values(MailboxType).includes(folder as MailboxType);
  },

  /**
   * Get all standard folder names
   */
  getStandardFolders(): MailboxType[] {
    return Object.values(MailboxType);
  },

  /**
   * Check if a folder is a custom folder (not one of the standard ones)
   */
  isCustomFolder(folder: string): boolean {
    return !this.isStandardFolder(folder);
  },

  /**
   * Normalize folder name for display (capitalize first letter)
   */
  displayName(folder: EmailFolder): string {
    return folder.charAt(0).toUpperCase() + folder.slice(1);
  },
};

// Email compose types
export enum EmailComposeType {
  NEW = 'new',
  REPLY = 'reply',
  REPLY_ALL = 'replyAll',
  FORWARD = 'forward',
}

// Mobile navigation views
export enum MobileView {
  EMAIL_ADDRESSES = 'emailAddresses',
  FOLDERS = 'folders',
  EMAILS = 'emails',
  EMAIL_BODY = 'emailBody',
}

// Medium screen navigation
export enum MediumView {
  LEFT = 'left',
  RIGHT = 'right',
}

// Email actions
export enum EmailAction {
  OPEN = 'open',
  REPLY = 'reply',
  FORWARD = 'forward',
  DELETE = 'delete',
  STAR = 'star',
  UNSTAR = 'unstar',
  MARK_READ = 'mark_read',
  MARK_UNREAD = 'mark_unread',
}

// Subscription actions
export enum SubscriptionAction {
  VIEW = 'view',
  PURCHASE = 'purchase',
  CANCEL = 'cancel',
  RESTORE = 'restore',
}

// Network request states
export enum RequestStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success', // STATUS_VALUES.SUCCESS
  ERROR = 'error', // STATUS_VALUES.ERROR
}

// Notification types
export enum NotificationType {
  INFO = 'info',
  SUCCESS = 'success', // STATUS_VALUES.SUCCESS
  WARNING = 'warning',
  ERROR = 'error', // STATUS_VALUES.ERROR
}

// Email address types
export enum EmailAddressType {
  DIRECT = 'direct',
  ENS = 'ens',
  SNS = 'sns',
  CUSTOM = 'custom',
}

// Mailbox sort orders
export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

// Email sort criteria
export enum EmailSortCriteria {
  DATE = 'date',
  SUBJECT = 'subject',
  FROM = 'from',
  SIZE = 'size',
}

// Mailbox types (consolidated from StandardEmailFolder and MailboxType)
export enum MailboxType {
  INBOX = 'inbox',
  SENT = 'sent',
  DRAFTS = 'drafts',
  SPAM = 'spam',
  TRASH = 'trash',
  STARRED = 'starred',
  SNOOZED = 'snoozed',
  ARCHIVE = 'archive',
  CUSTOM = 'custom',
}

// Connection types
export enum ConnectionType {
  UNKNOWN = 'unknown',
  NONE = 'none',
  WIFI = 'wifi',
  CELLULAR_2G = '2g',
  CELLULAR_3G = '3g',
  CELLULAR_4G = '4g',
  CELLULAR_5G = '5g',
  ETHERNET = 'ethernet',
}

// Connection states (consolidated from WalletConnectionState, NetworkStatus, and ConnectionState)
export enum ConnectionState {
  UNKNOWN = 'unknown',
  DISCONNECTED = 'disconnected',
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
  RECONNECTING = 'reconnecting',
  VERIFIED = 'verified',
  LIMITED = 'limited',
  ERROR = 'error',
}

// Platform types
export enum PlatformType {
  WEB = 'web',
  REACT_NATIVE = 'react_native',
  DESKTOP = 'desktop',
}

// Email validation states
export enum EmailValidationState {
  VALID = 'valid',
  INVALID = 'invalid',
  PENDING = 'pending', // STATUS_VALUES.PENDING
  UNKNOWN = 'unknown',
}

// Feature flags
export enum FeatureFlag {
  AI_SEARCH = 'ai_search',
  SMART_COMPOSE = 'smart_compose',
  ADVANCED_FILTERS = 'advanced_filters',
  DARK_MODE = 'dark_mode',
  NOTIFICATIONS = 'notifications',
  ANALYTICS = 'analytics',
}

// Error types
export enum ErrorType {
  NETWORK = 'network',
  AUTH = 'auth',
  VALIDATION = 'validation',
  PERMISSION = 'permission',
  UNKNOWN = 'unknown',
}

// Currency types for subscriptions
export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  CAD = 'CAD',
  AUD = 'AUD',
}
