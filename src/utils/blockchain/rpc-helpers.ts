/**
 * RPC and API endpoint helper utilities
 *
 * Provides helper functions to build RPC endpoints and block explorer API URLs
 * from API keys and chain identifiers.
 */

import { Chain, ChainType } from '../../types/business/enums';
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

  // Avalanche
  [Chain.AVALANCHE_MAINNET]: 'avax-mainnet',
  [Chain.AVALANCHE_FUJI]: 'avax-fuji',

  // BNB Chain
  [Chain.BNB_MAINNET]: 'bnb-mainnet',
  [Chain.BNB_TESTNET]: 'bnb-testnet',

  // Gnosis Chain
  [Chain.GNOSIS_MAINNET]: 'gnosis-mainnet',
  [Chain.GNOSIS_CHIADO]: 'gnosis-chiado',

  // Celo
  [Chain.CELO_MAINNET]: 'celo-mainnet',
  [Chain.CELO_ALFAJORES]: 'celo-alfajores',

  // zkSync
  [Chain.ZKSYNC_MAINNET]: 'zksync-mainnet',
  [Chain.ZKSYNC_SEPOLIA]: 'zksync-sepolia',

  // Linea
  [Chain.LINEA_MAINNET]: 'linea-mainnet',
  [Chain.LINEA_SEPOLIA]: 'linea-sepolia',

  // Scroll
  [Chain.SCROLL_MAINNET]: 'scroll-mainnet',
  [Chain.SCROLL_SEPOLIA]: 'scroll-sepolia',

  // Monad
  [Chain.MONAD_MAINNET]: '',
  [Chain.MONAD_TESTNET]: '',

  // Story Protocol
  [Chain.STORY_MAINNET]: '',
  [Chain.STORY_TESTNET]: '',

  // Plume Network
  [Chain.PLUME_MAINNET]: '',
  [Chain.PLUME_TESTNET]: '',

  // Nexus
  [Chain.NEXUS_MAINNET]: '',
  [Chain.NEXUS_TESTNET]: '',

  // Hyperliquid
  [Chain.HYPERLIQUID_MAINNET]: '',
  [Chain.HYPERLIQUID_TESTNET]: '',

  // Fetch.ai
  [Chain.FETCH_MAINNET]: '',
  [Chain.FETCH_TESTNET]: '',

  // Gensyn
  [Chain.GENSYN_MAINNET]: '',
  [Chain.GENSYN_TESTNET]: '',

  // Ritual
  [Chain.RITUAL_MAINNET]: '',
  [Chain.RITUAL_TESTNET]: '',

  // Solana - simple names
  [Chain.SOLANA_MAINNET]: 'mainnet',
  [Chain.SOLANA_DEVNET]: 'devnet',
  [Chain.SOLANA_TESTNET]: 'testnet',

  // Local development - no Alchemy support
  [Chain.EVM_LOCAL]: '',
  [Chain.SOLANA_LOCAL]: '',
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

  // Avalanche
  [Chain.AVALANCHE_MAINNET]: 'api.snowtrace.io',
  [Chain.AVALANCHE_FUJI]: 'api-testnet.snowtrace.io',

  // BNB Chain
  [Chain.BNB_MAINNET]: 'api.bscscan.com',
  [Chain.BNB_TESTNET]: 'api-testnet.bscscan.com',

  // Gnosis Chain
  [Chain.GNOSIS_MAINNET]: 'api.gnosisscan.io',
  [Chain.GNOSIS_CHIADO]: 'api-chiado.gnosisscan.io',

  // Celo
  [Chain.CELO_MAINNET]: 'api.celoscan.io',
  [Chain.CELO_ALFAJORES]: 'api-alfajores.celoscan.io',

  // zkSync
  [Chain.ZKSYNC_MAINNET]: 'api-era.zksync.network',
  [Chain.ZKSYNC_SEPOLIA]: 'api-sepolia-era.zksync.network',

  // Linea
  [Chain.LINEA_MAINNET]: 'api.lineascan.build',
  [Chain.LINEA_SEPOLIA]: 'api-sepolia.lineascan.build',

  // Scroll
  [Chain.SCROLL_MAINNET]: 'api.scrollscan.com',
  [Chain.SCROLL_SEPOLIA]: 'api-sepolia.scrollscan.com',

  // Monad
  [Chain.MONAD_MAINNET]: '',
  [Chain.MONAD_TESTNET]: '',

  // Story Protocol
  [Chain.STORY_MAINNET]: '',
  [Chain.STORY_TESTNET]: '',

  // Plume Network
  [Chain.PLUME_MAINNET]: '',
  [Chain.PLUME_TESTNET]: '',

  // Nexus
  [Chain.NEXUS_MAINNET]: '',
  [Chain.NEXUS_TESTNET]: '',

  // Hyperliquid
  [Chain.HYPERLIQUID_MAINNET]: '',
  [Chain.HYPERLIQUID_TESTNET]: '',

  // Fetch.ai
  [Chain.FETCH_MAINNET]: '',
  [Chain.FETCH_TESTNET]: '',

  // Gensyn
  [Chain.GENSYN_MAINNET]: '',
  [Chain.GENSYN_TESTNET]: '',

  // Ritual
  [Chain.RITUAL_MAINNET]: '',
  [Chain.RITUAL_TESTNET]: '',

  // Solana - no block explorer API in this format
  [Chain.SOLANA_MAINNET]: '',
  [Chain.SOLANA_DEVNET]: '',
  [Chain.SOLANA_TESTNET]: '',

  // Local development - no block explorer API
  [Chain.EVM_LOCAL]: '',
  [Chain.SOLANA_LOCAL]: '',
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

  // Avalanche
  [Chain.AVALANCHE_MAINNET]: 'snowtrace.io',
  [Chain.AVALANCHE_FUJI]: 'testnet.snowtrace.io',

  // BNB Chain
  [Chain.BNB_MAINNET]: 'bscscan.com',
  [Chain.BNB_TESTNET]: 'testnet.bscscan.com',

  // Gnosis Chain
  [Chain.GNOSIS_MAINNET]: 'gnosisscan.io',
  [Chain.GNOSIS_CHIADO]: 'gnosis-chiado.blockscout.com',

  // Celo
  [Chain.CELO_MAINNET]: 'celoscan.io',
  [Chain.CELO_ALFAJORES]: 'alfajores.celoscan.io',

  // zkSync
  [Chain.ZKSYNC_MAINNET]: 'explorer.zksync.io',
  [Chain.ZKSYNC_SEPOLIA]: 'sepolia.explorer.zksync.io',

  // Linea
  [Chain.LINEA_MAINNET]: 'lineascan.build',
  [Chain.LINEA_SEPOLIA]: 'sepolia.lineascan.build',

  // Scroll
  [Chain.SCROLL_MAINNET]: 'scrollscan.com',
  [Chain.SCROLL_SEPOLIA]: 'sepolia.scrollscan.com',

  // Monad
  [Chain.MONAD_MAINNET]: 'explorer.monad.xyz',
  [Chain.MONAD_TESTNET]: 'testnet.explorer.monad.xyz',

  // Story Protocol
  [Chain.STORY_MAINNET]: 'explorer.story.foundation',
  [Chain.STORY_TESTNET]: 'testnet.explorer.story.foundation',

  // Plume Network
  [Chain.PLUME_MAINNET]: 'explorer.plumenetwork.xyz',
  [Chain.PLUME_TESTNET]: 'testnet.explorer.plumenetwork.xyz',

  // Nexus
  [Chain.NEXUS_MAINNET]: 'explorer.nexus.xyz',
  [Chain.NEXUS_TESTNET]: 'testnet.explorer.nexus.xyz',

  // Hyperliquid
  [Chain.HYPERLIQUID_MAINNET]: 'app.hyperliquid.xyz/explorer',
  [Chain.HYPERLIQUID_TESTNET]: 'app.hyperliquid-testnet.xyz/explorer',

  // Fetch.ai
  [Chain.FETCH_MAINNET]: 'explore.fetch.ai',
  [Chain.FETCH_TESTNET]: 'explore-testnet.fetch.ai',

  // Gensyn
  [Chain.GENSYN_MAINNET]: 'explorer.gensyn.ai',
  [Chain.GENSYN_TESTNET]: 'testnet.explorer.gensyn.ai',

  // Ritual
  [Chain.RITUAL_MAINNET]: 'explorer.ritual.net',
  [Chain.RITUAL_TESTNET]: 'testnet.explorer.ritual.net',

  // Solana
  [Chain.SOLANA_MAINNET]: 'explorer.solana.com',
  [Chain.SOLANA_DEVNET]: 'explorer.solana.com/?cluster=devnet',
  [Chain.SOLANA_TESTNET]: 'explorer.solana.com/?cluster=testnet',

  // Local development - no block explorer
  [Chain.EVM_LOCAL]: '',
  [Chain.SOLANA_LOCAL]: '',
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
  Chain.AVALANCHE_MAINNET,
  Chain.AVALANCHE_FUJI,
  Chain.BNB_MAINNET,
  Chain.BNB_TESTNET,
  Chain.GNOSIS_MAINNET,
  Chain.GNOSIS_CHIADO,
  Chain.CELO_MAINNET,
  Chain.CELO_ALFAJORES,
  Chain.ZKSYNC_MAINNET,
  Chain.ZKSYNC_SEPOLIA,
  Chain.LINEA_MAINNET,
  Chain.LINEA_SEPOLIA,
  Chain.SCROLL_MAINNET,
  Chain.SCROLL_SEPOLIA,
  Chain.MONAD_MAINNET,
  Chain.MONAD_TESTNET,
  Chain.STORY_MAINNET,
  Chain.STORY_TESTNET,
  Chain.PLUME_MAINNET,
  Chain.PLUME_TESTNET,
  Chain.NEXUS_MAINNET,
  Chain.NEXUS_TESTNET,
  Chain.HYPERLIQUID_MAINNET,
  Chain.HYPERLIQUID_TESTNET,
  Chain.FETCH_MAINNET,
  Chain.FETCH_TESTNET,
  Chain.GENSYN_MAINNET,
  Chain.GENSYN_TESTNET,
  Chain.RITUAL_MAINNET,
  Chain.RITUAL_TESTNET,
  Chain.EVM_LOCAL,
]);

