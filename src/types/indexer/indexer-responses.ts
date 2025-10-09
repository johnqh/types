/**
 * API Response Type Definitions for Mail Box Indexer
 * @description Comprehensive type definitions for all indexer API endpoints
 * @package @johnqh/types
 */

import { Optional, WalletData } from '../common';
import { ApiResponse } from '../infrastructure/api';

// Note: Using ApiResponse<T> from infrastructure/api for consistency

// Name service acccount

export interface IndexerNameServiceAccount {
  name: string;
  entitled: boolean;
}

// Email address aggregation types
export interface IndexerWalletAccount extends WalletData {
  names: IndexerNameServiceAccount[];
}
export interface IndexerEmailAccountsResult {
  accounts: IndexerWalletAccount[];
}

export type IndexerEmailAccountsResponse = ApiResponse<IndexerEmailAccountsResult>;

// Rewards history record
export interface IndexerRewardData {
  walletAddress: string;
  action: string;
  points: number;
  earningTime: string;
}

export interface IndexerRewardHistoryData {
  rewards: IndexerRewardData[];
  records: number;
  points: number;
}

export type IndexerRewardsResponse = ApiResponse<IndexerRewardHistoryData>;

// Address validation types
export interface IndexerAddressValidationData extends WalletData {
  name?: Optional<string>;
}

export type IndexerAddressValidationResponse = ApiResponse<IndexerAddressValidationData>;

// Delegation types
export interface IndexerDelegateData extends WalletData {
  chainId?: Optional<number>;
  txHash?: Optional<string>;
}

export type IndexerDelegatedToResponse = ApiResponse<IndexerDelegateData>;

export interface IndexerDelegatedFromData {
  from: IndexerDelegateData[];
}

export type IndexerDelegatedFromResponse = ApiResponse<IndexerDelegatedFromData>;

// Nonce types
export interface IndexerNonceData {
  nonce: string;
}

export type IndexerNonceResponse = ApiResponse<IndexerNonceData>;

// Entitlement types
export interface IndexerEntitlementInfo {
  type: 'nameservice';
  hasEntitlement: boolean;
  isActive: boolean;
  productIdentifier?: Optional<string>;
  expiresDate?: Optional<string>;
  store?: Optional<string>;
}

export interface IndexerEntitlementData extends WalletData {
  entitlement: IndexerEntitlementInfo;
  message: string;
  verified: boolean;
}

export type IndexerEntitlementResponse = ApiResponse<IndexerEntitlementData>;

// Message generation types
export interface IndexerSignInMessageData extends WalletData {
  message: string;
  chainId?: Optional<number>;
}

export type IndexerSignInMessageResponse = ApiResponse<IndexerSignInMessageData>;

// Points types - consolidated user points data
export interface IndexerPointsData extends WalletData {
  pointsEarned: string;
  lastActivityDate?: Optional<string>;
  createdAt?: Optional<string>;
  updatedAt?: Optional<string>;
}

export type IndexerPointsResponse = ApiResponse<IndexerPointsData>;

// Points API response types
export interface IndexerLeaderboardData {
  leaderboard: IndexerPointsData[];
}

export type IndexerLeaderboardResponse = ApiResponse<IndexerLeaderboardData>;

export interface IndexerSiteStatsData {
  totalPoints: string;
  totalUsers: number;
  lastUpdated?: Optional<string>;
}

export type IndexerSiteStatsResponse = ApiResponse<IndexerSiteStatsData>;

// Referral code types
export interface IndexerReferralCodeData {
  /** Wallet address (EVM 0x format or Solana Base58) */
  walletAddress: string;
  referralCode: string;
  createdAt: string;
}

export type IndexerReferralCodeResponse = ApiResponse<IndexerReferralCodeData>;

export interface IndexerReferralConsumptionData {
  /** Wallet address (EVM 0x format or Solana Base58) */
  walletAddress: string;
  /** Can be "" if no referral code is used */
  referralCode: string;
  createdAt: string;
}

export interface IndexerReferralStatsData {
  total: number;
  consumptions: IndexerReferralConsumptionData[];
}

export type IndexerReferralStatsResponse = ApiResponse<IndexerReferralStatsData>;

// Authentication status types
export interface IndexerAuthenticationStatusData {
  authenticated: boolean;
  datetime?: Optional<string>;
}

export type IndexerAuthenticationStatusResponse = ApiResponse<IndexerAuthenticationStatusData>;

// Block status types
export interface IndexerChainBlockInfo {
  chain: string;
  chainId: number;
  currentBlock: string | null;
  indexedBlock: string | null;
  rpcUrl: string | null;
  status: 'active' | 'error';
  error?: Optional<string>;
}

export interface IndexerBlockStatusData {
  chains: IndexerChainBlockInfo[];
  totalChains: number;
  activeChains: number;
  timestamp: string;
}

export type IndexerBlockStatusResponse = ApiResponse<IndexerBlockStatusData>;

// Name service resolution types
export interface IndexerNameServiceData {
  names: string[];
}

export type IndexerNameServiceResponse = ApiResponse<IndexerNameServiceData>;

export interface IndexerNameResolutionData extends WalletData {}

export type IndexerNameResolutionResponse = ApiResponse<IndexerNameResolutionData>;

// Error response type for API endpoints
export interface IndexerErrorResponse extends ApiResponse<never> {
  success: false;
  error: string;
}

// Extended union type to include all response types
export type IndexerApiResponse =
  | IndexerAddressValidationResponse
  | IndexerEmailAccountsResponse
  | IndexerDelegatedToResponse
  | IndexerDelegatedFromResponse
  | IndexerNonceResponse
  | IndexerEntitlementResponse
  | IndexerPointsResponse
  | IndexerSignInMessageResponse
  | IndexerLeaderboardResponse
  | IndexerSiteStatsResponse
  | IndexerReferralCodeResponse
  | IndexerReferralStatsResponse
  | IndexerAuthenticationStatusResponse
  | IndexerBlockStatusResponse
  | IndexerNameServiceResponse
  | IndexerNameResolutionResponse
  | IndexerErrorResponse;
