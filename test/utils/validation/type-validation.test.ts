import { describe, it, expect } from 'vitest';
import {
  isString,
  isNumber,
  isBoolean,
  isObject,
  isArray,
  isNullish,
  isEmail,
  isUrl,
  isValidDate,
  isApiResponse,
  isSuccessResponse,
  isErrorResponse,
  hasRequiredProperties,
  validateArray,
  optional,
  createValidator,
  createAssertion,
  parseJson,
} from '../../../src/utils/validation/type-validation';

describe('Type Validation', () => {
  describe('isString', () => {
    it('should return true for strings', () => {
      expect(isString('')).toBe(true);
      expect(isString('hello')).toBe(true);
      expect(isString(' ')).toBe(true);
    });

    it('should return false for non-strings', () => {
      expect(isString(42)).toBe(false);
      expect(isString(null)).toBe(false);
      expect(isString(undefined)).toBe(false);
      expect(isString(true)).toBe(false);
      expect(isString([])).toBe(false);
      expect(isString({})).toBe(false);
    });
  });

  describe('isNumber', () => {
    it('should return true for valid numbers', () => {
      expect(isNumber(0)).toBe(true);
      expect(isNumber(42)).toBe(true);
      expect(isNumber(-1)).toBe(true);
      expect(isNumber(3.14)).toBe(true);
    });

    it('should return false for NaN', () => {
      expect(isNumber(NaN)).toBe(false);
    });

    it('should return true for Infinity', () => {
      // Infinity is typeof number and !isNaN
      expect(isNumber(Infinity)).toBe(true);
      expect(isNumber(-Infinity)).toBe(true);
    });

    it('should return false for non-numbers', () => {
      expect(isNumber('42')).toBe(false);
      expect(isNumber(null)).toBe(false);
      expect(isNumber(undefined)).toBe(false);
      expect(isNumber(true)).toBe(false);
    });
  });

  describe('isBoolean', () => {
    it('should return true for booleans', () => {
      expect(isBoolean(true)).toBe(true);
      expect(isBoolean(false)).toBe(true);
    });

    it('should return false for non-booleans', () => {
      expect(isBoolean(0)).toBe(false);
      expect(isBoolean(1)).toBe(false);
      expect(isBoolean('')).toBe(false);
      expect(isBoolean('true')).toBe(false);
      expect(isBoolean(null)).toBe(false);
    });
  });

  describe('isObject', () => {
    it('should return true for plain objects', () => {
      expect(isObject({})).toBe(true);
      expect(isObject({ key: 'value' })).toBe(true);
    });

    it('should return false for null', () => {
      expect(isObject(null)).toBe(false);
    });

    it('should return false for arrays', () => {
      expect(isObject([])).toBe(false);
      expect(isObject([1, 2])).toBe(false);
    });

    it('should return false for primitives', () => {
      expect(isObject('string')).toBe(false);
      expect(isObject(42)).toBe(false);
      expect(isObject(true)).toBe(false);
      expect(isObject(undefined)).toBe(false);
    });
  });

  describe('isArray', () => {
    it('should return true for arrays', () => {
      expect(isArray([])).toBe(true);
      expect(isArray([1, 2, 3])).toBe(true);
      expect(isArray(['a', 'b'])).toBe(true);
    });

    it('should return false for non-arrays', () => {
      expect(isArray({})).toBe(false);
      expect(isArray('string')).toBe(false);
      expect(isArray(null)).toBe(false);
      expect(isArray(undefined)).toBe(false);
    });
  });

  describe('isNullish', () => {
    it('should return true for null and undefined', () => {
      expect(isNullish(null)).toBe(true);
      expect(isNullish(undefined)).toBe(true);
    });

    it('should return false for falsy non-nullish values', () => {
      expect(isNullish(0)).toBe(false);
      expect(isNullish('')).toBe(false);
      expect(isNullish(false)).toBe(false);
    });

    it('should return false for truthy values', () => {
      expect(isNullish('hello')).toBe(false);
      expect(isNullish(42)).toBe(false);
      expect(isNullish({})).toBe(false);
    });
  });

  describe('isEmail', () => {
    it('should return true for valid emails', () => {
      expect(isEmail('user@example.com')).toBe(true);
      expect(isEmail('a@b.c')).toBe(true);
      expect(isEmail('user+tag@domain.co.uk')).toBe(true);
    });

    it('should return false for invalid emails', () => {
      expect(isEmail('')).toBe(false);
      expect(isEmail('user')).toBe(false);
      expect(isEmail('user@')).toBe(false);
      expect(isEmail('@domain.com')).toBe(false);
      expect(isEmail('user @domain.com')).toBe(false);
    });

    it('should return false for non-strings', () => {
      expect(isEmail(42)).toBe(false);
      expect(isEmail(null)).toBe(false);
      expect(isEmail(undefined)).toBe(false);
    });
  });

  describe('isUrl', () => {
    it('should return true for valid URLs', () => {
      expect(isUrl('https://example.com')).toBe(true);
      expect(isUrl('http://localhost:3000')).toBe(true);
      expect(isUrl('ftp://files.example.com/file.txt')).toBe(true);
    });

    it('should return false for invalid URLs', () => {
      expect(isUrl('')).toBe(false);
      expect(isUrl('not-a-url')).toBe(false);
      expect(isUrl('example.com')).toBe(false);
    });

    it('should return false for non-strings', () => {
      expect(isUrl(42)).toBe(false);
      expect(isUrl(null)).toBe(false);
    });
  });

  describe('isValidDate', () => {
    it('should return true for valid date strings', () => {
      expect(isValidDate('2024-01-15')).toBe(true);
      expect(isValidDate('2024-01-15T10:30:00Z')).toBe(true);
    });

    it('should return false for invalid date strings', () => {
      expect(isValidDate('not-a-date')).toBe(false);
      expect(isValidDate('')).toBe(false);
    });

    it('should return false for non-strings', () => {
      expect(isValidDate(42)).toBe(false);
      expect(isValidDate(null)).toBe(false);
    });
  });

  describe('isApiResponse', () => {
    it('should return true for objects with success boolean', () => {
      expect(isApiResponse({ success: true })).toBe(true);
      expect(isApiResponse({ success: false })).toBe(true);
      expect(
        isApiResponse({ success: true, data: 'hello' })
      ).toBe(true);
    });

    it('should return false for objects without success', () => {
      expect(isApiResponse({})).toBe(false);
      expect(isApiResponse({ data: 'hello' })).toBe(false);
    });

    it('should return false for non-boolean success', () => {
      expect(isApiResponse({ success: 'true' })).toBe(false);
      expect(isApiResponse({ success: 1 })).toBe(false);
    });

    it('should return false for non-objects', () => {
      expect(isApiResponse(null)).toBe(false);
      expect(isApiResponse('string')).toBe(false);
      expect(isApiResponse([])).toBe(false);
    });
  });

  describe('isSuccessResponse', () => {
    it('should return true for success response', () => {
      expect(isSuccessResponse({ success: true, data: 'hello' })).toBe(
        true
      );
    });

    it('should return false for error response', () => {
      expect(
        isSuccessResponse({ success: false, error: 'fail' })
      ).toBe(false);
    });

    it('should validate data with custom validator', () => {
      const isStringData = (v: unknown): v is string =>
        typeof v === 'string';
      expect(
        isSuccessResponse({ success: true, data: 'hello' }, isStringData)
      ).toBe(true);
      expect(
        isSuccessResponse({ success: true, data: 42 }, isStringData)
      ).toBe(false);
    });
  });

  describe('isErrorResponse', () => {
    it('should return true for error response', () => {
      expect(
        isErrorResponse({ success: false, error: 'Something failed' })
      ).toBe(true);
    });

    it('should return false for success response', () => {
      expect(
        isErrorResponse({ success: true, data: 'hello' })
      ).toBe(false);
    });

    it('should return false when error is not a string', () => {
      expect(isErrorResponse({ success: false, error: 42 })).toBe(false);
    });

    it('should return false when error field is missing', () => {
      expect(isErrorResponse({ success: false })).toBe(false);
    });
  });

  describe('hasRequiredProperties', () => {
    it('should return true when all required props exist', () => {
      expect(
        hasRequiredProperties({ a: 1, b: 2, c: 3 }, ['a', 'b'])
      ).toBe(true);
    });

    it('should return false when a required prop is missing', () => {
      expect(hasRequiredProperties({ a: 1 }, ['a', 'b'])).toBe(false);
    });

    it('should return true for empty required props', () => {
      expect(hasRequiredProperties({}, [])).toBe(true);
    });

    it('should return false for non-objects', () => {
      expect(hasRequiredProperties(null, ['a'])).toBe(false);
      expect(hasRequiredProperties('string', ['a'])).toBe(false);
      expect(hasRequiredProperties([], ['a'])).toBe(false);
    });
  });

  describe('validateArray', () => {
    it('should return true for array of valid items', () => {
      expect(validateArray(['a', 'b'], isString)).toBe(true);
    });

    it('should return false if any item fails validation', () => {
      expect(validateArray(['a', 42], isString)).toBe(false);
    });

    it('should return true for empty array', () => {
      expect(validateArray([], isString)).toBe(true);
    });

    it('should return false for non-arrays', () => {
      expect(validateArray('string', isString)).toBe(false);
      expect(validateArray(null, isString)).toBe(false);
    });
  });

  describe('optional', () => {
    it('should accept undefined', () => {
      const optionalString = optional(isString);
      expect(optionalString(undefined)).toBe(true);
    });

    it('should accept valid value', () => {
      const optionalString = optional(isString);
      expect(optionalString('hello')).toBe(true);
    });

    it('should reject invalid value', () => {
      const optionalString = optional(isString);
      expect(optionalString(42)).toBe(false);
    });

    it('should reject null (not the same as undefined)', () => {
      const optionalString = optional(isString);
      expect(optionalString(null)).toBe(false);
    });
  });

  describe('createValidator', () => {
    it('should return valid result for matching value', () => {
      const validateString = createValidator(isString, 'string');
      const result = validateString('hello');
      expect(result.isValid).toBe(true);
      if (result.isValid) {
        expect(result.data).toBe('hello');
      }
    });

    it('should return invalid result for non-matching value', () => {
      const validateString = createValidator(isString, 'string');
      const result = validateString(42);
      expect(result.isValid).toBe(false);
      if (!result.isValid) {
        expect(result.error).toContain('Invalid string');
      }
    });
  });

  describe('createAssertion', () => {
    it('should not throw for valid value', () => {
      const assertString = createAssertion(isString, 'string');
      expect(() => assertString('hello')).not.toThrow();
    });

    it('should throw TypeError for invalid value', () => {
      const assertString = createAssertion(isString, 'string');
      expect(() => assertString(42)).toThrow(TypeError);
    });

    it('should include type name in error message', () => {
      const assertNumber = createAssertion(isNumber, 'number');
      expect(() => assertNumber('not-a-number')).toThrow(
        'expected number'
      );
    });

    it('should include custom context in error message', () => {
      const assertString = createAssertion(isString, 'string');
      expect(() => assertString(42, 'username')).toThrow(
        'Invalid username'
      );
    });
  });

  describe('parseJson', () => {
    it('should parse valid JSON', () => {
      const result = parseJson('{"name":"Alice"}');
      expect(result.isValid).toBe(true);
      if (result.isValid) {
        expect(result.data).toEqual({ name: 'Alice' });
      }
    });

    it('should return error for invalid JSON', () => {
      const result = parseJson('not json');
      expect(result.isValid).toBe(false);
      if (!result.isValid) {
        expect(result.error).toContain('JSON parse error');
      }
    });

    it('should validate parsed data with validator', () => {
      const isUser = (v: unknown): v is { name: string } =>
        isObject(v) && isString((v as Record<string, unknown>).name);

      const result = parseJson<{ name: string }>(
        '{"name":"Alice"}',
        isUser
      );
      expect(result.isValid).toBe(true);
    });

    it('should fail when validator rejects parsed data', () => {
      const isUser = (v: unknown): v is { name: string } =>
        isObject(v) && isString((v as Record<string, unknown>).name);

      const result = parseJson<{ name: string }>('42', isUser);
      expect(result.isValid).toBe(false);
    });

    it('should handle empty JSON string', () => {
      const result = parseJson('');
      expect(result.isValid).toBe(false);
    });

    it('should parse JSON arrays', () => {
      const result = parseJson('[1,2,3]');
      expect(result.isValid).toBe(true);
      if (result.isValid) {
        expect(result.data).toEqual([1, 2, 3]);
      }
    });

    it('should parse JSON primitives', () => {
      expect(parseJson('"hello"').isValid).toBe(true);
      expect(parseJson('42').isValid).toBe(true);
      expect(parseJson('true').isValid).toBe(true);
      expect(parseJson('null').isValid).toBe(true);
    });
  });
});