/**
 * Solana chains (used for type checking)
 */
const SOLANA_CHAINS = new Set<Chain>([
  Chain.SOLANA_MAINNET,
  Chain.SOLANA_DEVNET,
  Chain.SOLANA_TESTNET,
  Chain.SOLANA_LOCAL,
]);

/**
 * Chain ID mappings
 * EVM chains use positive IDs, Solana chains use negative IDs
 */
const CHAIN_ID_MAP: Record<Chain, number> = {
  // Ethereum
  [Chain.ETH_MAINNET]: 1,
  [Chain.ETH_SEPOLIA]: 11155111,
  [Chain.ETH_GOERLI]: 5,

  // Polygon
  [Chain.POLYGON_MAINNET]: 137,
  [Chain.POLYGON_MUMBAI]: 80001,
  [Chain.POLYGON_AMOY]: 80002,

  // Optimism
  [Chain.OPTIMISM_MAINNET]: 10,
  [Chain.OPTIMISM_SEPOLIA]: 11155420,
  [Chain.OPTIMISM_GOERLI]: 420,

  // Arbitrum
  [Chain.ARBITRUM_MAINNET]: 42161,
  [Chain.ARBITRUM_SEPOLIA]: 421614,
  [Chain.ARBITRUM_GOERLI]: 421613,

  // Base
  [Chain.BASE_MAINNET]: 8453,
  [Chain.BASE_SEPOLIA]: 84532,
  [Chain.BASE_GOERLI]: 84531,

  // Avalanche
  [Chain.AVALANCHE_MAINNET]: 43114,
  [Chain.AVALANCHE_FUJI]: 43113,

  // BNB Chain
  [Chain.BNB_MAINNET]: 56,
  [Chain.BNB_TESTNET]: 97,

  // Gnosis Chain
  [Chain.GNOSIS_MAINNET]: 100,
  [Chain.GNOSIS_CHIADO]: 10200,

  // Celo
  [Chain.CELO_MAINNET]: 42220,
  [Chain.CELO_ALFAJORES]: 44787,

  // zkSync
  [Chain.ZKSYNC_MAINNET]: 324,
  [Chain.ZKSYNC_SEPOLIA]: 300,

  // Linea
  [Chain.LINEA_MAINNET]: 59144,
  [Chain.LINEA_SEPOLIA]: 59141,

  // Scroll
  [Chain.SCROLL_MAINNET]: 534352,
  [Chain.SCROLL_SEPOLIA]: 534351,

  // Monad
  [Chain.MONAD_MAINNET]: 10000, // TBD - placeholder
  [Chain.MONAD_TESTNET]: 10001, // TBD - placeholder

  // Story Protocol
  [Chain.STORY_MAINNET]: 1516, // Actual Story chain ID
  [Chain.STORY_TESTNET]: 1513, // Story testnet chain ID

  // Plume Network
  [Chain.PLUME_MAINNET]: 98865, // Plume mainnet
  [Chain.PLUME_TESTNET]: 98864, // Plume testnet

  // Nexus
  [Chain.NEXUS_MAINNET]: 9999, // TBD - placeholder
  [Chain.NEXUS_TESTNET]: 9998, // TBD - placeholder

  // Hyperliquid
  [Chain.HYPERLIQUID_MAINNET]: 998, // Hyperliquid L1
  [Chain.HYPERLIQUID_TESTNET]: 997, // Hyperliquid testnet

  // Fetch.ai (Cosmos-based but supports EVM)
  [Chain.FETCH_MAINNET]: 2154, // Fetch.ai EVM
  [Chain.FETCH_TESTNET]: 2153, // Fetch.ai testnet

  // Gensyn
  [Chain.GENSYN_MAINNET]: 8888, // TBD - placeholder
  [Chain.GENSYN_TESTNET]: 8887, // TBD - placeholder

  // Ritual
  [Chain.RITUAL_MAINNET]: 7777, // TBD - placeholder
  [Chain.RITUAL_TESTNET]: 7776, // TBD - placeholder

  // Solana (negative IDs)
  [Chain.SOLANA_MAINNET]: -101,
  [Chain.SOLANA_DEVNET]: -102,
  [Chain.SOLANA_TESTNET]: -103,

  // Local development
  [Chain.EVM_LOCAL]: 31337,
  [Chain.SOLANA_LOCAL]: -104,
};

