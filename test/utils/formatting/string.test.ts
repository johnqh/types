import { describe, it, expect } from 'vitest';
import {
  truncate,
  capitalize,
  toTitleCase,
  toKebabCase,
  toCamelCase,
  toSnakeCase,
  normalizeWhitespace,
  isBlank,
  isNotBlank,
  escapeHtml,
  stripHtml,
  getInitials,
  formatBytes,
  pluralize,
  formatNumber,
} from '../../../src/utils/formatting/string';

describe('String Formatting', () => {
  describe('truncate', () => {
    it('should return original string when within limit', () => {
      expect(truncate('hello', 10)).toBe('hello');
    });

    it('should truncate and add ellipsis', () => {
      expect(truncate('Hello, World!', 8)).toBe('Hello...');
    });

    it('should handle custom suffix', () => {
      expect(truncate('Hello, World!', 7, '--')).toBe('Hello--');
    });

    it('should return empty string as-is', () => {
      expect(truncate('', 10)).toBe('');
    });

    it('should handle exact length', () => {
      expect(truncate('hello', 5)).toBe('hello');
    });
  });

  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
    });

    it('should handle empty string', () => {
      expect(capitalize('')).toBe('');
    });

    it('should handle single character', () => {
      expect(capitalize('a')).toBe('A');
    });

    it('should not change already capitalized', () => {
      expect(capitalize('Hello')).toBe('Hello');
    });
  });

  describe('toTitleCase', () => {
    it('should title case each word', () => {
      expect(toTitleCase('hello world')).toBe('Hello World');
    });

    it('should handle empty string', () => {
      expect(toTitleCase('')).toBe('');
    });

    it('should handle single word', () => {
      expect(toTitleCase('hello')).toBe('Hello');
    });

    it('should lowercase uppercase input first', () => {
      expect(toTitleCase('HELLO WORLD')).toBe('Hello World');
    });
  });

  describe('toKebabCase', () => {
    it('should convert camelCase', () => {
      expect(toKebabCase('helloWorld')).toBe('hello-world');
    });

    it('should convert spaces', () => {
      expect(toKebabCase('hello world')).toBe('hello-world');
    });

    it('should convert underscores', () => {
      expect(toKebabCase('hello_world')).toBe('hello-world');
    });

    it('should handle empty string', () => {
      expect(toKebabCase('')).toBe('');
    });

    it('should handle PascalCase', () => {
      expect(toKebabCase('HelloWorld')).toBe('hello-world');
    });
  });

  describe('toCamelCase', () => {
    it('should convert kebab-case', () => {
      expect(toCamelCase('hello-world')).toBe('helloWorld');
    });

    it('should convert snake_case', () => {
      expect(toCamelCase('hello_world')).toBe('helloWorld');
    });

    it('should convert spaces', () => {
      expect(toCamelCase('hello world')).toBe('helloWorld');
    });

    it('should handle empty string', () => {
      expect(toCamelCase('')).toBe('');
    });

    it('should lowercase first char if uppercase', () => {
      expect(toCamelCase('Hello')).toBe('hello');
    });
  });

  describe('toSnakeCase', () => {
    it('should convert camelCase', () => {
      expect(toSnakeCase('helloWorld')).toBe('hello_world');
    });

    it('should convert kebab-case', () => {
      expect(toSnakeCase('hello-world')).toBe('hello_world');
    });

    it('should convert spaces', () => {
      expect(toSnakeCase('hello world')).toBe('hello_world');
    });

    it('should handle empty string', () => {
      expect(toSnakeCase('')).toBe('');
    });
  });

  describe('normalizeWhitespace', () => {
    it('should collapse multiple spaces', () => {
      expect(normalizeWhitespace('hello   world')).toBe('hello world');
    });

    it('should trim leading and trailing whitespace', () => {
      expect(normalizeWhitespace('  hello  ')).toBe('hello');
    });

    it('should handle tabs and newlines', () => {
      expect(normalizeWhitespace('hello\t\nworld')).toBe('hello world');
    });

    it('should handle empty string', () => {
      expect(normalizeWhitespace('')).toBe('');
    });
  });

  describe('isBlank', () => {
    it('should return true for empty string', () => {
      expect(isBlank('')).toBe(true);
    });

    it('should return true for whitespace-only string', () => {
      expect(isBlank('   ')).toBe(true);
    });

    it('should return true for undefined', () => {
      expect(isBlank(undefined)).toBe(true);
    });

    it('should return true for null', () => {
      expect(isBlank(null)).toBe(true);
    });

    it('should return false for non-blank string', () => {
      expect(isBlank('hello')).toBe(false);
    });

    it('should return false for string with leading spaces', () => {
      expect(isBlank(' hello')).toBe(false);
    });
  });

  describe('isNotBlank', () => {
    it('should return true for non-blank string', () => {
      expect(isNotBlank('hello')).toBe(true);
    });

    it('should return false for empty string', () => {
      expect(isNotBlank('')).toBe(false);
    });

    it('should return false for null', () => {
      expect(isNotBlank(null)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(isNotBlank(undefined)).toBe(false);
    });
  });

  describe('escapeHtml', () => {
    it('should escape all HTML special characters', () => {
      expect(escapeHtml('&<>"\'')).toBe('&amp;&lt;&gt;&quot;&#39;');
    });

    it('should not modify safe strings', () => {
      expect(escapeHtml('hello world')).toBe('hello world');
    });

    it('should handle empty string', () => {
      expect(escapeHtml('')).toBe('');
    });

    it('should escape HTML tags', () => {
      expect(escapeHtml('<script>alert("xss")</script>')).toBe(
        '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
      );
    });
  });

  describe('stripHtml', () => {
    it('should remove HTML tags', () => {
      expect(stripHtml('<p>Hello <b>world</b></p>')).toBe(
        'Hello world'
      );
    });

    it('should handle self-closing tags', () => {
      expect(stripHtml('Hello<br/>World')).toBe('HelloWorld');
    });

    it('should handle empty string', () => {
      expect(stripHtml('')).toBe('');
    });

    it('should handle string without tags', () => {
      expect(stripHtml('Hello world')).toBe('Hello world');
    });
  });

  describe('getInitials', () => {
    it('should extract two initials by default', () => {
      expect(getInitials('John Doe')).toBe('JD');
    });

    it('should handle single name', () => {
      expect(getInitials('John')).toBe('J');
    });

    it('should handle three names with max 2', () => {
      expect(getInitials('John Michael Doe')).toBe('JM');
    });

    it('should handle three names with max 3', () => {
      expect(getInitials('John Michael Doe', 3)).toBe('JMD');
    });

    it('should return empty string for empty input', () => {
      expect(getInitials('')).toBe('');
    });

    it('should uppercase initials', () => {
      expect(getInitials('john doe')).toBe('JD');
    });
  });

  describe('formatBytes', () => {
    it('should format 0 bytes', () => {
      expect(formatBytes(0)).toBe('0 Bytes');
    });

    it('should format bytes', () => {
      expect(formatBytes(500)).toBe('500 Bytes');
    });

    it('should format kilobytes', () => {
      expect(formatBytes(1024)).toBe('1 KB');
    });

    it('should format megabytes', () => {
      expect(formatBytes(1048576)).toBe('1 MB');
    });

    it('should format with custom decimals', () => {
      expect(formatBytes(1536, 1)).toBe('1.5 KB');
    });

    it('should handle negative decimals as 0', () => {
      expect(formatBytes(1536, -1)).toBe('2 KB');
    });
  });

  describe('pluralize', () => {
    it('should return singular for count 1', () => {
      expect(pluralize(1, 'item')).toBe('item');
    });

    it('should return default plural for count > 1', () => {
      expect(pluralize(2, 'item')).toBe('items');
    });

    it('should return custom plural', () => {
      expect(pluralize(2, 'child', 'children')).toBe('children');
    });

    it('should return plural for count 0', () => {
      expect(pluralize(0, 'item')).toBe('items');
    });

    it('should return singular for exactly 1', () => {
      expect(pluralize(1, 'person', 'people')).toBe('person');
    });
  });

  describe('formatNumber', () => {
    it('should format thousands', () => {
      expect(formatNumber(1234)).toBe('1,234');
    });

    it('should format millions', () => {
      expect(formatNumber(1234567)).toBe('1,234,567');
    });

    it('should not format numbers under 1000', () => {
      expect(formatNumber(999)).toBe('999');
    });

    it('should handle zero', () => {
      expect(formatNumber(0)).toBe('0');
    });

    it('should handle negative numbers', () => {
      expect(formatNumber(-1234)).toBe('-1,234');
    });
  });
});
