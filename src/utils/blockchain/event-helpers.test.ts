import { describe, it, expect } from 'vitest';
import {
  createMultiChainId,
  createUserMultiChainId,
  createChainStatsId,
  createDelegationId,
  formatBigInt,
  isZeroAddress,
  isTestNet,
  validateEventArgs,
} from './event-helpers';

describe('Event Helpers', () => {
  describe('ID Generation', () => {
    it('should create multi-chain ID correctly', () => {
      const result = createMultiChainId(1, '0x123abc', 5);
      expect(result).toBe('1-0x123abc-5');
    });

    it('should create user multi-chain ID with lowercase address', () => {
      const result = createUserMultiChainId(137, '0xABC123DEF');
      expect(result).toBe('137-0xabc123def');
    });

    it('should create chain stats ID', () => {
      const result = createChainStatsId(42161);
      expect(result).toBe('42161-global');
    });

    it('should create delegation ID with lowercase address', () => {
      const result = createDelegationId('0xABC123', true);
      expect(result).toBe('0xabc123-true');

      const result2 = createDelegationId('0xDEF456', false);
      expect(result2).toBe('0xdef456-false');
    });
  });

  describe('BigInt Formatting', () => {
    it('should format whole numbers correctly', () => {
      const result = formatBigInt(BigInt('1000000000000000000'), 18);
      expect(result).toBe('1');
    });

    it('should format decimal numbers correctly', () => {
      const result = formatBigInt(BigInt('1500000000000000000'), 18);
      expect(result).toBe('1.5');
    });

    it('should handle zero correctly', () => {
      const result = formatBigInt(BigInt('0'), 18);
      expect(result).toBe('0');
    });

    it('should handle custom decimals', () => {
      const result = formatBigInt(BigInt('123456'), 6);
      expect(result).toBe('0.123456');
    });

    it('should remove trailing zeros', () => {
      const result = formatBigInt(BigInt('1100000000000000000'), 18);
      expect(result).toBe('1.1');
    });
  });

  describe('Address Validation', () => {
    it('should identify zero address correctly', () => {
      expect(isZeroAddress('0x0000000000000000000000000000000000000000')).toBe(
        true
      );
      expect(isZeroAddress('0X0000000000000000000000000000000000000000')).toBe(
        true
      );
    });

    it('should identify non-zero address correctly', () => {
      expect(isZeroAddress('0x1234567890123456789012345678901234567890')).toBe(
        false
      );
      expect(isZeroAddress('0x000000000000000000000000000000000000000a')).toBe(
        false
      );
    });
  });

  describe('Testnet Detection', () => {
    it('should identify EVM testnets correctly', () => {
      expect(isTestNet(31337)).toBe(true); // Hardhat
      expect(isTestNet(11155111)).toBe(true); // Sepolia
      expect(isTestNet(80001)).toBe(true); // Polygon Mumbai
      expect(isTestNet(421614)).toBe(true); // Arbitrum Sepolia
    });

    it('should identify Solana testnets correctly', () => {
      expect(isTestNet(-102)).toBe(true); // Solana Devnet
      expect(isTestNet(-103)).toBe(true); // Solana Testnet
      expect(isTestNet(-104)).toBe(true); // Solana Localnet
    });

    it('should identify mainnets correctly', () => {
      expect(isTestNet(1)).toBe(false); // Ethereum
      expect(isTestNet(137)).toBe(false); // Polygon
      expect(isTestNet(42161)).toBe(false); // Arbitrum
      expect(isTestNet(-101)).toBe(false); // Solana Mainnet
    });
  });

  describe('Event Args Validation', () => {
    it('should validate required fields correctly', () => {
      const args = { field1: 'value1', field2: 'value2', field3: null };
      expect(validateEventArgs(args, ['field1', 'field2'])).toBe(true);
    });

    it('should fail validation for missing fields', () => {
      const args = { field1: 'value1' };
      expect(validateEventArgs(args, ['field1', 'field2'])).toBe(false);
    });

    it('should fail validation for null fields', () => {
      const args = { field1: 'value1', field2: null };
      expect(validateEventArgs(args, ['field1', 'field2'])).toBe(false);
    });

    it('should fail validation for undefined fields', () => {
      const args = { field1: 'value1', field2: undefined };
      expect(validateEventArgs(args, ['field1', 'field2'])).toBe(false);
    });

    it('should pass validation with empty required fields array', () => {
      const args = { field1: 'value1' };
      expect(validateEventArgs(args, [])).toBe(true);
    });
  });
});