/**
 * USDC address/mint mappings
 * EVM chains have contract addresses, Solana chains have mint addresses
 */
const USDC_ADDRESS_MAP: Record<Chain, string> = {
  // Ethereum
  [Chain.ETH_MAINNET]: '0xA0b86a33E6441146a8A8e27c01f0D9B1F5E42E92',
  [Chain.ETH_SEPOLIA]: '0x6f14C02fC1F78322cFd7d707aB90f18baD3B54f5',
  [Chain.ETH_GOERLI]: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',

  // Polygon
  [Chain.POLYGON_MAINNET]: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
  [Chain.POLYGON_MUMBAI]: '0x0FA8781a83E46826621b3BC094Ea2A0212e71B23',
  [Chain.POLYGON_AMOY]: '0x41E94Eb019C0762f9Bfcf9Fb1E58725BfB0e7582',

  // Optimism
  [Chain.OPTIMISM_MAINNET]: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85',
  [Chain.OPTIMISM_SEPOLIA]: '0x5fd84259d66Cd46123540766Be93DFE6D43130D7',
  [Chain.OPTIMISM_GOERLI]: '0xe05606174bac4A6364B31bd0eCA4bf4dD368f8C6',

  // Arbitrum
  [Chain.ARBITRUM_MAINNET]: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
  [Chain.ARBITRUM_SEPOLIA]: '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d',
  [Chain.ARBITRUM_GOERLI]: '0xfd064A18f3BF249cf1f87FC203E90D8f650f2d63',

  // Base
  [Chain.BASE_MAINNET]: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  [Chain.BASE_SEPOLIA]: '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
  [Chain.BASE_GOERLI]: '0xF175520C52418dfE19C8098071a252da48Cd1C19',

  // Avalanche
  [Chain.AVALANCHE_MAINNET]: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
  [Chain.AVALANCHE_FUJI]: '0x5425890298aed601595a70AB815c96711a31Bc65',

  // BNB Chain
  [Chain.BNB_MAINNET]: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
  [Chain.BNB_TESTNET]: '0x64544969ed7EBf5f083679233325356EbE738930',

  // Gnosis Chain
  [Chain.GNOSIS_MAINNET]: '0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83',
  [Chain.GNOSIS_CHIADO]: '0x',

  // Celo
  [Chain.CELO_MAINNET]: '0xcebA9300f2b948710d2653dD7B07f33A8B32118C',
  [Chain.CELO_ALFAJORES]: '0x2F25deB3848C207fc8E0c34035B3Ba7fC157602B',

  // zkSync
  [Chain.ZKSYNC_MAINNET]: '0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4',
  [Chain.ZKSYNC_SEPOLIA]: '0x',

  // Linea
  [Chain.LINEA_MAINNET]: '0x176211869cA2b568f2A7D4EE941E073a821EE1ff',
  [Chain.LINEA_SEPOLIA]: '0x',

  // Scroll
  [Chain.SCROLL_MAINNET]: '0x06eFdBFf2a14a7c8E15944D1F4A48F9F95F663A4',
  [Chain.SCROLL_SEPOLIA]: '0x',

  // Monad
  [Chain.MONAD_MAINNET]: '0x',
  [Chain.MONAD_TESTNET]: '0x',

  // Story Protocol
  [Chain.STORY_MAINNET]: '0x',
  [Chain.STORY_TESTNET]: '0x',

  // Plume Network
  [Chain.PLUME_MAINNET]: '0x',
  [Chain.PLUME_TESTNET]: '0x',

  // Nexus
  [Chain.NEXUS_MAINNET]: '0x',
  [Chain.NEXUS_TESTNET]: '0x',

  // Hyperliquid
  [Chain.HYPERLIQUID_MAINNET]: '0x',
  [Chain.HYPERLIQUID_TESTNET]: '0x',

  // Fetch.ai
  [Chain.FETCH_MAINNET]: '0x',
  [Chain.FETCH_TESTNET]: '0x',

  // Gensyn
  [Chain.GENSYN_MAINNET]: '0x',
  [Chain.GENSYN_TESTNET]: '0x',

  // Ritual
  [Chain.RITUAL_MAINNET]: '0x',
  [Chain.RITUAL_TESTNET]: '0x',

  // Solana (mint addresses)
  [Chain.SOLANA_MAINNET]: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  [Chain.SOLANA_DEVNET]: '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU',
  [Chain.SOLANA_TESTNET]: '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU',

  // Local development - mock addresses
  [Chain.EVM_LOCAL]: '0x0000000000000000000000000000000000000000',
  [Chain.SOLANA_LOCAL]: '11111111111111111111111111111111',
};

