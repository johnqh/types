import { describe, it, expect } from 'vitest';
import {
  formatRelativeTime,
  formatTimestamp,
  parseDate,
  isDateInRange,
  addDays,
  addHours,
} from '../../../src/utils/formatting/date';

describe('Date Formatting', () => {
  describe('formatRelativeTime', () => {
    it('should return "just now" for recent dates', () => {
      expect(formatRelativeTime(new Date())).toBe('just now');
    });

    it('should return "Invalid date" for invalid input', () => {
      expect(formatRelativeTime('not-a-date')).toBe('Invalid date');
    });

    it('should format minutes ago', () => {
      const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
      expect(formatRelativeTime(fiveMinutesAgo)).toBe('5 minutes ago');
    });

    it('should use singular "1 minute ago"', () => {
      const oneMinuteAgo = Date.now() - 90 * 1000;
      expect(formatRelativeTime(oneMinuteAgo)).toBe('1 minute ago');
    });

    it('should format hours ago', () => {
      const threeHoursAgo = Date.now() - 3 * 60 * 60 * 1000;
      expect(formatRelativeTime(threeHoursAgo)).toBe('3 hours ago');
    });

    it('should use singular "1 hour ago"', () => {
      const oneHourAgo = Date.now() - 90 * 60 * 1000;
      expect(formatRelativeTime(oneHourAgo)).toBe('1 hour ago');
    });

    it('should format days ago', () => {
      const threeDaysAgo = Date.now() - 3 * 24 * 60 * 60 * 1000;
      expect(formatRelativeTime(threeDaysAgo)).toBe('3 days ago');
    });

    it('should accept Date objects', () => {
      const date = new Date(Date.now() - 5 * 60 * 1000);
      expect(formatRelativeTime(date)).toBe('5 minutes ago');
    });

    it('should accept ISO string', () => {
      const isoString = new Date(
        Date.now() - 5 * 60 * 1000
      ).toISOString();
      expect(formatRelativeTime(isoString)).toBe('5 minutes ago');
    });

    it('should accept timestamp number', () => {
      const timestamp = Date.now() - 5 * 60 * 1000;
      expect(formatRelativeTime(timestamp)).toBe('5 minutes ago');
    });
  });

  describe('formatTimestamp', () => {
    it('should return ISO string', () => {
      const ts = new Date('2024-01-15T12:00:00Z').getTime();
      expect(formatTimestamp(ts)).toBe('2024-01-15T12:00:00.000Z');
    });

    it('should handle zero timestamp', () => {
      expect(formatTimestamp(0)).toBe('1970-01-01T00:00:00.000Z');
    });
  });

  describe('parseDate', () => {
    it('should parse valid date string', () => {
      const result = parseDate('2024-01-15');
      expect(result).toBeInstanceOf(Date);
    });

    it('should parse ISO string', () => {
      const result = parseDate('2024-01-15T12:00:00Z');
      expect(result).toBeInstanceOf(Date);
      expect(result?.toISOString()).toBe('2024-01-15T12:00:00.000Z');
    });

    it('should return null for invalid date', () => {
      expect(parseDate('not-a-date')).toBeNull();
    });

    it('should return null for empty string', () => {
      expect(parseDate('')).toBeNull();
    });
  });

  describe('isDateInRange', () => {
    it('should return true for date within range', () => {
      const start = new Date('2024-01-01');
      const end = new Date('2024-12-31');
      const date = new Date('2024-06-15');
      expect(isDateInRange(date, start, end)).toBe(true);
    });

    it('should return true for date at start of range', () => {
      const start = new Date('2024-01-01');
      const end = new Date('2024-12-31');
      expect(isDateInRange(start, start, end)).toBe(true);
    });

    it('should return true for date at end of range', () => {
      const start = new Date('2024-01-01');
      const end = new Date('2024-12-31');
      expect(isDateInRange(end, start, end)).toBe(true);
    });

    it('should return false for date before range', () => {
      const start = new Date('2024-01-01');
      const end = new Date('2024-12-31');
      const date = new Date('2023-12-31');
      expect(isDateInRange(date, start, end)).toBe(false);
    });

    it('should return false for date after range', () => {
      const start = new Date('2024-01-01');
      const end = new Date('2024-12-31');
      const date = new Date('2025-01-01');
      expect(isDateInRange(date, start, end)).toBe(false);
    });
  });

  describe('addDays', () => {
    it('should add positive days', () => {
      const date = new Date('2024-01-15T00:00:00Z');
      const result = addDays(date, 5);
      expect(result.toISOString()).toBe('2024-01-20T00:00:00.000Z');
    });

    it('should subtract negative days', () => {
      const date = new Date('2024-01-15T00:00:00Z');
      const result = addDays(date, -5);
      expect(result.toISOString()).toBe('2024-01-10T00:00:00.000Z');
    });

    it('should not mutate original date', () => {
      const date = new Date('2024-01-15T00:00:00Z');
      const original = date.getTime();
      addDays(date, 5);
      expect(date.getTime()).toBe(original);
    });

    it('should handle month boundaries', () => {
      const date = new Date('2024-01-30T00:00:00Z');
      const result = addDays(date, 5);
      expect(result.getMonth()).toBe(1); // February (0-indexed)
    });
  });

  describe('addHours', () => {
    it('should add positive hours', () => {
      const date = new Date('2024-01-15T10:00:00Z');
      const result = addHours(date, 3);
      expect(result.toISOString()).toBe('2024-01-15T13:00:00.000Z');
    });

    it('should subtract negative hours', () => {
      const date = new Date('2024-01-15T10:00:00Z');
      const result = addHours(date, -3);
      expect(result.toISOString()).toBe('2024-01-15T07:00:00.000Z');
    });

    it('should not mutate original date', () => {
      const date = new Date('2024-01-15T10:00:00Z');
      const original = date.getTime();
      addHours(date, 3);
      expect(date.getTime()).toBe(original);
    });

    it('should handle day boundaries', () => {
      const date = new Date('2024-01-15T23:00:00Z');
      const result = addHours(date, 2);
      expect(result.getUTCDate()).toBe(16);
    });
  });
});
