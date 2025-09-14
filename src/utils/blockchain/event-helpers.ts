/**
 * @fileoverview Pure Event Helper Functions
 * @description Pure utility functions for multi-chain event processing
 * @version 2.0.0
 *
 * This file provides clean, type-safe utility functions with no external dependencies:
 * - Multi-chain ID generation
 * - Address normalization
 * - BigInt formatting
 * - Address validation
 * - Testnet detection
 */

// ========================================
// ID GENERATION UTILITIES
// ========================================

/**
 * Generate unique multi-chain entity ID
 *
 * @param chainId - Network chain ID (e.g., 1 for Ethereum)
 * @param txHash - Transaction hash
 * @param logIndex - Event log index within transaction
 * @returns Formatted ID: "chainId-txHash-logIndex"
 *
 * @example
 * ```typescript
 * const id = createMultiChainId(1, "0x123...", 0);
 * // Result: "1-0x123...-0"
 * ```
 */
export function createMultiChainId(
  chainId: number,
  txHash: string,
  logIndex: number
): string {
  return `${chainId}-${txHash}-${logIndex}`;
}

/**
 * Generate user-specific multi-chain ID
 *
 * @param chainId - Network chain ID
 * @param address - User wallet address (will be normalized to lowercase)
 * @returns Formatted ID: "chainId-address"
 *
 * @example
 * ```typescript
 * const userId = createUserMultiChainId(137, "0xABC...");
 * // Result: "137-0xabc..."
 * ```
 */
export function createUserMultiChainId(
  chainId: number,
  address: string
): string {
  return `${chainId}-${address.toLowerCase()}`;
}

/**
 * Generate chain-specific statistics ID
 *
 * @param chainId - Network chain ID
 * @returns Formatted ID: "chainId-global"
 */
export function createChainStatsId(chainId: number): string {
  return `${chainId}-global`;
}

/**
 * Generate delegation ID based on delegator address and testnet status
 *
 * @param delegatorAddress - The wallet address that is delegating
 * @param isTestNet - Whether the chain is a testnet
 * @returns Formatted ID: "delegatorAddress-testNet"
 */
export function createDelegationId(
  delegatorAddress: string,
  isTestNet: boolean
): string {
  return `${delegatorAddress.toLowerCase()}-${isTestNet}`;
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Normalize address to lowercase
 */
export function normalizeAddress(address: string): string {
  return address.toLowerCase();
}

/**
 * Format bigint for display
 */
export function formatBigInt(value: bigint, decimals: number = 18): string {
  const divisor = BigInt(10 ** decimals);
  const whole = value / divisor;
  const fraction = value % divisor;

  if (fraction === 0n) {
    return whole.toString();
  }

  return `${whole}.${fraction.toString().padStart(decimals, '0').replace(/0+$/, '')}`;
}

/**
 * Check if address is zero address (delegation clearing)
 */
export function isZeroAddress(address: string): boolean {
  return address.toLowerCase() === '0x0000000000000000000000000000000000000000';
}

/**
 * Determine if a chain ID represents a testnet
 * @param chainId The blockchain chain ID
 * @returns true if the chain is a testnet, false if mainnet
 */
export function isTestNet(chainId: number): boolean {
  // EVM Testnets (positive chain IDs)
  const evmTestnets = new Set([
    31337, // Hardhat (local development)
    11155111, // Ethereum Sepolia
    80001, // Polygon Mumbai (if configured)
    80002, // Polygon Amoy (if configured)
    421614, // Arbitrum Sepolia (if configured)
    11155420, // OP Sepolia (if configured)
    84532, // Base Sepolia (if configured)
    43113, // Avalanche Fuji (if configured)
  ]);

  // Solana Testnets (negative chain IDs)
  const solanaTestnets = new Set([
    -102, // Solana Devnet
    -103, // Solana Testnet
    -104, // Solana Localnet
  ]);

  return evmTestnets.has(chainId) || solanaTestnets.has(chainId);
}

/**
 * Validate event arguments
 */
export function validateEventArgs<T extends Record<string, unknown>>(
  args: T,
  requiredFields: (keyof T)[]
): boolean {
  for (const field of requiredFields) {
    if (args[field] === undefined || args[field] === null) {
      console.error(`❌ Missing required field: ${String(field)}`);
      return false;
    }
  }
  return true;
}

// ========================================
// TYPE DEFINITIONS
// ========================================

/**
 * Multi-chain ID generator function signature
 */
export type MultiChainIdGenerator = (
  chainId: number,
  txHash: string,
  logIndex: number
) => string;

/**
 * User-specific multi-chain ID generator function signature
 */
export type UserChainIdGenerator = (chainId: number, address: string) => string;
