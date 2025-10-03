/**
 * RPC and API endpoint helper utilities
 *
 * Provides helper functions to build RPC endpoints and block explorer API URLs
 * from API keys and chain identifiers.
 */

import { Chain } from '../../types/business/enums';
import { Optional } from '../../types/common';

/**
 * Blockchain API keys configuration
 */
export interface BlockchainApis {
  /** Alchemy API key for RPC access (supports both EVM and Solana) */
  alchemyApiKey: string;
  /** Etherscan Multichain API key for block explorer API access (EVM only) */
  etherscanApiKey: string;
}

/**
 * Alchemy network identifier mappings
 * Maps Chain enum values to Alchemy-specific network identifiers
 */
const ALCHEMY_NETWORK_MAP: Record<Chain, string> = {
  // Ethereum - direct mapping
  [Chain.ETH_MAINNET]: 'eth-mainnet',
  [Chain.ETH_SEPOLIA]: 'eth-sepolia',
  [Chain.ETH_GOERLI]: 'eth-goerli',

  // Polygon - direct mapping
  [Chain.POLYGON_MAINNET]: 'polygon-mainnet',
  [Chain.POLYGON_MUMBAI]: 'polygon-mumbai',
  [Chain.POLYGON_AMOY]: 'polygon-amoy',

  // Optimism - uses 'opt' prefix
  [Chain.OPTIMISM_MAINNET]: 'opt-mainnet',
  [Chain.OPTIMISM_SEPOLIA]: 'opt-sepolia',
  [Chain.OPTIMISM_GOERLI]: 'opt-goerli',

  // Arbitrum - uses 'arb' prefix
  [Chain.ARBITRUM_MAINNET]: 'arb-mainnet',
  [Chain.ARBITRUM_SEPOLIA]: 'arb-sepolia',
  [Chain.ARBITRUM_GOERLI]: 'arb-goerli',

  // Base - direct mapping
  [Chain.BASE_MAINNET]: 'base-mainnet',
  [Chain.BASE_SEPOLIA]: 'base-sepolia',
  [Chain.BASE_GOERLI]: 'base-goerli',

  // Solana - simple names
  [Chain.SOLANA_MAINNET]: 'mainnet',
  [Chain.SOLANA_DEVNET]: 'devnet',
  [Chain.SOLANA_TESTNET]: 'testnet',
};

/**
 * Block explorer domain mappings
 */
const EXPLORER_DOMAIN_MAP: Record<Chain, string> = {
  // Ethereum
  [Chain.ETH_MAINNET]: 'api.etherscan.io',
  [Chain.ETH_SEPOLIA]: 'api-sepolia.etherscan.io',
  [Chain.ETH_GOERLI]: 'api-goerli.etherscan.io',

  // Polygon
  [Chain.POLYGON_MAINNET]: 'api.polygonscan.com',
  [Chain.POLYGON_MUMBAI]: 'api-testnet.polygonscan.com',
  [Chain.POLYGON_AMOY]: 'api-amoy.polygonscan.com',

  // Optimism
  [Chain.OPTIMISM_MAINNET]: 'api-optimistic.etherscan.io',
  [Chain.OPTIMISM_SEPOLIA]: 'api-sepolia-optimistic.etherscan.io',
  [Chain.OPTIMISM_GOERLI]: 'api-goerli-optimistic.etherscan.io',

  // Arbitrum
  [Chain.ARBITRUM_MAINNET]: 'api.arbiscan.io',
  [Chain.ARBITRUM_SEPOLIA]: 'api-sepolia.arbiscan.io',
  [Chain.ARBITRUM_GOERLI]: 'api-goerli.arbiscan.io',

  // Base
  [Chain.BASE_MAINNET]: 'api.basescan.org',
  [Chain.BASE_SEPOLIA]: 'api-sepolia.basescan.org',
  [Chain.BASE_GOERLI]: 'api-goerli.basescan.org',

  // Solana - no block explorer API in this format
  [Chain.SOLANA_MAINNET]: '',
  [Chain.SOLANA_DEVNET]: '',
  [Chain.SOLANA_TESTNET]: '',
};

/**
 * Block explorer browser URL mappings
 */
