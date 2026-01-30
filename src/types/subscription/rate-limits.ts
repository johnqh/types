/**
 * @fileoverview Rate Limit Type Definitions
 * @description Types for rate limiting endpoints across sudojo_api, shapeshyft_api, and whisperly_api
 */

import type { BaseResponse } from "../common";

// ========================================
// RATE LIMIT CONFIGURATION TYPES
// ========================================

/**
 * Rate limits for a single time period.
 * null/undefined means unlimited for that period.
 */
export interface RateLimits {
  /** Requests allowed per hour. null = unlimited */
  hourly: number | null;
  /** Requests allowed per day. null = unlimited */
  daily: number | null;
  /** Requests allowed per month. null = unlimited */
  monthly: number | null;
}

/**
 * Rate limit configuration for a single entitlement tier.
 */
export interface RateLimitTier {
  /** Entitlement name (e.g., "none", "pro", "enterprise") */
  entitlement: string;
  /** Display name for the tier */
  displayName: string;
  /** Rate limits for this tier */
  limits: RateLimits;
}

/**
 * Reset times for each rate limit period (ISO 8601 strings).
 */
export interface RateLimitResets {
  /** When the hourly counter resets (ISO 8601 string) */
  hourly: string;
  /** When the daily counter resets (ISO 8601 string) */
  daily: string;
  /** When the monthly counter resets (ISO 8601 string) */
  monthly: string;
}

/**
 * Response data for GET /ratelimits endpoint.
 * Returns all rate limit configurations for all entitlement tiers.
 */
export interface RateLimitsConfigData {
  /** All available rate limit tiers */
  tiers: RateLimitTier[];
  /** Current user's active entitlement */
  currentEntitlement: string;
  /** Current user's rate limits */
  currentLimits: RateLimits;
  /** Current usage counts */
  currentUsage: RateLimitUsage;
  /** When each period's counter resets */
  resets?: RateLimitResets;
}

/**
 * Current usage counts for rate limiting.
 */
export interface RateLimitUsage {
  /** Requests used this hour */
  hourly: number;
  /** Requests used today */
  daily: number;
  /** Requests used this month */
  monthly: number;
}

/**
 * API response for GET /ratelimits endpoint.
 */
export type RateLimitsConfigResponse = BaseResponse<RateLimitsConfigData>;

// ========================================
// RATE LIMIT HISTORY TYPES
// ========================================

/**
 * Valid period types for rate limit history.
 */
export enum RateLimitPeriodType {
  HOUR = "hour",
  DAY = "day",
  MONTH = "month",
}

/**
 * A single history entry for a time period.
 */
export interface RateLimitHistoryEntry {
  /** Start of the time period (ISO 8601 string) */
  periodStart: string;
  /** End of the time period (ISO 8601 string, exclusive) */
  periodEnd: string;
  /** Number of requests in this period */
  requestCount: number;
  /** Rate limit for this period (null = unlimited) */
  limit: number | null;
}

/**
 * Response data for GET /ratelimits/history/{periodType} endpoint.
 */
export interface RateLimitHistoryData {
  /** Type of period: 'hour', 'day', or 'month' */
  periodType: RateLimitPeriodType;
  /** Historical entries, sorted by periodStart descending (most recent first) */
  entries: RateLimitHistoryEntry[];
  /** Total number of entries available */
  totalEntries: number;
}

/**
 * API response for GET /ratelimits/history/{periodType} endpoint.
 */
export type RateLimitHistoryResponse = BaseResponse<RateLimitHistoryData>;
