/**
 * Common utility types used throughout the application
 */

import { ChainType } from './business/enums';

/**
 * Utility type for values that can be T, undefined, or null
 * Provides a more semantic way to represent optional/nullable values
 */
export type Optional<T> = T | undefined | null;

/**
 * Base wallet data structure containing address and chain type
 * Used across all wallet-related interfaces to ensure consistency
 */
export interface WalletData {
  /** Wallet address (EVM 0x format or Solana Base58) */
  walletAddress: string;
  /** Chain type classification (EVM or Solana) */
  chainType: ChainType;
}

/**
 * Base folder data structure containing common folder properties
 * Used across all folder/mailbox-related interfaces to ensure consistency
 */
export interface FolderBase {
  /** Folder name */
  name: string;
  /** Total message count */
  count: number;
  /** Unread message count */
  unreadCount: number;
}

/**
 * Base message structure containing core message fields
 * Used across all message/email-related interfaces to ensure consistency
 */
export interface MessageBase {
  /** Message sender */
  from: string;
  /** Message recipient */
  to: string;
  /** Message subject line */
  subject: string;
  /** Message body content */
  body: string;
}

/**
 * Base response structure for all API operations
 * Unified response interface for consistency across the entire application
 */
export interface BaseResponse<T = unknown> {
  /** Operation success status */
  success: boolean;
  /** Response data */
  data: Optional<T>;
  /** Error message if operation failed */
  error: Optional<string>;
  /** Response timestamp */
  timestamp: string;
}

/**
 * Unified pagination options for querying
 */
export interface PaginationOptions {
  /** Number of items per page */
  limit: number;
  /** Offset from start (for offset-based pagination) */
  offset: Optional<number>;
  /** Cursor for cursor-based pagination */
  cursor: Optional<string>;
  /** Sort order */
  sortOrder: Optional<'asc' | 'desc'>;
}

/**
 * Unified pagination metadata for responses
 */
export interface PaginationInfo {
  /** Whether there are more items after current page */
  hasNextPage: boolean;
  /** Whether there are items before current page */
  hasPreviousPage: Optional<boolean>;
  /** Cursor to fetch next page */
  nextCursor: Optional<string>;
  /** Cursor to fetch previous page */
  previousCursor: Optional<string>;
  /** Total count of items (if available) */
  totalCount: Optional<number>;
  /** Current page size */
  pageSize: number;
}

/**
 * Paginated response structure
 */
export interface PaginatedResponse<T> extends BaseResponse<T[]> {
  /** Pagination metadata */
  pagination: PaginationInfo;
}

/**
 * Unified error structure for all operations
 */
export interface UnifiedError {
  /** Error type/code */
  type:
    | 'ValidationError'
    | 'InsufficientFunds'
    | 'Unauthorized'
    | 'ContractError'
    | 'NetworkError'
    | 'OperationError';
  /** Error code (optional, for more specific categorization) */
  code: Optional<string>;
  /** Human-readable error message */
  message: string;
  /** Additional error details */
  details: Optional<{
    field: Optional<string>;
    expectedValue: Optional<unknown>;
    actualValue: Optional<unknown>;
    txHash: Optional<string>;
    [key: string]: unknown;
  }>;
  /** Suggested user action */
  suggestedAction: Optional<string>;
}

/**
 * Result type for operations that can succeed or fail
 * @template T Success result type
 * @template E Error type (defaults to UnifiedError)
 */
export type Result<T, E = UnifiedError> =
  | { success: true; data: T }
  | { success: false; error: E };

/**
 * Unified validation result pattern
 * @template T The validated data type
 */
export type ValidationResult<T = unknown> =
  | { isValid: true; data: T }
  | { isValid: false; error: string; data: Optional<never> };
