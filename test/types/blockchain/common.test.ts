import { describe, it, expect } from 'vitest';
import {
  isEvmAddress,
  isSolanaAddress,
  isEvmRecipient,
  isSolanaRecipient,
  MessageType,
  TransactionStatus,
  PROTOCOL_CONSTANTS,
} from '../../../src/types/blockchain/common';

describe('Blockchain Common', () => {
  describe('isEvmAddress', () => {
    it('should return true for valid EVM address', () => {
      expect(
        isEvmAddress('0x1234567890123456789012345678901234567890')
      ).toBe(true);
    });

    it('should return true for all-lowercase hex', () => {
      expect(
        isEvmAddress('0xabcdef1234567890123456789012345678901234')
      ).toBe(true);
    });

    it('should return true for all-uppercase hex', () => {
      expect(
        isEvmAddress('0xABCDEF1234567890123456789012345678901234')
      ).toBe(true);
    });

    it('should return true for mixed-case hex', () => {
      expect(
        isEvmAddress('0xAbCdEf1234567890123456789012345678901234')
      ).toBe(true);
    });

    it('should return false for address without 0x prefix', () => {
      expect(
        isEvmAddress('1234567890123456789012345678901234567890')
      ).toBe(false);
    });

    it('should return false for address that is too short', () => {
      expect(isEvmAddress('0x123456789012345678901234567890123456789')).toBe(
        false
      );
    });

    it('should return false for address that is too long', () => {
      expect(
        isEvmAddress('0x12345678901234567890123456789012345678901')
      ).toBe(false);
    });

    it('should return false for invalid hex characters', () => {
      expect(
        isEvmAddress('0xGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG')
      ).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(isEvmAddress('')).toBe(false);
    });

    it('should return false for Solana address', () => {
      expect(
        isEvmAddress('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v')
      ).toBe(false);
    });
  });

  describe('isSolanaAddress', () => {
    it('should return true for valid Solana address', () => {
      expect(
        isSolanaAddress(
          'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
        )
      ).toBe(true);
    });

    it('should return true for minimum-length Solana address', () => {
      expect(
        isSolanaAddress('So11111111111111111111111111111112')
      ).toBe(true);
    });

    it('should return false for address too short', () => {
      expect(isSolanaAddress('ABC123')).toBe(false);
    });

    it('should return false for address too long', () => {
      const tooLong = 'A'.repeat(50);
      expect(isSolanaAddress(tooLong)).toBe(false);
    });

    it('should return false for address with invalid base58 chars (O)', () => {
      expect(
        isSolanaAddress('O1111111111111111111111111111111111111111')
      ).toBe(false);
    });

    it('should return false for address with invalid base58 chars (0)', () => {
      expect(
        isSolanaAddress('01111111111111111111111111111111111111111')
      ).toBe(false);
    });

    it('should return false for address with invalid base58 chars (I)', () => {
      expect(
        isSolanaAddress('I1111111111111111111111111111111111111111')
      ).toBe(false);
    });

    it('should return false for address with invalid base58 chars (l)', () => {
      expect(
        isSolanaAddress('l1111111111111111111111111111111111111111')
      ).toBe(false);
    });

    it('should return false for EVM address', () => {
      expect(
        isSolanaAddress('0x1234567890123456789012345678901234567890')
      ).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(isSolanaAddress('')).toBe(false);
    });
  });

  describe('isEvmRecipient', () => {
    it('should return true for valid EVM address', () => {
      expect(
        isEvmRecipient('0x1234567890123456789012345678901234567890')
      ).toBe(true);
    });

    it('should return false for Solana address', () => {
      expect(
        isEvmRecipient(
          'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
        )
      ).toBe(false);
    });
  });

  describe('isSolanaRecipient', () => {
    it('should return true for valid Solana address', () => {
      expect(
        isSolanaRecipient(
          'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
        )
      ).toBe(true);
    });

    it('should return false for EVM address', () => {
      expect(
        isSolanaRecipient('0x1234567890123456789012345678901234567890')
      ).toBe(false);
    });
  });

  describe('MessageType', () => {
    it('should have correct values', () => {
      expect(MessageType.STANDARD).toBe('standard');
      expect(MessageType.PRIORITY).toBe('priority');
      expect(MessageType.PREPARED_STANDARD).toBe('prepared_standard');
      expect(MessageType.PREPARED_PRIORITY).toBe('prepared_priority');
    });

    it('should have exactly 4 values', () => {
      expect(Object.values(MessageType)).toHaveLength(4);
    });
  });

  describe('TransactionStatus', () => {
    it('should have correct values', () => {
      expect(TransactionStatus.SUCCESS).toBe('success');
      expect(TransactionStatus.FAILED).toBe('failed');
      expect(TransactionStatus.PENDING).toBe('pending');
    });

    it('should have exactly 3 values', () => {
      expect(Object.values(TransactionStatus)).toHaveLength(3);
    });
  });

  describe('PROTOCOL_CONSTANTS', () => {
    it('should have correct SEND_FEE', () => {
      expect(PROTOCOL_CONSTANTS.SEND_FEE).toBe(100_000n);
    });

    it('should have correct CLAIM_PERIOD in seconds', () => {
      expect(PROTOCOL_CONSTANTS.CLAIM_PERIOD).toBe(60 * 24 * 60 * 60);
    });

    it('should have correct revenue shares totaling 100', () => {
      expect(
        PROTOCOL_CONSTANTS.REVENUE_SHARES.SENDER +
          PROTOCOL_CONSTANTS.REVENUE_SHARES.OWNER
      ).toBe(100);
    });

    it('should have correct USDC_DECIMALS', () => {
      expect(PROTOCOL_CONSTANTS.USDC_DECIMALS).toBe(6);
    });

    it('should have correct MAX_LENGTHS', () => {
      expect(PROTOCOL_CONSTANTS.MAX_LENGTHS.SUBJECT).toBe(200);
      expect(PROTOCOL_CONSTANTS.MAX_LENGTHS.BODY).toBe(2000);
      expect(PROTOCOL_CONSTANTS.MAX_LENGTHS.MAIL_ID).toBe(100);
    });
  });
});
