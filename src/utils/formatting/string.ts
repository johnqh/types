/**
 * String formatting and manipulation utilities.
 *
 * @since 1.0.0
 */

import { Optional } from '../../types/common';

/**
 * Truncate a string to a maximum length with a suffix (default `...`).
 *
 * @param str - Input string
 * @param maxLength - Maximum allowed length including suffix
 * @param suffix - Truncation suffix (default: `'...'`)
 * @returns Truncated string or original if within limit
 * @since 1.0.0
 *
 * @example
 * ```typescript
 * truncate('Hello, World!', 8); // "Hello..."
 * ```
 */
export function truncate(
  str: string,
  maxLength: number,
  suffix = '...'
): string {
  if (!str || str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * Capitalize the first letter of a string.
 *
 * @param str - Input string
 * @returns String with first character uppercased
 * @since 1.0.0
 *
 * @example
 * ```typescript
 * capitalize('hello'); // "Hello"
 * ```
 */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Convert a string to title case (capitalize each word).
 *
 * @param str - Input string
 * @returns Title-cased string
 * @since 1.0.0
 *
 * @example
 * ```typescript
 * toTitleCase('hello world'); // "Hello World"
 * ```
 */
export function toTitleCase(str: string): string {
  if (!str) return str;
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ');
}

/**
 * Convert a string to kebab-case.
 *
 * @param str - Input string (camelCase, PascalCase, spaces, or underscores)
 * @returns Kebab-cased string
 * @since 1.0.0
 *
 * @example
 * ```typescript
 * toKebabCase('helloWorld'); // "hello-world"
 * ```
 */
export function toKebabCase(str: string): string {
  if (!str) return str;
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

/**
 * Convert a string to camelCase.
 *
 * @param str - Input string (kebab-case, snake_case, or spaces)
 * @returns camelCased string
 * @since 1.0.0
 *
 * @example
 * ```typescript
 * toCamelCase('hello-world'); // "helloWorld"
 * ```
 */
export function toCamelCase(str: string): string {
  if (!str) return str;
  return str
    .replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''))
    .replace(/^./, (char) => char.toLowerCase());
}

/**
 * Convert a string to snake_case.
 *
 * @param str - Input string (camelCase, kebab-case, or spaces)
 * @returns snake_cased string
 * @since 1.0.0
 *
 * @example
 * ```typescript
 * toSnakeCase('helloWorld'); // "hello_world"
 * ```
 */
export function toSnakeCase(str: string): string {
  if (!str) return str;
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase();
}

/**
 * Collapse consecutive whitespace to a single space and trim.
 *
 * @param str - Input string
 * @returns Normalized string
 * @since 1.0.0
 */
export function normalizeWhitespace(str: string): string {
  if (!str) return str;
  return str.replace(/\s+/g, ' ').trim();
}

/**
 * Check if a string is empty, undefined, null, or only whitespace.
 *
 * @param str - Input string (may be nullish)
 * @returns True if blank
 * @since 1.0.0
 */
export function isBlank(str?: Optional<string>): boolean {
  return !str || str.trim().length === 0;
}

/**
 * Type guard: check if a string is not empty and not only whitespace.
 *
 * @param str - Input string (may be nullish)
 * @returns True (and narrows to `string`) if not blank
 * @since 1.0.0
 */
export function isNotBlank(str?: Optional<string>): str is string {
  return !isBlank(str);
}

/**
 * Escape HTML special characters (`&`, `<`, `>`, `"`, `'`).
 *
 * @param str - Input string
 * @returns HTML-escaped string
 * @since 1.0.0
 *
 * @example
 * ```typescript
 * escapeHtml('<b>Hi</b>'); // "&lt;b&gt;Hi&lt;/b&gt;"
 * ```
 */
export function escapeHtml(str: string): string {
  if (!str) return str;
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return str.replace(/[&<>"']/g, (char) => htmlEscapes[char]);
}

/**
 * Remove all HTML tags from a string.
 *
 * @param str - Input string with HTML
 * @returns Plain text with tags removed
 * @since 1.0.0
 *
 * @example
 * ```typescript
 * stripHtml('<p>Hello <b>world</b></p>'); // "Hello world"
 * ```
 */
export function stripHtml(str: string): string {
  if (!str) return str;
  return str.replace(/<[^>]*>/g, '');
}

/**
 * Extract initials from a name (e.g., "John Doe" -> "JD").
 *
 * @param name - Full name
 * @param maxInitials - Maximum number of initials (default: 2)
 * @returns Uppercase initials
 * @since 1.0.0
 */
export function getInitials(name: string, maxInitials = 2): string {
  if (!name) return '';

  const words = name.trim().split(/\s+/);
  const initials = words
    .slice(0, maxInitials)
    .map((word) => word.charAt(0).toUpperCase())
    .join('');

  return initials;
}

/**
 * Format bytes to a human-readable size string (e.g., "1.5 MB").
 *
 * @param bytes - Size in bytes
 * @param decimals - Decimal places (default: 2)
 * @returns Formatted string like "1.5 MB"
 * @since 1.0.0
 *
 * @example
 * ```typescript
 * formatBytes(1536); // "1.5 KB"
 * formatBytes(0);    // "0 Bytes"
 * ```
 */
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Generate a random string of a given length.
 *
 * @param length - Desired string length
 * @param charset - Character set: `'alpha'`, `'numeric'`,
 *   `'alphanumeric'` (default), `'hex'`, or a custom string
 * @returns Random string
 * @since 1.0.0
 */
export function randomString(length: number, charset = 'alphanumeric'): string {
  let chars: string;

  switch (charset) {
    case 'alpha':
      chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      break;
    case 'numeric':
      chars = '0123456789';
      break;
    case 'alphanumeric':
      chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      break;
    case 'hex':
      chars = '0123456789abcdef';
      break;
    default:
      chars = charset;
  }

  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}

/**
 * Pluralize a word based on count.
 * Appends `'s'` by default when count is not 1.
 *
 * @param count - Item count
 * @param singular - Singular form
 * @param plural - Optional explicit plural form
 * @returns Singular or plural form based on count
 * @since 1.0.0
 *
 * @example
 * ```typescript
 * pluralize(1, 'item');  // "item"
 * pluralize(3, 'item');  // "items"
 * pluralize(2, 'child', 'children'); // "children"
 * ```
 */
export function pluralize(
  count: number,
  singular: string,
  plural?: Optional<string>
): string {
  if (count === 1) {
    return singular;
  }
  return plural || `${singular}s`;
}

/**
 * Format a number with commas as thousands separators.
 *
 * @param num - Number to format
 * @returns Formatted string (e.g., "1,234,567")
 * @since 1.0.0
 *
 * @example
 * ```typescript
 * formatNumber(1234567); // "1,234,567"
 * ```
 */
export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
