/**
 * Blockchain address utilities for multi-chain support
 *
 * Provides validation and detection for various blockchain address formats
 * including EVM addresses, Solana addresses, ENS names, and SNS names.
 */

import { ChainType } from '../../types/business/enums';
import { Optional } from '../../types/common';
// Import base validation functions from common types
import { isEvmAddress, isSolanaAddress } from '../../types/blockchain/common';

/**
 * Address type enumeration
 */
export enum AddressType {
  EVMAddress = 'EVMAddress',
  SolanaAddress = 'SolanaAddress',
  ENSName = 'ENSName',
  SNSName = 'SNSName',
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
  type: Optional<AddressType>;
};

// Address validation functions are now imported directly from common.ts
// Use isEvmAddress and isSolanaAddress from '../../types/blockchain/common'

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
export function getAddressType(
  address: string,
  parentAddressType?: AddressType
): Optional<AddressType> {
  // Check for EVM address (0x followed by 40 hex characters)
  if (isEvmAddress(address)) {
    return AddressType.EVMAddress;
  }

  // Check for Solana address (base58 encoded, 32-44 characters)
  if (isSolanaAddress(address)) {
    return AddressType.SolanaAddress;
  }

  // If parent address type is provided and address contains ".", it's a domain name
  if (parentAddressType && address.includes('.')) {
    if (parentAddressType === AddressType.EVMAddress) {
      return AddressType.ENSName;
    }
    if (parentAddressType === AddressType.SolanaAddress) {
      return AddressType.SNSName;
    }
  }

  return undefined;
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
      return !!addressType;
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
export function parseEmailAddress(email: string): Optional<ParsedEmailAddress> {
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
export function getChainDisplayName(chainType?: Optional<ChainType>): string {
  if (!chainType) {
    return 'Unknown Chain';
  }

  switch (chainType) {
    case ChainType.EVM:
      return 'EVM Chain';
    case ChainType.SOLANA:
      return 'Solana';
    default:
      return 'Blockchain';
  }
}
