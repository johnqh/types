/**
 * Pure TypeScript network configuration utilities
 * Contains network identifiers, chain IDs, and helper functions without external dependencies
 */

import { Optional } from '../../types/common';

// Network identifiers for multi-chain support
export const NETWORK_IDENTIFIERS = {
  // Ethereum networks
  ethereum: 'ethereum',
  sepolia: 'sepolia',
  polygon: 'polygon',
  arbitrum: 'arbitrum',
  optimism: 'optimism',
  base: 'base',

  // Solana networks
  'mainnet-beta': 'mainnet-beta',
  devnet: 'devnet',
  testnet: 'testnet',
} as const;

// Chain IDs for EVM networks
export const EVM_CHAIN_IDS = {
  ethereum: 1,
  sepolia: 11155111,
  polygon: 137,
  arbitrum: 42161,
  optimism: 10,
  base: 8453,
  hardhat: 31337, // Local development
} as const;

// Solana Chain ID Mappings (negative numbers to distinguish from EVM)
export const SOLANA_CHAIN_IDS = {
  MAINNET: -101, // Solana Mainnet Beta
  DEVNET: -102, // Solana Devnet
  TESTNET: -103, // Solana Testnet
  LOCALNET: -104, // Local Solana Validator
} as const;

// Known USDC token addresses for EVM chains (as strings to avoid dependencies)
export const EVM_USDC_ADDRESSES = {
  ethereum: '0xA0b86a33E6441146a8A8e27c01f0D9B1F5E42E92',
  sepolia: '0x6f14C02fC1F78322cFd7d707aB90f18baD3B54f5',
  polygon: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
  arbitrum: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
  optimism: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85',
  base: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  hardhat: '0x', // Mock USDC for local development
} as const;

// Known USDC mint addresses for Solana networks (as strings to avoid dependencies)
export const SOLANA_USDC_MINTS = {
  'mainnet-beta': 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  devnet: '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU',
  testnet: '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU',
} as const;

// Default RPC endpoints
export const DEFAULT_RPC_ENDPOINTS = {
  // Ethereum networks
  ethereum: 'https://eth-mainnet.g.alchemy.com/v2/your-api-key',
  sepolia: 'https://eth-sepolia.g.alchemy.com/v2/your-api-key',
  polygon: 'https://polygon-mainnet.g.alchemy.com/v2/your-api-key',
  arbitrum: 'https://arb-mainnet.g.alchemy.com/v2/your-api-key',
  optimism: 'https://opt-mainnet.g.alchemy.com/v2/your-api-key',
  base: 'https://base-mainnet.g.alchemy.com/v2/your-api-key',
  hardhat: 'http://127.0.0.1:8545',

  // Solana networks
  'mainnet-beta': 'https://api.mainnet-beta.solana.com',
  devnet: 'https://api.devnet.solana.com',
  testnet: 'https://api.testnet.solana.com',
  'solana-local': 'http://127.0.0.1:8899',
} as const;

// Type definitions for network identifiers and chain IDs
export type NetworkIdentifier = keyof typeof NETWORK_IDENTIFIERS;
export type EVMNetwork = keyof typeof EVM_CHAIN_IDS;
export type SolanaNetwork = keyof typeof SOLANA_USDC_MINTS;
export type SolanaChainId =
  (typeof SOLANA_CHAIN_IDS)[keyof typeof SOLANA_CHAIN_IDS];
export type EVMChainId = (typeof EVM_CHAIN_IDS)[keyof typeof EVM_CHAIN_IDS];
export type ChainId = SolanaChainId | EVMChainId;

/**
 * Check if a network identifier represents an EVM chain
 * @param network - Network identifier to check
 * @returns True if the network is an EVM chain
 */
export function isEVMNetwork(network: string): network is EVMNetwork {
  return network in EVM_CHAIN_IDS;
}

/**
 * Check if a network identifier represents a Solana network
 * @param network - Network identifier to check
 * @returns True if the network is a Solana network
 */
export function isSolanaNetwork(network: string): network is SolanaNetwork {
  return network in SOLANA_USDC_MINTS;
}

/**
 * Get the chain ID for an EVM network
 * @param network - EVM network identifier
 * @returns Chain ID number, or undefined if network not found
 */
export function getEVMChainId(network: string): Optional<number> {
  return isEVMNetwork(network) ? EVM_CHAIN_IDS[network] : undefined;
}

/**
 * Get the USDC token address for an EVM network
 * @param network - EVM network identifier
 * @returns USDC token address string, or undefined if network not found
 */
export function getEVMUSDCAddress(network: string): Optional<string> {
  return isEVMNetwork(network) ? EVM_USDC_ADDRESSES[network] : undefined;
}

/**
 * Get the USDC mint address for a Solana network
 * @param network - Solana network identifier
 * @returns USDC mint address string, or undefined if network not found
 */
export function getSolanaUSDCMint(network: string): Optional<string> {
  return isSolanaNetwork(network) ? SOLANA_USDC_MINTS[network] : undefined;
}

/**
 * Get the default RPC endpoint for a network
 * @param network - Network identifier
 * @returns RPC endpoint URL, or undefined if network not found
 */
export function getDefaultRPCEndpoint(network: string): Optional<string> {
  return (DEFAULT_RPC_ENDPOINTS as Record<string, string>)[network];
}

/**
 * Check if a chain ID represents a Solana network
 * @param chainId - Chain ID to check
 * @returns True if the chain ID is a Solana network (negative number)
 */
export function isSolanaChainId(chainId: number): chainId is SolanaChainId {
  return chainId < 0;
}

/**
 * Check if a chain ID represents an EVM network
 * @param chainId - Chain ID to check
 * @returns True if the chain ID is an EVM network (positive number)
 */
export function isEVMChainId(chainId: number): chainId is EVMChainId {
  return chainId > 0;
}

/**
 * Get all Solana chain IDs
 * @returns Array of all Solana chain IDs
 */
export function getAllSolanaChainIds(): SolanaChainId[] {
  return Object.values(SOLANA_CHAIN_IDS);
}

/**
 * Get all EVM chain IDs
 * @returns Array of all EVM chain IDs
 */
export function getAllEVMChainIds(): EVMChainId[] {
  return Object.values(EVM_CHAIN_IDS);
}

/**
 * Get all chain IDs (both EVM and Solana)
 * @returns Array of all supported chain IDs
 */
export function getAllChainIds(): ChainId[] {
  return [...getAllSolanaChainIds(), ...getAllEVMChainIds()];
}
