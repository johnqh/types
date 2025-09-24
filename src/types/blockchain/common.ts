/**
 * @fileoverview Common type definitions for multi-chain MailBox system
 * @description Shared types and interfaces for EVM and Solana implementations
 * @author MailBox Team
 * @version 1.4.2
 */

import { MessageBase, UnifiedError, Result } from '../common';
import type { NetworkConfig } from '../../utils/blockchain/network-config';

// Re-export network types from utils
export type { NetworkConfig };

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
  mailService?: string;
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
  /** Network configuration */
  network: NetworkConfig;
  /** Contract/program addresses */
  addresses: DeploymentAddresses;
  /** Optional wallet private key for signing */
  privateKey?: string;
  /** Optional custom RPC configuration */
  rpcConfig?: RpcConfig;
}

/**
 * RPC configuration options
 * @interface RpcConfig
 */
export interface RpcConfig {
  /** Request timeout in milliseconds */
  timeout?: number;
  /** Maximum retry attempts */
  maxRetries?: number;
  /** Rate limiting options */
  rateLimit?: {
    requestsPerSecond: number;
    maxConcurrent: number;
  };
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
  gasUsed?: bigint;
  /** Transaction status */
  status: TransactionStatus;
  /** Optional logs/events emitted */
  logs?: string[];
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
  priority?: 'standard' | 'priority';
  /** Optional gas price/compute budget override */
  gasConfig?: {
    gasPrice?: bigint;
    gasLimit?: bigint;
  };
  /** Optional confirmation requirements */
  confirmations?: number;
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
  from?: MessageRecipient;
  /** Filter by recipient */
  to?: MessageRecipient;
  /** Filter by message type */
  messageType?: MessageType;
  /** Filter by date range */
  dateRange?: {
    from: Date;
    to: Date;
  };
}

// ============================================================================
// TYPE GUARDS
// ============================================================================

/**
 * Type guard to check if a value is a Solana PublicKey string
 * @param value - Value to check
 * @returns True if value is a valid Solana address
 */
export function isSolanaAddress(value: unknown): value is string {
  return (
    typeof value === 'string' && /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(value)
  );
}

/**
 * Type guard to check if a value is an EVM address
 * @param value - Value to check
 * @returns True if value is EVM address string
 */
export function isEvmAddress(value: unknown): value is string {
  return typeof value === 'string' && /^0x[a-fA-F0-9]{40}$/.test(value);
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

// Re-export network configurations from utils
export { DEFAULT_NETWORKS } from '../../utils/blockchain/network-config';
