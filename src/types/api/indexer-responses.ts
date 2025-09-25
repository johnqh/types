/**
 * API Response Type Definitions for Mail Box Indexer
 * @description Comprehensive type definitions for all indexer API endpoints
 * @package @johnqh/types
 */

import { ChainType } from '../business/enums';
import { Optional, WalletData } from '../common';
import { ApiResponse } from '../infrastructure/api';

// Note: Using ApiResponse<T> from infrastructure/api for consistency

// Address validation types
export interface AddressFormats {
  normalized: string;
  checksum: Optional<string>;
  original: string;
}

export interface ValidationData {
  isValid: boolean;
  address: string;
  addressType: Optional<ChainType>;
  normalizedAddress: Optional<string>;
  formats: Optional<AddressFormats>;
}

export type ValidationResponse = ApiResponse<ValidationData>;

// Email addresses types
export interface DomainAccount {
  account: string;
  type: 'ens' | 'sns';
  domain: string;
  verified: Optional<boolean>;
}

export interface WalletEmailAccounts extends WalletData {
  isPrimary: boolean;
  primaryAccount: string; // Always walletAddress@0xmail.box
  domainAccounts: DomainAccount[]; // ENS/SNS emails for this wallet
  totalAccounts: number;
}

export interface EmailAccountsData extends WalletData {
  requestedWallet: string;
  walletAccounts: WalletEmailAccounts[]; // First is requested wallet, rest are delegated
  totalWallets: number;
  totalAccounts: number;
  verified: boolean;
}

export type EmailAccountsResponse = ApiResponse<EmailAccountsData>;

// Delegation types
export interface DelegationInfo extends WalletData {
  delegatedAddress: Optional<string>;
  delegatedChainType: Optional<ChainType>;
  chainId: Optional<number>;
  chainName: Optional<string>;
  transactionHash: Optional<string>;
  blockNumber: Optional<string>;
  timestamp: Optional<string>;
  isActive: boolean;
}

export interface DelegationData extends WalletData {
  delegatedAddress: Optional<string>;
  delegatedChainType: Optional<ChainType>;
  chainId: Optional<number>;
  chainName: Optional<string>;
  transactionHash: Optional<string>;
  blockNumber: Optional<string>;
  isActive: boolean;
  verified: boolean;
}

export type DelegationResponse = ApiResponse<DelegationData>;

export interface DelegatorInfo {
  delegatedFrom: string;
  delegatedFromChainType: ChainType;
  chainId: number;
  chainName: string;
  transactionHash: string;
  blockNumber: string;
  timestamp: string;
  isActive: boolean;
}

export interface DelegatorsData extends WalletData {
  delegatedFrom: DelegatorInfo[];
  delegationDetails: {
    totalDelegators: number;
    activeChains: number[];
    chainDetails: Array<{
      chainId: number;
      chainName: string;
      delegatorCount: number;
    }>;
  };
  totalDelegators: number;
}

export type DelegatorsResponse = ApiResponse<DelegatorsData>;

// Signature verification types
export interface SignatureVerificationData extends WalletData {
  isValid: boolean;
  message: string;
}

export type SignatureVerificationResponse =
  ApiResponse<SignatureVerificationData>;

// Nonce types
export interface NonceData extends WalletData {
  nonce: string;
  createdAt: Optional<string>;
  updatedAt: Optional<string>;
  message: string;
}

export type NonceResponse = ApiResponse<NonceData>;

// Entitlement types
export interface EntitlementInfo {
  type: 'nameservice';
  hasEntitlement: boolean;
  isActive: boolean;
  productIdentifier: Optional<string>;
  expiresDate: Optional<string>;
  store: Optional<string>;
}

export interface EntitlementData extends WalletData {
  entitlement: EntitlementInfo;
  message: string;
  verified: boolean;
}

export type EntitlementResponse = ApiResponse<EntitlementData>;

// Points types - consolidated user points data
export interface UserPointsData {
  walletAddress: string;
  pointsEarned: string;
  lastActivityDate: Optional<string>;
  createdAt: Optional<string>;
  updatedAt: Optional<string>;
}

// Legacy alias for backward compatibility
export type PointsData = UserPointsData;

export interface PointsResponseData extends WalletData {
  data: UserPointsData;
  verified: boolean;
}

export type PointsResponse = ApiResponse<PointsResponseData>;

// Message generation types
export interface SimpleMessageData extends WalletData {
  message: string;
  chainId: Optional<number>;
}

export type SimpleMessageResponse = ApiResponse<SimpleMessageData>;

// Points API response types
export type LeaderboardUser = UserPointsData;

export interface LeaderboardData {
  leaderboard: LeaderboardUser[];
  count: number;
}

export type LeaderboardResponse = ApiResponse<LeaderboardData>;

export interface SiteStatsData {
  totalPoints: string;
  totalUsers: number;
  lastUpdated: Optional<string>;
  createdAt: Optional<string>;
  message: Optional<string>;
}

export type SiteStatsResponse = ApiResponse<SiteStatsData>;

// Solana API response types
export interface SolanaWebhookData {
  processed: number;
  total: number;
}

export type SolanaWebhookResponse = ApiResponse<SolanaWebhookData>;

export interface SolanaSetupResult {
  chainId: string;
  status: 'success' | 'error';
  error: Optional<string>;
}

export interface SolanaSetupData {
  results: SolanaSetupResult[];
}

export type SolanaSetupResponse = ApiResponse<SolanaSetupData>;

export interface SolanaIndexerStatus {
  chainId: number;
  initialized: boolean;
  networkName: string;
}

export interface SolanaStatusData {
  solanaIndexers: SolanaIndexerStatus[];
  totalIndexers: number;
  configured: boolean;
}

export type SolanaStatusResponse = ApiResponse<SolanaStatusData>;

export interface SolanaTestTransactionData {
  message: string;
}

export type SolanaTestTransactionResponse =
  ApiResponse<SolanaTestTransactionData>;

// Error response type for API endpoints
export interface ErrorResponse extends ApiResponse<never> {
  success: false;
  error: string;
}

// Helius webhook transaction structure for Solana
export interface HeliusTransaction {
  signature: string;
  slot: number;
  blockTime: number;
  transaction: {
    signatures: string[];
    message: {
      accountKeys: string[];
      instructions: unknown[];
    };
  };
  meta: {
    logMessages: string[];
    fee: number;
    preBalances: number[];
    postBalances: number[];
  };
  events: Optional<{
    [programId: string]: unknown[];
  }>;
}

// Extended union type to include all response types
export type IndexerApiResponse =
  | ValidationResponse
  | EmailAccountsResponse
  | DelegationResponse
  | DelegatorsResponse
  | SignatureVerificationResponse
  | NonceResponse
  | EntitlementResponse
  | PointsResponse
  | SimpleMessageResponse
  | LeaderboardResponse
  | SiteStatsResponse
  | SolanaWebhookResponse
  | SolanaSetupResponse
  | SolanaStatusResponse
  | SolanaTestTransactionResponse;
