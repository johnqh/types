/**
 * Blockchain address utilities for multi-chain support
 *
 * Provides validation and detection for various blockchain address formats
 * including EVM addresses, Solana addresses, ENS names, and SNS names.
 */

import { ChainType } from '../../types/business/enums';
// Import base validation functions from common types
import {
  isEvmAddress as isEvmAddressBase,
  isSolanaAddress as isSolanaAddressBase,
} from '../../types/blockchain/common';

/**
 * Address type enumeration
 */
export enum AddressType {
  EVMAddress = 'EVMAddress',
  SolanaAddress = 'SolanaAddress',
  ENSName = 'ENSName',
  SNSName = 'SNSName',
  Unknown = 'Unknown',
}

/**
 * Parsed email address structure
 */
export type ParsedEmailAddress = {
  /** The address part (before @) */
  address: string;
  /** The domain part (after @) */
  domain: string;
  /** The detected type of the address */
  type: AddressType;
};

/**
 * Check if address is an EVM address (string version)
 */
export function isEVMAddress(address: string): boolean {
  return isEvmAddressBase(address);
}

/**
 * Check if address is a Solana address (string version)
 */
export function isSolanaAddressString(address: string): boolean {
  return isSolanaAddressBase(address);
}

/**
 * Check if address is an ENS name (.eth or .box)
 */
export function isENSName(address: string): boolean {
  const lowerAddress = address.toLowerCase();

  // ENS names end with .eth or .box
  if (!lowerAddress.endsWith('.eth') && !lowerAddress.endsWith('.box')) {
    return false;
  }

  // Extract the name part (without .eth or .box)
  const nameWithoutTLD = lowerAddress.endsWith('.eth')
    ? lowerAddress.slice(0, -4)
    : lowerAddress.slice(0, -4);

  if (nameWithoutTLD.length === 0) {
    return false;
  }

  // ENS names can have multiple labels separated by dots
  const labels = nameWithoutTLD.split('.');

  // Each label must be valid
  const validLabelRegex = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/;
  for (const label of labels) {
    if (label.length === 0 || !validLabelRegex.test(label)) {
      return false;
    }
    // No consecutive hyphens allowed
    if (label.includes('--')) {
      return false;
    }
  }

  return true;
}

/**
 * Check if address is an SNS name (Solana name service)
 * Supports: .sol, .abc, .bonk, .poor, .gm, .dao, .defi, .web3
 */
export function isSNSName(address: string): boolean {
  const lowerAddress = address.toLowerCase();

  // List of supported Solana name extensions
  const snsExtensions = [
    '.sol',
    '.abc',
    '.bonk',
    '.poor',
    '.gm',
    '.dao',
    '.defi',
    '.web3',
  ];

  // Check if address ends with any supported extension
  const matchingExtension = snsExtensions.find((ext) =>
    lowerAddress.endsWith(ext)
  );
  if (!matchingExtension) {
    return false;
  }

  // Extract the name part (without the extension)
  const nameWithoutTLD = lowerAddress.slice(0, -matchingExtension.length);

  if (nameWithoutTLD.length === 0) {
    return false;
  }

  // SNS names can have multiple labels separated by dots
  const labels = nameWithoutTLD.split('.');

  // Each label must be valid
  const validLabelRegex = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/;
  for (const label of labels) {
    if (label.length === 0 || !validLabelRegex.test(label)) {
      return false;
    }
    // No consecutive hyphens allowed
    if (label.includes('--')) {
      return false;
    }
  }

  return true;
}

/**
 * Determine the address type from a string
 * Case insensitive as addresses/names are often case insensitive
 */
export function getAddressType(address: string): AddressType {
  if (!address || typeof address !== 'string') {
    return AddressType.Unknown;
  }

  // Convert to lowercase for case-insensitive comparison
  const trimmedAddress = address.trim();
  const lowerAddress = trimmedAddress.toLowerCase();

  // Check for ENS names (.eth or .box domains)
  if (isENSName(lowerAddress)) {
    return AddressType.ENSName;
  }

  // Check for SNS names (.sol domain)
  if (isSNSName(lowerAddress)) {
    return AddressType.SNSName;
  }

  // Check for EVM address (0x followed by 40 hex characters)
  if (isEVMAddress(trimmedAddress)) {
    return AddressType.EVMAddress;
  }

  // Check for Solana address (base58 encoded, 32-44 characters)
  if (isSolanaAddressString(trimmedAddress)) {
    return AddressType.SolanaAddress;
  }

  return AddressType.Unknown;
}

/**
 * Validate a wallet address for a specific chain type
 */
export function isValidWalletAddress(
  address: string,
  chainType: ChainType
): boolean {
  if (!address || typeof address !== 'string') {
    return false;
  }

  const addressType = getAddressType(address);

  switch (chainType) {
    case ChainType.EVM:
    case ChainType.ETHEREUM:
      return (
        addressType === AddressType.EVMAddress ||
        addressType === AddressType.ENSName
      );

    case ChainType.SOLANA:
      return (
        addressType === AddressType.SolanaAddress ||
        addressType === AddressType.SNSName
      );

    default:
      // Unknown chain type, accept any known address format
      return addressType !== AddressType.Unknown;
  }
}

/**
 * Check if a signature is valid for a specific chain type
 */
export function isValidSignature(
  signature: string,
  chainType: ChainType
): boolean {
  if (!signature || typeof signature !== 'string') {
    return false;
  }

  switch (chainType) {
    case ChainType.EVM:
    case ChainType.ETHEREUM:
      // EVM signature validation (0x followed by 130 hex characters)
      return /^0x[a-fA-F0-9]{130}$/.test(signature);

    case ChainType.SOLANA:
      // Solana signature validation (base58 encoded, typically 87-88 characters)
      return /^[1-9A-HJ-NP-Za-km-z]{87,88}$/.test(signature);

    default:
      // Basic validation for unknown chain types
      return signature.length > 50;
  }
}

/**
 * Parse an email address into its components
 */
export function parseEmailAddress(
  email: string
): ParsedEmailAddress | undefined {
  if (!email || typeof email !== 'string') {
    return undefined;
  }

  const parts = email.split('@');
  if (parts.length !== 2) {
    return undefined;
  }

  const [address, domain] = parts;
  if (!address || !domain) {
    return undefined;
  }

  const type = getAddressType(address);

  return {
    address,
    domain,
    type,
  };
}

/**
 * Format a wallet address for display
 * Shows first 6 and last 4 characters with ellipsis
 */
export function formatWalletAddress(address: string): string {
  if (!address || address.length < 10) {
    return address;
  }

  // For ENS/SNS names, show them in full if they're short enough
  const addressType = getAddressType(address);
  if (
    (addressType === AddressType.ENSName ||
      addressType === AddressType.SNSName) &&
    address.length <= 20
  ) {
    return address;
  }

  // Show first 6 and last 4 characters with ellipsis
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

/**
 * Get display name for a chain type
 */
export function getChainDisplayName(chainType: ChainType): string {
  switch (chainType) {
    case ChainType.EVM:
      return 'EVM Chain';
    case ChainType.ETHEREUM:
      return 'Ethereum';
    case ChainType.SOLANA:
      return 'Solana';
    case ChainType.UNKNOWN:
      return 'Unknown Chain';
    default:
      return 'Blockchain';
  }
}
