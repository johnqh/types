/**
 * Type Guards for Mail Box Indexer API Responses
 * @description Runtime type checking functions for all indexer API response types
 * @package @johnqh/types
 */

import type {
  ErrorResponse,
  PointsResponse,
  ValidationResponse,
  EmailAddressesResponse,
  DelegationResponse,
  DelegatorsResponse,
  SignatureVerificationResponse,
  NonceResponse,
  EntitlementResponse,
  MessageGenerationResponse,
  LeaderboardResponse,
  SiteStatsResponse,
  SolanaWebhookResponse,
  SolanaSetupResponse,
  SolanaStatusResponse,
  SolanaTestTransactionResponse
} from './indexer-responses';

// Basic type guards for indexer responses
export function isIndexerErrorResponse(response: any): response is ErrorResponse {
  return 'error' in response;
}

export function isIndexerSuccessResponse(response: any): response is PointsResponse {
  return 'success' in response && response.success === true;
}

// Specific response type guards
export function isValidationResponse(response: any): response is ValidationResponse {
  return 'isValid' in response && 'addressType' in response;
}

export function isEmailAddressesResponse(response: any): response is EmailAddressesResponse {
  return 'requestedWallet' in response && 'walletEmails' in response && 'totalWallets' in response;
}

export function isDelegationResponse(response: any): response is DelegationResponse {
  return 'walletAddress' in response && 'isActive' in response && 'verified' in response;
}

export function isDelegatorsResponse(response: any): response is DelegatorsResponse {
  return 'delegatedFrom' in response && 'delegationDetails' in response;
}

export function isSignatureVerificationResponse(response: any): response is SignatureVerificationResponse {
  return 'isValid' in response && 'message' in response && !('addressType' in response && 'nonce' in response);
}

export function isNonceResponse(response: any): response is NonceResponse {
  return 'nonce' in response && 'walletAddress' in response;
}

export function isEntitlementResponse(response: any): response is EntitlementResponse {
  return 'entitlement' in response && 'verified' in response;
}

export function isPointsResponse(response: any): response is PointsResponse {
  return 'data' in response && 'pointsEarned' in (response as any).data;
}

export function isMessageGenerationResponse(response: any): response is MessageGenerationResponse {
  return 'messages' in response && 'instructions' in response && 'verification' in response;
}

// Points API response type guards
export function isLeaderboardResponse(response: any): response is LeaderboardResponse {
  return 'success' in response && 'data' in response && 'leaderboard' in response.data;
}

export function isSiteStatsResponse(response: any): response is SiteStatsResponse {
  return 'success' in response && 'data' in response && 'totalPoints' in response.data;
}

// Solana API response type guards
export function isSolanaWebhookResponse(response: any): response is SolanaWebhookResponse {
  return 'success' in response && 'processed' in response && 'total' in response;
}

export function isSolanaSetupResponse(response: any): response is SolanaSetupResponse {
  return 'success' in response && 'results' in response;
}

export function isSolanaStatusResponse(response: any): response is SolanaStatusResponse {
  return 'solanaIndexers' in response && 'totalIndexers' in response && 'configured' in response;
}

export function isSolanaTestTransactionResponse(response: any): response is SolanaTestTransactionResponse {
  return 'success' in response && 'message' in response && !('data' in response);
}