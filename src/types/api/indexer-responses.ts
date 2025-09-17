/**
 * API Response Type Definitions for Mail Box Indexer
 * @description Comprehensive type definitions for all indexer API endpoints
 * @package @johnqh/types
 */

import { ChainType } from '../business/enums';

// Base response types
export interface BaseResponse {
  timestamp: string;
}

export interface ErrorResponse extends BaseResponse {
  error: string;
  statusCode?: number;
}

export interface SuccessResponse extends BaseResponse {
  success: boolean;
}

// Address validation types
export interface AddressFormats {
  normalized: string;
  checksum?: string;
  original: string;
}

export interface ValidationResponse extends BaseResponse {
  isValid: boolean;
  address: string;
  addressType?: ChainType;
  normalizedAddress?: string;
  formats?: AddressFormats;
  error?: string;
}

// Email addresses types
export interface DomainAccount {
  account: string;
  type: 'ens' | 'sns';
  domain: string;
  verified?: boolean;
}

export interface WalletEmailAccounts {
  walletAddress: string;
  addressType: ChainType;
  isPrimary: boolean;
  primaryAccount: string; // Always walletAddress@0xmail.box
  domainAccounts: DomainAccount[]; // ENS/SNS emails for this wallet
  totalAccounts: number;
}

export interface EmailAccountsResponse extends BaseResponse {
  requestedWallet: string;
  addressType: ChainType;
  walletAccounts: WalletEmailAccounts[]; // First is requested wallet, rest are delegated
  totalWallets: number;
  totalAccounts: number;
  verified: boolean;
}

// Delegation types
export interface DelegationInfo {
  walletAddress: string;
  addressType: ChainType;
  delegatedAddress?: string;
  delegatedAddressType?: ChainType;
  chainId?: number;
  chainName?: string;
  transactionHash?: string;
  blockNumber?: string;
  timestamp?: string;
  isActive: boolean;
}

export interface DelegationResponse extends BaseResponse {
  walletAddress: string;
  addressType: ChainType;
  delegatedAddress?: string;
  delegatedAddressType?: ChainType;
  chainId?: number;
  chainName?: string;
  transactionHash?: string;
  blockNumber?: string;
  isActive: boolean;
  verified: boolean;
}

export interface DelegatorInfo {
  delegatedFrom: string;
  delegatedFromType: ChainType;
  chainId: number;
  chainName: string;
  transactionHash: string;
  blockNumber: string;
  timestamp: string;
  isActive: boolean;
}

export interface DelegatorsResponse extends BaseResponse {
  walletAddress: string;
  addressType: ChainType;
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

// Signature verification types
export interface SignatureVerificationResponse extends BaseResponse {
  walletAddress: string;
  addressType: ChainType;
  isValid: boolean;
  message: string;
}

// Nonce types
export interface NonceResponse extends BaseResponse {
  walletAddress: string;
  addressType: ChainType;
  nonce: string;
  createdAt?: string;
  updatedAt?: string;
  message: string;
}

// Entitlement types
export interface EntitlementInfo {
  type: 'nameservice';
  hasEntitlement: boolean;
  isActive: boolean;
  productIdentifier?: string;
  expiresDate?: string;
  store?: string;
}

export interface EntitlementResponse extends BaseResponse {
  walletAddress: string;
  addressType: ChainType;
  entitlement: EntitlementInfo;
  message: string;
  error?: string;
  verified: boolean;
}

// Points types
export interface PointsData {
  walletAddress: string;
  pointsEarned: string;
  lastActivityDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PointsResponse extends SuccessResponse {
  walletAddress: string;
  addressType: ChainType;
  data: PointsData;
  verified: boolean;
}

// Message generation types
export interface SimpleMessageResponse extends BaseResponse {
  message: string;
  walletAddress: string;
  chainType: ChainType;
  chainId?: number;
}

// Points API response types
export interface LeaderboardUser {
  walletAddress: string;
  pointsEarned: string;
  lastActivityDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LeaderboardResponse extends SuccessResponse {
  data: {
    leaderboard: LeaderboardUser[];
    count: number;
  };
}

export interface SiteStatsData {
  totalPoints: string;
  totalUsers: number;
  lastUpdated?: string;
  createdAt?: string;
  message?: string;
}

export interface SiteStatsResponse extends SuccessResponse {
  data: SiteStatsData;
}

// Solana API response types
export interface SolanaWebhookResponse extends SuccessResponse {
  processed: number;
  total: number;
}

export interface SolanaSetupResult {
  chainId: string;
  status: 'success' | 'error';
  error?: string;
}

export interface SolanaSetupResponse extends SuccessResponse {
  results: SolanaSetupResult[];
}

export interface SolanaIndexerStatus {
  chainId: number;
  initialized: boolean;
  networkName: string;
}

export interface SolanaStatusResponse {
  solanaIndexers: SolanaIndexerStatus[];
  totalIndexers: number;
  configured: boolean;
}

export interface SolanaTestTransactionResponse extends SuccessResponse {
  message: string;
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
  | SolanaTestTransactionResponse
  | ErrorResponse;
