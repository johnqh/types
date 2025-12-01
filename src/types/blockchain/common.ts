/**
 * @fileoverview Common type definitions for multi-chain MailBox system
 * @description Shared types and interfaces for EVM and Solana implementations
 * @author MailBox Team
 * @version 1.4.2
 */

import { MessageBase, UnifiedError, Result, Optional } from '../common';
import { Chain } from '../business/enums';

// ============================================================================
// NETWORK CONFIGURATION TYPES
// ============================================================================

/**
 * Chain configuration with API keys
 * All other chain information (RPC URLs, chain ID, USDC addresses, etc.)
 * can be derived using RpcHelpers
 */
export interface ChainConfig {
  /** Chain identifier */
  chain: Chain;
  /** Alchemy API key for RPC access */
  alchemyApiKey: string;
  /** Etherscan Multichain API key for block explorer access */
  etherscanApiKey: string;
}

// ============================================================================
// CORE MESSAGING TYPES
// ============================================================================

/**
 * Represents a message recipient - can be EVM address or Solana PublicKey string
 * @example
 * // EVM
 * const evmRecipient: MessageRecipient = "0x742d35Cc6634C0532925a3b8D2C36B7f1234567";
 *
 * // Solana
 * const solanaRecipient: MessageRecipient = "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM";
 */
export type MessageRecipient = string;

/**
 * Core message structure used across all chains
 * @interface Message
 */
export interface Message extends Omit<MessageBase, 'from' | 'to'> {
  /** Message sender address/pubkey */
  from: MessageRecipient;
  /** Message recipient address/pubkey */
  to: MessageRecipient;
  /** Block timestamp when sent */
  timestamp: number;
  /** Transaction hash/signature */
  txHash: string;
  /** Message type classification */
  messageType: MessageType;
}

/**
 * Pre-prepared message using external storage
 * @interface PreparedMessage
 */
export interface PreparedMessage {
  /** Message sender address/pubkey */
  from: MessageRecipient;
  /** Message recipient address/pubkey */
  to: MessageRecipient;
  /** External message identifier (IPFS hash, UUID, etc.) */
  mailId: string;
  /** Block timestamp when sent */
  timestamp: number;
  /** Transaction hash/signature */
  txHash: string;
  /** Message type classification */
  messageType: MessageType;
}

/**
 * Message type enumeration
 * @enum MessageType
 */
export enum MessageType {
  /** Standard message with 10% fee */
  STANDARD = 'standard',
  /** Priority message with full fee and 90% revenue share */
  PRIORITY = 'priority',
  /** Pre-prepared standard message */
  PREPARED_STANDARD = 'prepared_standard',
  /** Pre-prepared priority message */
  PREPARED_PRIORITY = 'prepared_priority',
}

// ============================================================================
// FEE AND REVENUE TYPES
// ============================================================================

/**
 * Fee structure for messages
 * @interface FeeStructure
 */
export interface FeeStructure {
  /** Base send fee (0.1 USDC with 6 decimals) */
  sendFee: bigint;
  /** Fee for standard messages (10% of sendFee) */
  standardFee: bigint;
  /** Fee for priority messages (100% of sendFee) */
  priorityFee: bigint;
  /** Owner share percentage (10%) */
  ownerShare: number;
  /** Sender revenue share percentage (90%) */
  senderShare: number;
}

/**
 * Claimable revenue information
 * @interface ClaimableRevenue
 */
export interface ClaimableRevenue {
  /** Amount claimable in USDC */
  amount: bigint;
  /** Timestamp when claim was created */
  timestamp: number;
  /** Expiration timestamp (60 days from creation) */
  expiresAt: number;
  /** Whether the claim has expired */
  isExpired: boolean;
}

// ============================================================================
// CHAIN-SPECIFIC TYPES
// ============================================================================

/**
 * Contract/Program addresses for deployment
 * @interface DeploymentAddresses
 */
export interface DeploymentAddresses {
  /** Mailer contract/program address */
  mailer: string;
  /** MailService contract/program address (if applicable) */
  mailService?: Optional<string>;
  /** USDC token mint/contract address */
  usdcToken: string;
}

// ============================================================================
// CLIENT CONFIGURATION TYPES
// ============================================================================

/**
 * Configuration for unified client
 * @interface ClientConfig
 */
export interface ClientConfig {
  /** RPC endpoint URL */
  rpcUrl: string;
  /** Chain ID */
  chainId: number;
  /** Contract/program addresses */
  addresses: DeploymentAddresses;
  /** Optional wallet private key for signing */
  privateKey?: Optional<string>;
  /** Optional custom RPC configuration */
  rpcConfig?: Optional<RpcConfig>;
}

/**
 * RPC configuration options
 * @interface RpcConfig
 */
