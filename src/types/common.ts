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
  addressType: ChainType;
}