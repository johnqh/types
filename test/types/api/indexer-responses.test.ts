import { describe, it, expect } from 'vitest';
import { ChainType } from '../../../src/types/business/enums';
import type {
  BaseResponse,
  ErrorResponse,
  SuccessResponse,
  AddressFormats,
  ValidationResponse,
  DomainEmail,
  WalletEmailAccounts,
  EmailAddressesResponse,
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
  MessageInfo,
  Messages,
  MessageInstructions,
  VerificationEndpoint,
  RegenerationInfo,
  MessageGenerationResponse,
  LeaderboardUser,
  LeaderboardResponse,
  SiteStatsData,
  SiteStatsResponse,
  SolanaWebhookResponse,
  SolanaSetupResult,
  SolanaSetupResponse,
  SolanaIndexerStatus,
  SolanaStatusResponse,
  SolanaTestTransactionResponse,
  IndexerApiResponse,
} from '../../../src/types/api/indexer-responses';

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
        timestamp: mockTimestamp,
        isValid: true,
        address: mockWalletAddress,
        addressType: ChainType.EVM,
        normalizedAddress: mockWalletAddress.toLowerCase(),
        formats: {
          normalized: mockWalletAddress.toLowerCase(),
          checksum: mockWalletAddress,
          original: mockWalletAddress,
        },
      };

      expect(response.isValid).toBe(true);
      expect(response.addressType).toBe(ChainType.EVM);
      expect(response.formats).toBeDefined();
    });

    it('should handle invalid address validation', () => {
      const response: ValidationResponse = {
        timestamp: mockTimestamp,
        isValid: false,
        address: 'invalid-address',
        error: 'Invalid address format',
      };

      expect(response.isValid).toBe(false);
      expect(response.error).toBe('Invalid address format');
      expect(response.addressType).toBeUndefined();
    });
  });

  describe('DomainEmail', () => {
    it('should define ENS email structure', () => {
      const email: DomainEmail = {
        email: 'test.eth',
        type: 'ens',
        domain: 'eth',
        verified: true,
      };

      expect(email.type).toBe('ens');
      expect(email.domain).toBe('eth');
      expect(email.verified).toBe(true);
    });

    it('should define SNS email structure', () => {
      const email: DomainEmail = {
        email: 'test.sol',
        type: 'sns',
        domain: 'sol',
      };

      expect(email.type).toBe('sns');
      expect(email.verified).toBeUndefined();
    });
  });

  describe('WalletEmailAccounts', () => {
    it('should define wallet email structure', () => {
      const walletEmails: WalletEmailAccounts = {
        walletAddress: mockWalletAddress,
        addressType: ChainType.EVM,
        isPrimary: true,
        primaryEmail: `${mockWalletAddress}@0xmail.box`,
        domainEmails: [
          {
            email: 'test.eth',
            type: 'ens',
            domain: 'eth',
            verified: true,
          },
        ],
        totalEmails: 2,
      };

      expect(walletEmails.isPrimary).toBe(true);
      expect(walletEmails.primaryEmail).toBe(`${mockWalletAddress}@0xmail.box`);
      expect(walletEmails.domainEmails).toHaveLength(1);
      expect(walletEmails.totalEmails).toBe(2);
    });
  });

  describe('EmailAddressesResponse', () => {
    it('should define complete email addresses response', () => {
      const response: EmailAddressesResponse = {
        timestamp: mockTimestamp,
        requestedWallet: mockWalletAddress,
        addressType: ChainType.EVM,
        walletAccounts: [
          {
            walletAddress: mockWalletAddress,
            addressType: ChainType.EVM,
            isPrimary: true,
            primaryEmail: `${mockWalletAddress}@0xmail.box`,
            domainEmails: [],
            totalEmails: 1,
          },
        ],
        totalWallets: 1,
        totalEmails: 1,
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
        addressType: ChainType.EVM,
        delegatedAddress: mockSolanaAddress,
        delegatedAddressType: ChainType.SOLANA,
        chainId: 1,
        chainName: 'Ethereum',
        transactionHash: '0xabcdef123456',
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
        addressType: ChainType.EVM,
        delegatedFrom: [
          {
            delegatedFrom: mockSolanaAddress,
            delegatedFromType: ChainType.SOLANA,
            chainId: 1,
            chainName: 'Ethereum',
            transactionHash: '0xabcdef123456',
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
        addressType: ChainType.EVM,
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
        timestamp: mockTimestamp,
        walletAddress: mockWalletAddress,
        addressType: ChainType.EVM,
        nonce: 'random-nonce-12345',
        createdAt: mockTimestamp,
        updatedAt: mockTimestamp,
        message: 'Nonce generated successfully',
      };

      expect(response.nonce).toBe('random-nonce-12345');
      expect(response.message).toBe('Nonce generated successfully');
    });
  });

  describe('EntitlementResponse', () => {
    it('should define entitlement response structure', () => {
      const response: EntitlementResponse = {
        timestamp: mockTimestamp,
        walletAddress: mockWalletAddress,
        addressType: ChainType.EVM,
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
        addressType: ChainType.EVM,
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

  describe('MessageGenerationResponse', () => {
    it('should define message generation response structure', () => {
      const response: MessageGenerationResponse = {
        timestamp: mockTimestamp,
        walletAddress: mockWalletAddress,
        addressType: ChainType.EVM,
        chainId: 1,
        domain: '0xmail.box',
        uri: 'https://0xmail.box',
        messages: {
          deterministic: 'deterministic message',
          simple: 'simple message',
          solana: 'solana message',
          info: {
            domain: '0xmail.box',
            uri: 'https://0xmail.box',
            chainId: 1,
            date: mockTimestamp,
          },
        },
        recommended: 'simple',
        instructions: {
          evm: 'Sign with MetaMask',
          solana: 'Sign with Phantom',
        },
        verification: {
          endpoint: '/api/verify',
          method: 'POST',
          body: {
            walletAddress: mockWalletAddress,
            signature: 'signature',
            message: 'message',
          },
          note: 'Verification endpoint',
        },
        regeneration: {
          note: 'Regenerate message',
          endpoint: '/api/regenerate',
        },
      };

      expect(response.recommended).toBe('simple');
      expect(response.messages.simple).toBe('simple message');
      expect(response.verification.method).toBe('POST');
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
        addressType: ChainType.EVM,
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