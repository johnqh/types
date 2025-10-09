/**
 * Type Guards for Mail Box Indexer API Responses
 * @description Runtime type checking functions for all indexer API response types
 * @package @johnqh/types
 */

import type {
  IndexerAddressValidationResponse,
  IndexerEmailAccountsResponse,
  IndexerRewardsResponse,
  IndexerDelegatedToResponse,
  IndexerDelegatedFromResponse,
  IndexerNonceResponse,
  IndexerEntitlementResponse,
  IndexerSignInMessageResponse,
  IndexerPointsResponse,
  IndexerLeaderboardResponse,
  IndexerSiteStatsResponse,
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
): response is { success: true; data: unknown } {
  return !!(
    response &&
    typeof response === 'object' &&
    'success' in response &&
    response.success === true &&
    'data' in response
  );
}

// Specific response type guards
export function isAddressValidationResponse(
  response: unknown
): response is IndexerAddressValidationResponse {
  return !!(
    response &&
    typeof response === 'object' &&
    'success' in response &&
    'data' in response &&
    response.data &&
    typeof response.data === 'object' &&
    ('name' in response.data || 'wallet' in response.data)
  );
}

export function isEmailAccountsResponse(
  response: unknown
): response is IndexerEmailAccountsResponse {
  return !!(
    response &&
    typeof response === 'object' &&
    'success' in response &&
    'data' in response &&
    response.data &&
    typeof response.data === 'object' &&
    'accounts' in response.data &&
    Array.isArray(response.data.accounts)
  );
}

export function isRewardsResponse(
  response: unknown
): response is IndexerRewardsResponse {
  return !!(
    response &&
    typeof response === 'object' &&
    'success' in response &&
    'data' in response &&
    response.data &&
    typeof response.data === 'object' &&
    'rewards' in response.data &&
    'records' in response.data &&
    'points' in response.data
  );
}

export function isDelegatedToResponse(
  response: unknown
): response is IndexerDelegatedToResponse {
  return !!(
    response &&
    typeof response === 'object' &&
    'success' in response &&
    'data' in response &&
    response.data &&
    typeof response.data === 'object' &&
    'walletAddress' in response.data &&
    'chainType' in response.data
  );
}

export function isDelegatedFromResponse(
  response: unknown
): response is IndexerDelegatedFromResponse {
  return !!(
    response &&
    typeof response === 'object' &&
    'success' in response &&
    'data' in response &&
    response.data &&
    typeof response.data === 'object' &&
    'from' in response.data &&
    Array.isArray(response.data.from)
  );
}

export function isNonceResponse(response: unknown): response is IndexerNonceResponse {
  return !!(
    response &&
    typeof response === 'object' &&
    'success' in response &&
    'data' in response &&
    response.data &&
    typeof response.data === 'object' &&
    'nonce' in response.data
  );
}

export function isEntitlementResponse(
  response: unknown
): response is IndexerEntitlementResponse {
  return !!(
    response &&
    typeof response === 'object' &&
    'success' in response &&
    'data' in response &&
    response.data &&
    typeof response.data === 'object' &&
    'entitlement' in response.data &&
    'verified' in response.data
  );
}

export function isSignInMessageResponse(
  response: unknown
): response is IndexerSignInMessageResponse {
  return !!(
    response &&
    typeof response === 'object' &&
    'success' in response &&
    'data' in response &&
    response.data &&
    typeof response.data === 'object' &&
    'message' in response.data &&
    'walletAddress' in response.data
  );
}

export function isPointsResponse(
  response: unknown
): response is IndexerPointsResponse {
  return !!(
    response &&
    typeof response === 'object' &&
    'success' in response &&
    'data' in response &&
    response.data &&
    typeof response.data === 'object' &&
    'pointsEarned' in response.data &&
    'walletAddress' in response.data
  );
}

// Points API response type guards
export function isLeaderboardResponse(
  response: unknown
): response is IndexerLeaderboardResponse {
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
): response is IndexerSiteStatsResponse {
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

