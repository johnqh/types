/**
 * Date formatting utilities.
 *
 * @since 1.0.0
 */

import { Optional } from '../../types/common.js';

/**
 * Format a date for display in email list.
 * Returns time for today, "Yesterday", day name for the past week,
 * or a short date for older messages.
 *
 * @param date - Date object or ISO date string
 * @returns Formatted date string
 * @since 1.0.0
 *
 * @example
 * ```typescript
 * formatEmailDate(new Date()); // "3:45 PM"
 * formatEmailDate('2024-01-15'); // "Jan 15"
 * ```
 */
export function formatEmailDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    return 'Invalid date';
  }

  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // Today: show time only
  if (diffDays === 0) {
    return dateObj.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }

  // Yesterday
  if (diffDays === 1) {
    return 'Yesterday';
  }

  // Within a week: show day name
  if (diffDays < 7) {
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
    });
  }

  // Within this year: show month and day
  if (dateObj.getFullYear() === now.getFullYear()) {
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  }

  // Different year: show full date
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Format a Unix timestamp (ms) to an ISO 8601 string.
 *
 * @param timestamp - Unix timestamp in milliseconds
 * @returns ISO 8601 date string
 * @since 1.0.0
 *
 * @example
 * ```typescript
 * formatTimestamp(1700000000000); // "2023-11-14T22:13:20.000Z"
 * ```
 */
export function formatTimestamp(timestamp: number): string {
  return new Date(timestamp).toISOString();
}

/**
 * Format a date to a relative time string (e.g., "2 hours ago").
 *
 * @param date - Date object, ISO string, or Unix timestamp (ms)
 * @returns Human-readable relative time string
 * @since 1.0.0
 *
 * @example
 * ```typescript
 * formatRelativeTime(Date.now() - 3600000); // "1 hour ago"
 * formatRelativeTime('2024-01-01'); // "1 year ago"
 * ```
 */
export function formatRelativeTime(date: Date | string | number): string {
  const dateObj =
    typeof date === 'string' || typeof date === 'number'
      ? new Date(date)
      : date;

  if (isNaN(dateObj.getTime())) {
    return 'Invalid date';
  }

  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffSeconds < 60) {
    return 'just now';
  }

  if (diffMinutes < 60) {
    return diffMinutes === 1 ? '1 minute ago' : `${diffMinutes} minutes ago`;
  }

  if (diffHours < 24) {
    return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
  }

  if (diffDays < 7) {
    return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
  }

  if (diffWeeks < 4) {
    return diffWeeks === 1 ? '1 week ago' : `${diffWeeks} weeks ago`;
  }

  if (diffMonths < 12) {
    return diffMonths === 1 ? '1 month ago' : `${diffMonths} months ago`;
  }

  return diffYears === 1 ? '1 year ago' : `${diffYears} years ago`;
}

/**
 * Parse a date string safely, returning null on invalid input.
 *
 * @param dateString - Date string to parse
 * @returns Parsed Date or null if invalid
 * @since 1.0.0
 *
 * @example
 * ```typescript
 * parseDate('2024-01-15'); // Date object
 * parseDate('not-a-date'); // null
 * ```
 */
export function parseDate(dateString: string): Optional<Date> {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return null;
    }
    return date;
  } catch {
    return null;
  }
}

/**
 * Check if a date falls within an inclusive range.
 *
 * @param date - Date to check
 * @param startDate - Range start (inclusive)
 * @param endDate - Range end (inclusive)
 * @returns True if date is within the range
 * @since 1.0.0
 */
export function isDateInRange(
  date: Date,
  startDate: Date,
  endDate: Date
): boolean {
  return date >= startDate && date <= endDate;
}

/**
 * Add (or subtract) days from a date. Returns a new Date instance.
 *
 * @param date - Starting date
 * @param days - Number of days to add (negative to subtract)
 * @returns New Date with days added
 * @since 1.0.0
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Add (or subtract) hours from a date. Returns a new Date instance.
 *
 * @param date - Starting date
 * @param hours - Number of hours to add (negative to subtract)
 * @returns New Date with hours added
 * @since 1.0.0
 */
export function addHours(date: Date, hours: number): Date {
  const result = new Date(date);
  result.setHours(result.getHours() + hours);
  return result;
}