/**
 * User-friendly chain name mappings
 */
const CHAIN_NAME_MAP: Record<Chain, string> = {
  // Ethereum
  [Chain.ETH_MAINNET]: 'Ethereum',
  [Chain.ETH_SEPOLIA]: 'Ethereum Sepolia',
  [Chain.ETH_GOERLI]: 'Ethereum Goerli',

  // Polygon
  [Chain.POLYGON_MAINNET]: 'Polygon',
  [Chain.POLYGON_MUMBAI]: 'Polygon Mumbai',
  [Chain.POLYGON_AMOY]: 'Polygon Amoy',

  // Optimism
  [Chain.OPTIMISM_MAINNET]: 'Optimism',
  [Chain.OPTIMISM_SEPOLIA]: 'Optimism Sepolia',
  [Chain.OPTIMISM_GOERLI]: 'Optimism Goerli',

  // Arbitrum
  [Chain.ARBITRUM_MAINNET]: 'Arbitrum',
  [Chain.ARBITRUM_SEPOLIA]: 'Arbitrum Sepolia',
  [Chain.ARBITRUM_GOERLI]: 'Arbitrum Goerli',

  // Base
  [Chain.BASE_MAINNET]: 'Base',
  [Chain.BASE_SEPOLIA]: 'Base Sepolia',
  [Chain.BASE_GOERLI]: 'Base Goerli',

  // Avalanche
  [Chain.AVALANCHE_MAINNET]: 'Avalanche',
  [Chain.AVALANCHE_FUJI]: 'Avalanche Fuji',

  // BNB Chain
  [Chain.BNB_MAINNET]: 'BNB Chain',
  [Chain.BNB_TESTNET]: 'BNB Chain Testnet',

  // Gnosis Chain
  [Chain.GNOSIS_MAINNET]: 'Gnosis',
  [Chain.GNOSIS_CHIADO]: 'Gnosis Chiado',

  // Celo
  [Chain.CELO_MAINNET]: 'Celo',
  [Chain.CELO_ALFAJORES]: 'Celo Alfajores',

  // zkSync
  [Chain.ZKSYNC_MAINNET]: 'zkSync',
  [Chain.ZKSYNC_SEPOLIA]: 'zkSync Sepolia',

  // Linea
  [Chain.LINEA_MAINNET]: 'Linea',
  [Chain.LINEA_SEPOLIA]: 'Linea Sepolia',

  // Scroll
  [Chain.SCROLL_MAINNET]: 'Scroll',
  [Chain.SCROLL_SEPOLIA]: 'Scroll Sepolia',

  // Monad
  [Chain.MONAD_MAINNET]: 'Monad',
  [Chain.MONAD_TESTNET]: 'Monad Testnet',

  // Story Protocol
  [Chain.STORY_MAINNET]: 'Story',
  [Chain.STORY_TESTNET]: 'Story Testnet',

  // Plume Network
  [Chain.PLUME_MAINNET]: 'Plume',
  [Chain.PLUME_TESTNET]: 'Plume Testnet',

  // Nexus
  [Chain.NEXUS_MAINNET]: 'Nexus',
  [Chain.NEXUS_TESTNET]: 'Nexus Testnet',

  // Hyperliquid
  [Chain.HYPERLIQUID_MAINNET]: 'Hyperliquid',
  [Chain.HYPERLIQUID_TESTNET]: 'Hyperliquid Testnet',

  // Fetch.ai
  [Chain.FETCH_MAINNET]: 'Fetch.ai',
  [Chain.FETCH_TESTNET]: 'Fetch.ai Testnet',

  // Gensyn
  [Chain.GENSYN_MAINNET]: 'Gensyn',
  [Chain.GENSYN_TESTNET]: 'Gensyn Testnet',

  // Ritual
  [Chain.RITUAL_MAINNET]: 'Ritual',
  [Chain.RITUAL_TESTNET]: 'Ritual Testnet',

  // Solana
  [Chain.SOLANA_MAINNET]: 'Solana',
  [Chain.SOLANA_DEVNET]: 'Solana Devnet',
  [Chain.SOLANA_TESTNET]: 'Solana Testnet',

  // Local development
  [Chain.EVM_LOCAL]: 'Local EVM',
  [Chain.SOLANA_LOCAL]: 'Local Solana',
};

