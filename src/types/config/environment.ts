/**
 * Environment configuration types for cross-platform applications
 */

import { Optional } from '../common';

/**
 * Environment variables interface with typed NODE_ENV and flexible additional properties.
 */
export interface EnvironmentVariables {
  /** Node.js environment setting with strict typing */
  NODE_ENV?: Optional<'development' | 'production' | 'test'>;
  /** Additional environment variables with flexible string keys */
  [key: string]: Optional<string>;
}

/**
 * Environment provider interface for accessing and validating environment configuration.
 *
 * Provides type-safe access to environment variables with runtime environment detection.
 * Essential for configuration management across different deployment environments.
 *
 * @example
 * ```typescript
 * class NodeEnvProvider implements EnvProvider {
 *   get(key: string, defaultValue?: string) {
 *     return process.env[key] ?? defaultValue;
 *   }
 *   isDevelopment() { return this.get('NODE_ENV') === 'development'; }
 * }
 * ```
 */
export interface EnvProvider {
  /**
   * Get environment variable with type-safe key access.
   */
  get<K extends keyof EnvironmentVariables>(
    key: K,
    defaultValue?: string
  ): EnvironmentVariables[K] | Optional<string>;

  /**
   * Check if currently running in development environment.
   */
  isDevelopment(): boolean;

  /**
   * Check if currently running in production environment.
   */
  isProduction(): boolean;

  /**
   * Check if currently running in test environment.
   */
  isTest(): boolean;

  /**
   * Get all environment variables as a typed object.
   */
  getAll(): EnvironmentVariables;
}

/**
 * Storage type enumeration for cross-platform storage abstraction.
 *
 * Provides runtime-accessible values for different storage mechanisms
 * across web browsers, React Native, and Node.js environments.
 */
export enum StorageType {
  /** Web browser localStorage for persistent client-side storage */
  LOCAL_STORAGE = 'localStorage',
  /** Web browser sessionStorage for session-based storage */
  SESSION_STORAGE = 'sessionStorage',
  /** React Native AsyncStorage for mobile persistent storage */
  ASYNC_STORAGE = 'asyncStorage',
  /** In-memory storage for testing or temporary data */
  MEMORY = 'memory',
}
