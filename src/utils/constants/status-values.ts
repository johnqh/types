/**
 * Shared status value constants
 * Used across multiple enums to ensure consistency and avoid duplication
 */
export const STATUS_VALUES = {
  SUCCESS: 'success',
  PENDING: 'pending',
  FAILED: 'failed',
  ERROR: 'error',
} as const;

export type StatusValue = (typeof STATUS_VALUES)[keyof typeof STATUS_VALUES];
