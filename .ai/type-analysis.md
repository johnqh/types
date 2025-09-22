# Type Analysis Report

Generated on: 2025-09-22T16:47:03.387Z

## Summary

- **Interfaces**: 113
- **Type Aliases**: 22
- **Enums**: 32
- **Functions**: 126

## Interfaces

### api

- `BaseResponse` - `types/api/indexer-responses.ts`
- `ErrorResponse` - `types/api/indexer-responses.ts`
- `SuccessResponse` - `types/api/indexer-responses.ts`
- `AddressFormats` - `types/api/indexer-responses.ts`
- `ValidationResponse` - `types/api/indexer-responses.ts`
- `DomainAccount` - `types/api/indexer-responses.ts`
- `WalletEmailAccounts` - `types/api/indexer-responses.ts`
- `EmailAccountsResponse` - `types/api/indexer-responses.ts`
- `DelegationInfo` - `types/api/indexer-responses.ts`
- `DelegationResponse` - `types/api/indexer-responses.ts`
- `DelegatorInfo` - `types/api/indexer-responses.ts`
- `DelegatorsResponse` - `types/api/indexer-responses.ts`
- `SignatureVerificationResponse` - `types/api/indexer-responses.ts`
- `NonceResponse` - `types/api/indexer-responses.ts`
- `EntitlementInfo` - `types/api/indexer-responses.ts`
- `EntitlementResponse` - `types/api/indexer-responses.ts`
- `PointsData` - `types/api/indexer-responses.ts`
- `PointsResponse` - `types/api/indexer-responses.ts`
- `SimpleMessageResponse` - `types/api/indexer-responses.ts`
- `LeaderboardUser` - `types/api/indexer-responses.ts`
- `LeaderboardResponse` - `types/api/indexer-responses.ts`
- `SiteStatsData` - `types/api/indexer-responses.ts`
- `SiteStatsResponse` - `types/api/indexer-responses.ts`
- `SolanaWebhookResponse` - `types/api/indexer-responses.ts`
- `SolanaSetupResult` - `types/api/indexer-responses.ts`
- `SolanaSetupResponse` - `types/api/indexer-responses.ts`
- `SolanaIndexerStatus` - `types/api/indexer-responses.ts`
- `SolanaStatusResponse` - `types/api/indexer-responses.ts`
- `SolanaTestTransactionResponse` - `types/api/indexer-responses.ts`

### blockchain

- `Message` - `types/blockchain/common.ts`
- `PreparedMessage` - `types/blockchain/common.ts`
- `FeeStructure` - `types/blockchain/common.ts`
- `ClaimableRevenue` - `types/blockchain/common.ts`
- `NetworkConfig` - `types/blockchain/common.ts`
- `DeploymentAddresses` - `types/blockchain/common.ts`
- `ClientConfig` - `types/blockchain/common.ts`
- `RpcConfig` - `types/blockchain/common.ts`
- `TransactionResult` - `types/blockchain/common.ts`
- `OperationError` - `types/blockchain/common.ts`
- `SendMessageOptions` - `types/blockchain/common.ts`
- `PaginationOptions` - `types/blockchain/common.ts`
- `MessageFilter` - `types/blockchain/common.ts`

### business

- `Email` - `types/business/email.ts`
- `Folder` - `types/business/email.ts`
- `EmailAddress` - `types/business/email.ts`
- `User` - `types/business/email.ts`
- `WalletUserData` - `types/business/email.ts`
- `MailBox` - `types/business/mailbox.ts`
- `DefaultFolder` - `types/business/mailbox.ts`
- `WalletStatus` - `types/business/wallet-status.ts`

### config

- `FirebaseConfig` - `types/config/app-config.ts`
- `AppConfig` - `types/config/app-config.ts`
- `EnvironmentVariables` - `types/config/environment.ts`
- `EnvProvider` - `types/config/environment.ts`

### infrastructure

