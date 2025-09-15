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
  addressType: ChainType | 'unknown';
  normalizedAddress?: string;
  formats?: AddressFormats;
  error?: string;
}

// Email addresses types
export interface DomainEmail {
  email: string;
  type: 'ens' | 'sns';
  domain: string;
  verified?: boolean;
}

export interface WalletEmailAddresses {
  walletAddress: string;
  addressType: ChainType;
  isPrimary: boolean;
  primaryEmail: string; // Always walletAddress@0xmail.box
  domainEmails: DomainEmail[]; // ENS/SNS emails for this wallet
  totalEmails: number;
}

export interface EmailAddressesResponse extends BaseResponse {
  requestedWallet: string;
  addressType: ChainType;
  walletEmails: WalletEmailAddresses[]; // First is requested wallet, rest are delegated
  totalWallets: number;
  totalEmails: number;
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
export interface MessageInfo {
  domain: string;
  uri: string;
  chainId: number;
  date?: string;
}

export interface Messages {
  deterministic?: string;
  simple: string;
  solana?: string;
  info: MessageInfo;
}

export interface MessageInstructions {
  evm: string;
  solana: string;
}

export interface VerificationEndpoint {
  endpoint: string;
  method: string;
  body: {
    walletAddress: string;
    signature: string;
    message: string;
  };
  note: string;
}

export interface RegenerationInfo {
  note: string;
  endpoint: string;
}

export interface MessageGenerationResponse extends BaseResponse {
  walletAddress: string;
  addressType: ChainType;
  chainId: number;
  domain: string;
  uri: string;
  messages: Messages;
  recommended: 'deterministic' | 'simple' | 'solana';
  instructions: MessageInstructions;
  verification: VerificationEndpoint;
  regeneration: RegenerationInfo;
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
  | EmailAddressesResponse
  | DelegationResponse
  | DelegatorsResponse
  | SignatureVerificationResponse
  | NonceResponse
  | EntitlementResponse
  | PointsResponse
  | MessageGenerationResponse
  | LeaderboardResponse
  | SiteStatsResponse
  | SolanaWebhookResponse
  | SolanaSetupResponse
  | SolanaStatusResponse
  | SolanaTestTransactionResponse
  | ErrorResponse;
