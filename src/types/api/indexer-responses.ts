/**
 * API Response Type Definitions for Mail Box Indexer
 * @description Comprehensive type definitions for all indexer API endpoints
 * @package @johnqh/types
 */

import { Optional, WalletData } from '../common';
import { ApiResponse } from '../infrastructure/api';

// Note: Using ApiResponse<T> from infrastructure/api for consistency

// Email address aggregation types
export interface WalletAccount extends WalletData {
  names: string[];
}
export interface EmailAccountsResult {
  accounts: WalletAccount[];
}

export type EmailAccountsResponse = ApiResponse<EmailAccountsResult>;

// Rewards history record
export interface RewardData {
  walletAddress: string;
  action: string;
  points: number;
  earningTime: string;
}

export interface RewardHistoryData {
  rewards: RewardData[];
  records: number;
  points: number;
}

export type RewardsResponse = ApiResponse<RewardHistoryData>;

// Address validation types
export interface AddressValidationData extends WalletData {
  name?: Optional<string>;
}

export type AddressValidationResponse = ApiResponse<AddressValidationData>;

// Delegation types
export interface DelegateData extends WalletData {
  chainId?: Optional<number>;
  txHash?: Optional<string>;
}

export type DelegatedToResponse = ApiResponse<DelegateData>;

export interface DelegatedFromData {
  from: DelegateData[];
}

export type DelegatedFromResponse = ApiResponse<DelegatedFromData>;

// Nonce types
export interface NonceData {
  nonce: string;
}

export type NonceResponse = ApiResponse<NonceData>;

// Entitlement types
export interface EntitlementInfo {
  type: 'nameservice';
  hasEntitlement: boolean;
  isActive: boolean;
  productIdentifier?: Optional<string>;
  expiresDate?: Optional<string>;
  store?: Optional<string>;
}

export interface EntitlementData extends WalletData {
  entitlement: EntitlementInfo;
  message: string;
  verified: boolean;
}

export type EntitlementResponse = ApiResponse<EntitlementData>;

// Message generation types
export interface SignInMessageData extends WalletData {
  message: string;
  chainId?: Optional<number>;
}

export type SignInMessageResponse = ApiResponse<SignInMessageData>;

// Points types - consolidated user points data
export interface PointsData extends WalletData {
  pointsEarned: string;
  lastActivityDate?: Optional<string>;
  createdAt?: Optional<string>;
  updatedAt?: Optional<string>;
}

export type PointsResponse = ApiResponse<PointsData>;

// Points API response types
export interface LeaderboardData {
  leaderboard: PointsData[];
}

export type LeaderboardResponse = ApiResponse<LeaderboardData>;

export interface SiteStatsData {
  totalPoints: string;
  totalUsers: number;
  lastUpdated?: Optional<string>;
}

export type SiteStatsResponse = ApiResponse<SiteStatsData>;

// Referral code types
export interface ReferralCodeData {
  /** Wallet address (EVM 0x format or Solana Base58) */
  walletAddress: string;
  referralCode: string;
  createdAt: string;
}

export type ReferralCodeResponse = ApiResponse<ReferralCodeData>;

export interface ReferralConsumptionData {
  /** Wallet address (EVM 0x format or Solana Base58) */
  walletAddress: string;
  /** Can be "" if no referral code is used */
  referralCode: string;
  createdAt: string;
}

export interface ReferralStatsData {
  total: number;
  consumptions: ReferralConsumptionData[];
}

export type ReferralStatsResponse = ApiResponse<ReferralStatsData>;

// Error response type for API endpoints
export interface ErrorResponse extends ApiResponse<never> {
  success: false;
  error: string;
}

// Extended union type to include all response types
export type IndexerApiResponse =
  | AddressValidationResponse
  | EmailAccountsResponse
  | DelegatedToResponse
  | DelegatedFromResponse
  | NonceResponse
  | EntitlementResponse
  | PointsResponse
  | SignInMessageResponse
  | LeaderboardResponse
  | SiteStatsResponse
  | ReferralCodeResponse
  | ReferralStatsResponse
  | ErrorResponse;
