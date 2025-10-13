// Address utilities
export type { ParsedEmailAddress } from './address';

export {
  AddressType,
  formatWalletAddress,
  getAddressType,
  getChainDisplayName,
  isENSName,
  isSNSName,
  isValidSignature,
  isValidWalletAddress,
  parseEmailAddress,
} from './address';

// Export address validation functions from common.ts
export { isEvmAddress, isSolanaAddress } from '../../types/blockchain/common';

// Event helper utilities
export type {
  MultiChainIdGenerator,
  UserChainIdGenerator,
} from './event-helpers';

export {
  createChainStatsId,
  createDelegationId,
  createMultiChainId,
  createUserMultiChainId,
  formatBigInt,
  isTestNet,
  isZeroAddress,
  normalizeAddress,
  validateEventArgs,
} from './event-helpers';
