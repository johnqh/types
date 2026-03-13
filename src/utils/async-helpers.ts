/**
 * Common async operation patterns and helpers.
 * Reduces boilerplate code for common async operations.
 *
 * @since 1.0.0
 */

import { logger } from './logging/logger.js';
import { Optional } from '../types/common.js';

/**
 * Result type for safe async operations.
 * Contains either `data` on success or `error` on failure.
 *
 * @template T - The success data type
 * @since 1.0.0
 */
type AsyncResult<T> = {
  data?: T;
  error?: Error;
  success: boolean;
};

/**
 * Safely execute an async operation with error handling.
 * Returns a result object instead of throwing.
 *
 * @template T - The success data type
 * @param operation - Async function to execute
 * @param context - Optional context string for logging
 * @returns A promise resolving to an {@link AsyncResult}
 * @since 1.0.0
 *
 * @example
 * ```typescript
 * const result = await safeAsync(() => fetchUser(id), 'fetchUser');
 * if (result.success) {
 *   console.log(result.data);
 * } else {
 *   console.error(result.error?.message);
 * }
 * ```
 */
const safeAsync = async <T>(
  operation: () => Promise<T>,
  context?: string
): Promise<AsyncResult<T>> => {
  try {
    const data = await operation();
    return { data, success: true };
  } catch (error) {
    const errorObj = error instanceof Error ? error : new Error(String(error));
    logger.error(`Async operation failed: ${errorObj.message}`, context, error);
    return { error: errorObj, success: false };
  }
};

/**
 * Execute async operation with loading state tracking.
 * Manages `setLoading` and `setError` callbacks automatically.
 *
 * @template T - The success data type
 * @param operation - Async function to execute
 * @param setLoading - Callback to update loading state
 * @param setError - Callback to update error state
 * @param context - Optional context string for logging
 * @returns The operation result, or undefined on error
 * @since 1.0.0
 *
 * @example
 * ```typescript
 * const data = await withLoadingState(
 *   () => api.getUsers(),
 *   setIsLoading,
 *   setErrorMsg,
 *   'getUsers'
 * );
 * ```
 */
const withLoadingState = async <T>(
  operation: () => Promise<T>,
  setLoading: (loading: boolean) => void,
  setError: (error: Optional<string>) => void,
  context?: string
): Promise<Optional<T>> => {
  setLoading(true);
  setError(null);

  try {
    const result = await operation();
    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    setError(errorMessage);
    logger.error(`Operation failed: ${errorMessage}`, context, error);
    return undefined;
  } finally {
    setLoading(false);
  }
};

/**
 * Execute multiple async operations in parallel with error handling.
 * All operations run concurrently via `Promise.all`.
 *
 * @template T - Tuple of result types
 * @param operations - Array of async functions to execute in parallel
 * @param context - Optional context string for logging
 * @returns A promise resolving to an {@link AsyncResult} of the tuple
 * @since 1.0.0
 *
 * @example
 * ```typescript
 * const result = await safeParallel(
 *   [() => fetchUser(1), () => fetchPosts(1)] as const,
 *   'loadProfile'
 * );
 * ```
 */
const safeParallel = async <T extends readonly unknown[]>(
  operations: readonly [...{ [K in keyof T]: () => Promise<T[K]> }],
  context?: string
): Promise<AsyncResult<T>> => {
  try {
    const results = await Promise.all(operations.map(op => op()));
    return { data: results as unknown as T, success: true };
  } catch (error) {
    const errorObj = error instanceof Error ? error : new Error(String(error));
    logger.error(
      `Parallel operations failed: ${errorObj.message}`,
      context,
      error
    );
    return { error: errorObj, success: false };
  }
};

