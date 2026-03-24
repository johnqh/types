/**
 * Backend Subscription Result
 *
 * Server-verified subscription state returned by the
 * GET /api/v1/users/:userId/subscriptions endpoint.
 * Shared between backend (sudojo_api) and frontend (subscription_lib, apps).
 */

import { SubscriptionPlatform } from './platform.js';

export interface BackendSubscriptionResult {
  hasSubscription: boolean;
  entitlements: string[];
  platform: SubscriptionPlatform | null;
  subscriptionStartedAt: string | null;
  /** Product identifier (e.g., "blue_belt_monthly_26_01") */
  productIdentifier: string | null;
  /** Expiration date as ISO string */
  expiresDate: string | null;
  /** Whether the subscription will auto-renew */
  willRenew: boolean;
  /** URL for managing the subscription (e.g., Stripe billing portal) */
  managementUrl: string | null;
}
