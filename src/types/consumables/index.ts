/**
 * @fileoverview Consumable Credits Type Definitions
 * @description Shared API contract types for consumable credit system.
 * Used by both consumables_service (backend) and consumables_client (frontend).
 */

// ========================================
// ENUMS
// ========================================

/** Purchase source platform */
export type ConsumableSource = 'web' | 'apple' | 'google' | 'free';

// ========================================
// API REQUEST TYPES
// ========================================

/** POST /consumables/purchase request body */
export interface ConsumablePurchaseRequest {
  credits: number;
  source: ConsumableSource;
  transaction_ref_id?: string;
  product_id?: string;
  price_cents?: number;
  currency?: string;
}

/** POST /consumables/use request body */
export interface ConsumableUseRequest {
  filename?: string;
}

// ========================================
// API RESPONSE TYPES
// ========================================

/** GET /consumables/balance response data */
export interface ConsumableBalanceResponse {
  balance: number;
  initial_credits: number;
}

/** POST /consumables/use response data */
export interface ConsumableUseResponse {
  balance: number;
  success: boolean;
}

// ========================================
// API RECORD TYPES (JSON-serialized)
// ========================================

/** Purchase history record (GET /consumables/purchases array item) */
export interface ConsumablePurchaseRecord {
  id: number;
  credits: number;
  source: string;
  transaction_ref_id: string | null;
  product_id: string | null;
  price_cents: number | null;
  currency: string | null;
  created_at: string;
}

/** Usage history record (GET /consumables/usages array item) */
export interface ConsumableUsageRecord {
  id: number;
  /**
   * How many credits this usage consumed.
   *
   * Optional because rows written before variable amounts existed have none,
   * and a product that only ever spends one need not send it. Absent should be
   * read as one, not as free.
   */
  credits?: number;
  /**
   * What the credits were spent on, where that is not a file — e.g.
   * "generate-track — 4 track-measures".
   *
   * `filename` is the same idea for products whose unit of work *is* a file;
   * a consumer should prefer whichever its product sets.
   */
  reference?: string | null;
  filename: string | null;
  created_at: string;
}