const EXPLORER_BROWSER_MAP: Record<Chain, string> = {
  // Ethereum
  [Chain.ETH_MAINNET]: 'etherscan.io',
  [Chain.ETH_SEPOLIA]: 'sepolia.etherscan.io',
  [Chain.ETH_GOERLI]: 'goerli.etherscan.io',

  // Polygon
  [Chain.POLYGON_MAINNET]: 'polygonscan.com',
  [Chain.POLYGON_MUMBAI]: 'mumbai.polygonscan.com',
  [Chain.POLYGON_AMOY]: 'amoy.polygonscan.com',

  // Optimism
  [Chain.OPTIMISM_MAINNET]: 'optimistic.etherscan.io',
  [Chain.OPTIMISM_SEPOLIA]: 'sepolia-optimistic.etherscan.io',
  [Chain.OPTIMISM_GOERLI]: 'goerli-optimistic.etherscan.io',

  // Arbitrum
  [Chain.ARBITRUM_MAINNET]: 'arbiscan.io',
  [Chain.ARBITRUM_SEPOLIA]: 'sepolia.arbiscan.io',
  [Chain.ARBITRUM_GOERLI]: 'goerli.arbiscan.io',

  // Base
  [Chain.BASE_MAINNET]: 'basescan.org',
  [Chain.BASE_SEPOLIA]: 'sepolia.basescan.org',
  [Chain.BASE_GOERLI]: 'goerli.basescan.org',

  // Solana
  [Chain.SOLANA_MAINNET]: 'explorer.solana.com',
  [Chain.SOLANA_DEVNET]: 'explorer.solana.com/?cluster=devnet',
  [Chain.SOLANA_TESTNET]: 'explorer.solana.com/?cluster=testnet',
};

/**
 * EVM chains (used for type checking)
 */
const EVM_CHAINS = new Set<Chain>([
  Chain.ETH_MAINNET,
  Chain.ETH_SEPOLIA,
  Chain.ETH_GOERLI,
  Chain.POLYGON_MAINNET,
  Chain.POLYGON_MUMBAI,
  Chain.POLYGON_AMOY,
  Chain.OPTIMISM_MAINNET,
  Chain.OPTIMISM_SEPOLIA,
  Chain.OPTIMISM_GOERLI,
  Chain.ARBITRUM_MAINNET,
  Chain.ARBITRUM_SEPOLIA,
  Chain.ARBITRUM_GOERLI,
  Chain.BASE_MAINNET,
  Chain.BASE_SEPOLIA,
  Chain.BASE_GOERLI,
]);

/**
 * Solana chains (used for type checking)
 */
const SOLANA_CHAINS = new Set<Chain>([
  Chain.SOLANA_MAINNET,
  Chain.SOLANA_DEVNET,
  Chain.SOLANA_TESTNET,
]);

/**
 * Helper class for building RPC endpoints and block explorer API URLs
 */
export class RpcHelpers {
  /**
   * Check if a chain is an EVM chain
   * @private
   */
  private static _isEvmChain(chain: Chain): boolean {
    return EVM_CHAINS.has(chain);
  }

  /**
   * Check if a chain is a Solana chain
   * @private
   */
  private static _isSolanaChain(chain: Chain): boolean {
    return SOLANA_CHAINS.has(chain);
  }

  /**
   * Build Alchemy RPC URL for any supported chain
   *
   * @param alchemyApiKey - Your Alchemy API key
   * @param chain - Chain identifier from Chain enum
   * @returns Complete RPC URL, or undefined if API key is empty or chain is unsupported
   *
   * @example
   * ```typescript
   * const rpcUrl = RpcHelpers.getRpcUrl('your-api-key', Chain.ETH_MAINNET);
   * // Returns: https://eth-mainnet.g.alchemy.com/v2/your-api-key
   *
   * const solanaUrl = RpcHelpers.getRpcUrl('your-api-key', Chain.SOLANA_MAINNET);
   * // Returns: https://solana-mainnet.g.alchemy.com/v2/your-api-key
   *
   * const invalidUrl = RpcHelpers.getRpcUrl('', Chain.ETH_MAINNET);
   * // Returns: undefined
   * ```
   */
  static getRpcUrl(alchemyApiKey: string, chain: Chain): Optional<string>;
  /**
   * Get RPC URL using BlockchainApis configuration
   *
   * Convenience overload that uses the BlockchainApis structure.
   *
   * @param apis - Blockchain API keys configuration
   * @param chain - Chain identifier from Chain enum
   * @returns Complete RPC URL, or undefined if invalid
   *
   * @example
   * ```typescript
   * const apis = {
   *   alchemyApiKey: 'your-alchemy-key',
   *   etherscanApiKey: 'your-etherscan-key'
   * };
   *
   * const ethRpcUrl = RpcHelpers.getRpcUrl(apis, Chain.ETH_MAINNET);
   * // Returns: https://eth-mainnet.g.alchemy.com/v2/your-alchemy-key
   * ```
   */
  static getRpcUrl(apis: BlockchainApis, chain: Chain): Optional<string>;
  static getRpcUrl(
    apiKeyOrApis: string | BlockchainApis,
    chain: Chain
  ): Optional<string> {
    const alchemyApiKey =
      typeof apiKeyOrApis === 'string'
        ? apiKeyOrApis
        : apiKeyOrApis.alchemyApiKey;

    if (!alchemyApiKey) {
      return undefined;
    }

    const network = ALCHEMY_NETWORK_MAP[chain];
    if (!network) {
      return undefined;
    }

    if (this._isSolanaChain(chain)) {
      return `https://solana-${network}.g.alchemy.com/v2/${alchemyApiKey}`;
    }

    return `https://${network}.g.alchemy.com/v2/${alchemyApiKey}`;
  }

