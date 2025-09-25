import { describe, it, expect } from 'vitest';
import { ChainType } from '../../../src/types/business/enums';
import {
  isIndexerErrorResponse,
  isIndexerSuccessResponse,
  isValidationResponse,
  isEmailAccountsResponse,
  isDelegationResponse,
  isDelegatorsResponse,
  isSignatureVerificationResponse,
  isNonceResponse,
  isEntitlementResponse,
  isPointsResponse,
  isSimpleMessageResponse,
  isLeaderboardResponse,
  isSiteStatsResponse,
  isSolanaWebhookResponse,
  isSolanaSetupResponse,
  isSolanaStatusResponse,
  isSolanaTestTransactionResponse,
} from '../../../src/types/api/indexer-guards';
import type {
  ErrorResponse,
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
} from '../../../src/types/api/indexer-responses';

describe('Indexer Type Guards', () => {
  const mockTimestamp = '2023-01-01T00:00:00Z';
  const mockWalletAddress = '0x1234567890123456789012345678901234567890';

  describe('isIndexerErrorResponse', () => {
    it('should identify error responses correctly', () => {
      const errorResponse = {
        success: false,
        error: 'Test error message',
        timestamp: mockTimestamp,
      };

      expect(isIndexerErrorResponse(errorResponse)).toBe(true);
    });

    it('should reject non-error responses', () => {
      const successResponse = {
        timestamp: mockTimestamp,
        success: true,
      };

      expect(isIndexerErrorResponse(successResponse)).toBe(false);
    });

    it('should handle invalid input', () => {
      expect(isIndexerErrorResponse(null)).toBe(false);
      expect(isIndexerErrorResponse(undefined)).toBe(false);
      expect(isIndexerErrorResponse({})).toBe(false);
      expect(isIndexerErrorResponse('string')).toBe(false);
    });
  });

  describe('isIndexerSuccessResponse', () => {
    it('should identify success responses correctly', () => {
      const successResponse: PointsResponse = {
        timestamp: mockTimestamp,
        success: true,
        walletAddress: mockWalletAddress,
        addressType: ChainType.EVM,
        data: {
          walletAddress: mockWalletAddress,
          pointsEarned: '1000',
        },
        verified: true,
      };

      expect(isIndexerSuccessResponse(successResponse)).toBe(true);
    });

    it('should reject responses without success=true', () => {
      const response = {
        timestamp: mockTimestamp,
        success: false,
      };

      expect(isIndexerSuccessResponse(response)).toBe(false);
    });

    it('should reject responses without success property', () => {
      const response = {
        timestamp: mockTimestamp,
        error: 'Some error',
      };

      expect(isIndexerSuccessResponse(response)).toBe(false);
    });
  });

  describe('isValidationResponse', () => {
    it('should identify validation responses correctly', () => {
      const validationResponse: ValidationResponse = {
        timestamp: mockTimestamp,
        isValid: true,
        address: mockWalletAddress,
        addressType: ChainType.EVM,
        normalizedAddress: mockWalletAddress.toLowerCase(),
      };

      expect(isValidationResponse(validationResponse)).toBe(true);
    });

    it('should reject responses missing required properties', () => {
      const incompleteResponse = {
        timestamp: mockTimestamp,
        isValid: true,
        address: mockWalletAddress,
        // missing addressType
      };

      expect(isValidationResponse(incompleteResponse)).toBe(false);
    });

    it('should handle responses with only isValid', () => {
      const response = {
        isValid: false,
        // missing addressType
      };

      expect(isValidationResponse(response)).toBe(false);
    });
  });

  describe('isEmailAccountsResponse', () => {
    it('should identify email accounts responses correctly', () => {
      const emailResponse: EmailAccountsResponse = {
        timestamp: mockTimestamp,
        requestedWallet: mockWalletAddress,
        addressType: ChainType.EVM,
        walletAccounts: [
          {
            walletAddress: mockWalletAddress,
            addressType: ChainType.EVM,
            isPrimary: true,
            primaryAccount: `${mockWalletAddress}@0xmail.box`,
            domainAccounts: [],
            totalAccounts: 1,
          },
        ],
        totalWallets: 1,
        totalAccounts: 1,
        verified: true,
      };

      expect(isEmailAccountsResponse(emailResponse)).toBe(true);
    });

    it('should reject responses missing required properties', () => {
      const incompleteResponse = {
        timestamp: mockTimestamp,
        requestedWallet: mockWalletAddress,
        walletAccounts: [],
        // missing totalWallets
      };

      expect(isEmailAccountsResponse(incompleteResponse)).toBe(false);
    });
  });

  describe('isDelegationResponse', () => {
    it('should identify delegation responses correctly', () => {
      const delegationResponse: DelegationResponse = {
        timestamp: mockTimestamp,
        walletAddress: mockWalletAddress,
        addressType: ChainType.EVM,
        isActive: true,
        verified: true,
      };

      expect(isDelegationResponse(delegationResponse)).toBe(true);
    });

    it('should reject responses missing required properties', () => {
      const incompleteResponse = {
        timestamp: mockTimestamp,
        walletAddress: mockWalletAddress,
        isActive: true,
        // missing verified
      };

      expect(isDelegationResponse(incompleteResponse)).toBe(false);
    });
  });

  describe('isDelegatorsResponse', () => {
    it('should identify delegators responses correctly', () => {
      const delegatorsResponse: DelegatorsResponse = {
        timestamp: mockTimestamp,
        walletAddress: mockWalletAddress,
        addressType: ChainType.EVM,
        delegatedFrom: [],
        delegationDetails: {
          totalDelegators: 0,
          activeChains: [],
          chainDetails: [],
        },
        totalDelegators: 0,
      };

      expect(isDelegatorsResponse(delegatorsResponse)).toBe(true);
    });

    it('should reject responses missing required properties', () => {
      const incompleteResponse = {
        timestamp: mockTimestamp,
        walletAddress: mockWalletAddress,
        delegatedFrom: [],
        // missing delegationDetails
      };

      expect(isDelegatorsResponse(incompleteResponse)).toBe(false);
    });
  });

  describe('isSignatureVerificationResponse', () => {
    it('should identify signature verification responses correctly', () => {
      const signatureResponse: SignatureVerificationResponse = {
        timestamp: mockTimestamp,
        walletAddress: mockWalletAddress,
        addressType: ChainType.EVM,
        isValid: true,
        message: 'Signature verified successfully',
      };

      expect(isSignatureVerificationResponse(signatureResponse)).toBe(true);
    });

    it('should reject nonce responses (which also have isValid)', () => {
      const nonceResponse = {
        timestamp: mockTimestamp,
        walletAddress: mockWalletAddress,
        addressType: ChainType.EVM,
        isValid: true,
        message: 'Test message',
        nonce: 'some-nonce', // This makes it a nonce response
      };

      expect(isSignatureVerificationResponse(nonceResponse)).toBe(false);
    });

    it('should reject validation responses (which also have isValid)', () => {
      const validationResponse = {
        timestamp: mockTimestamp,
        isValid: true,
        message: 'Test message',
        addressType: ChainType.EVM,
        nonce: 'some-nonce', // This combination makes it ambiguous
      };

      expect(isSignatureVerificationResponse(validationResponse)).toBe(false);
    });
  });

  describe('isNonceResponse', () => {
    it('should identify nonce responses correctly', () => {
      const nonceResponse: NonceResponse = {
        success: true,
        data: {
          username: mockWalletAddress,
          chainType: ChainType.EVM,
          nonce: 'random-nonce-12345',
          createdAt: mockTimestamp,
          updatedAt: mockTimestamp,
          message: 'Nonce generated successfully',
        },
        timestamp: mockTimestamp,
      };

      expect(isNonceResponse(nonceResponse)).toBe(true);
    });

    it('should reject responses missing required properties', () => {
      const incompleteResponse = {
        success: true,
        data: {
          username: mockWalletAddress,
          chainType: ChainType.EVM,
          // missing nonce
          message: 'Incomplete nonce data',
        },
        timestamp: mockTimestamp,
      };

      expect(isNonceResponse(incompleteResponse)).toBe(false);
    });
  });

  describe('isEntitlementResponse', () => {
    it('should identify entitlement responses correctly', () => {
      const entitlementResponse: EntitlementResponse = {
        timestamp: mockTimestamp,
        walletAddress: mockWalletAddress,
        addressType: ChainType.EVM,
        entitlement: {
          type: 'nameservice',
          hasEntitlement: true,
          isActive: true,
        },
        message: 'Entitlement verified',
        verified: true,
      };

      expect(isEntitlementResponse(entitlementResponse)).toBe(true);
    });

    it('should reject responses missing required properties', () => {
      const incompleteResponse = {
        timestamp: mockTimestamp,
        walletAddress: mockWalletAddress,
        entitlement: {
          type: 'nameservice',
          hasEntitlement: true,
          isActive: true,
        },
        // missing verified
      };

      expect(isEntitlementResponse(incompleteResponse)).toBe(false);
    });
  });

  describe('isPointsResponse', () => {
    it('should identify points responses correctly', () => {
      const pointsResponse: PointsResponse = {
        timestamp: mockTimestamp,
        success: true,
        walletAddress: mockWalletAddress,
        addressType: ChainType.EVM,
        data: {
          walletAddress: mockWalletAddress,
          pointsEarned: '1000',
        },
        verified: true,
      };

      expect(isPointsResponse(pointsResponse)).toBe(true);
    });

    it('should reject responses without pointsEarned in data', () => {
      const incompleteResponse = {
        timestamp: mockTimestamp,
        success: true,
        data: {
          walletAddress: mockWalletAddress,
          // missing pointsEarned
        },
      };

      expect(isPointsResponse(incompleteResponse)).toBe(false);
    });

    it('should reject responses without data property', () => {
      const incompleteResponse = {
        timestamp: mockTimestamp,
        success: true,
        // missing data
      };

      expect(isPointsResponse(incompleteResponse)).toBe(false);
    });
  });

  describe('isSimpleMessageResponse', () => {
    it('should identify simple message responses correctly', () => {
      const messageResponse: SimpleMessageResponse = {
        timestamp: mockTimestamp,
        message: 'Simple authentication message',
        walletAddress: mockWalletAddress,
        chainType: ChainType.EVM,
        chainId: 1,
      };

      expect(isSimpleMessageResponse(messageResponse)).toBe(true);
    });

    it('should handle responses without optional chainId', () => {
      const messageResponse: SimpleMessageResponse = {
        timestamp: mockTimestamp,
        message: 'Simple authentication message',
        walletAddress: mockWalletAddress,
        chainType: ChainType.SOLANA,
      };

      expect(isSimpleMessageResponse(messageResponse)).toBe(true);
    });

    it('should reject responses missing required properties', () => {
      const incompleteResponse = {
        timestamp: mockTimestamp,
        walletAddress: mockWalletAddress,
        // missing message and chainType
      };

      expect(isSimpleMessageResponse(incompleteResponse)).toBe(false);
    });
  });

  describe('isLeaderboardResponse', () => {
    it('should identify leaderboard responses correctly', () => {
      const leaderboardResponse: LeaderboardResponse = {
        timestamp: mockTimestamp,
        success: true,
        data: {
          leaderboard: [
            {
              walletAddress: mockWalletAddress,
              pointsEarned: '1000',
            },
          ],
          count: 1,
        },
      };

      expect(isLeaderboardResponse(leaderboardResponse)).toBe(true);
    });

    it('should reject responses without leaderboard in data', () => {
      const incompleteResponse = {
        success: true,
        data: {
          count: 1,
          // missing leaderboard
        },
      };

      expect(isLeaderboardResponse(incompleteResponse)).toBe(false);
    });
  });

  describe('isSiteStatsResponse', () => {
    it('should identify site stats responses correctly', () => {
      const statsResponse: SiteStatsResponse = {
        timestamp: mockTimestamp,
        success: true,
        data: {
          totalPoints: '50000',
          totalUsers: 100,
        },
      };

      expect(isSiteStatsResponse(statsResponse)).toBe(true);
    });

    it('should reject responses without totalPoints in data', () => {
      const incompleteResponse = {
        success: true,
        data: {
          totalUsers: 100,
          // missing totalPoints
        },
      };

      expect(isSiteStatsResponse(incompleteResponse)).toBe(false);
    });
  });

  describe('Solana API Response Guards', () => {
    describe('isSolanaWebhookResponse', () => {
      it('should identify solana webhook responses correctly', () => {
        const webhookResponse: SolanaWebhookResponse = {
          timestamp: mockTimestamp,
          success: true,
          processed: 10,
          total: 15,
        };

        expect(isSolanaWebhookResponse(webhookResponse)).toBe(true);
      });

      it('should reject responses missing required properties', () => {
        const incompleteResponse = {
          success: true,
          processed: 10,
          // missing total
        };

        expect(isSolanaWebhookResponse(incompleteResponse)).toBe(false);
      });
    });

    describe('isSolanaSetupResponse', () => {
      it('should identify solana setup responses correctly', () => {
        const setupResponse: SolanaSetupResponse = {
          timestamp: mockTimestamp,
          success: true,
          results: [
            {
              chainId: 'mainnet-beta',
              status: 'success',
            },
          ],
        };

        expect(isSolanaSetupResponse(setupResponse)).toBe(true);
      });

      it('should reject responses missing results', () => {
        const incompleteResponse = {
          success: true,
          // missing results
        };

        expect(isSolanaSetupResponse(incompleteResponse)).toBe(false);
      });
    });

    describe('isSolanaStatusResponse', () => {
      it('should identify solana status responses correctly', () => {
        const statusResponse: SolanaStatusResponse = {
          solanaIndexers: [
            {
              chainId: -101,
              initialized: true,
              networkName: 'mainnet-beta',
            },
          ],
          totalIndexers: 1,
          configured: true,
        };

        expect(isSolanaStatusResponse(statusResponse)).toBe(true);
      });

      it('should reject responses missing required properties', () => {
        const incompleteResponse = {
          solanaIndexers: [],
          totalIndexers: 0,
          // missing configured
        };

        expect(isSolanaStatusResponse(incompleteResponse)).toBe(false);
      });
    });

    describe('isSolanaTestTransactionResponse', () => {
      it('should identify solana test transaction responses correctly', () => {
        const testResponse: SolanaTestTransactionResponse = {
          timestamp: mockTimestamp,
          success: true,
          message: 'Test transaction successful',
        };

        expect(isSolanaTestTransactionResponse(testResponse)).toBe(true);
      });

      it('should reject responses with data property (distinguishes from other success responses)', () => {
        const responseWithData = {
          success: true,
          message: 'Test message',
          data: { someData: 'value' }, // This makes it not a test transaction response
        };

        expect(isSolanaTestTransactionResponse(responseWithData)).toBe(false);
      });

      it('should reject responses missing message', () => {
        const incompleteResponse = {
          success: true,
          // missing message
        };

        expect(isSolanaTestTransactionResponse(incompleteResponse)).toBe(false);
      });
    });
  });

  describe('Edge Cases and Type Safety', () => {
    it('should handle null and undefined inputs', () => {
      const guards = [
        isIndexerErrorResponse,
        isIndexerSuccessResponse,
        isValidationResponse,
        isEmailAccountsResponse,
        isDelegationResponse,
        isDelegatorsResponse,
        isSignatureVerificationResponse,
        isNonceResponse,
        isEntitlementResponse,
        isPointsResponse,
        isSimpleMessageResponse,
        isLeaderboardResponse,
        isSiteStatsResponse,
        isSolanaWebhookResponse,
        isSolanaSetupResponse,
        isSolanaStatusResponse,
        isSolanaTestTransactionResponse,
      ];

      guards.forEach((guard) => {
        expect(guard(null)).toBe(false);
        expect(guard(undefined)).toBe(false);
        expect(guard({})).toBe(false);
      });
    });

    it('should handle primitive inputs', () => {
      const primitives = ['string', 123, true, false];

      primitives.forEach((primitive) => {
        expect(isIndexerErrorResponse(primitive)).toBe(false);
        expect(isValidationResponse(primitive)).toBe(false);
        expect(isPointsResponse(primitive)).toBe(false);
      });
    });

    it('should correctly distinguish between similar response types', () => {
      // Object that could match multiple guards
      const ambiguousResponse = {
        timestamp: mockTimestamp,
        success: true,
        isValid: true,
        message: 'Test message',
        data: { pointsEarned: '100' },
      };

      // Should be identified as points response due to data.pointsEarned
      expect(isPointsResponse(ambiguousResponse)).toBe(true);
      expect(isSignatureVerificationResponse(ambiguousResponse)).toBe(true);
      expect(isIndexerSuccessResponse(ambiguousResponse)).toBe(true);
    });
  });
});