- `AnalyticsEventProperties` - `types/infrastructure/analytics.ts`
- `AnalyticsService` - `types/infrastructure/analytics.ts`
- `AnalyticsConfig` - `types/infrastructure/analytics.ts`
- `EmailAnalyticsService` - `types/infrastructure/analytics.ts`
- `ApiResponse` - `types/infrastructure/api.ts`
- `SignatureProtectedRequest` - `types/infrastructure/api.ts`
- `GraphQLResult` - `types/infrastructure/api.ts`
- `MultiChainId` - `types/infrastructure/api.ts`
- `UserChainId` - `types/infrastructure/api.ts`
- `ChainMetadata` - `types/infrastructure/api.ts`
- `MailEntity` - `types/infrastructure/api.ts`
- `PreparedMailEntity` - `types/infrastructure/api.ts`
- `DelegationEntity` - `types/infrastructure/api.ts`
- `StatisticsEntity` - `types/infrastructure/api.ts`
- `UserStatisticsEntity` - `types/infrastructure/api.ts`
- `ChainStatisticsEntity` - `types/infrastructure/api.ts`
- `EventLogEntity` - `types/infrastructure/api.ts`
- `UINavigationState` - `types/infrastructure/navigation.ts`
- `UINavigationOptions` - `types/infrastructure/navigation.ts`
- `UINavigationService` - `types/infrastructure/navigation.ts`
- `UINavigationHook` - `types/infrastructure/navigation.ts`
- `UILocationHook` - `types/infrastructure/navigation.ts`
- `UINavigationConfig` - `types/infrastructure/navigation.ts`

### root

- `BaseSessionFields` - `wildduck-requests.ts`
- `PreAuthRequest` - `wildduck-requests.ts`
- `AuthenticateRequest` - `wildduck-requests.ts`
- `AuthLogRequest` - `wildduck-requests.ts`
- `CreateUserRequest` - `wildduck-requests.ts`
- `UpdateUserRequest` - `wildduck-requests.ts`
- `LogoutUserRequest` - `wildduck-requests.ts`
- `RecalculateQuotaRequest` - `wildduck-requests.ts`
- `CreateMailboxRequest` - `wildduck-requests.ts`
- `UpdateMailboxRequest` - `wildduck-requests.ts`
- `AddressWithName` - `wildduck-requests.ts`
- `EmailHeader` - `wildduck-requests.ts`
- `EmailAttachment` - `wildduck-requests.ts`
- `MessageReference` - `wildduck-requests.ts`
- `BimiConfig` - `wildduck-requests.ts`
- `SubmitMessageRequest` - `wildduck-requests.ts`
- `IndexerSubmitRequest` - `wildduck-requests.ts`
- `SubmitStoredMessageRequest` - `wildduck-requests.ts`
- `SearchUpdateMessagesRequest` - `wildduck-requests.ts`
- `CreateUserAddressRequest` - `wildduck-requests.ts`
- `UpdateUserAddressRequest` - `wildduck-requests.ts`
- `AutoreplyConfig` - `wildduck-requests.ts`
- `CreateForwardedAddressRequest` - `wildduck-requests.ts`
- `UpdateForwardedAddressRequest` - `wildduck-requests.ts`
- `RenameDomainRequest` - `wildduck-requests.ts`
- `FilterQuery` - `wildduck-requests.ts`
- `FilterAction` - `wildduck-requests.ts`
- `CreateFilterRequest` - `wildduck-requests.ts`
- `UpdateFilterRequest` - `wildduck-requests.ts`
- `PaginationRequest` - `wildduck-requests.ts`
- `GetMailboxesRequest` - `wildduck-requests.ts`
- `GetMessagesRequest` - `wildduck-requests.ts`
- `GetAddressesRequest` - `wildduck-requests.ts`
- `GetUsersRequest` - `wildduck-requests.ts`

### validation

- `AddressValidationResult` - `utils/validation/address-validator.ts`
- `BasicValidationResult` - `utils/validation/address-validator.ts`

## Enums

### blockchain

- `MessageType` - `types/blockchain/common.ts`
- `TransactionStatus` - `types/blockchain/common.ts`
- `AddressType` - `utils/blockchain/address.ts`

### business

- `AuthStatus` - `types/business/enums.ts`
- `ChainType` - `types/business/enums.ts`
- `Theme` - `types/business/enums.ts`
- `FontSize` - `types/business/enums.ts`
- `StandardEmailFolder` - `types/business/enums.ts`
- `EmailComposeType` - `types/business/enums.ts`
- `MobileView` - `types/business/enums.ts`
- `MediumView` - `types/business/enums.ts`
- `AppAnalyticsEvent` - `types/business/enums.ts`
- `EmailAction` - `types/business/enums.ts`
- `SubscriptionAction` - `types/business/enums.ts`
- `RequestStatus` - `types/business/enums.ts`
- `NotificationType` - `types/business/enums.ts`
- `EmailAddressType` - `types/business/enums.ts`
- `SortOrder` - `types/business/enums.ts`
- `EmailSortCriteria` - `types/business/enums.ts`
- `MailboxType` - `types/business/enums.ts`
- `NetworkStatus` - `types/business/enums.ts`
- `ConnectionType` - `types/business/enums.ts`
- `ConnectionState` - `types/business/enums.ts`
- `PlatformType` - `types/business/enums.ts`
- `EmailValidationState` - `types/business/enums.ts`
- `FeatureFlag` - `types/business/enums.ts`
- `ErrorType` - `types/business/enums.ts`
- `Currency` - `types/business/enums.ts`
- `WalletConnectionState` - `types/business/wallet-status.ts`

