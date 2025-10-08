import { describe, it, expect } from 'vitest';
import { ChainType } from '../../../src/types/business/enums';
import type {
  BaseResponse,
  ErrorResponse,
  SuccessResponse,
  AddressFormats,
  ValidationResponse,
  DomainAccount,
  WalletEmailAccounts,
  EmailAccountsResponse,
  DelegationInfo,
  DelegationResponse,
  DelegatorInfo,
  DelegatorsResponse,
  SignatureVerificationResponse,
  NonceResponse,
  EntitlementInfo,
  EntitlementResponse,
  PointsData,
  PointsResponse,
  SimpleMessageResponse,
  LeaderboardResponse,
  SiteStatsResponse,
  SolanaWebhookResponse,
  SolanaSetupResponse,
  SolanaStatusResponse,
  SolanaTestTransactionResponse,
  IndexerApiResponse,
} from '../../../src/types/indexer/indexer-responses';

describe('Indexer Response Types', () => {
  const mockTimestamp = '2023-01-01T00:00:00Z';
  const mockWalletAddress = '0x1234567890123456789012345678901234567890';
  const mockSolanaAddress = 'DsK1234567890123456789012345678901234567890';

  describe('BaseResponse', () => {
    it('should have timestamp property', () => {
      const response: BaseResponse = {
        timestamp: mockTimestamp,
      };

      expect(response.timestamp).toBe(mockTimestamp);
    });
  });

  describe('ErrorResponse', () => {
    it('should extend BaseResponse with error properties', () => {
      const response: ErrorResponse = {
        timestamp: mockTimestamp,
        error: 'Test error message',
        statusCode: 400,
      };

      expect(response.timestamp).toBe(mockTimestamp);
      expect(response.error).toBe('Test error message');
      expect(response.statusCode).toBe(400);
    });

    it('should allow optional statusCode', () => {
      const response: ErrorResponse = {
        timestamp: mockTimestamp,
        error: 'Test error message',
      };

      expect(response.statusCode).toBeUndefined();
    });
  });

  describe('SuccessResponse', () => {
    it('should extend BaseResponse with success property', () => {
      const response: SuccessResponse = {
        timestamp: mockTimestamp,
        success: true,
      };

      expect(response.timestamp).toBe(mockTimestamp);
      expect(response.success).toBe(true);
    });
  });

  describe('AddressFormats', () => {
    it('should define address format structure', () => {
      const formats: AddressFormats = {
        normalized: mockWalletAddress.toLowerCase(),
        checksum: mockWalletAddress,
        original: mockWalletAddress.toUpperCase(),
      };

      expect(formats.normalized).toBe(mockWalletAddress.toLowerCase());
      expect(formats.checksum).toBe(mockWalletAddress);
      expect(formats.original).toBe(mockWalletAddress.toUpperCase());
    });

    it('should allow optional checksum', () => {
      const formats: AddressFormats = {
        normalized: mockWalletAddress.toLowerCase(),
        original: mockWalletAddress,
      };

      expect(formats.checksum).toBeUndefined();
    });
  });

  describe('ValidationResponse', () => {
    it('should handle valid EVM address validation', () => {
      const response: ValidationResponse = {
        success: true,
        timestamp: mockTimestamp,
        data: {
          isValid: true,
          address: mockWalletAddress,
          addressType: ChainType.EVM,
          normalizedAddress: mockWalletAddress.toLowerCase(),
          formats: {
            normalized: mockWalletAddress.toLowerCase(),
            checksum: mockWalletAddress,
            original: mockWalletAddress,
          },
        },
      };

      expect(response.data?.isValid).toBe(true);
      expect(response.data?.addressType).toBe(ChainType.EVM);
      expect(response.data?.formats).toBeDefined();
    });

    it('should handle invalid address validation', () => {
      const response: ValidationResponse = {
        success: false,
        timestamp: mockTimestamp,
        error: 'Invalid address format',
        data: {
          isValid: false,
          address: 'invalid-address',
        },
      };

      expect(response.data?.isValid).toBe(false);
      expect(response.error).toBe('Invalid address format');
      expect(response.data?.addressType).toBeUndefined();
    });
  });

  describe('DomainAccount', () => {
    it('should define ENS account structure', () => {
      const account: DomainAccount = {
        account: 'test.eth',
        type: 'ens',
        domain: 'eth',
        verified: true,
      };

      expect(account.type).toBe('ens');
      expect(account.domain).toBe('eth');
      expect(account.verified).toBe(true);
    });

    it('should define SNS account structure', () => {
      const account: DomainAccount = {
        account: 'test.sol',
        type: 'sns',
        domain: 'sol',
      };

      expect(account.type).toBe('sns');
      expect(account.verified).toBeUndefined();
    });
  });

  describe('WalletEmailAccounts', () => {
    it('should define wallet email structure', () => {
      const walletAccounts: WalletEmailAccounts = {
        walletAddress: mockWalletAddress,
        chainType: ChainType.EVM,
        isPrimary: true,
        primaryAccount: `${mockWalletAddress}@0xmail.box`,
        domainAccounts: [
          {
            account: 'test.eth',
            type: 'ens',
            domain: 'eth',
            verified: true,
          },
        ],
        totalAccounts: 2,
      };

      expect(walletAccounts.isPrimary).toBe(true);
      expect(walletAccounts.primaryAccount).toBe(`${mockWalletAddress}@0xmail.box`);
      expect(walletAccounts.domainAccounts).toHaveLength(1);
      expect(walletAccounts.totalAccounts).toBe(2);
    });
  });

  describe('EmailAccountsResponse', () => {
    it('should define complete email accounts response', () => {
      const response: EmailAccountsResponse = {
        timestamp: mockTimestamp,
        requestedWallet: mockWalletAddress,
        chainType: ChainType.EVM,
        walletAccounts: [
          {
            walletAddress: mockWalletAddress,
            chainType: ChainType.EVM,
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

      expect(response.requestedWallet).toBe(mockWalletAddress);
      expect(response.walletAccounts).toHaveLength(1);
      expect(response.verified).toBe(true);
    });
  });

  describe('DelegationResponse', () => {
    it('should define delegation response structure', () => {
      const response: DelegationResponse = {
        timestamp: mockTimestamp,
        walletAddress: mockWalletAddress,
        chainType: ChainType.EVM,
        delegatedAddress: mockSolanaAddress,
        delegatedChainType: ChainType.SOLANA,
        chainId: 1,
        chainName: 'Ethereum',
        txHash: '0xabcdef123456',
        blockNumber: '12345678',
        isActive: true,
        verified: true,
      };

      expect(response.walletAddress).toBe(mockWalletAddress);
      expect(response.delegatedAddress).toBe(mockSolanaAddress);
      expect(response.isActive).toBe(true);
      expect(response.verified).toBe(true);
    });
  });

  describe('DelegatorsResponse', () => {
    it('should define delegators response structure', () => {
      const response: DelegatorsResponse = {
        timestamp: mockTimestamp,
        walletAddress: mockWalletAddress,
        chainType: ChainType.EVM,
        delegatedFrom: [
          {
            delegatedFrom: mockSolanaAddress,
            delegatedFromChainType: ChainType.SOLANA,
            chainId: 1,
            chainName: 'Ethereum',
            txHash: '0xabcdef123456',
            blockNumber: '12345678',
            timestamp: mockTimestamp,
            isActive: true,
          },
        ],
        delegationDetails: {
          totalDelegators: 1,
          activeChains: [1],
          chainDetails: [
            {
              chainId: 1,
              chainName: 'Ethereum',
              delegatorCount: 1,
            },
          ],
        },
        totalDelegators: 1,
      };

      expect(response.delegatedFrom).toHaveLength(1);
      expect(response.delegationDetails.totalDelegators).toBe(1);
      expect(response.totalDelegators).toBe(1);
    });
  });

  describe('SignatureVerificationResponse', () => {
    it('should define signature verification response', () => {
      const response: SignatureVerificationResponse = {
        timestamp: mockTimestamp,
        walletAddress: mockWalletAddress,
        chainType: ChainType.EVM,
        isValid: true,
        message: 'Signature verification successful',
      };

      expect(response.walletAddress).toBe(mockWalletAddress);
      expect(response.isValid).toBe(true);
      expect(response.message).toBe('Signature verification successful');
    });
  });

  describe('NonceResponse', () => {
    it('should define nonce response structure', () => {
      const response: NonceResponse = {
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

      expect(response.data.nonce).toBe('random-nonce-12345');
      expect(response.data.message).toBe('Nonce generated successfully');
    });
  });

  describe('EntitlementResponse', () => {
    it('should define entitlement response structure', () => {
      const response: EntitlementResponse = {
        timestamp: mockTimestamp,
        walletAddress: mockWalletAddress,
        chainType: ChainType.EVM,
        entitlement: {
          type: 'nameservice',
          hasEntitlement: true,
          isActive: true,
          productIdentifier: 'nameservice-premium',
          expiresDate: '2024-01-01T00:00:00Z',
          store: 'apple',
        },
        message: 'Entitlement verified',
        verified: true,
      };

      expect(response.entitlement.hasEntitlement).toBe(true);
      expect(response.entitlement.type).toBe('nameservice');
      expect(response.verified).toBe(true);
    });
  });

  describe('PointsResponse', () => {
    it('should define points response structure', () => {
      const response: PointsResponse = {
        timestamp: mockTimestamp,
        success: true,
        walletAddress: mockWalletAddress,
        chainType: ChainType.EVM,
        data: {
          walletAddress: mockWalletAddress,
          pointsEarned: '1000',
          lastActivityDate: mockTimestamp,
          createdAt: mockTimestamp,
          updatedAt: mockTimestamp,
        },
        verified: true,
      };

      expect(response.success).toBe(true);
      expect(response.data.pointsEarned).toBe('1000');
      expect(response.verified).toBe(true);
    });
  });

  describe('SimpleMessageResponse', () => {
    it('should define simple message response structure', () => {
      const response: SimpleMessageResponse = {
        timestamp: mockTimestamp,
        message: 'Simple authentication message',
        walletAddress: mockWalletAddress,
        chainType: ChainType.EVM,
        chainId: 1,
      };

      expect(response.message).toBe('Simple authentication message');
      expect(response.walletAddress).toBe(mockWalletAddress);
      expect(response.chainType).toBe(ChainType.EVM);
      expect(response.chainId).toBe(1);
    });

    it('should handle responses without optional chainId', () => {
      const response: SimpleMessageResponse = {
        timestamp: mockTimestamp,
        message: 'Simple authentication message',
        walletAddress: mockWalletAddress,
        chainType: ChainType.SOLANA,
      };

      expect(response.chainId).toBeUndefined();
    });
  });

  describe('LeaderboardResponse', () => {
    it('should define leaderboard response structure', () => {
      const response: LeaderboardResponse = {
        timestamp: mockTimestamp,
        success: true,
        data: {
          leaderboard: [
            {
              walletAddress: mockWalletAddress,
              pointsEarned: '1000',
              lastActivityDate: mockTimestamp,
              createdAt: mockTimestamp,
              updatedAt: mockTimestamp,
            },
          ],
          count: 1,
        },
      };

      expect(response.success).toBe(true);
      expect(response.data.leaderboard).toHaveLength(1);
      expect(response.data.count).toBe(1);
    });
  });

  describe('SiteStatsResponse', () => {
    it('should define site stats response structure', () => {
      const response: SiteStatsResponse = {
        timestamp: mockTimestamp,
        success: true,
        data: {
          totalPoints: '50000',
          totalUsers: 100,
          lastUpdated: mockTimestamp,
          createdAt: mockTimestamp,
          message: 'Stats retrieved successfully',
        },
      };

      expect(response.success).toBe(true);
      expect(response.data.totalPoints).toBe('50000');
      expect(response.data.totalUsers).toBe(100);
    });
  });

  describe('Solana API Responses', () => {
    it('should define SolanaWebhookResponse structure', () => {
      const response: SolanaWebhookResponse = {
        timestamp: mockTimestamp,
        success: true,
        processed: 10,
        total: 15,
      };

      expect(response.success).toBe(true);
      expect(response.processed).toBe(10);
      expect(response.total).toBe(15);
    });

    it('should define SolanaSetupResponse structure', () => {
      const response: SolanaSetupResponse = {
        timestamp: mockTimestamp,
        success: true,
        results: [
          {
            chainId: 'mainnet-beta',
            status: 'success',
          },
          {
            chainId: 'devnet',
            status: 'error',
            error: 'Connection failed',
          },
        ],
      };

      expect(response.success).toBe(true);
      expect(response.results).toHaveLength(2);
      expect(response.results[0].status).toBe('success');
      expect(response.results[1].error).toBe('Connection failed');
    });

    it('should define SolanaStatusResponse structure', () => {
      const response: SolanaStatusResponse = {
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

      expect(response.solanaIndexers).toHaveLength(1);
      expect(response.totalIndexers).toBe(1);
      expect(response.configured).toBe(true);
    });

    it('should define SolanaTestTransactionResponse structure', () => {
      const response: SolanaTestTransactionResponse = {
        timestamp: mockTimestamp,
        success: true,
        message: 'Test transaction successful',
      };

      expect(response.success).toBe(true);
      expect(response.message).toBe('Test transaction successful');
    });
  });

  describe('IndexerApiResponse Union Type', () => {
    it('should accept ValidationResponse', () => {
      const response: IndexerApiResponse = {
        timestamp: mockTimestamp,
        isValid: true,
        address: mockWalletAddress,
        chainType: ChainType.EVM,
      };

      expect(response.timestamp).toBe(mockTimestamp);
    });

    it('should accept ErrorResponse', () => {
      const response: IndexerApiResponse = {
        timestamp: mockTimestamp,
        error: 'Test error',
        statusCode: 400,
      };

      expect((response as ErrorResponse).error).toBe('Test error');
    });

    it('should accept any defined response type', () => {
      const responses: IndexerApiResponse[] = [
        { timestamp: mockTimestamp, isValid: true, address: 'test' },
        { timestamp: mockTimestamp, error: 'error' },
        { timestamp: mockTimestamp, success: true, processed: 1, total: 1 },
      ];

      expect(responses).toHaveLength(3);
    });
  });
});