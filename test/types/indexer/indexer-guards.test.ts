import { describe, it, expect } from 'vitest';
import { ChainType } from '../../../src/types/business/enums';
import {
  isIndexerErrorResponse,
  isIndexerSuccessResponse,
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
} from '../../../src/types/indexer/indexer-guards';

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
        success: true,
        data: {},
        timestamp: mockTimestamp,
      };

      expect(isIndexerErrorResponse(successResponse)).toBe(false);
    });

    it('should handle invalid input', () => {
      expect(isIndexerErrorResponse(null)).toBe(false);
      expect(isIndexerErrorResponse(undefined)).toBe(false);
      expect(isIndexerErrorResponse({})).toBe(false);
      expect(isIndexerErrorResponse('string')).toBe(false);
      expect(isIndexerErrorResponse(123)).toBe(false);
    });
  });

  describe('isIndexerSuccessResponse', () => {
    it('should identify success responses correctly', () => {
      const successResponse = {
        success: true,
        data: {
          walletAddress: mockWalletAddress,
          pointsEarned: '1000',
        },
      };

      expect(isIndexerSuccessResponse(successResponse)).toBe(true);
    });

    it('should reject responses without success=true', () => {
      const response = {
        timestamp: mockTimestamp,
        success: false,
        data: {},
      };

      expect(isIndexerSuccessResponse(response)).toBe(false);
    });

    it('should reject responses without success property', () => {
      const response = {
        timestamp: mockTimestamp,
        data: {},
      };

      expect(isIndexerSuccessResponse(response)).toBe(false);
    });
  });

  describe('isAddressValidationResponse', () => {
    it('should identify validation responses correctly', () => {
      const validationResponse = {
        success: true,
        data: {
          name: 'test.eth',
          wallet: {
            walletAddress: mockWalletAddress,
            chainType: ChainType.EVM,
          },
        },
      };

      expect(isAddressValidationResponse(validationResponse)).toBe(true);
    });

    it('should accept responses with only name', () => {
      const response = {
        success: true,
        data: {
          name: 'test.eth',
        },
      };

      expect(isAddressValidationResponse(response)).toBe(true);
    });

    it('should accept responses with only wallet', () => {
      const response = {
        success: true,
        data: {
          wallet: {
            walletAddress: mockWalletAddress,
            chainType: ChainType.EVM,
          },
        },
      };

      expect(isAddressValidationResponse(response)).toBe(true);
    });

    it('should reject responses missing both name and wallet', () => {
      const incompleteResponse = {
        success: true,
        data: {},
      };

      expect(isAddressValidationResponse(incompleteResponse)).toBe(false);
    });
  });

  describe('isEmailAccountsResponse', () => {
    it('should identify email accounts responses correctly', () => {
      const emailResponse = {
        success: true,
        data: {
          accounts: [
            {
              walletAddress: {
                walletAddress: mockWalletAddress,
                chainType: ChainType.EVM,
              },
              names: ['test@0xmail.box'],
            },
          ],
        },
      };

      expect(isEmailAccountsResponse(emailResponse)).toBe(true);
    });

    it('should reject responses missing required properties', () => {
      const incompleteResponse = {
        success: true,
        data: {
          // missing accounts
        },
      };

      expect(isEmailAccountsResponse(incompleteResponse)).toBe(false);
    });
  });

  describe('isRewardsResponse', () => {
    it('should identify rewards responses correctly', () => {
      const rewardsResponse = {
        success: true,
        data: {
          rewards: [
            {
              walletAddress: mockWalletAddress,
              action: 'signup',
              points: 100,
              earningTime: mockTimestamp,
            },
          ],
          records: 1,
          points: 100,
        },
      };

      expect(isRewardsResponse(rewardsResponse)).toBe(true);
    });

    it('should reject responses missing required properties', () => {
      const incompleteResponse = {
        success: true,
        data: {
          rewards: [],
          // missing records and points
        },
      };

      expect(isRewardsResponse(incompleteResponse)).toBe(false);
    });
  });

  describe('isDelegatedToResponse', () => {
    it('should identify delegated-to responses correctly', () => {
      const delegationResponse = {
        success: true,
        data: {
          walletAddress: mockWalletAddress,
          chainType: ChainType.EVM,
          chainId: 1,
          txHash: '0xabc123',
        },
      };

      expect(isDelegatedToResponse(delegationResponse)).toBe(true);
    });

    it('should reject responses missing required properties', () => {
      const incompleteResponse = {
        success: true,
        data: {
          walletAddress: mockWalletAddress,
          // missing chainType
        },
      };

      expect(isDelegatedToResponse(incompleteResponse)).toBe(false);
    });
  });

  describe('isDelegatedFromResponse', () => {
    it('should identify delegated-from responses correctly', () => {
      const delegatorsResponse = {
        success: true,
        data: {
          from: [
            {
              walletAddress: mockWalletAddress,
              chainType: ChainType.EVM,
              chainId: 1,
              txHash: '0xabc123',
            },
          ],
        },
      };

      expect(isDelegatedFromResponse(delegatorsResponse)).toBe(true);
    });

    it('should reject responses missing required properties', () => {
      const incompleteResponse = {
        success: true,
        data: {
          // missing from
        },
      };

      expect(isDelegatedFromResponse(incompleteResponse)).toBe(false);
    });

    it('should reject responses with non-array from field', () => {
      const invalidResponse = {
        success: true,
        data: {
          from: 'not an array',
        },
      };

      expect(isDelegatedFromResponse(invalidResponse)).toBe(false);
    });
  });

  describe('isNonceResponse', () => {
    it('should identify nonce responses correctly', () => {
      const nonceResponse = {
        success: true,
        data: {
          nonce: 'test-nonce-123',
        },
      };

      expect(isNonceResponse(nonceResponse)).toBe(true);
    });

    it('should reject responses missing required properties', () => {
      const incompleteResponse = {
        success: true,
        data: {
          // missing nonce
        },
      };

      expect(isNonceResponse(incompleteResponse)).toBe(false);
    });
  });

  describe('isEntitlementResponse', () => {
    it('should identify entitlement responses correctly', () => {
      const entitlementResponse = {
        success: true,
        data: {
          walletAddress: mockWalletAddress,
          chainType: ChainType.EVM,
          entitlement: {
            type: 'nameservice',
            hasEntitlement: true,
            isActive: true,
          },
          message: 'Entitlement verified',
          verified: true,
        },
      };

      expect(isEntitlementResponse(entitlementResponse)).toBe(true);
    });

    it('should reject responses missing required properties', () => {
      const incompleteResponse = {
        success: true,
        data: {
          entitlement: {
            type: 'nameservice',
            hasEntitlement: true,
            isActive: true,
          },
          // missing verified
        },
      };

      expect(isEntitlementResponse(incompleteResponse)).toBe(false);
    });
  });

  describe('isSignInMessageResponse', () => {
    it('should identify sign-in message responses correctly', () => {
      const signInResponse = {
        success: true,
        data: {
          message: 'Sign this message to authenticate',
          walletAddress: mockWalletAddress,
          chainType: ChainType.EVM,
          chainId: 1,
        },
      };

      expect(isSignInMessageResponse(signInResponse)).toBe(true);
    });

    it('should handle responses without optional chainId', () => {
      const signInResponse = {
        success: true,
        data: {
          message: 'Sign this message to authenticate',
          walletAddress: mockWalletAddress,
          chainType: ChainType.EVM,
        },
      };

      expect(isSignInMessageResponse(signInResponse)).toBe(true);
    });

    it('should reject responses missing required properties', () => {
      const incompleteResponse = {
        success: true,
        data: {
          message: 'Sign this message',
          // missing walletAddress
        },
      };

      expect(isSignInMessageResponse(incompleteResponse)).toBe(false);
    });
  });

  describe('isPointsResponse', () => {
    it('should identify points responses correctly', () => {
      const pointsResponse = {
        success: true,
        data: {
          pointsEarned: '1000',
          walletAddress: mockWalletAddress,
          chainType: ChainType.EVM,
          lastActivityDate: mockTimestamp,
        },
      };

      expect(isPointsResponse(pointsResponse)).toBe(true);
    });

    it('should reject responses without pointsEarned in data', () => {
      const incompleteResponse = {
        success: true,
        data: {
          walletAddress: mockWalletAddress,
          chainType: ChainType.EVM,
          // missing pointsEarned
        },
      };

      expect(isPointsResponse(incompleteResponse)).toBe(false);
    });

    it('should reject responses without data property', () => {
      const response = {
        success: true,
        // missing data
      };

      expect(isPointsResponse(response)).toBe(false);
    });
  });

  describe('Points API Response Guards', () => {
    describe('isLeaderboardResponse', () => {
      it('should identify leaderboard responses correctly', () => {
        const leaderboardResponse = {
          success: true,
          data: {
            leaderboard: [
              {
                walletAddress: mockWalletAddress,
                chainType: ChainType.EVM,
                pointsEarned: '1000',
                lastActivityDate: mockTimestamp,
              },
            ],
          },
        };

        expect(isLeaderboardResponse(leaderboardResponse)).toBe(true);
      });

      it('should reject responses without leaderboard array', () => {
        const incompleteResponse = {
          success: true,
          data: {
            // missing leaderboard
          },
        };

        expect(isLeaderboardResponse(incompleteResponse)).toBe(false);
      });
    });

    describe('isSiteStatsResponse', () => {
      it('should identify site stats responses correctly', () => {
        const statsResponse = {
          success: true,
          data: {
            totalPoints: '1000000',
            totalUsers: 500,
            lastUpdated: mockTimestamp,
          },
        };

        expect(isSiteStatsResponse(statsResponse)).toBe(true);
      });

      it('should reject responses missing required properties', () => {
        const incompleteResponse = {
          success: true,
          data: {
            totalUsers: 500,
            // missing totalPoints
          },
        };

        expect(isSiteStatsResponse(incompleteResponse)).toBe(false);
      });
    });
  });

  describe('Edge Cases and Type Safety', () => {
    it('should handle null and undefined inputs', () => {
      const guards = [
        isIndexerErrorResponse,
        isIndexerSuccessResponse,
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
      ];

      guards.forEach((guard) => {
        expect(guard(null)).toBe(false);
        expect(guard(undefined)).toBe(false);
        expect(guard({})).toBe(false);
        expect(guard('')).toBe(false);
        expect(guard(0)).toBe(false);
        expect(guard([])).toBe(false);
      });
    });

    it('should handle primitive inputs', () => {
      const primitives = ['string', 123, true, false, Symbol('test')];
      primitives.forEach((primitive) => {
        expect(isIndexerErrorResponse(primitive)).toBe(false);
        expect(isAddressValidationResponse(primitive)).toBe(false);
        expect(isPointsResponse(primitive)).toBe(false);
      });
    });

    it('should correctly distinguish between similar response types', () => {
      const ambiguousResponse = {
        success: true,
        data: {
          pointsEarned: '1000',
          walletAddress: mockWalletAddress,
          chainType: ChainType.EVM,
          message: 'Test message',
        },
      };

      // Should be identified as points response due to data.pointsEarned
      expect(isPointsResponse(ambiguousResponse)).toBe(true);
      expect(isSignInMessageResponse(ambiguousResponse)).toBe(true); // Also has message and walletAddress
      expect(isIndexerSuccessResponse(ambiguousResponse)).toBe(true);
    });
  });
});