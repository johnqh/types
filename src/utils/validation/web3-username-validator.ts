/**
 * @fileoverview Address Validation Utility
 * @description Centralized address validation for EVM, Solana, ENS, and SNS addresses
 * Eliminates code duplication across multiple files
 *
 * Pure TypeScript implementation with no external dependencies
 */

// Import ChainType from business enums
import { ChainType } from '../../types/business/enums';
import { Optional } from '../../types/common';

export interface AddressValidationResult {
  name?: Optional<string>;
  address?: Optional<string>;
  chainType: ChainType;
}

export class Web3UsernameValidator {
  // Regex patterns for different address types
  private static readonly EVM_REGEX = /^0x[a-fA-F0-9]{40}$/;
  private static readonly BASE58_REGEX = /^[1-9A-HJ-NP-Za-km-z]+$/;
  private static readonly ENS_REGEX =
    /^[a-zA-Z0-9]([a-zA-Z0-9]|(-[a-zA-Z0-9]))*\.(eth|box)$/i;
  private static readonly SNS_NAME_REGEX =
    /^[a-zA-Z0-9]([a-zA-Z0-9]|(-[a-zA-Z0-9]))*$/;

  // Valid SNS top-level domains
  private static readonly VALID_SNS_TLDS = [
    'sol',
    'abc',
    'bonk',
    'poor',
    'gm',
    'dao',
    'defi',
    'web3',
  ];

  /**
   * Comprehensive address validation for API endpoint
   * Returns AddressValidationResult for valid addresses, undefined for invalid ones
   */
  static validate(address: string): Optional<AddressValidationResult> {
    if (!address) {
      return undefined;
    }

    // 1. Check if it's a valid EVM address (0x + 40 hex characters)
    if (this.EVM_REGEX.test(address)) {
      return {
        name: null,
        address: address.toLowerCase(),
        chainType: ChainType.EVM,
      };
    }

    // 2. Check if it's a valid Solana address (Base58, 32-44 characters, no 0x prefix)
    if (
      !address.startsWith('0x') &&
      address.length >= 32 &&
      address.length <= 44 &&
      this.BASE58_REGEX.test(address)
    ) {
      return {
        name: null,
        address: address, // Keep case for Solana
        chainType: ChainType.SOLANA,
      };
    }

    // 3. Check if it's a valid ENS name (.eth or .box)
    if (
      (address.toLowerCase().endsWith('.eth') ||
        address.toLowerCase().endsWith('.box')) &&
      address.length >= 5 && // minimum: "a.eth" = 5 chars
      this.ENS_REGEX.test(address)
    ) {
      return {
        name: address.toLowerCase(),
        address: null,
        chainType: ChainType.EVM, // ENS resolves to EVM addresses
      };
    }

    // 4. Check if it's a valid SNS name (Solana Name Service)
    if (address.toLowerCase().includes('.')) {
      const parts = address.toLowerCase().split('.');
      if (parts.length === 2) {
        const [name, tld] = parts;
        if (
          this.VALID_SNS_TLDS.includes(tld) &&
          this.SNS_NAME_REGEX.test(name) &&
          name.length >= 1
        ) {
          return {
            name: address.toLowerCase(),
            address: null,
            chainType: ChainType.SOLANA, // SNS resolves to Solana addresses
          };
        }
      }
    }

    // If no format matches, return undefined
    return undefined;
  }

  /**
   * Quick EVM address validation
   */
  static isValidEVMAddress(address: string): boolean {
    return this.EVM_REGEX.test(address);
  }

  /**
   * Quick Solana address validation
   */
  static isValidSolanaAddress(address: string): boolean {
    return (
      !address.startsWith('0x') &&
      address.length >= 32 &&
      address.length <= 44 &&
      this.BASE58_REGEX.test(address)
    );
  }

  /**
   * Quick ENS name validation
   */
  static isValidENSName(address: string): boolean {
    return (
      (address.toLowerCase().endsWith('.eth') ||
        address.toLowerCase().endsWith('.box')) &&
      address.length >= 5 &&
      this.ENS_REGEX.test(address)
    );
  }

  /**
   * Quick SNS name validation
   */
  static isValidSNSName(address: string): boolean {
    if (!address.toLowerCase().includes('.')) return false;
    const parts = address.toLowerCase().split('.');
    if (parts.length !== 2) return false;
    const [name, tld] = parts;
    return (
      this.VALID_SNS_TLDS.includes(tld) &&
      this.SNS_NAME_REGEX.test(name) &&
      name.length >= 1
    );
  }
}