/**
 * Helper class for building RPC endpoints and block explorer API URLs
 */
export class RpcHelpers {
  /**
   * Check if a chain is an EVM chain
   * @param chain - Chain identifier to check
   * @returns True if the chain is an EVM chain
   */
  static isEvmChain(chain: Chain): boolean {
    return EVM_CHAINS.has(chain);
  }

  /**
   * Check if a chain is a Solana chain
   * @param chain - Chain identifier to check
   * @returns True if the chain is a Solana chain
   */
  static isSolanaChain(chain: Chain): boolean {
    return SOLANA_CHAINS.has(chain);
  }

  /**
   * Get the chain type (EVM or Solana) for a given chain
   * @param chain - Chain identifier
   * @returns ChainType.EVM or ChainType.SOLANA
   * @throws Error if the chain is not recognized
   * @example
   * ```typescript
   * const type = RpcHelpers.getChainType(Chain.ETH_MAINNET);
   * // Returns: ChainType.EVM
   *
   * const solanaType = RpcHelpers.getChainType(Chain.SOLANA_MAINNET);
   * // Returns: ChainType.SOLANA
   * ```
   */
  static getChainType(chain: Chain): ChainType {
    if (this.isEvmChain(chain)) {
      return ChainType.EVM;
    }
    if (this.isSolanaChain(chain)) {
      return ChainType.SOLANA;
    }
    throw new Error(`Unknown chain: ${chain}`);
  }

