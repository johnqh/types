import { describe, it, expect } from 'vitest';
import {
  ChainType,
  type ApiResponse,
  type SignatureProtectedRequest,
  type ChainMetadata,
  type MailEntity,
  type PreparedMailEntity,
  type DelegationEntity,
  type StatisticsEntity,
  type UserStatisticsEntity,
  type ChainStatisticsEntity,
  type SupportedChainId,
  type ContractType,
  type ProcessedEventName,
} from '../../../src/types/infrastructure/api';

describe('API Types', () => {
  describe('ApiResponse', () => {
    it('should accept typed data', () => {
      const response: ApiResponse<string> = {
        success: true,
        data: 'test data',
        timestamp: '2023-01-01T00:00:00Z',
      };

      expect(response.success).toBe(true);
      expect(response.data).toBe('test data');
      expect(response.timestamp).toBe('2023-01-01T00:00:00Z');
    });

    it('should work without data', () => {
      const response: ApiResponse = {
        success: false,
        error: 'Something went wrong',
        timestamp: '2023-01-01T00:00:00Z',
      };

      expect(response.success).toBe(false);
      expect(response.error).toBe('Something went wrong');
    });

    it('should accept unknown as default type', () => {
      const response: ApiResponse = {
        success: true,
        data: { complex: 'object' },
        timestamp: '2023-01-01T00:00:00Z',
      };

      expect(response.data).toEqual({ complex: 'object' });
    });
  });

  describe('SignatureProtectedRequest', () => {
    it('should have required signature fields', () => {
      const request: SignatureProtectedRequest = {
        walletAddress: '0x1234567890123456789012345678901234567890',
        signature: '0xabcdef',
        timestamp: 1640995200000,
        nonce: 'random-nonce',
      };

      expect(request.walletAddress).toBe(
        '0x1234567890123456789012345678901234567890'
      );
      expect(request.signature).toBe('0xabcdef');
      expect(request.timestamp).toBe(1640995200000);
      expect(request.nonce).toBe('random-nonce');
    });
  });

  describe('ChainMetadata', () => {
    it('should have required chain fields', () => {
      const metadata: ChainMetadata = {
        chainId: 1,
        chainType: ChainType.EVM,
        blockNumber: 12345678,
        txHash: '0xabcdef123456',
        logIndex: 0,
        timestamp: BigInt(1640995200),
      };

      expect(metadata.chainId).toBe(1);
      expect(metadata.chainType).toBe(ChainType.EVM);
      expect(metadata.blockNumber).toBe(12345678);
      expect(metadata.txHash).toBe('0xabcdef123456');
      expect(metadata.logIndex).toBe(0);
      expect(metadata.timestamp).toBe(BigInt(1640995200));
    });
  });

  describe('MailEntity', () => {
    it('should extend ChainMetadata correctly', () => {
      const mail: MailEntity = {
        id: '1-0x123-0',
        from: '0x1234567890123456789012345678901234567890',
        to: '0x0987654321098765432109876543210987654321',
        mailHash: '0xmailhash123',
        contractAddress: '0xcontract123',
        feesPaid: BigInt('1000000000000000000'),
        priority: true,
        chainId: 1,
        chainType: ChainType.EVM,
        blockNumber: 12345678,
        txHash: '0xabcdef123456',
        logIndex: 0,
        timestamp: BigInt(1640995200),
      };

      expect(mail.id).toBe('1-0x123-0');
      expect(mail.from).toBe('0x1234567890123456789012345678901234567890');
      expect(mail.priority).toBe(true);
      expect(mail.chainId).toBe(1);
    });
  });

  describe('PreparedMailEntity', () => {
    it('should have correct structure', () => {
      const preparedMail: PreparedMailEntity = {
        id: '1-0x123-0',
        mailHash: '0xpreparedmailhash',
        from: '0x1234567890123456789012345678901234567890',
        contractAddress: '0xcontract123',
        feesPaid: BigInt('500000000000000000'),
        chainId: 1,
        chainType: ChainType.EVM,
        blockNumber: 12345678,
        txHash: '0xabcdef123456',
        logIndex: 0,
        timestamp: BigInt(1640995200),
      };

      expect(preparedMail.mailHash).toBe('0xpreparedmailhash');
      expect(preparedMail.feesPaid).toBe(BigInt('500000000000000000'));
    });
  });

  describe('DelegationEntity', () => {
    it('should have correct structure', () => {
      const delegation: DelegationEntity = {
        id: '0x123-true',
        delegatorAddress: '0x1234567890123456789012345678901234567890',
        delegateAddress: '0x0987654321098765432109876543210987654321',
        isTestNet: true,
        blockNumber: 12345678,
        txHash: '0xabcdef123456',
        timestamp: BigInt(1640995200),
      };

      expect(delegation.delegatorAddress).toBe(
        '0x1234567890123456789012345678901234567890'
      );
      expect(delegation.isTestNet).toBe(true);
    });
  });

  describe('StatisticsEntity', () => {
    it('should have correct structure', () => {
      const stats: StatisticsEntity = {
        id: '1-global',
        chainId: 1,
        totalMails: BigInt(1000),
        totalPreparedMails: BigInt(500),
        totalUsers: BigInt(100),
        totalDelegations: BigInt(50),
        totalVolume: BigInt('1000000000000000000000'),
        lastUpdated: BigInt(1640995200),
      };

      expect(stats.chainId).toBe(1);
      expect(stats.totalMails).toBe(BigInt(1000));
    });
  });

  describe('UserStatisticsEntity', () => {
    it('should have correct structure', () => {
      const userStats: UserStatisticsEntity = {
        id: '1-0x123',
        chainId: 1,
        userAddress: '0x1234567890123456789012345678901234567890',
        totalMailsSent: BigInt(10),
        totalMailsReceived: BigInt(5),
        totalPreparedMails: BigInt(3),
        totalFeesPaid: BigInt('100000000000000000'),
        totalFeesReceived: BigInt('50000000000000000'),
        lastActivity: BigInt(1640995200),
      };

      expect(userStats.userAddress).toBe(
        '0x1234567890123456789012345678901234567890'
      );
      expect(userStats.totalMailsSent).toBe(BigInt(10));
    });
  });

  describe('ChainStatisticsEntity', () => {
    it('should have correct structure', () => {
      const chainStats: ChainStatisticsEntity = {
        id: 'global',
        totalChains: 5,
        totalMails: BigInt(5000),
        totalPreparedMails: BigInt(2500),
        totalUsers: BigInt(500),
        totalDelegations: BigInt(250),
        totalVolume: BigInt('5000000000000000000000'),
        lastUpdated: BigInt(1640995200),
      };

      expect(chainStats.id).toBe('global');
      expect(chainStats.totalChains).toBe(5);
    });
  });

  describe('Type Unions', () => {
    it('should accept valid SupportedChainId values', () => {
      const mainnetIds: SupportedChainId[] = [1, 137, 42161, 10, 8453];
      const testnetIds: SupportedChainId[] = [11155111, 80001, 421614];
      const solanaIds: SupportedChainId[] = [-101, -102, -103, -104];

      expect(mainnetIds).toContain(1);
      expect(testnetIds).toContain(11155111);
      expect(solanaIds).toContain(-101);
    });

    it('should accept valid ContractType values', () => {
      const contractTypes: ContractType[] = ['Mailer', 'MailService'];
      expect(contractTypes).toContain('Mailer');
      expect(contractTypes).toContain('MailService');
    });

    it('should accept valid ProcessedEventName values', () => {
      const eventNames: ProcessedEventName[] = [
        'MailSent',
        'PreparedMailSent',
        'DelegationSet',
        'DelegationCleared',
      ];
      expect(eventNames).toContain('MailSent');
      expect(eventNames).toContain('DelegationSet');
    });
  });
});
