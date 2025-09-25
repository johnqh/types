/**
 * Application configuration types
 */

import { Optional } from '../common';

/**
 * Firebase service configuration interface.
 *
 * Contains all necessary configuration for Firebase services including
 * authentication, analytics, messaging, and web push notifications.
 */
export interface FirebaseConfig {
  /** Firebase project API key */
  apiKey: string;
  /** Firebase authentication domain */
  authDomain: string;
  /** Firebase project ID */
  projectId: string;
  /** Firebase storage bucket URL */
  storageBucket: string;
  /** Firebase Cloud Messaging sender ID */
  messagingSenderId: string;
  /** Firebase application ID */
  appId: string;
  /** Google Analytics measurement ID (optional) */
  measurementId: Optional<string>;
  /** VAPID key for web push notifications (optional) */
  vapidKey: Optional<string>;
}

/**
 * Main application configuration interface.
 *
 * Centralizes all application configuration including API endpoints,
 * service keys, and feature flags. Designed for email/communication
 * applications with blockchain wallet integration.
 *
 * @example
 * ```typescript
 * const config: AppConfig = {
 *   wildDuckBackendUrl: 'https://api.myemailapp.com',
 *   indexerBackendUrl: 'https://indexer.myapp.com',
 *   // ... other required configuration
 * };
 * ```
 */
export interface AppConfig {
  /** Backend API URL for WildDuck email server */
  wildDuckBackendUrl: string;
  /** Backend URL for blockchain/crypto indexer service */
  indexerBackendUrl: string;

  /** API token for WildDuck email server authentication */
  wildDuckApiToken: string;
  /** RevenueCat API key for subscription management */
  revenueCatApiKey: string;
  /** WalletConnect project ID for crypto wallet integration */
  walletConnectProjectId: string;
  /** Privy application ID for authentication service */
  privyAppId: string;

  /** Complete Firebase service configuration */
  firebase: FirebaseConfig;

  /** Whether to use Cloudflare Worker for proxy/caching */
  useCloudflareWorker: boolean;
  /** Cloudflare Worker URL when enabled */
  cloudflareWorkerUrl: string;

  /** Enable mock/fallback services for development/testing */
  useMockFallback: boolean;
}
