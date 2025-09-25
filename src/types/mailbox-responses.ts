/**
 * @fileoverview Mailbox contract response types for multi-chain messaging system
 *
 * This module contains all structured response types for the MailBox protocol
 * including EVM and Solana implementations. These types provide type safety
 * and consistent structure for all client interactions.
 *
 * @version 1.0.0
 * @author MailBox Protocol Team
 */

import {
  Optional,
  BaseResponse,
  PaginatedResponse,
  MessageBase,
  UnifiedError,
} from './common';
import { ChainType } from './business/enums';

// =======================
// Core Response Types
// =======================

/**
 * Base response structure for all blockchain operations
 */
export interface BaseTransactionResponse {
  /** Transaction hash/signature */
  transactionHash: string;
  /** Blockchain type where transaction occurred */
  chainType: ChainType.EVM | ChainType.SOLANA;
  /** Timestamp when transaction was created (Unix timestamp in ms) */
  timestamp: Optional<number>;
  /** Whether the transaction was successful */
  success: boolean;
  /** Error message if transaction failed */
  error: Optional<string>;
}

/**
 * Enhanced transaction response with block information
 */
export interface TransactionReceipt extends BaseTransactionResponse {
  /** Block number (EVM) or slot (Solana) */
  blockNumber: Optional<number>;
  /** Solana slot number */
  slot: Optional<number>;
  /** Gas used for EVM transactions */
  gasUsed: Optional<bigint>;
  /** Transaction confirmation status */
  confirmationStatus: Optional<'processed' | 'confirmed' | 'finalized'>;
}

// =======================
// Message Operations
// =======================

/**
 * Response for message sending operations
 */
export interface MessageSendResponse extends TransactionReceipt {
  /** Message identifier (if available) */
  messageId: Optional<string>;
  /** Fee paid for sending the message */
  fee: bigint | number;
  /** Recipient address */
  recipient: Optional<string>;
  /** Message subject */
  subject: Optional<string>;
  /** Message body */
  body: Optional<string>;
  /** Whether this was a priority message */
  isPriority: boolean;
  /** Revenue share amount claimable by recipient (for priority messages) */
  claimableRevenue: Optional<bigint | number>;
  /** Expiry timestamp for revenue claims */
  claimExpiryTimestamp: Optional<number>;
}

/**
 * Response for pre-prepared message sending
 */
export interface PreparedMessageSendResponse extends TransactionReceipt {
  /** Pre-prepared message identifier */
  mailId: string;
  /** Fee paid for sending */
  fee: bigint | number;
  /** Recipient address */
  recipient: string;
  /** Whether this was a priority prepared message */
  isPriority: boolean;
  /** Revenue share amount claimable by recipient */
  claimableRevenue: Optional<bigint | number>;
}

// =======================
// Revenue & Claims
// =======================

/**
 * Information about claimable revenue shares
 */
export interface ClaimableInfo {
  /** Amount available to claim */
  amount: bigint | number;
  /** Timestamp when claim expires (Unix timestamp in ms) */
  expiryTimestamp: number;
  /** Whether the claim has expired */
  isExpired: boolean;
  /** Whether claim is still valid */
  isClaimable: boolean;
}

/**
 * Response for revenue claim operations
 */
export interface ClaimRevenueResponse extends TransactionReceipt {
  /** Amount claimed */
  claimedAmount: bigint | number;
  /** Remaining claimable amount */
  remainingAmount: bigint | number;
  /** Type of claim */
  claimType: 'recipient' | 'owner' | 'expired';
}

/**
 * Response for checking claimable amounts
 */
export interface ClaimableAmountResponse {
  /** Recipient claimable information */
  recipientClaimable: ClaimableInfo;
  /** Owner claimable amount */
  ownerClaimable: bigint | number;
  /** Last updated timestamp */
  lastUpdated: number;
}

// =======================
// Domain & Delegation
// =======================

/**
 * Response for domain registration operations
 */
export interface DomainRegistrationResponse extends TransactionReceipt {
  /** Registered domain name */
  domain: string;
  /** Domain expiry timestamp */
  expiryTimestamp: number;
  /** Registration fee paid */
  fee: bigint | number;
  /** Whether this was an extension of existing domain */
  isExtension: boolean;
}

/**
 * Response for delegation operations
 */
export interface MailboxDelegationResponse extends TransactionReceipt {
  /** Address that created the delegation */
  delegator: string;
  /** Address that was delegated to */
  delegate: string;
  /** Delegation fee paid */
  fee: bigint | number;
  /** Whether this cleared an existing delegation */
  isClearing: boolean;
}

/**
 * Response for delegation rejection operations
 */
export interface DelegationRejectionResponse extends TransactionReceipt {
  /** Address that rejected the delegation */
  rejector: string;
  /** Address that was trying to delegate */
  delegatingAddress: string;
}

