/**
 * Type validation utilities for runtime type checking
 *
 * These utilities help ensure type safety at runtime, especially useful
 * for validating API responses and external data.
 */

import type { ValidationResult, Optional } from '../../types/common.js';

// Re-export unified ValidationResult from common
export type { ValidationResult };

/**
 * Creates a validation function that safely checks if a value matches
 * the expected type. Returns a {@link ValidationResult}.
 *
 * @template T - The validated type
 * @param validationFn - Type guard function
 * @param typeName - Name used in error messages
 * @returns A function returning `ValidationResult<T>`
 * @since 1.0.0
 *
 * @example
 * ```typescript
 * const validateString = createValidator(isString, 'string');
 * validateString('hi');  // { isValid: true, data: 'hi' }
 * validateString(42);    // { isValid: false, error: 'Invalid string' }
 * ```
 */
export const createValidator = <T>(
  validationFn: (data: unknown) => data is T,
  typeName: string
) => {
  return (data: unknown): ValidationResult<T> => {
    try {
      if (validationFn(data)) {
        return { isValid: true, data };
      }
      return { isValid: false, error: `Invalid ${typeName}`, data: null };
    } catch (error) {
      return {
        isValid: false,
        error: `Validation error for ${typeName}: ${error instanceof Error ? error.message : 'Unknown error'}`,
        data: null,
      };
    }
  };
};

/**
 * Runtime type guard: checks if value is a `string`.
 * @since 1.0.0
 */
export const isString = (value: unknown): value is string =>
  typeof value === 'string';

/**
 * Runtime type guard: checks if value is a finite `number` (excludes NaN).
 * @since 1.0.0
 */
export const isNumber = (value: unknown): value is number =>
  typeof value === 'number' && !isNaN(value);

/**
 * Runtime type guard: checks if value is a `boolean`.
 * @since 1.0.0
 */
export const isBoolean = (value: unknown): value is boolean =>
  typeof value === 'boolean';

/**
 * Runtime type guard: checks if value is a non-null, non-array object.
 * @since 1.0.0
 */
export const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

/**
 * Runtime type guard: checks if value is an array.
 * @since 1.0.0
 */
export const isArray = (value: unknown): value is unknown[] =>
  Array.isArray(value);

/**
 * Runtime type guard: checks if value is `null` or `undefined`.
 * @since 1.0.0
 */
export const isNullish = (value: unknown): value is null | undefined =>
  value === null || value === undefined;

/**
 * Validates that an object has all required properties present.
 *
 * @template T - Expected object shape
 * @param obj - Value to check
 * @param requiredProps - Array of required property keys
 * @returns True if obj has all required properties
 * @since 1.0.0
 */
export const hasRequiredProperties = <T extends Record<string, unknown>>(
  obj: unknown,
  requiredProps: (keyof T)[]
): obj is T => {
  if (!isObject(obj)) return false;
  return requiredProps.every((prop) => prop in obj);
};

/**
 * Validates that a value is an array where every item passes a validator.
 *
 * @template T - Expected item type
 * @param data - Value to check
 * @param itemValidator - Type guard for individual items
 * @returns True if data is an array of T
 * @since 1.0.0
 */
export const validateArray = <T>(
  data: unknown,
  itemValidator: (item: unknown) => item is T
): data is T[] => {
  if (!isArray(data)) return false;
  return data.every(itemValidator);
};

/**
 * Wraps a validator to also accept `undefined`.
 *
 * @template T - The validated type
 * @param validator - Base type guard
 * @returns Type guard that also accepts `undefined`
 * @since 1.0.0
 */
export const optional =
  <T>(validator: (value: unknown) => value is T) =>
  (value: unknown): value is T | undefined => {
    return value === undefined || validator(value);
  };

/**
 * Check if data looks like an API response (has `success` boolean).
 * @since 1.0.0
 */
export const isApiResponse = (data: unknown): data is { success: boolean } => {
  return isObject(data) && isBoolean(data.success);
};

export const isSuccessResponse = <T>(
  data: unknown,
  dataValidator?: Optional<(value: unknown) => value is T>
): data is { success: true; data: T } => {
  if (!isApiResponse(data) || !data.success) return false;
  if (dataValidator && 'data' in data) {
    return dataValidator(data.data);
  }
  return true;
};

export const isErrorResponse = (
  data: unknown
): data is { success: false; error: string } => {
  return (
    isApiResponse(data) &&
    !data.success &&
    'error' in data &&
    isString(data.error)
  );
};

/**
 * Check if a value is a string that parses to a valid date.
 * @since 1.0.0
 */
export const isValidDate = (value: unknown): value is string => {
  if (!isString(value)) return false;
  const date = new Date(value);
  return !isNaN(date.getTime());
};

/**
 * Basic email format validation.
 * @since 1.0.0
 */
export const isEmail = (value: unknown): value is string => {
  if (!isString(value)) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

/**
 * Basic URL validation using the `URL` constructor.
 * @since 1.0.0
 */
export const isUrl = (value: unknown): value is string => {
  if (!isString(value)) return false;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

/**
 * Creates a type assertion function that throws `TypeError` on
 * invalid data. Use with `createValidator` for the non-throwing variant.
 *
 * @template T - The asserted type
 * @param validator - Type guard function
 * @param typeName - Name used in error messages
 * @returns An assertion function
 * @since 1.0.0
 *
 * @example
 * ```typescript
 * const assertString = createAssertion(isString, 'string');
 * assertString('hello'); // passes
 * assertString(42);      // throws TypeError
 * ```
 */
export const createAssertion = <T>(
  validator: (data: unknown) => data is T,
  typeName: string
) => {
  return (data: unknown, context = typeName): asserts data is T => {
    if (!validator(data)) {
      throw new TypeError(`Invalid ${context}: expected ${typeName}`);
    }
  };
};

/**
 * Safely parse a JSON string, optionally validating the result.
 * Returns a {@link ValidationResult} instead of throwing.
 *
 * @template T - Expected parsed type
 * @param jsonString - JSON string to parse
 * @param validator - Optional type guard to validate the parsed result
 * @returns Validation result with parsed data or error
 * @since 1.0.0
 *
 * @example
 * ```typescript
 * const result = parseJson('{"name":"Alice"}');
 * if (result.isValid) console.log(result.data);
 * ```
 */
export const parseJson = <T>(
  jsonString: string,
  validator?: Optional<(data: unknown) => data is T>
): ValidationResult<T> => {
  try {
    const parsed = JSON.parse(jsonString);
    if (validator) {
      if (validator(parsed)) {
        return { isValid: true, data: parsed };
      }
      return {
        isValid: false,
        error: 'Parsed JSON does not match expected type',
        data: null,
      };
    }
    return { isValid: true, data: parsed as T };
  } catch (error) {
    return {
      isValid: false,
      error: `JSON parse error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      data: null,
    };
  }
};