export interface RpcConfig {
  /** Request timeout in milliseconds */
  timeout?: Optional<number>;
  /** Maximum retry attempts */
  maxRetries?: Optional<number>;
  /** Rate limiting options */
  rateLimit?: Optional<{
    requestsPerSecond: number;
    maxConcurrent: number;
  }>;
}

// ============================================================================
// TRANSACTION TYPES
// ============================================================================

/**
 * Transaction result for successful operations
 * @interface TransactionResult
 */
export interface TransactionResult {
  /** Transaction hash/signature */
  txHash: string;
  /** Block number/slot */
  block: number;
  /** Gas/compute units used */
  gasUsed?: Optional<bigint>;
  /** Transaction status */
  status: TransactionStatus;
  /** Optional logs/events emitted */
  logs?: Optional<string[]>;
}

/**
 * Transaction status enumeration
 * @enum TransactionStatus
 */
export enum TransactionStatus {
  /** Transaction successful */
  SUCCESS = 'success', // STATUS_VALUES.SUCCESS
  /** Transaction failed */
  FAILED = 'failed', // STATUS_VALUES.FAILED
  /** Transaction pending confirmation */
  PENDING = 'pending', // STATUS_VALUES.PENDING
}

// Re-export unified error types from common
export type { UnifiedError, Result };

// Legacy alias for backward compatibility
export type OperationError = UnifiedError;

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Options for sending messages
 * @interface SendMessageOptions
 */
export interface SendMessageOptions {
  /** Message priority level */
  priority?: Optional<'standard' | 'priority'>;
  /** Optional gas price/compute budget override */
  gasConfig?: Optional<{
    gasPrice?: Optional<bigint>;
    gasLimit?: Optional<bigint>;
  }>;
  /** Optional confirmation requirements */
  confirmations?: Optional<number>;
}

// Re-export unified pagination types from common
export type {
  PaginationOptions,
  PaginationInfo,
  PaginatedResponse,
} from '../common';

/**
 * Query filters for messages
 * @interface MessageFilter
 */
export interface MessageFilter {
  /** Filter by sender */
  from?: Optional<MessageRecipient>;
  /** Filter by recipient */
  to?: Optional<MessageRecipient>;
  /** Filter by message type */
  messageType?: Optional<MessageType>;
  /** Filter by date range */
  dateRange?: Optional<{
    from: Date;
    to: Date;
  }>;
}

// ============================================================================
// TYPE GUARDS
// ============================================================================

/**
 * Type guard to check if a value is a Solana PublicKey string
 * @param value - Value to check
 * @returns True if value is a valid Solana address
 */
export function isSolanaAddress(address: string): boolean {
  try {
    // Solana addresses are base58 encoded and typically 32-44 characters
    if (address.length < 32 || address.length > 44) {
      return false;
    }

    // Base58 alphabet: 123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz
    // Note: excludes 0, O, I, l to avoid ambiguity
    const base58Regex = /^[1-9A-HJ-NP-Za-km-z]+$/;
    if (!base58Regex.test(address)) {
      return false;
    }

    // Additional validation: try to decode with bs58 if available
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const bs58 = require('bs58');
      const decoded = bs58.decode(address);
      return decoded.length === 32; // Solana addresses decode to 32 bytes
    } catch {
      // If bs58 is not available, rely on regex validation
      return true;
    }
  } catch {
    return false;
  }
}

/**
 * Type guard to check if a value is an EVM address
 * @param value - Value to check
 * @returns True if value is EVM address string
 */
export function isEvmAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Type guard to check if recipient is for Solana
 * @param recipient - Message recipient
 * @returns True if recipient is Solana address
 */
export function isSolanaRecipient(recipient: MessageRecipient): boolean {
  return isSolanaAddress(recipient);
}

/**
 * Type guard to check if recipient is for EVM
 * @param recipient - Message recipient
 * @returns True if recipient is EVM address
 */
export function isEvmRecipient(recipient: MessageRecipient): boolean {
  return isEvmAddress(recipient);
}

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Protocol constants used across implementations
 */
export const PROTOCOL_CONSTANTS = {
  /** Base send fee: 0.1 USDC (100,000 with 6 decimals) */
  SEND_FEE: 100_000n,

  /** Claim period: 60 days in seconds */
  CLAIM_PERIOD: 60 * 24 * 60 * 60,

  /** Revenue share percentages */
  REVENUE_SHARES: {
    SENDER: 90,
    OWNER: 10,
  },

  /** USDC token decimals */
  USDC_DECIMALS: 6,

  /** Maximum message lengths */
  MAX_LENGTHS: {
    SUBJECT: 200,
    BODY: 2000,
    MAIL_ID: 100,
  },
} as const;