### config

- `StorageType` - `types/config/environment.ts`

### infrastructure

- `AnalyticsEvent` - `types/infrastructure/analytics.ts`
- `WalletType` - `types/infrastructure/wallet.ts`

## Utility Functions

### api

- `isIndexerErrorResponse` - `types/api/indexer-guards.ts`
- `isIndexerSuccessResponse` - `types/api/indexer-guards.ts`
- `isValidationResponse` - `types/api/indexer-guards.ts`
- `isEmailAccountsResponse` - `types/api/indexer-guards.ts`
- `isDelegationResponse` - `types/api/indexer-guards.ts`
- `isDelegatorsResponse` - `types/api/indexer-guards.ts`
- `isSignatureVerificationResponse` - `types/api/indexer-guards.ts`
- `isNonceResponse` - `types/api/indexer-guards.ts`
- `isEntitlementResponse` - `types/api/indexer-guards.ts`
- `isPointsResponse` - `types/api/indexer-guards.ts`
- `isSimpleMessageResponse` - `types/api/indexer-guards.ts`
- `isLeaderboardResponse` - `types/api/indexer-guards.ts`
- `isSiteStatsResponse` - `types/api/indexer-guards.ts`
- `isSolanaWebhookResponse` - `types/api/indexer-guards.ts`
- `isSolanaSetupResponse` - `types/api/indexer-guards.ts`
- `isSolanaStatusResponse` - `types/api/indexer-guards.ts`
- `isSolanaTestTransactionResponse` - `types/api/indexer-guards.ts`

### auth

- `generateAuthMessage` - `utils/auth/auth.ts`
- `isAuthExpired` - `utils/auth/auth.ts`
- `getAuthStatusText` - `utils/auth/auth.ts`
- `canAccessProtectedFeatures` - `utils/auth/auth.ts`
- `isAuthStatusConnected` - `utils/auth/auth.ts`
- `generateNonce` - `utils/auth/auth.ts`
- `extractNonceFromMessage` - `utils/auth/auth.ts`
- `isValidNonce` - `utils/auth/auth.ts`

### blockchain

- `isSolanaAddress` - `types/blockchain/common.ts`
- `isEvmAddress` - `types/blockchain/common.ts`
- `isSolanaRecipient` - `types/blockchain/common.ts`
- `isEvmRecipient` - `types/blockchain/common.ts`
- `PROTOCOL_CONSTANTS` - `types/blockchain/common.ts`
- `DEFAULT_NETWORKS` - `types/blockchain/common.ts`
- `validateDomain` - `types/blockchain/validation.ts`
- `validateMessage` - `types/blockchain/validation.ts`
- `validateAddress` - `types/blockchain/validation.ts`
- `validateAmount` - `types/blockchain/validation.ts`
- `isEVMAddress` - `utils/blockchain/address.ts`
- `isSolanaAddressString` - `utils/blockchain/address.ts`
- `isENSName` - `utils/blockchain/address.ts`
- `isSNSName` - `utils/blockchain/address.ts`
- `getAddressType` - `utils/blockchain/address.ts`
- `isValidWalletAddress` - `utils/blockchain/address.ts`
- `isValidSignature` - `utils/blockchain/address.ts`
- `parseEmailAddress` - `utils/blockchain/address.ts`
- `formatWalletAddress` - `utils/blockchain/address.ts`
- `getChainDisplayName` - `utils/blockchain/address.ts`
- `createMultiChainId` - `utils/blockchain/event-helpers.ts`
- `createUserMultiChainId` - `utils/blockchain/event-helpers.ts`
- `createChainStatsId` - `utils/blockchain/event-helpers.ts`
- `createDelegationId` - `utils/blockchain/event-helpers.ts`
- `normalizeAddress` - `utils/blockchain/event-helpers.ts`
- `formatBigInt` - `utils/blockchain/event-helpers.ts`
- `isZeroAddress` - `utils/blockchain/event-helpers.ts`
- `isTestNet` - `utils/blockchain/event-helpers.ts`
- `validateEventArgs` - `utils/blockchain/event-helpers.ts`
- `NETWORK_IDENTIFIERS` - `utils/blockchain/network-config.ts`
- `EVM_CHAIN_IDS` - `utils/blockchain/network-config.ts`
- `SOLANA_CHAIN_IDS` - `utils/blockchain/network-config.ts`
- `EVM_USDC_ADDRESSES` - `utils/blockchain/network-config.ts`
- `SOLANA_USDC_MINTS` - `utils/blockchain/network-config.ts`
- `DEFAULT_RPC_ENDPOINTS` - `utils/blockchain/network-config.ts`
- `isEVMNetwork` - `utils/blockchain/network-config.ts`
- `isSolanaNetwork` - `utils/blockchain/network-config.ts`
- `getEVMChainId` - `utils/blockchain/network-config.ts`
- `getEVMUSDCAddress` - `utils/blockchain/network-config.ts`
- `getSolanaUSDCMint` - `utils/blockchain/network-config.ts`
- `getDefaultRPCEndpoint` - `utils/blockchain/network-config.ts`
- `isSolanaChainId` - `utils/blockchain/network-config.ts`
- `isEVMChainId` - `utils/blockchain/network-config.ts`
- `getAllSolanaChainIds` - `utils/blockchain/network-config.ts`
- `getAllEVMChainIds` - `utils/blockchain/network-config.ts`
- `getAllChainIds` - `utils/blockchain/network-config.ts`