// =======================
// Fee Management
// =======================

/**
 * Current fee information
 */
export interface FeeInfo {
  /** Current send fee (in micro-USDC) */
  sendFee: bigint | number;
  /** Current delegation fee (in micro-USDC) */
  delegationFee: bigint | number;
  /** Current domain registration fee (in micro-USDC) */
  registrationFee: Optional<bigint | number>;
  /** Last updated timestamp */
  lastUpdated: number;
}

/**
 * Response for fee update operations
 */
export interface FeeUpdateResponse extends TransactionReceipt {
  /** Type of fee that was updated */
  feeType: 'send' | 'delegation' | 'registration';
  /** Previous fee amount */
  oldFee: bigint | number;
  /** New fee amount */
  newFee: bigint | number;
}

// =======================
// Contract State
// =======================

/**
 * Contract pause status information
 */
export interface PauseInfo {
  /** Whether the contract is currently paused */
  isPaused: boolean;
  /** Timestamp when pause was activated */
  pausedAt: Optional<number>;
  /** Address that initiated the pause */
  pausedBy: Optional<string>;
}

/**
 * Response for pause/unpause operations
 */
export interface PauseResponse extends TransactionReceipt {
  /** New pause status */
  isPaused: boolean;
  /** Whether this was an emergency pause */
  isEmergency: Optional<boolean>;
}

/**
 * Emergency fund distribution response
 */
export interface EmergencyDistributionResponse extends TransactionReceipt {
  /** Amount distributed */
  distributedAmount: bigint | number;
  /** Recipients of the distribution */
  recipients: string[];
}

// =======================
// Chain-Specific Types
// =======================

/**
 * EVM-specific response additions
 */
export interface EVMTransactionResponse extends TransactionReceipt {
  chainType: ChainType.EVM;
  /** EVM block number */
  blockNumber: number;
  /** Gas used */
  gasUsed: bigint;
  /** Gas price */
  gasPrice: Optional<bigint>;
  /** Contract address for deployment transactions */
  contractAddress: Optional<string>;
}

/**
 * Solana-specific response additions
 */
export interface SolanaTransactionResponse extends TransactionReceipt {
  chainType: ChainType.SOLANA;
  /** Solana slot number */
  slot: number;
  /** Compute units consumed */
  computeUnitsConsumed: Optional<number>;
  /** Transaction fee in lamports */
  transactionFee: Optional<number>;
}

// =======================
// Client Response Types
// =======================

/**
 * Unified client response for cross-chain operations
 */
export interface UnifiedClientResponse<T = unknown> extends BaseResponse<T> {
  /** Chain where operation occurred */
  chainType: ChainType.EVM | ChainType.SOLANA;
  /** Request metadata */
  metadata: Optional<{
    requestId: Optional<string>;
    duration: Optional<number>;
  }>;
}

/**
 * Batch operation response
 */
export interface BatchOperationResponse extends BaseTransactionResponse {
  /** Results for each operation in the batch */
  results: Array<{
    success: boolean;
    data: Optional<unknown>;
    error: Optional<string>;
  }>;
  /** Number of successful operations */
  successCount: number;
  /** Number of failed operations */
  failureCount: number;
}

// =======================
// Query Response Types
// =======================

/**
 * Message history item structure
 */
export interface MessageHistoryItem extends MessageBase {
  messageId: string;
  transactionHash: string;
  timestamp: number;
  isPriority: boolean;
  fee: bigint | number;
}

/**
 * Response for querying message history
 */
export interface MessageHistoryResponse
  extends PaginatedResponse<MessageHistoryItem> {}

/**
 * Response for querying delegation status
 */
export interface DelegationStatusResponse {
  /** Current delegation target (null if no delegation) */
  currentDelegate: Optional<string>;
  /** Timestamp when delegation was set */
  delegatedAt: Optional<number>;
  /** Addresses that have delegated to this address */
  incomingDelegations: string[];
  /** Total delegation fee paid */
  totalDelegationFees: bigint | number;
}

// =======================
// Error Types
// =======================

// Re-export unified error type
export type ContractError = UnifiedError;

// =======================
// Type Guards
// =======================

/**
 * Type guard to check if response is EVM-specific
 */
export function isEVMResponse(
  response: TransactionReceipt
): response is EVMTransactionResponse {
  return response.chainType === ChainType.EVM;
}

/**
 * Type guard to check if response is Solana-specific
 */
export function isSolanaResponse(
  response: TransactionReceipt
): response is SolanaTransactionResponse {
  return response.chainType === ChainType.SOLANA;
}

/**
 * Type guard to check if response contains an error
 */
export function isMailboxErrorResponse(
  response: UnifiedClientResponse
): response is UnifiedClientResponse & {
  error: NonNullable<UnifiedClientResponse['error']>;
} {
  return !response.success && response.error !== undefined;
}
