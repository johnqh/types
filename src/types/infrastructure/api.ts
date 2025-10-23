/**
 * @fileoverview Core API Type Definitions
 * @description Centralized type definitions for API requests/responses and data structures
 * @version 2.0.0
 *
 * This file provides comprehensive type safety for:
 * - API request/response interfaces
 * - Multi-chain data structures
 * - Database entity interfaces
 */

import { Optional, BaseResponse, PaginationInfo } from '../common';

// Re-export ChainType from business enums
export { ChainType } from '../business/enums';

// Re-export unified response type
export type ApiResponse<T = unknown> = BaseResponse<T>;

// ========================================
// API REQUEST/RESPONSE TYPES
// ========================================

/**
 * Signature-protected API request base interface
 * All signature-protected endpoints should extend this
 */
export interface SignatureProtectedRequest {
  /** Wallet address (EVM 0x format or Solana Base58) */
  walletAddress: string;
  /** Cryptographic signature proving wallet ownership */
  signature: string;
}

/**
 * GraphQL query result wrapper
 * @template T The entity type being queried
 */
export interface GraphQLResult<T> {
  items: T[];
  pageInfo?: Optional<PaginationInfo>;
}

// ========================================
// MULTI-CHAIN DATA TYPES
// ========================================

/**
 * Multi-chain entity ID components
 * Used for creating unique identifiers across all chains
 */
export interface MultiChainId {
  chainId: number;
  txHash: string;
  logIndex: number;
}

/**
 * User-specific multi-chain identifier
 */
export interface UserChainId {
  chainId: number;
  address: string;
}

/**
 * Chain-specific metadata for all entities
 */
export interface ChainMetadata {
  chainId: number;
  blockNumber: bigint;
  blockHash: string;
  txHash: string;
  logIndex: number;
  timestamp: bigint;
}

// ========================================
// DATABASE ENTITY INTERFACES
// ========================================

/**
 * Mail message entity - represents individual mail messages
 */
export interface MailEntity extends ChainMetadata {
  id: string; // Format: "{chainId}-{txHash}-{logIndex}"
  from: string; // Sender address (normalized lowercase)
  to: string; // Recipient address (normalized lowercase)
  subject: string; // Email subject line
  body?: Optional<string>; // Optional email body
  contractAddress: string; // Mailer contract address
  feesPaid: bigint; // Total fees paid in wei/lamports
  priority: boolean; // Whether this is priority mail with revenue sharing
}

/**
 * Prepared mail entity - represents pre-prepared mail messages
 */
export interface PreparedMailEntity extends ChainMetadata {
  id: string; // Format: "{chainId}-{txHash}-{logIndex}"
  mailHash: string; // Hash of the prepared mail content
  from: string; // Sender address (normalized lowercase)
  contractAddress: string; // Mailer contract address
  feesPaid: bigint; // Total fees paid
}

/**
 * Delegation entity - represents wallet delegations per chain
 */
export interface DelegationEntity extends ChainMetadata {
  id: string; // Format: "{chainId}-{delegatorAddress}"
  delegator: string; // Delegating wallet address (normalized lowercase)
  delegateTo?: Optional<string>; // Delegated to address (null means cleared)
  contractAddress: string; // MailService contract address
}

/**
 * Per-chain statistics
 */
export interface StatisticsEntity {
  id: string; // Format: "{chainId}-global"
  chainId: number;
  totalMails: bigint;
  totalPreparedMails: bigint;
  totalUsers: bigint;
  totalDelegations: bigint;
  totalVolume: bigint; // Total fees processed
  lastUpdated: bigint;
}

/**
 * Per-user, per-chain statistics
 */
export interface UserStatisticsEntity {
  id: string; // Format: "{chainId}-{address}"
  chainId: number;
  address: string; // User address (normalized lowercase)
  mailsSent: bigint;
  mailsReceived: bigint;
  preparedMailsSent: bigint;
  totalFeesPaid: bigint;
  totalFeesReceived: bigint; // From priority mail revenue sharing
  lastActivity: bigint;
}

/**
 * Cross-chain global statistics
 */
export interface ChainStatisticsEntity {
  id: 'global'; // Always "global"
  totalChains: number;
  totalMails: bigint;
  totalPreparedMails: bigint;
  totalUsers: bigint;
  totalDelegations: bigint;
  totalVolume: bigint;
  lastUpdated: bigint;
}

/**
 * Event log entity - complete audit trail for debugging
 */
export interface EventLogEntity extends ChainMetadata {
  id: string; // Format: "{chainId}-{txHash}-{logIndex}"
  eventName: string; // Name of the processed event
  contractAddress: string; // Contract that emitted the event
  eventData: string; // JSON-serialized event data
}

// ========================================
// UTILITY TYPES
// ========================================

/**
 * Supported network chain IDs
 */
export type SupportedChainId =
  | 1 // Ethereum Mainnet
  | 137 // Polygon
  | 42161 // Arbitrum
  | 10 // Optimism
  | 8453 // Base
  | 56 // BSC
  | 43114 // Avalanche
  | 250 // Fantom
  | 100 // Gnosis
  | 42220 // Celo
  | 31337 // Hardhat Local
  // Testnets
  | 11155111 // Sepolia
  | 80001 // Polygon Mumbai
  | 421614 // Arbitrum Sepolia
  | 11155420 // Optimism Sepolia
  | 84532 // Base Sepolia
  // Solana (negative chain IDs)
  | -101 // Solana Mainnet
  | -102 // Solana Devnet
  | -103 // Solana Testnet
  | -104; // Solana Localnet

/**
 * Contract types supported by the indexer
 */
export enum ContractType {
  Mailer = 'Mailer',
  MailService = 'MailService',
}

/**
 * Event names processed by the indexer
 */
export enum ProcessedEventName {
  MailSent = 'MailSent',
  PreparedMailSent = 'PreparedMailSent',
  DelegationSet = 'DelegationSet',
  DelegationCleared = 'DelegationCleared',
  DomainRegistered = 'DomainRegistered',
  DomainExtended = 'DomainExtended',
  DomainReleased = 'DomainReleased',
  FeeUpdated = 'FeeUpdated',
  SharesRecorded = 'SharesRecorded',
  RecipientClaimed = 'RecipientClaimed',
  OwnerClaimed = 'OwnerClaimed',
  ExpiredSharesClaimed = 'ExpiredSharesClaimed',
}