/**
 * Execute async operation with a timeout.
 * Rejects if the operation does not complete within `timeoutMs`.
 *
 * @template T - The success data type
 * @param operation - Async function to execute
 * @param timeoutMs - Maximum time in milliseconds
 * @param context - Optional context string for logging
 * @returns The operation result
 * @throws Error if the operation times out
 * @since 1.0.0
 *
 * @example
 * ```typescript
 * const data = await withTimeout(
 *   () => fetch('/api/data').then((r) => r.json()),
 *   5000,
 *   'fetchData'
 * );
 * ```
 */
const withTimeout = async <T>(
  operation: () => Promise<T>,
  timeoutMs: number,
  context?: string
): Promise<T> => {
  const timeoutPromise = new Promise<never>((_, reject) =>
    setTimeout(
      () => reject(new Error(`Operation timed out after ${timeoutMs}ms`)),
      timeoutMs
    )
  );

  try {
    return await Promise.race([operation(), timeoutPromise]);
  } catch (error) {
    logger.error(`Timeout operation failed`, context, error);
    throw error;
  }
};

/**
 * In-memory cache for {@link withCache}.
 */
const cache = new Map<string, { data: unknown; timestamp: number; ttl: number }>();

/**
 * Cache async operation results with TTL (time-to-live).
 * Returns cached data if still valid; otherwise executes the operation
 * and stores the result.
 *
 * @template T - The cached data type
 * @param key - Unique cache key
 * @param operation - Async function whose result is cached
 * @param ttlMs - Cache TTL in milliseconds (default: 5 minutes)
 * @returns The cached or freshly fetched data
 * @since 1.0.0
 *
 * @example
 * ```typescript
 * const user = await withCache(
 *   `user-${id}`,
 *   () => api.getUser(id),
 *   60_000 // 1 minute
 * );
 * ```
 */
const withCache = async <T>(
  key: string,
  operation: () => Promise<T>,
  ttlMs: number = 5 * 60 * 1000 // 5 minutes default
): Promise<T> => {
  const cached = cache.get(key);
  const now = Date.now();

  if (cached && now - cached.timestamp < cached.ttl) {
    return cached.data as T;
  }

  const result = await operation();
  cache.set(key, { data: result, timestamp: now, ttl: ttlMs });
  return result;
};

/**
 * Clear expired cache entries from the in-memory cache.
 * @since 1.0.0
 */
const clearExpiredCache = (): void => {
  const now = Date.now();
  for (const [key, entry] of cache.entries()) {
    if (now - entry.timestamp >= entry.ttl) {
      cache.delete(key);
    }
  }
};

/**
 * Active debounce timers keyed by operation key.
 */
const debounceMap = new Map<string, ReturnType<typeof setTimeout>>();

/**
 * Debounce async function calls by key.
 * Only the last call within the delay window will execute.
 *
 * @template T - Argument types
 * @template R - Return type
 * @param fn - The async function to debounce
 * @param delay - Debounce delay in milliseconds
 * @param key - Unique key identifying this debounced operation
 * @returns A debounced version of `fn`
 * @since 1.0.0
 *
 * @example
 * ```typescript
 * const debouncedSearch = debounceAsync(
 *   (query: string) => api.search(query),
 *   300,
 *   'search'
 * );
 * await debouncedSearch('hello');
 * ```
 */
const debounceAsync = <T extends unknown[], R>(
  fn: (...args: T) => Promise<R>,
  delay: number,
  key: string
): ((...args: T) => Promise<Optional<R>>) => {
  return (...args: T): Promise<Optional<R>> => {
    return new Promise(resolve => {
      const existingTimeout = debounceMap.get(key);
      if (existingTimeout) {
        clearTimeout(existingTimeout);
      }

      const timeout = setTimeout(async () => {
        debounceMap.delete(key);
        try {
          const result = await fn(...args);
          resolve(result);
        } catch (error) {
          logger.error(`Debounced operation failed`, key, error);
          resolve(undefined);
        }
      }, delay);

      debounceMap.set(key, timeout);
    });
  };
};

export {
  safeAsync,
  withLoadingState,
  safeParallel,
  withTimeout,
  withCache,
  clearExpiredCache,
  debounceAsync,
  type AsyncResult,
};
