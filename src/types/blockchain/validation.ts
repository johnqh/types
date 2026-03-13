/**
 * Validation utilities for multi-chain operations.
 * All validators throw on invalid input.
 *
 * @since 1.0.0
 */

import { ChainType } from '../business/enums.js';
import { isValidWalletAddress } from '../../utils/blockchain/address.js';

/**
 * Validate a domain name format.
 *
 * @param domain - Domain string to validate
 * @returns True if valid
 * @throws Error if domain is empty, too long, or has invalid format
 * @since 1.0.0
 *
 * @example
 * ```typescript
 * validateDomain('example.com'); // true
 * validateDomain('');            // throws "Domain cannot be empty"
 * ```
 */
export function validateDomain(domain: string): boolean {
  if (!domain || domain.length === 0) {
    throw new Error('Domain cannot be empty');
  }
  if (domain.length > 100) {
    throw new Error('Domain cannot exceed 100 characters');
  }
  // Basic domain validation - can be expanded
  const domainRegex =
    /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!domainRegex.test(domain)) {
    throw new Error('Invalid domain format');
  }
  return true;
}

/**
 * Validate a message subject and body against length constraints.
 *
 * @param subject - Message subject (max 200 chars)
 * @param body - Message body (max 10000 chars)
 * @returns True if valid
 * @throws Error if subject or body is empty or exceeds limits
 * @since 1.0.0
 */
export function validateMessage(subject: string, body: string): boolean {
  if (!subject || subject.length === 0) {
    throw new Error('Message subject cannot be empty');
  }
  if (subject.length > 200) {
    throw new Error('Message subject cannot exceed 200 characters');
  }
  if (!body || body.length === 0) {
    throw new Error('Message body cannot be empty');
  }
  if (body.length > 10000) {
    throw new Error('Message body cannot exceed 10000 characters');
  }
  return true;
}

/**
 * Validate a wallet address for a specific chain type.
 *
 * @param address - Wallet address to validate
 * @param chainType - Target blockchain type (EVM or Solana)
 * @returns True if valid
 * @throws Error if address is empty or has invalid format
 * @since 1.0.0
 *
 * @example
 * ```typescript
 * validateAddress('0x742d35Cc6634C0532925a3b844e2', ChainType.EVM);
 * ```
 */
export function validateAddress(
  address: string,
  chainType: ChainType
): boolean {
  if (!address || address.length === 0) {
    throw new Error('Address cannot be empty');
  }

  if (!isValidWalletAddress(address, chainType)) {
    throw new Error(`Invalid ${chainType} address format`);
  }

  return true;
}

/**
 * Validate and convert an amount to a non-negative bigint.
 * Accepts string, number, or bigint input.
 *
 * @param amount - Amount value to validate
 * @returns The validated amount as bigint
 * @throws Error if amount is invalid, non-numeric, or negative
 * @since 1.0.0
 *
 * @example
 * ```typescript
 * validateAmount('1000');  // 1000n
 * validateAmount(500);     // 500n
 * validateAmount(-1);      // throws "Amount cannot be negative"
 * ```
 */
export function validateAmount(amount: string | number | bigint): bigint {
  // Check for null, undefined, or empty string
  if (
    amount === null ||
    amount === undefined ||
    amount === '' ||
    (typeof amount === 'string' && amount.trim() === '')
  ) {
    throw new Error('Invalid amount format');
  }

  let amountBigInt: bigint;

  try {
    if (typeof amount === 'string') {
      // Check for non-numeric strings
      if (!/^-?\d+$/.test(amount.trim())) {
        throw new Error('Invalid amount format');
      }
      amountBigInt = BigInt(amount);
    } else if (typeof amount === 'number') {
      // Check for NaN or Infinity
      if (!Number.isFinite(amount)) {
        throw new Error('Invalid amount format');
      }
      amountBigInt = BigInt(Math.floor(amount));
    } else if (typeof amount === 'bigint') {
      amountBigInt = amount;
    } else {
      throw new Error('Invalid amount format');
    }
  } catch {
    throw new Error('Invalid amount format');
  }

  if (amountBigInt < 0n) {
    throw new Error('Amount cannot be negative');
  }

  return amountBigInt;
}
