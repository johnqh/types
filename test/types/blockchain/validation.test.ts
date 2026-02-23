import { describe, it, expect } from 'vitest';
import {
  validateAddress,
  validateAmount,
  validateDomain,
  validateMessage,
} from '../../../src/types/blockchain/validation';
import { ChainType } from '../../../src/types/business/enums';

describe('Blockchain Validation', () => {
  describe('validateAddress', () => {
    it('should accept valid EVM address', () => {
      expect(
        validateAddress(
          '0x1234567890123456789012345678901234567890',
          ChainType.EVM
        )
      ).toBe(true);
    });

    it('should accept valid Solana address', () => {
      expect(
        validateAddress(
          'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
          ChainType.SOLANA
        )
      ).toBe(true);
    });

    it('should throw for empty address', () => {
      expect(() => validateAddress('', ChainType.EVM)).toThrow(
        'Address cannot be empty'
      );
    });

    it('should throw for invalid EVM address format', () => {
      expect(() =>
        validateAddress('not-an-address', ChainType.EVM)
      ).toThrow('Invalid evm address format');
    });

    it('should throw for invalid Solana address format', () => {
      expect(() =>
        validateAddress('0x1234567890123456789012345678901234567890', ChainType.SOLANA)
      ).toThrow('Invalid solana address format');
    });

    it('should throw for EVM address that is too short', () => {
      expect(() =>
        validateAddress('0x1234', ChainType.EVM)
      ).toThrow('Invalid evm address format');
    });

    it('should throw for EVM address with invalid hex characters', () => {
      expect(() =>
        validateAddress(
          '0xGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG',
          ChainType.EVM
        )
      ).toThrow('Invalid evm address format');
    });
  });

  describe('validateAmount', () => {
    it('should accept valid string amount', () => {
      expect(validateAmount('1000')).toBe(1000n);
    });

    it('should accept zero', () => {
      expect(validateAmount('0')).toBe(0n);
    });

    it('should accept valid number amount', () => {
      expect(validateAmount(500)).toBe(500n);
    });

    it('should accept valid bigint amount', () => {
      expect(validateAmount(42n)).toBe(42n);
    });

    it('should floor decimal numbers', () => {
      expect(validateAmount(10.9)).toBe(10n);
    });

    it('should throw for negative amount', () => {
      expect(() => validateAmount(-1)).toThrow('Amount cannot be negative');
    });

    it('should throw for negative string amount', () => {
      expect(() => validateAmount('-5')).toThrow(
        'Amount cannot be negative'
      );
    });

    it('should throw for negative bigint amount', () => {
      expect(() => validateAmount(-100n)).toThrow(
        'Amount cannot be negative'
      );
    });

    it('should throw for empty string', () => {
      expect(() => validateAmount('')).toThrow('Invalid amount format');
    });

    it('should throw for whitespace-only string', () => {
      expect(() => validateAmount('   ')).toThrow('Invalid amount format');
    });

    it('should throw for non-numeric string', () => {
      expect(() => validateAmount('abc')).toThrow('Invalid amount format');
    });

    it('should throw for decimal string', () => {
      expect(() => validateAmount('1.5')).toThrow('Invalid amount format');
    });

    it('should throw for NaN', () => {
      expect(() => validateAmount(NaN)).toThrow('Invalid amount format');
    });

    it('should throw for Infinity', () => {
      expect(() => validateAmount(Infinity)).toThrow(
        'Invalid amount format'
      );
    });

    it('should throw for -Infinity', () => {
      expect(() => validateAmount(-Infinity)).toThrow(
        'Invalid amount format'
      );
    });

    it('should accept large bigint values', () => {
      const large = BigInt('999999999999999999999');
      expect(validateAmount(large)).toBe(large);
    });
  });

  describe('validateDomain', () => {
    it('should accept valid domain', () => {
      expect(validateDomain('example.com')).toBe(true);
    });

    it('should accept single-label domain', () => {
      expect(validateDomain('localhost')).toBe(true);
    });

    it('should accept domain with hyphens', () => {
      expect(validateDomain('my-domain.co')).toBe(true);
    });

    it('should accept multi-level domain', () => {
      expect(validateDomain('sub.example.co.uk')).toBe(true);
    });

    it('should throw for empty domain', () => {
      expect(() => validateDomain('')).toThrow('Domain cannot be empty');
    });

    it('should throw for domain exceeding 100 characters', () => {
      const longDomain = 'a'.repeat(101);
      expect(() => validateDomain(longDomain)).toThrow(
        'Domain cannot exceed 100 characters'
      );
    });

    it('should throw for domain starting with hyphen', () => {
      expect(() => validateDomain('-example.com')).toThrow(
        'Invalid domain format'
      );
    });

    it('should throw for domain with spaces', () => {
      expect(() => validateDomain('exam ple.com')).toThrow(
        'Invalid domain format'
      );
    });

    it('should throw for domain with special characters', () => {
      expect(() => validateDomain('exam!ple.com')).toThrow(
        'Invalid domain format'
      );
    });
  });

  describe('validateMessage', () => {
    it('should accept valid message', () => {
      expect(validateMessage('Hello', 'World')).toBe(true);
    });

    it('should throw for empty subject', () => {
      expect(() => validateMessage('', 'Body')).toThrow(
        'Message subject cannot be empty'
      );
    });

    it('should throw for empty body', () => {
      expect(() => validateMessage('Subject', '')).toThrow(
        'Message body cannot be empty'
      );
    });

    it('should throw for subject exceeding 200 characters', () => {
      const longSubject = 'a'.repeat(201);
      expect(() => validateMessage(longSubject, 'Body')).toThrow(
        'Message subject cannot exceed 200 characters'
      );
    });

    it('should accept subject at exactly 200 characters', () => {
      const subject = 'a'.repeat(200);
      expect(validateMessage(subject, 'Body')).toBe(true);
    });

    it('should throw for body exceeding 10000 characters', () => {
      const longBody = 'a'.repeat(10001);
      expect(() => validateMessage('Subject', longBody)).toThrow(
        'Message body cannot exceed 10000 characters'
      );
    });

    it('should accept body at exactly 10000 characters', () => {
      const body = 'a'.repeat(10000);
      expect(validateMessage('Subject', body)).toBe(true);
    });
  });
});