  /**
   * Get the chain ID for a given chain
   * @param chain - Chain identifier
   * @returns Numeric chain ID for EVM chains, or negative ID for Solana chains
   * @throws Error if the chain is not recognized or has no chain ID
   * @example
   * ```typescript
   * const ethChainId = RpcHelpers.getChainId(Chain.ETH_MAINNET);
   * // Returns: 1
   *
   * const polygonChainId = RpcHelpers.getChainId(Chain.POLYGON_MAINNET);
   * // Returns: 137
   *
   * const solanaChainId = RpcHelpers.getChainId(Chain.SOLANA_MAINNET);
   * // Returns: -101
   *
   * const localChainId = RpcHelpers.getChainId(Chain.EVM_LOCAL);
   * // Returns: 31337
   * ```
   */
  static getChainId(chain: Chain): number {
    const chainId = CHAIN_ID_MAP[chain];
    if (chainId === undefined) {
      throw new Error(`Unknown chain: ${chain}`);
    }
    return chainId;
  }

  /**
   * Get the USDC address/mint for a given chain
   * @param chain - Chain identifier
   * @returns USDC contract address for EVM chains, or mint address for Solana chains
   * @throws Error if the chain is not recognized
   * @example
   * ```typescript
   * const ethUSDC = RpcHelpers.getUSDCAddress(Chain.ETH_MAINNET);
   * // Returns: '0xA0b86a33E6441146a8A8e27c01f0D9B1F5E42E92'
   *
   * const polygonUSDC = RpcHelpers.getUSDCAddress(Chain.POLYGON_MAINNET);
   * // Returns: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
   *
   * const solanaUSDC = RpcHelpers.getUSDCAddress(Chain.SOLANA_MAINNET);
   * // Returns: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
   * ```
   */
  static getUSDCAddress(chain: Chain): string {
    const address = USDC_ADDRESS_MAP[chain];
    if (address === undefined) {
      throw new Error(`Unknown chain: ${chain}`);
    }
    return address;
  }

