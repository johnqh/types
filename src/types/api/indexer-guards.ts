/**
 * Type Guards for Mail Box Indexer API Responses
 * @description Runtime type checking functions for all indexer API response types
 * @package @johnqh/types
 */

import type {
  PointsResponse,
  ValidationResponse,
  EmailAccountsResponse,
  DelegationResponse,
  DelegatorsResponse,
  SignatureVerificationResponse,
  NonceResponse,
  EntitlementResponse,
  SimpleMessageResponse,
  LeaderboardResponse,
  SiteStatsResponse,
  SolanaWebhookResponse,
  SolanaSetupResponse,
  SolanaStatusResponse,
  SolanaTestTransactionResponse,
} from './indexer-responses';

// Basic type guards for indexer responses
export function isIndexerErrorResponse(
  response: unknown
): response is { success: false; error: string } {
  return !!(
    response &&
    typeof response === 'object' &&
    'error' in response &&
    'success' in response &&
    !(response as { success: boolean }).success
  );
}

export function isIndexerSuccessResponse(
  response: unknown
): response is PointsResponse {
  return !!(
    response &&
    typeof response === 'object' &&
    'success' in response &&
    response.success === true
  );
}

// Specific response type guards
export function isValidationResponse(
  response: unknown
): response is ValidationResponse {
  return !!(
    response &&
    typeof response === 'object' &&
    'isValid' in response &&
    'addressType' in response
  );
}

export function isEmailAccountsResponse(
  response: unknown
): response is EmailAccountsResponse {
  return !!(
    response &&
    typeof response === 'object' &&
    'requestedWallet' in response &&
    'walletAccounts' in response &&
    'totalWallets' in response
  );
}

export function isDelegationResponse(
  response: unknown
): response is DelegationResponse {
  return !!(
    response &&
    typeof response === 'object' &&
    'walletAddress' in response &&
    'isActive' in response &&
    'verified' in response
  );
}

export function isDelegatorsResponse(
  response: unknown
): response is DelegatorsResponse {
  return !!(
    response &&
    typeof response === 'object' &&
    'delegatedFrom' in response &&
    'delegationDetails' in response
  );
}

export function isSignatureVerificationResponse(
  response: unknown
): response is SignatureVerificationResponse {
  return !!(
    response &&
    typeof response === 'object' &&
    'isValid' in response &&
    'message' in response &&
    !('addressType' in response && 'nonce' in response)
  );
}

export function isNonceResponse(response: unknown): response is NonceResponse {
  return !!(
    response &&
    typeof response === 'object' &&
    'nonce' in response &&
    'walletAddress' in response
  );
}

export function isEntitlementResponse(
  response: unknown
): response is EntitlementResponse {
  return !!(
    response &&
    typeof response === 'object' &&
    'entitlement' in response &&
    'verified' in response
  );
}

export function isPointsResponse(
  response: unknown
): response is PointsResponse {
  return !!(
    response &&
    typeof response === 'object' &&
    'data' in response &&
    response.data &&
    typeof response.data === 'object' &&
    'pointsEarned' in response.data
  );
}

export function isSimpleMessageResponse(
  response: unknown
): response is SimpleMessageResponse {
  return !!(
    response &&
    typeof response === 'object' &&
    'message' in response &&
    'walletAddress' in response &&
    'chainType' in response
  );
}

// Points API response type guards
export function isLeaderboardResponse(
  response: unknown
): response is LeaderboardResponse {
  return !!(
    response &&
    typeof response === 'object' &&
    'success' in response &&
    'data' in response &&
    response.data &&
    typeof response.data === 'object' &&
    'leaderboard' in response.data
  );
}

export function isSiteStatsResponse(
  response: unknown
): response is SiteStatsResponse {
  return !!(
    response &&
    typeof response === 'object' &&
    'success' in response &&
    'data' in response &&
    response.data &&
    typeof response.data === 'object' &&
    'totalPoints' in response.data
  );
}

// Solana API response type guards
export function isSolanaWebhookResponse(
  response: unknown
): response is SolanaWebhookResponse {
  return !!(
    response &&
    typeof response === 'object' &&
    'success' in response &&
    'processed' in response &&
    'total' in response
  );
}

export function isSolanaSetupResponse(
  response: unknown
): response is SolanaSetupResponse {
  return !!(
    response &&
    typeof response === 'object' &&
    'success' in response &&
    'results' in response
  );
}

export function isSolanaStatusResponse(
  response: unknown
): response is SolanaStatusResponse {
  return !!(
    response &&
    typeof response === 'object' &&
    'solanaIndexers' in response &&
    'totalIndexers' in response &&
    'configured' in response
  );
}

export function isSolanaTestTransactionResponse(
  response: unknown
): response is SolanaTestTransactionResponse {
  return !!(
    response &&
    typeof response === 'object' &&
    'success' in response &&
    'message' in response &&
    !('data' in response)
  );
}