### business

- `EmailFolderUtils` - `types/business/enums.ts`
- `isWalletConnected` - `types/business/wallet-status.ts`
- `isWalletVerified` - `types/business/wallet-status.ts`
- `getWalletConnectionState` - `types/business/wallet-status.ts`

### formatting

- `USDC_DECIMALS` - `utils/formatting/currency.ts`
- `CLAIM_PERIOD_DAYS` - `utils/formatting/currency.ts`
- `formatUSDC` - `utils/formatting/currency.ts`
- `parseUSDC` - `utils/formatting/currency.ts`
- `formatEmailDate` - `utils/formatting/date.ts`
- `formatTimestamp` - `utils/formatting/date.ts`
- `formatRelativeTime` - `utils/formatting/date.ts`
- `parseDate` - `utils/formatting/date.ts`
- `isDateInRange` - `utils/formatting/date.ts`
- `addDays` - `utils/formatting/date.ts`
- `addHours` - `utils/formatting/date.ts`
- `truncate` - `utils/formatting/string.ts`
- `capitalize` - `utils/formatting/string.ts`
- `toTitleCase` - `utils/formatting/string.ts`
- `toKebabCase` - `utils/formatting/string.ts`
- `toCamelCase` - `utils/formatting/string.ts`
- `toSnakeCase` - `utils/formatting/string.ts`
- `normalizeWhitespace` - `utils/formatting/string.ts`
- `isBlank` - `utils/formatting/string.ts`
- `isNotBlank` - `utils/formatting/string.ts`
- `escapeHtml` - `utils/formatting/string.ts`
- `stripHtml` - `utils/formatting/string.ts`
- `getInitials` - `utils/formatting/string.ts`
- `formatBytes` - `utils/formatting/string.ts`
- `randomString` - `utils/formatting/string.ts`
- `pluralize` - `utils/formatting/string.ts`
- `formatNumber` - `utils/formatting/string.ts`

### root

- `isWildDuckRequest` - `wildduck-requests.ts`
- `createPreAuthRequest` - `wildduck-requests.ts`
- `createAuthenticateRequest` - `wildduck-requests.ts`
- `createSubmitMessageRequest` - `wildduck-requests.ts`
- `createCreateMailboxRequest` - `wildduck-requests.ts`
- `createPaginationRequest` - `wildduck-requests.ts`

### validation

- `createValidator` - `utils/validation/type-validation.ts`
- `isString` - `utils/validation/type-validation.ts`
- `isNumber` - `utils/validation/type-validation.ts`
- `isBoolean` - `utils/validation/type-validation.ts`
- `isObject` - `utils/validation/type-validation.ts`
- `isArray` - `utils/validation/type-validation.ts`
- `isNullish` - `utils/validation/type-validation.ts`
- `hasRequiredProperties` - `utils/validation/type-validation.ts`
- `validateArray` - `utils/validation/type-validation.ts`
- `optional` - `utils/validation/type-validation.ts`
- `isApiResponse` - `utils/validation/type-validation.ts`
- `isSuccessResponse` - `utils/validation/type-validation.ts`
- `isErrorResponse` - `utils/validation/type-validation.ts`
- `isValidDate` - `utils/validation/type-validation.ts`
- `isEmail` - `utils/validation/type-validation.ts`
- `isUrl` - `utils/validation/type-validation.ts`
- `createAssertion` - `utils/validation/type-validation.ts`
- `parseJson` - `utils/validation/type-validation.ts`
