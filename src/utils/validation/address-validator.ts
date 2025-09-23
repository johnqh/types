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
  isValid: boolean;
  addressType: string;
  normalizedAddress: string;
  formats: {
    evm: boolean;
    solana: boolean;
    ens: boolean;
    sns: boolean;
  };
  error?: string;
}

export interface BasicValidationResult {
  isValid: boolean;
  addressType: Optional<ChainType>;
  normalizedAddress: string;
}

export class AddressValidator {
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
   * Returns detailed validation results for all supported formats
   */
  static validateComprehensive(address: string): AddressValidationResult {
    if (!address) {
      return {
        isValid: false,
        addressType: 'unknown',
        normalizedAddress: address || '',
        formats: { evm: false, solana: false, ens: false, sns: false },
        error: 'Address parameter is required',
      };
    }

    const result: AddressValidationResult = {
      isValid: false,
      addressType: 'unknown',
      normalizedAddress: address,
      formats: {
        evm: false,
        solana: false,
        ens: false,
        sns: false,
      },
    };

    // 1. Check if it's a valid EVM address (0x + 40 hex characters)
    if (this.EVM_REGEX.test(address)) {
      result.isValid = true;
      result.addressType = 'evm';
      result.normalizedAddress = address.toLowerCase();
      result.formats.evm = true;
      return result;
    }

    // 2. Check if it's a valid Solana address (Base58, 32-44 characters, no 0x prefix)
    if (
      !address.startsWith('0x') &&
      address.length >= 32 &&
      address.length <= 44 &&
      this.BASE58_REGEX.test(address)
    ) {
      result.isValid = true;
      result.addressType = 'solana';
      result.normalizedAddress = address; // Keep case for Solana
      result.formats.solana = true;
      return result;
    }

    // 3. Check if it's a valid ENS name (.eth or .box)
    if (
      (address.toLowerCase().endsWith('.eth') ||
        address.toLowerCase().endsWith('.box')) &&
      address.length >= 5 && // minimum: "a.eth" = 5 chars
      this.ENS_REGEX.test(address)
    ) {
      result.isValid = true;
      result.addressType = 'ens';
      result.normalizedAddress = address.toLowerCase();
      result.formats.ens = true;
      return result;
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
          result.isValid = true;
          result.addressType = 'sns';
          result.normalizedAddress = address.toLowerCase();
          result.formats.sns = true;
          return result;
        }
      }
    }

    // If no format matches, return invalid result with error
    result.error =
      'Invalid address format. Must be a valid EVM address (0x...), Solana address (Base58), ENS name (.eth/.box), or SNS name (.sol, etc.)';
    return result;
  }

  /**
   * Basic address validation for signature verification
   * Returns simplified result compatible with existing SignatureVerify interface
   */
  static validateBasic(address: string): BasicValidationResult {
    if (!address) {
      return {
        isValid: false,
        addressType: undefined,
        normalizedAddress: address || '',
      };
    }

    // Check EVM address
    if (this.EVM_REGEX.test(address)) {
      return {
        isValid: true,
        addressType: ChainType.EVM,
        normalizedAddress: address.toLowerCase(),
      };
    }

    // Check Solana address
    if (
      !address.startsWith('0x') &&
      address.length >= 32 &&
      address.length <= 44 &&
      this.BASE58_REGEX.test(address)
    ) {
      return {
        isValid: true,
        addressType: ChainType.SOLANA,
        normalizedAddress: address, // Keep case for Solana
      };
    }

    return {
      isValid: false,
      addressType: undefined,
      normalizedAddress: address,
    };
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
