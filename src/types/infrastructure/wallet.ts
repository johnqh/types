/**
 * Wallet and blockchain types
 */

/**
 * Cryptocurrency wallet type enumeration.
 *
 * Identifies different wallet providers and connection methods for blockchain interactions.
 * Supports both browser extension wallets and protocol-based connections.
 *
 * @example
 * ```typescript
 * // Wallet-specific connection logic
 * switch (walletType) {
 *   case WalletType.METAMASK:
 *     return connectMetaMask();
 *   case WalletType.WALLETCONNECT:
 *     return connectWalletConnect();
 * }
 * ```
 */
export enum WalletType {
  /** MetaMask browser extension wallet */
  METAMASK = 'metamask',
  /** Phantom wallet (primarily for Solana) */
  PHANTOM = 'phantom',
  /** Coinbase Wallet */
  COINBASE = 'coinbase',
  /** WalletConnect protocol for mobile wallets */
  WALLETCONNECT = 'walletconnect',
  /** Generic injected wallet provider */
  INJECTED = 'injected',
}