  /**
   * Get the user-friendly display name for a chain
   * @param chain - Chain identifier
   * @returns Human-readable chain name
   * @throws Error if the chain is not recognized
   * @example
   * ```typescript
   * const ethName = RpcHelpers.getUserFriendlyName(Chain.ETH_MAINNET);
   * // Returns: 'Ethereum'
   *
   * const polygonName = RpcHelpers.getUserFriendlyName(Chain.POLYGON_MAINNET);
   * // Returns: 'Polygon'
   *
   * const sepoliaName = RpcHelpers.getUserFriendlyName(Chain.ETH_SEPOLIA);
   * // Returns: 'Ethereum Sepolia'
   *
   * const localName = RpcHelpers.getUserFriendlyName(Chain.EVM_LOCAL);
   * // Returns: 'Local EVM'
   * ```
   */
  static getUserFriendlyName(chain: Chain): string {
    const name = CHAIN_NAME_MAP[chain];
    if (name === undefined) {
      throw new Error(`Unknown chain: ${chain}`);
    }
    return name;
  }

  /**
   * Get the list of visible chains for the application
   * @param isDev - Whether to include development/testnet chains
   * @returns Array of Chain values to display
   * @example
   * ```typescript
   * const prodChains = RpcHelpers.getVisibleChains(false);
   * // Returns: [Chain.ETH_MAINNET, Chain.BASE_MAINNET, Chain.POLYGON_MAINNET, Chain.OPTIMISM_MAINNET]
   *
   * const devChains = RpcHelpers.getVisibleChains(true);
   * // Returns: [Chain.ETH_MAINNET, Chain.BASE_MAINNET, Chain.POLYGON_MAINNET, Chain.OPTIMISM_MAINNET, Chain.ETH_SEPOLIA]
   * ```
   */
  static getVisibleChains(isDev: boolean): Chain[] {
    const mainnetChains = [
      Chain.ETH_MAINNET,
      Chain.BASE_MAINNET,
      Chain.POLYGON_MAINNET,
      Chain.OPTIMISM_MAINNET,
    ];

    if (isDev) {
      return [...mainnetChains, Chain.ETH_SEPOLIA];
    }

    return mainnetChains;
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

    if (this.isSolanaChain(chain)) {
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

    if (this.isSolanaChain(chain)) {
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
