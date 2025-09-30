// Export all response types as named exports
export type {
  // Email account types
  WalletAccount,
  EmailAccountsResult,
  EmailAccountsResponse,

  // Rewards types
  RewardData,
  RewardHistoryData,
  RewardsResponse,

  // Address validation types
  AddressValidationData,
  AddressValidationResponse,

  // Delegation types
  DelegateData,
  DelegatedToResponse,
  DelegatedFromData,
  DelegatedFromResponse,

  // Nonce types
  NonceData,
  NonceResponse,

  // Entitlement types
  EntitlementInfo,
  EntitlementData,
  EntitlementResponse,

  // Sign-in message types
  SignInMessageData,
  SignInMessageResponse,

  // Points types
  PointsData,
  PointsResponse,

  // Leaderboard types
  LeaderboardData,
  LeaderboardResponse,

  // Site stats types
  SiteStatsData,
  SiteStatsResponse,

  // Referral code types
  ReferralCodeData,
  ReferralCodeResponse,
  ReferralConsumptionData,
  ReferralStatsData,
  ReferralStatsResponse,

  // Error response types
  ErrorResponse,

  // Generic response types
  IndexerApiResponse,
} from './indexer-responses';

// Export type guards
export {
  isAddressValidationResponse,
  isEmailAccountsResponse,
  isRewardsResponse,
  isDelegatedToResponse,
  isDelegatedFromResponse,
  isNonceResponse,
  isEntitlementResponse,
  isSignInMessageResponse,
  isPointsResponse,
  isLeaderboardResponse,
  isSiteStatsResponse,
  isIndexerErrorResponse,
  isIndexerSuccessResponse,
} from './indexer-guards';
