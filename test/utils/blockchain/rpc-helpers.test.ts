import { describe, it, expect } from 'vitest';
import { RpcHelpers, BlockchainApis } from '../../../src/utils/blockchain/rpc-helpers';
import { Chain } from '../../../src/types/business/enums';

describe('RpcHelpers', () => {
  const MOCK_ALCHEMY_KEY = 'test-api-key-123';
  const MOCK_ETHERSCAN_KEY = 'etherscan-key-456';
  const MOCK_APIS: BlockchainApis = {
    alchemyApiKey: MOCK_ALCHEMY_KEY,
    etherscanApiKey: MOCK_ETHERSCAN_KEY,
  };

  describe('getRpcUrl', () => {
    describe('with API key string', () => {
      it('should build correct URL for Ethereum mainnet', () => {
        const url = RpcHelpers.getRpcUrl(MOCK_ALCHEMY_KEY, Chain.ETH_MAINNET);
        expect(url).to.equal('https://eth-mainnet.g.alchemy.com/v2/test-api-key-123');
      });

      it('should build correct URL for Ethereum Sepolia', () => {
        const url = RpcHelpers.getRpcUrl(MOCK_ALCHEMY_KEY, Chain.ETH_SEPOLIA);
        expect(url).to.equal('https://eth-sepolia.g.alchemy.com/v2/test-api-key-123');
      });

      it('should build correct URL for Polygon mainnet', () => {
        const url = RpcHelpers.getRpcUrl(MOCK_ALCHEMY_KEY, Chain.POLYGON_MAINNET);
        expect(url).to.equal('https://polygon-mainnet.g.alchemy.com/v2/test-api-key-123');
      });

      it('should build correct URL for Optimism mainnet', () => {
        const url = RpcHelpers.getRpcUrl(MOCK_ALCHEMY_KEY, Chain.OPTIMISM_MAINNET);
        expect(url).to.equal('https://opt-mainnet.g.alchemy.com/v2/test-api-key-123');
      });

      it('should build correct URL for Arbitrum mainnet', () => {
        const url = RpcHelpers.getRpcUrl(MOCK_ALCHEMY_KEY, Chain.ARBITRUM_MAINNET);
        expect(url).to.equal('https://arb-mainnet.g.alchemy.com/v2/test-api-key-123');
      });

      it('should build correct URL for Base mainnet', () => {
        const url = RpcHelpers.getRpcUrl(MOCK_ALCHEMY_KEY, Chain.BASE_MAINNET);
        expect(url).to.equal('https://base-mainnet.g.alchemy.com/v2/test-api-key-123');
      });

      it('should build correct URL for Solana mainnet', () => {
        const url = RpcHelpers.getRpcUrl(MOCK_ALCHEMY_KEY, Chain.SOLANA_MAINNET);
        expect(url).to.equal('https://solana-mainnet.g.alchemy.com/v2/test-api-key-123');
      });

      it('should build correct URL for Solana devnet', () => {
        const url = RpcHelpers.getRpcUrl(MOCK_ALCHEMY_KEY, Chain.SOLANA_DEVNET);
        expect(url).to.equal('https://solana-devnet.g.alchemy.com/v2/test-api-key-123');
      });

      it('should build correct URL for Solana testnet', () => {
        const url = RpcHelpers.getRpcUrl(MOCK_ALCHEMY_KEY, Chain.SOLANA_TESTNET);
        expect(url).to.equal('https://solana-testnet.g.alchemy.com/v2/test-api-key-123');
      });

      it('should return undefined if API key is empty', () => {
        const url = RpcHelpers.getRpcUrl('', Chain.ETH_MAINNET);
        expect(url).to.be.undefined;
      });
    });

    describe('with BlockchainApis object', () => {
      it('should get RPC URL for EVM chain', () => {
        const url = RpcHelpers.getRpcUrl(MOCK_APIS, Chain.ETH_MAINNET);
        expect(url).to.equal('https://eth-mainnet.g.alchemy.com/v2/test-api-key-123');
      });

      it('should get RPC URL for Solana chain', () => {
        const url = RpcHelpers.getRpcUrl(MOCK_APIS, Chain.SOLANA_MAINNET);
        expect(url).to.equal('https://solana-mainnet.g.alchemy.com/v2/test-api-key-123');
      });
    });
  });

  describe('getExplorerApiUrl', () => {
    describe('with API key string', () => {
      it('should build correct URL for Ethereum mainnet with API key', () => {
        const url = RpcHelpers.getExplorerApiUrl(MOCK_ETHERSCAN_KEY, Chain.ETH_MAINNET);
        expect(url).to.equal('https://api.etherscan.io/api?apikey=etherscan-key-456');
      });

      it('should build correct URL for Sepolia with API key', () => {
        const url = RpcHelpers.getExplorerApiUrl(MOCK_ETHERSCAN_KEY, Chain.ETH_SEPOLIA);
        expect(url).to.equal('https://api-sepolia.etherscan.io/api?apikey=etherscan-key-456');
      });

      it('should build correct URL for Polygon mainnet with API key', () => {
        const url = RpcHelpers.getExplorerApiUrl(MOCK_ETHERSCAN_KEY, Chain.POLYGON_MAINNET);
        expect(url).to.equal('https://api.polygonscan.com/api?apikey=etherscan-key-456');
      });

      it('should build correct URL for Optimism mainnet with API key', () => {
        const url = RpcHelpers.getExplorerApiUrl(MOCK_ETHERSCAN_KEY, Chain.OPTIMISM_MAINNET);
        expect(url).to.equal('https://api-optimistic.etherscan.io/api?apikey=etherscan-key-456');
      });

      it('should build correct URL for Arbitrum mainnet with API key', () => {
        const url = RpcHelpers.getExplorerApiUrl(MOCK_ETHERSCAN_KEY, Chain.ARBITRUM_MAINNET);
        expect(url).to.equal('https://api.arbiscan.io/api?apikey=etherscan-key-456');
      });

      it('should build correct URL for Base mainnet with API key', () => {
        const url = RpcHelpers.getExplorerApiUrl(MOCK_ETHERSCAN_KEY, Chain.BASE_MAINNET);
        expect(url).to.equal('https://api.basescan.org/api?apikey=etherscan-key-456');
      });

      it('should return undefined if API key is empty', () => {
        const url = RpcHelpers.getExplorerApiUrl('', Chain.ETH_MAINNET);
        expect(url).to.be.undefined;
      });

      it('should return undefined for Solana chains', () => {
        const url = RpcHelpers.getExplorerApiUrl(MOCK_ETHERSCAN_KEY, Chain.SOLANA_MAINNET);
        expect(url).to.be.undefined;
      });
    });

    describe('with BlockchainApis object', () => {
      it('should get explorer API URL for EVM chain with API key', () => {
        const url = RpcHelpers.getExplorerApiUrl(MOCK_APIS, Chain.ETH_MAINNET);
        expect(url).to.equal('https://api.etherscan.io/api?apikey=etherscan-key-456');
      });

      it('should return undefined for Solana chain', () => {
        const url = RpcHelpers.getExplorerApiUrl(MOCK_APIS, Chain.SOLANA_MAINNET);
        expect(url).to.be.undefined;
      });
    });
  });

  describe('getBlockExplorerUrl', () => {
    it('should return correct URL for Ethereum mainnet', () => {
      const url = RpcHelpers.getBlockExplorerUrl(Chain.ETH_MAINNET);
      expect(url).to.equal('https://etherscan.io');
    });

    it('should return correct URL for Sepolia', () => {
      const url = RpcHelpers.getBlockExplorerUrl(Chain.ETH_SEPOLIA);
      expect(url).to.equal('https://sepolia.etherscan.io');
    });

    it('should return correct URL for Polygon mainnet', () => {
      const url = RpcHelpers.getBlockExplorerUrl(Chain.POLYGON_MAINNET);
      expect(url).to.equal('https://polygonscan.com');
    });

    it('should return correct URL for Optimism mainnet', () => {
      const url = RpcHelpers.getBlockExplorerUrl(Chain.OPTIMISM_MAINNET);
      expect(url).to.equal('https://optimistic.etherscan.io');
    });

    it('should return correct URL for Arbitrum mainnet', () => {
      const url = RpcHelpers.getBlockExplorerUrl(Chain.ARBITRUM_MAINNET);
      expect(url).to.equal('https://arbiscan.io');
    });

    it('should return correct URL for Base mainnet', () => {
      const url = RpcHelpers.getBlockExplorerUrl(Chain.BASE_MAINNET);
      expect(url).to.equal('https://basescan.org');
    });

    it('should return correct URL for Solana mainnet', () => {
      const url = RpcHelpers.getBlockExplorerUrl(Chain.SOLANA_MAINNET);
      expect(url).to.equal('https://explorer.solana.com');
    });

    it('should return correct URL for Solana devnet', () => {
      const url = RpcHelpers.getBlockExplorerUrl(Chain.SOLANA_DEVNET);
      expect(url).to.equal('https://explorer.solana.com/?cluster=devnet');
    });
  });

});
