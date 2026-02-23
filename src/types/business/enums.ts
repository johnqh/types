/**
 * Platform-agnostic enums for discrete states.
 * These replace string literals throughout the application.
 *
 * @since 1.0.0
 */

/**
 * Authentication status of a wallet connection.
 * @since 1.0.0
 */
export enum AuthStatus {
  /** Wallet is connected but not yet verified via signature */
  CONNECTED = 'connected',
  /** Wallet is not connected */
  DISCONNECTED = 'disconnected',
  /** Wallet is connected and ownership is verified via signature */
  VERIFIED = 'verified',
}

/**
 * Blockchain family classification.
 * @since 1.0.0
 */
export enum ChainType {
  /** Ethereum Virtual Machine compatible chains */
  EVM = 'evm',
  /** Solana blockchain */
  SOLANA = 'solana',
}

/**
 * Supported blockchain networks across EVM and Solana ecosystems.
 * Includes mainnets, testnets, and local development chains.
 * @since 1.0.0
 */
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

  // HyperEVM
  HYPEREVM_MAINNET = 'hyperevm-mainnet',
  HYPEREVM_TESTNET = 'hyperevm-testnet',

  // Sonic (gaming-focused chain)
  SONIC_MAINNET = 'sonic-mainnet',
  SONIC_TESTNET = 'sonic-testnet',
  SONIC_BLAZE = 'sonic-blaze',

  // Unichain (Uniswap L2)
  UNICHAIN_MAINNET = 'unichain-mainnet',
  UNICHAIN_SEPOLIA = 'unichain-sepolia',

  // World Chain (Worldcoin L2)
  WORLD_MAINNET = 'world-mainnet',

  // XDC Network
  XDC_MAINNET = 'xdc-mainnet',

  // Ink
  INK_TESTNET = 'ink-testnet',

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

/**
 * UI theme preference.
 * @since 1.0.0
 */
export enum Theme {
  /** Light color scheme */
  LIGHT = 'light',
  /** Dark color scheme */
  DARK = 'dark',
  /** Follow OS/system preference */
  SYSTEM = 'system',
}

/**
 * UI font size preference.
 * @since 1.2.0
 */
export enum FontSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

/**
 * Email composition mode.
 * @since 1.0.0
 */
export enum EmailComposeType {
  NEW = 'new',
  REPLY = 'reply',
  REPLY_ALL = 'replyAll',
  FORWARD = 'forward',
}

/**
 * Mobile navigation view states.
 * @since 1.0.0
 */
export enum MobileView {
  EMAIL_ADDRESSES = 'emailAddresses',
  FOLDERS = 'folders',
  EMAILS = 'emails',
  EMAIL_BODY = 'emailBody',
}

/**
 * Medium-screen (tablet) navigation pane selection.
 * @since 1.0.0
 */
export enum MediumView {
  LEFT = 'left',
  RIGHT = 'right',
}

/**
 * Actions that can be performed on an email message.
 * @since 1.0.0
 */
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

/**
 * Subscription lifecycle actions.
 * @since 1.3.0
 */
export enum SubscriptionAction {
  VIEW = 'view',
  PURCHASE = 'purchase',
  CANCEL = 'cancel',
  RESTORE = 'restore',
}

/**
 * Network request lifecycle states.
 * @since 1.0.0
 */
export enum RequestStatus {
  /** No request in progress */
  IDLE = 'idle',
  /** Request is in flight */
  LOADING = 'loading',
  /** Request completed successfully */
  SUCCESS = 'success', // STATUS_VALUES.SUCCESS
  /** Request failed */
  ERROR = 'error', // STATUS_VALUES.ERROR
}

/**
 * UI notification severity levels.
 * @since 1.0.0
 */
export enum NotificationType {
  INFO = 'info',
  SUCCESS = 'success', // STATUS_VALUES.SUCCESS
  WARNING = 'warning',
  ERROR = 'error', // STATUS_VALUES.ERROR
}

/**
 * Info-level UI feedback types.
 * @since 1.0.0
 */
export enum InfoType {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}

/**
 * Email address resolution types.
 * @since 1.0.0
 */
export enum EmailAddressType {
  DIRECT = 'direct',
  ENS = 'ens',
  SNS = 'sns',
  CUSTOM = 'custom',
}

/**
 * Sort order direction.
 * @since 1.0.0
 */
export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

/**
 * Fields by which emails can be sorted.
 * @since 1.0.0
 */
export enum EmailSortCriteria {
  DATE = 'date',
  SUBJECT = 'subject',
  FROM = 'from',
  SIZE = 'size',
}

/**
 * Network connection type (WiFi, cellular, etc.).
 * @since 1.1.0
 */
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

/**
 * Wallet/network connection lifecycle states.
 * Consolidated from WalletConnectionState, NetworkStatus, and ConnectionState.
 * @since 1.0.0
 */
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

/**
 * Runtime platform identification.
 * @since 1.0.0
 */
export enum PlatformType {
  WEB = 'web',
  REACT_NATIVE = 'react_native',
  DESKTOP = 'desktop',
}

/**
 * Email address validation status.
 * @since 1.0.0
 */
export enum EmailValidationState {
  VALID = 'valid',
  INVALID = 'invalid',
  PENDING = 'pending', // STATUS_VALUES.PENDING
  UNKNOWN = 'unknown',
}

/**
 * Feature flags for gating experimental or premium features.
 * @since 1.2.0
 */
export enum FeatureFlag {
  AI_SEARCH = 'ai_search',
  SMART_COMPOSE = 'smart_compose',
  ADVANCED_FILTERS = 'advanced_filters',
  DARK_MODE = 'dark_mode',
  NOTIFICATIONS = 'notifications',
  ANALYTICS = 'analytics',
}

/**
 * High-level error category classification.
 * @since 1.0.0
 */
export enum ErrorType {
  NETWORK = 'network',
  AUTH = 'auth',
  VALIDATION = 'validation',
  PERMISSION = 'permission',
  UNKNOWN = 'unknown',
}

/**
 * Fiat currency codes for subscription pricing.
 * @since 1.3.0
 */
export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  CAD = 'CAD',
  AUD = 'AUD',
}
