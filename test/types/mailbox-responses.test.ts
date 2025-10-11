import { describe, it, expect } from 'vitest';
import {
  BaseTransactionResponse,
  TransactionReceipt,
  MessageSendResponse,
  PreparedMessageSendResponse,
  ClaimableInfo,
  ClaimRevenueResponse,
  ClaimableAmountResponse,
  DomainRegistrationResponse,
  MailboxDelegationResponse,
  DelegationRejectionResponse,
  FeeInfo,
  FeeUpdateResponse,
  PauseInfo,
  PauseResponse,
  EmergencyDistributionResponse,
  EVMTransactionResponse,
  SolanaTransactionResponse,
  UnifiedClientResponse,
  BatchOperationResponse,
  MessageHistoryResponse,
  DelegationStatusResponse,
  ContractError,
  isEVMResponse,
  isSolanaResponse,
  isMailboxErrorResponse
} from '../../src/types/mailer/mail-types';
import { ChainType } from '../../src/types/business/enums';

describe('Mailbox Response Types', () => {
  describe('BaseTransactionResponse', () => {
    it('should accept valid base transaction response', () => {
      const response: BaseTransactionResponse = {
        transactionHash: '0x123abc',
        chainType: ChainType.EVM,
        timestamp: Date.now(),
        success: true
      };

      expect(response.transactionHash).toBe('0x123abc');
      expect(response.chainType).toBe(ChainType.EVM);
      expect(response.success).toBe(true);
    });

    it('should accept response with error', () => {
      const response: BaseTransactionResponse = {
        transactionHash: '0x123abc',
        chainType: ChainType.SOLANA,
        success: false,
        error: 'Transaction failed'
      };

      expect(response.success).toBe(false);
      expect(response.error).toBe('Transaction failed');
    });

    it('should accept both chain types', () => {
      const evmResponse: BaseTransactionResponse = {
        transactionHash: '0x123abc',
        chainType: ChainType.EVM,
        success: true
      };

      const solanaResponse: BaseTransactionResponse = {
        transactionHash: 'abc123',
        chainType: ChainType.SOLANA,
        success: true
      };

      expect(evmResponse.chainType).toBe(ChainType.EVM);
      expect(solanaResponse.chainType).toBe(ChainType.SOLANA);
    });
  });

  describe('TransactionReceipt', () => {
    it('should extend BaseTransactionResponse with additional fields', () => {
      const receipt: TransactionReceipt = {
        transactionHash: '0x123abc',
        chainType: ChainType.EVM,
        success: true,
        blockNumber: 12345,
        gasUsed: BigInt(21000),
        confirmationStatus: 'confirmed'
      };

      expect(receipt.blockNumber).toBe(12345);
      expect(receipt.gasUsed).toBe(BigInt(21000));
      expect(receipt.confirmationStatus).toBe('confirmed');
    });

    it('should support Solana-specific fields', () => {
      const receipt: TransactionReceipt = {
        transactionHash: 'abc123',
        chainType: ChainType.SOLANA,
        success: true,
        slot: 98765,
        confirmationStatus: 'finalized'
      };

      expect(receipt.slot).toBe(98765);
      expect(receipt.confirmationStatus).toBe('finalized');
    });
  });

  describe('MessageSendResponse', () => {
    it('should handle regular message send response', () => {
      const response: MessageSendResponse = {
        transactionHash: '0x123abc',
        chainType: ChainType.EVM,
        success: true,
        messageId: 'msg_123',
        fee: BigInt(1000),
        recipient: '0xrecipient',
        subject: 'Test Subject',
        body: 'Test Body',
        isPriority: false
      };

      expect(response.messageId).toBe('msg_123');
      expect(response.fee).toBe(BigInt(1000));
      expect(response.isPriority).toBe(false);
    });

    it('should handle priority message with claimable revenue', () => {
      const response: MessageSendResponse = {
        transactionHash: '0x123abc',
        chainType: ChainType.EVM,
        success: true,
        fee: BigInt(2000),
        isPriority: true,
        claimableRevenue: BigInt(1000),
        claimExpiryTimestamp: Date.now() + 86400000
      };

      expect(response.isPriority).toBe(true);
      expect(response.claimableRevenue).toBe(BigInt(1000));
      expect(response.claimExpiryTimestamp).toBeGreaterThan(Date.now());
    });
  });

  describe('PreparedMessageSendResponse', () => {
    it('should handle prepared message response', () => {
      const response: PreparedMessageSendResponse = {
        transactionHash: '0x123abc',
        chainType: ChainType.EVM,
        success: true,
        mailId: 'prepared_msg_456',
        fee: BigInt(1500),
        recipient: '0xrecipient',
        isPriority: true,
        claimableRevenue: BigInt(750)
      };

      expect(response.mailId).toBe('prepared_msg_456');
      expect(response.fee).toBe(BigInt(1500));
      expect(response.claimableRevenue).toBe(BigInt(750));
    });
  });

  describe('ClaimableInfo', () => {
    it('should handle active claimable info', () => {
      const futureTimestamp = Date.now() + 86400000;
      const claimable: ClaimableInfo = {
        amount: BigInt(1000),
        expiryTimestamp: futureTimestamp,
        isExpired: false,
        isClaimable: true
      };

      expect(claimable.amount).toBe(BigInt(1000));
      expect(claimable.isExpired).toBe(false);
      expect(claimable.isClaimable).toBe(true);
    });

    it('should handle expired claimable info', () => {
      const pastTimestamp = Date.now() - 86400000;
      const claimable: ClaimableInfo = {
        amount: BigInt(500),
        expiryTimestamp: pastTimestamp,
        isExpired: true,
        isClaimable: false
      };

      expect(claimable.isExpired).toBe(true);
      expect(claimable.isClaimable).toBe(false);
    });
  });

  describe('ClaimRevenueResponse', () => {
    it('should handle revenue claim response', () => {
      const response: ClaimRevenueResponse = {
        transactionHash: '0x123abc',
        chainType: ChainType.EVM,
        success: true,
        claimedAmount: BigInt(800),
        remainingAmount: BigInt(200),
        claimType: 'recipient'
      };

      expect(response.claimedAmount).toBe(BigInt(800));
      expect(response.remainingAmount).toBe(BigInt(200));
      expect(response.claimType).toBe('recipient');
    });

    it('should support all claim types', () => {
      const claimTypes: Array<ClaimRevenueResponse['claimType']> = ['recipient', 'owner', 'expired'];

      claimTypes.forEach(claimType => {
        const response: ClaimRevenueResponse = {
          transactionHash: '0x123abc',
          chainType: ChainType.EVM,
          success: true,
          claimedAmount: BigInt(100),
          remainingAmount: BigInt(0),
          claimType
        };

        expect(response.claimType).toBe(claimType);
      });
    });
  });

  describe('DomainRegistrationResponse', () => {
    it('should handle new domain registration', () => {
      const response: DomainRegistrationResponse = {
        transactionHash: '0x123abc',
        chainType: ChainType.EVM,
        success: true,
        domain: 'example.eth',
        expiryTimestamp: Date.now() + 31536000000, // 1 year
        fee: BigInt(5000),
        isExtension: false
      };

      expect(response.domain).toBe('example.eth');
      expect(response.isExtension).toBe(false);
      expect(response.fee).toBe(BigInt(5000));
    });

    it('should handle domain extension', () => {
      const response: DomainRegistrationResponse = {
        transactionHash: '0x123abc',
        chainType: ChainType.EVM,
        success: true,
        domain: 'example.eth',
        expiryTimestamp: Date.now() + 31536000000,
        fee: BigInt(3000),
        isExtension: true
      };

      expect(response.isExtension).toBe(true);
    });
  });

  describe('MailboxDelegationResponse', () => {
    it('should handle delegation creation', () => {
      const response: MailboxDelegationResponse = {
        transactionHash: '0x123abc',
        chainType: ChainType.EVM,
        success: true,
        delegator: '0xdelegator',
        delegate: '0xdelegate',
        fee: BigInt(100),
        isClearing: false
      };

      expect(response.delegator).toBe('0xdelegator');
      expect(response.delegate).toBe('0xdelegate');
      expect(response.isClearing).toBe(false);
    });

    it('should handle delegation clearing', () => {
      const response: MailboxDelegationResponse = {
        transactionHash: '0x123abc',
        chainType: ChainType.EVM,
        success: true,
        delegator: '0xdelegator',
        delegate: '0x0000000000000000000000000000000000000000',
        fee: BigInt(50),
        isClearing: true
      };

      expect(response.isClearing).toBe(true);
    });
  });

  describe('FeeInfo', () => {
    it('should contain current fee information', () => {
      const feeInfo: FeeInfo = {
        sendFee: BigInt(1000),
        delegationFee: BigInt(100),
        registrationFee: BigInt(5000),
        lastUpdated: Date.now()
      };

      expect(feeInfo.sendFee).toBe(BigInt(1000));
      expect(feeInfo.delegationFee).toBe(BigInt(100));
      expect(feeInfo.registrationFee).toBe(BigInt(5000));
    });

    it('should allow optional registration fee', () => {
      const feeInfo: FeeInfo = {
        sendFee: BigInt(1000),
        delegationFee: BigInt(100),
        lastUpdated: Date.now()
      };

      expect(feeInfo.registrationFee).toBeUndefined();
    });
  });

  describe('EVMTransactionResponse', () => {
    it('should have EVM-specific fields', () => {
      const response: EVMTransactionResponse = {
        transactionHash: '0x123abc',
        chainType: ChainType.EVM,
        success: true,
        blockNumber: 12345,
        gasUsed: BigInt(21000),
        gasPrice: BigInt(20000000000),
        contractAddress: '0xcontract'
      };

      expect(response.chainType).toBe(ChainType.EVM);
      expect(response.blockNumber).toBe(12345);
      expect(response.gasUsed).toBe(BigInt(21000));
      expect(response.contractAddress).toBe('0xcontract');
    });
  });

  describe('SolanaTransactionResponse', () => {
    it('should have Solana-specific fields', () => {
      const response: SolanaTransactionResponse = {
        transactionHash: 'abc123',
        chainType: ChainType.SOLANA,
        success: true,
        slot: 98765,
        computeUnitsConsumed: 5000,
        transactionFee: 5000
      };

      expect(response.chainType).toBe(ChainType.SOLANA);
      expect(response.slot).toBe(98765);
      expect(response.computeUnitsConsumed).toBe(5000);
      expect(response.transactionFee).toBe(5000);
    });
  });

  describe('UnifiedClientResponse', () => {
    it('should handle successful response', () => {
      const response: UnifiedClientResponse<{ messageId: string }> = {
        success: true,
        data: { messageId: 'msg_123' },
        chainType: ChainType.EVM,
        metadata: {
          requestId: 'req_456',
          timestamp: Date.now(),
          duration: 150
        }
      };

      expect(response.success).toBe(true);
      expect(response.data?.messageId).toBe('msg_123');
      expect(response.metadata?.requestId).toBe('req_456');
    });

    it('should handle error response', () => {
      const response: UnifiedClientResponse = {
        success: false,
        error: {
          message: 'Transaction failed',
          code: 'TX_FAILED',
          details: { reason: 'Insufficient gas' }
        },
        chainType: ChainType.EVM,
        metadata: {
          timestamp: Date.now()
        }
      };

      expect(response.success).toBe(false);
      expect(response.error?.message).toBe('Transaction failed');
      expect(response.error?.code).toBe('TX_FAILED');
    });
  });

  describe('BatchOperationResponse', () => {
    it('should handle batch operation results', () => {
      const response: BatchOperationResponse = {
        transactionHash: '0x123abc',
        chainType: ChainType.EVM,
        success: true,
        results: [
          { success: true, data: { id: '1' } },
          { success: false, error: 'Failed operation' },
          { success: true, data: { id: '3' } }
        ],
        successCount: 2,
        failureCount: 1
      };

      expect(response.results).toHaveLength(3);
      expect(response.successCount).toBe(2);
      expect(response.failureCount).toBe(1);
      expect(response.results[0].success).toBe(true);
      expect(response.results[1].success).toBe(false);
    });
  });

  describe('MessageHistoryResponse', () => {
    it('should handle message history with pagination', () => {
      const response: MessageHistoryResponse = {
        messages: [
          {
            messageId: 'msg_1',
            transactionHash: '0x123',
            sender: '0xsender',
            recipient: '0xrecipient',
            subject: 'Subject 1',
            body: 'Body 1',
            timestamp: Date.now(),
            isPriority: false,
            fee: BigInt(1000)
          }
        ],
        totalCount: 100,
        hasMore: true,
        nextCursor: 'cursor_abc'
      };

      expect(response.messages).toHaveLength(1);
      expect(response.totalCount).toBe(100);
      expect(response.hasMore).toBe(true);
      expect(response.nextCursor).toBe('cursor_abc');
    });

    it('should handle last page of results', () => {
      const response: MessageHistoryResponse = {
        messages: [],
        totalCount: 5,
        hasMore: false
      };

      expect(response.hasMore).toBe(false);
      expect(response.nextCursor).toBeUndefined();
    });
  });

  describe('ContractError', () => {
    it('should handle validation error', () => {
      const error: ContractError = {
        type: 'ValidationError',
        message: 'Invalid input parameter',
        details: {
          field: 'recipient',
          expectedValue: 'valid address',
          actualValue: 'invalid'
        },
        suggestedAction: 'Please provide a valid recipient address'
      };

      expect(error.type).toBe('ValidationError');
      expect(error.details?.field).toBe('recipient');
      expect(error.suggestedAction).toBe('Please provide a valid recipient address');
    });

    it('should support all error types', () => {
      const errorTypes: Array<ContractError['type']> = [
        'ValidationError',
        'InsufficientFunds',
        'Unauthorized',
        'ContractError',
        'NetworkError'
      ];

      errorTypes.forEach(type => {
        const error: ContractError = {
          type,
          message: `Test ${type}`
        };

        expect(error.type).toBe(type);
      });
    });
  });

  describe('Type Guards', () => {
    describe('isEVMResponse', () => {
      it('should identify EVM responses', () => {
        const evmResponse: TransactionReceipt = {
          transactionHash: '0x123',
          chainType: ChainType.EVM,
          success: true
        };

        const solanaResponse: TransactionReceipt = {
          transactionHash: 'abc123',
          chainType: ChainType.SOLANA,
          success: true
        };

        expect(isEVMResponse(evmResponse)).toBe(true);
        expect(isEVMResponse(solanaResponse)).toBe(false);
      });
    });

    describe('isSolanaResponse', () => {
      it('should identify Solana responses', () => {
        const evmResponse: TransactionReceipt = {
          transactionHash: '0x123',
          chainType: ChainType.EVM,
          success: true
        };

        const solanaResponse: TransactionReceipt = {
          transactionHash: 'abc123',
          chainType: ChainType.SOLANA,
          success: true
        };

        expect(isSolanaResponse(evmResponse)).toBe(false);
        expect(isSolanaResponse(solanaResponse)).toBe(true);
      });
    });

    describe('isMailboxErrorResponse', () => {
      it('should identify error responses', () => {
        const successResponse: UnifiedClientResponse = {
          success: true,
          data: { result: 'ok' },
          chainType: ChainType.EVM,
          metadata: { timestamp: Date.now() }
        };

        const errorResponse: UnifiedClientResponse = {
          success: false,
          error: {
            message: 'Something went wrong',
            code: 'ERROR'
          },
          chainType: ChainType.EVM,
          metadata: { timestamp: Date.now() }
        };

        expect(isMailboxErrorResponse(successResponse)).toBe(false);
        expect(isMailboxErrorResponse(errorResponse)).toBe(true);
      });

      it('should require error field to be present', () => {
        const noErrorResponse: UnifiedClientResponse = {
          success: false,
          chainType: ChainType.EVM,
          metadata: { timestamp: Date.now() }
        };

        expect(isMailboxErrorResponse(noErrorResponse)).toBe(false);
      });
    });
  });
});