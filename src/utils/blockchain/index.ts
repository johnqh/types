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

// Network configuration utilities
export type {
  ChainId,
  EVMChainId,
  EVMNetwork,
  NetworkIdentifier,
  SolanaChainId,
  SolanaNetwork,
} from './network-config';

export {
  DEFAULT_RPC_ENDPOINTS,
  EVM_CHAIN_IDS,
  EVM_USDC_ADDRESSES,
  NETWORK_IDENTIFIERS,
  SOLANA_CHAIN_IDS,
  SOLANA_USDC_MINTS,
  getAllChainIds,
  getAllEVMChainIds,
  getAllSolanaChainIds,
  getDefaultRPCEndpoint,
  getEVMChainId,
  getEVMUSDCAddress,
  getSolanaUSDCMint,
  isEVMChainId,
  isEVMNetwork,
  isSolanaChainId,
  isSolanaNetwork,
} from './network-config';