  /**
   * Get block explorer API URL
   *
   * Uses the Etherscan Multichain API key which works across 60+ EVM networks.
   * The API key is included as a query parameter in the URL.
   * Note: Solana chains don't have Etherscan-style API endpoints and will return undefined.
   *
   * @param etherscanApiKey - Your Etherscan Multichain API key (or BlockchainApis object)
   * @param chain - Chain identifier from Chain enum
   * @returns Complete API endpoint URL with API key, or undefined if API key is empty, chain is Solana, or no explorer API available
   *
   * @example
   * ```typescript
   * // With API key string
   * const etherscanUrl = RpcHelpers.getExplorerApiUrl('your-api-key', Chain.ETH_MAINNET);
   * // Returns: https://api.etherscan.io/api?apikey=your-api-key
   *
   * // With BlockchainApis object
   * const apis = {
   *   alchemyApiKey: 'your-alchemy-key',
   *   etherscanApiKey: 'your-etherscan-key'
   * };
   * const explorerApiUrl = RpcHelpers.getExplorerApiUrl(apis, Chain.POLYGON_MAINNET);
   * // Returns: https://api.polygonscan.com/api?apikey=your-etherscan-key
   *
   * const solanaUrl = RpcHelpers.getExplorerApiUrl('your-api-key', Chain.SOLANA_MAINNET);
   * // Returns: undefined (Solana doesn't have Etherscan-style API)
   * ```
   */
  static getExplorerApiUrl(etherscanApiKey: string, chain: Chain): Optional<string>;
  static getExplorerApiUrl(apis: BlockchainApis, chain: Chain): Optional<string>;
  static getExplorerApiUrl(
    apiKeyOrApis: string | BlockchainApis,
    chain: Chain
  ): Optional<string> {
    const etherscanApiKey =
      typeof apiKeyOrApis === 'string'
        ? apiKeyOrApis
        : apiKeyOrApis.etherscanApiKey;

    if (!etherscanApiKey) {
      return undefined;
    }

    if (this._isSolanaChain(chain)) {
      return undefined;
    }

    const domain = EXPLORER_DOMAIN_MAP[chain];
    if (!domain) {
      return undefined;
    }

    return `https://${domain}/api?apikey=${etherscanApiKey}`;
  }

  /**
   * Get block explorer browser URL
   *
   * @param chain - Chain identifier from Chain enum
   * @returns Browser URL for the explorer, or undefined if no explorer available
   *
   * @example
   * ```typescript
   * const etherscanUrl = RpcHelpers.getBlockExplorerUrl(Chain.ETH_MAINNET);
   * // Returns: https://etherscan.io
   *
   * const basescanUrl = RpcHelpers.getBlockExplorerUrl(Chain.BASE_MAINNET);
   * // Returns: https://basescan.org
   *
   * const solanaUrl = RpcHelpers.getBlockExplorerUrl(Chain.SOLANA_MAINNET);
   * // Returns: https://explorer.solana.com
   * ```
   */
  static getBlockExplorerUrl(chain: Chain): Optional<string> {
    const domain = EXPLORER_BROWSER_MAP[chain];
    if (!domain) {
      return undefined;
    }

    return `https://${domain}`;
  }
}
