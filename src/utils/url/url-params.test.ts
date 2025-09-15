import { describe, it, expect } from 'vitest';
import {
  createURLSearchParams,
  createSearchParams,
  searchParamsToString,
  parseSearchParams,
} from './url-params';

describe('URL Params Utilities', () => {
  describe('createURLSearchParams', () => {
    it('should create URLSearchParams from string', () => {
      const params = createURLSearchParams('?foo=bar&baz=qux');
      expect(params.get('foo')).toBe('bar');
      expect(params.get('baz')).toBe('qux');
    });

    it('should create URLSearchParams from object', () => {
      const params = createURLSearchParams({ foo: 'bar', baz: 'qux' });
      expect(params.get('foo')).toBe('bar');
      expect(params.get('baz')).toBe('qux');
    });

    it('should create URLSearchParams from array of tuples', () => {
      const params = createURLSearchParams([
        ['foo', 'bar'],
        ['baz', 'qux'],
      ]);
      expect(params.get('foo')).toBe('bar');
      expect(params.get('baz')).toBe('qux');
    });

    it('should create empty URLSearchParams when no init provided', () => {
      const params = createURLSearchParams();
      expect(params.toString()).toBe('');
    });
  });

  describe('createSearchParams', () => {
    it('should create search params from object', () => {
      const params = createSearchParams({ name: 'John', age: '30' });
      expect(params.get('name')).toBe('John');
      expect(params.get('age')).toBe('30');
    });

    it('should handle empty object', () => {
      const params = createSearchParams({});
      expect(params.toString()).toBe('');
    });

    it('should handle special characters', () => {
      const params = createSearchParams({
        'key with spaces': 'value&with=chars',
      });
      expect(params.get('key with spaces')).toBe('value&with=chars');
    });
  });

  describe('searchParamsToString', () => {
    it('should convert URLSearchParams to string', () => {
      const params = createURLSearchParams({ foo: 'bar', baz: 'qux' });
      const result = searchParamsToString(params);
      expect(result).toMatch(/foo=bar/);
      expect(result).toMatch(/baz=qux/);
    });

    it('should handle empty params', () => {
      const params = createURLSearchParams();
      const result = searchParamsToString(params);
      expect(result).toBe('');
    });

    it('should encode special characters', () => {
      const params = createURLSearchParams({ 'key space': 'value&special' });
      const result = searchParamsToString(params);
      expect(result).toContain('key+space=value%26special');
    });
  });

  describe('parseSearchParams', () => {
    it('should parse query string to object', () => {
      const result = parseSearchParams('?foo=bar&baz=qux');
      expect(result).toEqual({ foo: 'bar', baz: 'qux' });
    });

    it('should parse query string without leading ?', () => {
      const result = parseSearchParams('foo=bar&baz=qux');
      expect(result).toEqual({ foo: 'bar', baz: 'qux' });
    });

    it('should handle empty string', () => {
      const result = parseSearchParams('');
      expect(result).toEqual({});
    });

    it('should handle URL encoded values', () => {
      const result = parseSearchParams('key+space=value%26special');
      expect(result).toEqual({ 'key space': 'value&special' });
    });

    it('should handle multiple values for same key (takes last)', () => {
      const result = parseSearchParams('foo=bar&foo=baz');
      expect(result.foo).toBe('baz');
    });

    it('should handle keys without values', () => {
      const result = parseSearchParams('foo&bar=baz');
      expect(result.foo).toBe('');
      expect(result.bar).toBe('baz');
    });
  });
});
