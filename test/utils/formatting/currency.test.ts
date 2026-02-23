import { describe, it, expect } from 'vitest';
import {
  formatUSDC,
  parseUSDC,
  USDC_DECIMALS,
  CLAIM_PERIOD_DAYS,
} from '../../../src/utils/formatting/currency';

describe('Currency Formatting', () => {
  describe('constants', () => {
    it('should have correct USDC_DECIMALS', () => {
      expect(USDC_DECIMALS).toBe(6);
    });

    it('should have correct CLAIM_PERIOD_DAYS', () => {
      expect(CLAIM_PERIOD_DAYS).toBe(60);
    });
  });

  describe('formatUSDC', () => {
    it('should format 1 USDC', () => {
      expect(formatUSDC(1_000_000)).toBe('1.00');
    });

    it('should format 2.50 USDC', () => {
      expect(formatUSDC(2_500_000)).toBe('2.50');
    });

    it('should format 0 USDC', () => {
      expect(formatUSDC(0)).toBe('0.00');
    });

    it('should format fractional USDC', () => {
      expect(formatUSDC(100_000)).toBe('0.10');
    });

    it('should format large amounts', () => {
      expect(formatUSDC(1_000_000_000)).toBe('1000.00');
    });

    it('should format very small amounts', () => {
      expect(formatUSDC(1)).toBe('0.00');
    });

    it('should format 0.01 USDC', () => {
      expect(formatUSDC(10_000)).toBe('0.01');
    });
  });

  describe('parseUSDC', () => {
    it('should parse 1.00 to smallest units', () => {
      expect(parseUSDC('1.00')).toBe(1_000_000);
    });

    it('should parse 2.50 to smallest units', () => {
      expect(parseUSDC('2.50')).toBe(2_500_000);
    });

    it('should parse 0 to 0', () => {
      expect(parseUSDC('0')).toBe(0);
    });

    it('should parse whole number string', () => {
      expect(parseUSDC('5')).toBe(5_000_000);
    });

    it('should parse string with many decimals (floors)', () => {
      expect(parseUSDC('1.999999')).toBe(1_999_999);
    });

    it('should handle NaN input gracefully', () => {
      expect(parseUSDC('not-a-number')).toBeNaN();
    });
  });
});
